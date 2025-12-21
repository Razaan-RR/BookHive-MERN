import { Dialog, DialogPanel, DialogTitle } from '@headlessui/react'
import useAuth from '../../hooks/useAuth'
import { useForm } from 'react-hook-form'
import axios from 'axios'
import { toast } from 'react-hot-toast'
import { useEffect } from 'react'

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
      name: '',
      email: '',
      phone: '',
      address: '',
    },
  })

  useEffect(() => {
    if (user) {
      reset({
        name: user.displayName || user.name || '',
        email: user.email || '',
        phone: '',
        address: '',
      })
    }
  }, [user, reset])

  const onSubmit = async (data) => {
    if (!data.phone || !data.address)
      return toast.error('Please fill all fields')

    const orderData = {
      bookId: _id,
      name, 
      price,
      customer: data.email, 
      customerInfo: {
        name: data.name,
        phone: data.phone,
        address: data.address,
      },
      status: 'pending',
      paymentStatus: 'unpaid',
    }

    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/orders`, orderData)
      toast.success('Order placed successfully!')
      reset({
        name: user.displayName || user.name || '',
        email: user.email || '',
        phone: '',
        address: '',
      })
      closeModal()
    } catch (error) {
      console.error('Failed to place order:', error)
      toast.error('Failed to place order. Please try again.')
    }
  }

  return (
    <Dialog
      open={isOpen}
      as="div"
      className="relative z-50"
      onClose={closeModal}
    >
      <div className="fixed inset-0 bg-black/40 backdrop-blur-sm" />

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

          {book && (
            <div className="flex gap-3 items-center mb-3">
              <img
                src={image}
                alt={name}
                className="w-16 h-20 object-cover rounded-lg border border-white/20 shadow-inner"
              />
              <div className="flex flex-col">
                <h3 className="text-sm sm:text-base font-semibold text-white/90">
                  {name}
                </h3>
                <p className="text-sm text-[var(--secondary)] font-bold">
                  ৳ {price}
                </p>
              </div>
            </div>
          )}

          <form className="flex flex-col gap-3" onSubmit={handleSubmit(onSubmit)}>
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

            <input
              type="text"
              {...register('phone', { required: 'Phone number is required' })}
              placeholder="Phone Number"
              className={`input glass-input ${errors.phone ? 'border-red-500' : ''}`}
            />
            {errors.phone && <span className="text-red-500 text-sm">{errors.phone.message}</span>}

            <input
              type="text"
              {...register('address', { required: 'Address is required' })}
              placeholder="Address"
              className={`input glass-input ${errors.address ? 'border-red-500' : ''}`}
            />
            {errors.address && <span className="text-red-500 text-sm">{errors.address.message}</span>}

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
