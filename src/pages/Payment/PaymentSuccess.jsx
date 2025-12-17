import { useEffect } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import axios from 'axios'
import { IoBagCheckOutline } from 'react-icons/io5'

const PaymentSuccess = () => {
  const [searchParams] = useSearchParams()
  const sessionId = searchParams.get('session_id')

  useEffect(() => {
    if (sessionId) {
      axios.post(`${import.meta.env.VITE_API_URL}/payment-success`, {
        sessionId,
      })
    }
  }, [sessionId])

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-10 rounded-lg shadow-lg text-center max-w-md">
        <IoBagCheckOutline className="w-16 h-16 text-green-500 mx-auto mb-4" />

        <h1 className="text-3xl font-bold text-gray-800 mb-2">
          Payment Successful
        </h1>

        <p className="text-gray-600 mb-6">
          Your book order has been placed successfully. You can track it from
          your dashboard.
        </p>

        <Link
          to="/dashboard/my-orders"
          className="inline-block bg-lime-500 text-white px-6 py-2 rounded-md font-semibold hover:bg-lime-600 transition"
        >
          Go to My Orders
        </Link>
      </div>
    </div>
  )
}

export default PaymentSuccess
