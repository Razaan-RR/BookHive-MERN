import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import useAuth from '../../../hooks/useAuth'
import Container from '../../../components/Common/Container'
import LoadingSpinner from '../../../components/Common/LoadingSpinner'

function MyOrders() {
  const { user } = useAuth()

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

  if (isLoading) return <LoadingSpinner />

  return (
    <Container>
      <div className="py-12 animate-fadeInUp">
        <h1 className="text-3xl font-extrabold mb-6">My Orders</h1>

        <div className="overflow-x-auto card">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-(--primary)/10 text-left">
                <th className="px-4 py-3 border-b">Book Title</th>
                <th className="px-4 py-3 border-b">Order Date</th>
                <th className="px-4 py-3 border-b">Status</th>
                <th className="px-4 py-3 border-b">Payment</th>
                <th className="px-4 py-3 border-b text-center">Action</th>
              </tr>
            </thead>

            <tbody>
              {orders.length === 0 && (
                <tr>
                  <td colSpan="5" className="text-center py-6 opacity-70">
                    No orders found
                  </td>
                </tr>
              )}

              {orders.map((order) => (
                <tr key={order._id} className="hover:bg-(--hover)">
                  <td className="px-4 py-4 border-b font-semibold">
                    {order.name}
                  </td>

                  <td className="px-4 py-4 border-b">
                    {new Date(order.orderDate).toLocaleDateString()}
                  </td>

                  <td className="px-4 py-4 border-b">
                    <span className="px-3 py-1 rounded-full text-sm bg-(--secondary)/20">
                      {order.status}
                    </span>
                  </td>

                  <td className="px-4 py-4 border-b">
                    <span className="px-3 py-1 rounded-full text-sm bg-green-100 text-green-600">
                      {order.paymentStatus}
                    </span>
                  </td>

                  <td className="px-4 py-4 border-b text-center">
                    <span className="text-sm opacity-70">—</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </Container>
  )
}

export default MyOrders
