import { Dialog, DialogPanel, DialogTitle } from '@headlessui/react'
import useAuth from '../../hooks/useAuth'
import { useForm } from 'react-hook-form'
import axios from 'axios'

const BookPurchaseModal = ({ isOpen, closeModal, book }) => {
  const { user } = useAuth()
  const { _id, name, price, description, image } = book || {}

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      name: user?.displayName || '',
      email: user?.email || '',
      phone: '',
      address: '',
    },
  })

  const onSubmit = async (data) => {
    const paymentInfo = {
      bookId: _id,
      name,
      price,
      description,
      image,
      customer: {
        name: data.name,
        email: data.email,
        phone: data.phone,
        address: data.address,
      },
    }

    try {
      const { data: response } = await axios.post(
        `${import.meta.env.VITE_API_URL}/create-book-checkout-session`,
        paymentInfo
      )
      window.location.href = response.url
      reset()
    } catch (error) {
      console.error('Payment session error:', error)
    }
  }

  return (
    <Dialog
      open={isOpen}
      as="div"
      className="relative z-50"
      onClose={closeModal}
    >
      {/* Overlay */}
      <div className="fixed inset-0 bg-black/40 backdrop-blur-sm" />

      {/* Modal */}
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <DialogPanel className="
          w-full max-w-md 
          bg-white/10 backdrop-blur-md border border-white/20 
          rounded-2xl shadow-xl shadow-black/30 p-6 
          flex flex-col gap-4
          animate-fadeIn
        ">
          <DialogTitle className="text-lg font-bold text-[var(--primary)] text-center mb-4 drop-shadow-md">
            Place Your Order
          </DialogTitle>

          {/* Book Info */}
          {book && (
            <div className="flex gap-3 items-center mb-3">
              <img
                src={image}
                alt={name}
                className="w-16 h-20 object-cover rounded-lg border border-white/20 shadow-inner"
              />
              <div className="flex flex-col">
                <h3 className="text-sm sm:text-base font-semibold text-white/90">{name}</h3>
                <p className="text-sm text-[var(--secondary)] font-bold">৳ {price}</p>
              </div>
            </div>
          )}

          {/* Form */}
          <form className="flex flex-col gap-3" onSubmit={handleSubmit(onSubmit)}>
            {/* Name & Email (Read-only) */}
            <input
              type="text"
              readOnly
              {...register('name')}
              placeholder="Name"
              className="input glass-input cursor-not-allowed"
            />
            <input
              type="email"
              readOnly
              {...register('email')}
              placeholder="Email"
              className="input glass-input cursor-not-allowed"
            />

            {/* Phone */}
            <input
              type="text"
              {...register('phone', { required: 'Phone number is required' })}
              placeholder="Phone Number"
              className={`input glass-input ${errors.phone ? 'border-red-500' : ''}`}
            />
            {errors.phone && <span className="text-red-500 text-sm">{errors.phone.message}</span>}

            {/* Address */}
            <input
              type="text"
              {...register('address', { required: 'Address is required' })}
              placeholder="Address"
              className={`input glass-input ${errors.address ? 'border-red-500' : ''}`}
            />
            {errors.address && <span className="text-red-500 text-sm">{errors.address.message}</span>}

            {/* Submit */}
            <button
              type="submit"
              className="
                mt-4 w-full py-2 rounded-xl 
                bg-gradient-to-r from-[var(--primary)] to-[var(--secondary)] 
                text-white font-semibold shadow-glow hover:scale-105 transition-transform
              "
            >
              Place Order
            </button>
          </form>
        </DialogPanel>
      </div>
    </Dialog>
  )
}

export default BookPurchaseModal
