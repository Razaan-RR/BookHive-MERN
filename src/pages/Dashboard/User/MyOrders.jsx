import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import axios from 'axios'
import useAuth from '../../../hooks/useAuth'
import Container from '../../../components/Common/Container'
import LoadingSpinner from '../../../components/Common/LoadingSpinner'
import {
  FaCreditCard,
  FaTimesCircle,
  FaBook,
  FaCalendarAlt,
} from 'react-icons/fa'

function MyOrders() {
  const { user } = useAuth()
  const queryClient = useQueryClient()

  const { data: orders = [], isLoading } = useQuery({
    enabled: !!user?.email,
    queryKey: ['my-orders', user?.email],
    queryFn: async () => {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/my-orders/${user.email}`
      )
      return res.data
    },
  })

  const cancelOrder = useMutation({
    mutationFn: (id) =>
      axios.patch(`${import.meta.env.VITE_API_URL}/orders/cancel/${id}`),
    onSuccess: () => queryClient.invalidateQueries(['my-orders']),
  })

  if (isLoading) return <LoadingSpinner />

  return (
    <section
      className="relative py-16 overflow-hidden"
      style={{ backgroundColor: 'var(--bg)' }}
    >
      <div className="absolute -top-40 -left-40 w-96 h-96 bg-(--secondary)/30 blur-[140px] rounded-full animate-pulse-slow" />
      <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-(--primary)/30 blur-[140px] rounded-full animate-pulse-slow" />

      <Container>
        <div className="relative animate-fadeInUp">
          <div className="mb-14 text-center px-4">
            <span className="inline-flex items-center gap-2 mb-5 px-6 py-2 rounded-full text-lg sm:text-xl font-bold bg-(--secondary)/25">
              My Orders <span>📦</span>
            </span>

            <h1 className="text-3xl sm:text-4xl font-extrabold leading-tight">
              Track Your Reading Journey
            </h1>

            <p className="opacity-70 mt-3 max-w-xl mx-auto">
              Manage your orders, complete payments, or cancel pending books —
              all in one place.
            </p>
          </div>

          <div className="grid gap-6">
            {orders.length === 0 && (
              <div className="card text-center py-16">
                <p className="opacity-70 text-lg">No orders found</p>
              </div>
            )}

            {orders.map((order) => {
              const isPending = order.status === 'pending'
              // const isCancelled = order.status === 'cancelled'

              return (
                <div
                  key={order._id}
                  className="group relative rounded-3xl border border-(--border) bg-(--card-bg)/80 backdrop-blur-xl shadow-lg p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl"
                >
                  <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-(--primary)/10 to-(--secondary)/10 opacity-0 group-hover:opacity-100 transition" />

                  <div className="relative z-10 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-2xl bg-(--primary)/15 flex items-center justify-center text-(--primary) text-xl shrink-0">
                        <FaBook />
                      </div>

                      <div>
                        <h3 className="font-semibold text-lg leading-snug">
                          {order.name}
                        </h3>

                        <div className="flex items-center gap-2 mt-2 text-sm opacity-70">
                          <FaCalendarAlt />
                          {new Date(order.orderDate).toLocaleDateString()}
                        </div>

                        <span
                          className={`inline-block mt-3 px-4 py-1 rounded-full text-sm font-medium
                          ${
                            order.status === 'paid'
                              ? 'bg-green-100 text-green-700'
                              : order.status === 'cancelled'
                              ? 'bg-red-100 text-red-600'
                              : 'bg-yellow-100 text-yellow-700'
                          }`}
                        >
                          {order.status}
                        </span>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-3 md:justify-end">
                      {isPending && (
                        <>
                          <button
                            onClick={() => cancelOrder.mutate(order._id)}
                            className="flex items-center gap-2 px-5 py-2 rounded-xl bg-red-50 text-red-600 hover:bg-red-100 transition"
                          >
                            <FaTimesCircle />
                            Cancel
                          </button>

                          {order.paymentStatus !== 'paid' && (
                            <a
                              href={`/payment/${order._id}`}
                              className="flex items-center gap-2 px-5 py-2 rounded-xl bg-(--primary) text-white hover:scale-105 transition"
                            >
                              <FaCreditCard />
                              Pay Now
                            </a>
                          )}
                        </>
                      )}

                      {!isPending && (
                        <span className="opacity-50 text-sm flex items-center">
                          No actions available
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </Container>
    </section>
  )
}

export default MyOrders
