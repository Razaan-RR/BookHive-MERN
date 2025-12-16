import { Dialog, DialogPanel, DialogTitle } from '@headlessui/react'
import useAuth from '../../hooks/useAuth'
import { useState } from 'react'

const BookPurchaseModal = ({ isOpen, closeModal, book }) => {
  const { user } = useAuth()
  const { name, price } = book || {}
  const [phone, setPhone] = useState('')
  const [address, setAddress] = useState('')

  const handlePlaceOrder = async () => {
    const orderInfo = {
      bookId: book._id,
      name,
      price,
      customer: {
        name: user?.displayName,
        email: user?.email,
        phone,
        address,
      },
    }
    console.log(orderInfo)
    closeModal()
  }

  return (
    <Dialog
      open={isOpen}
      as="div"
      className="relative z-10"
      onClose={closeModal}
    >
      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-center justify-center p-4">
          <DialogPanel className="w-full max-w-md bg-white p-6 rounded-2xl shadow-xl">
            <DialogTitle className="text-lg font-medium text-center text-gray-900 mb-4">
              Place Your Order
            </DialogTitle>
            <div className="flex flex-col gap-3">
              <input
                type="text"
                value={user?.displayName || ''}
                readOnly
                placeholder="Name"
                className="input"
              />
              <input
                type="email"
                value={user?.email || ''}
                readOnly
                placeholder="Email"
                className="input"
              />
              <input
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="Phone Number"
                className="input"
              />
              <input
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="Address"
                className="input"
              />
              <button
                onClick={handlePlaceOrder}
                className="mt-4 w-full bg-(--primary) text-white font-semibold py-2 rounded-xl hover:opacity-90 transition"
              >
                Place Order
              </button>
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  )
}

export default BookPurchaseModal
