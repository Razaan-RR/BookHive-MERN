import { useEffect } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import axios from 'axios'
import { FaBookOpen, FaCheckCircle } from 'react-icons/fa'

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
    <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: 'var(--bg)' }}>
      <div
        className="p-6 sm:p-8 rounded-2xl text-center max-w-md w-full backdrop-blur-md border border-white/20 shadow-lg"
        style={{
          backgroundColor: 'rgba(255, 255, 255, 0.2)',
          boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.25)',
          borderColor: 'rgba(255, 255, 255, 0.3)',
        }}
      >
        <div className="flex justify-center mb-4">
          <FaCheckCircle
            className="w-20 h-20 animate-float"
            style={{ color: 'var(--primary)' }}
          />
        </div>

        <h1 className="text-3xl font-bold mb-2" style={{ color: 'var(--text)' }}>
          Payment Successful!
        </h1>

        <p className="mb-6" style={{ color: 'var(--text)' }}>
          Your order has been placed successfully. Thank you for shopping at
          <span className="font-semibold" style={{ color: 'var(--secondary)' }}> BookHive</span>. You can track your order from your dashboard.
        </p>

        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link
            to="/dashboard/my-orders"
            className="flex-1 py-2 sm:py-3 rounded-lg font-semibold text-center transition"
            style={{
              backgroundColor: 'var(--primary)',
              color: 'white',
            }}
          >
            My Orders
          </Link>

          <Link
            to="/dashboard/my-orders"
            className="flex-1 py-2 sm:py-3 rounded-lg font-semibold text-center transition"
            style={{
              border: '2px solid var(--secondary)',
              color: 'var(--secondary)',
              backgroundColor: 'transparent',
            }}
          >
            Continue Shopping
          </Link>
        </div>

        <div className="mt-6">
          <FaBookOpen
            className="w-10 h-10 mx-auto animate-pulse-slow"
            style={{ color: 'var(--secondary)' }}
          />
        </div>
      </div>
    </div>
  )
}

export default PaymentSuccess
