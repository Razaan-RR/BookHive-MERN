// import { useQuery } from '@tanstack/react-query'
// import axios from 'axios'
// import LoadingSpinner from '../../../components/Common/LoadingSpinner'

// function Orders() {
//   const {
//     data: orders = [],
//     isLoading,
//     refetch,
//   } = useQuery({
//     queryKey: ['librarian-orders'],
//     queryFn: async () => {
//       const res = await axios.get(
//         `${import.meta.env.VITE_API_URL}/librarian/orders`
//       )
//       return res.data
//     },
//   })

//   const updateStatus = async (id, status) => {
//     try {
//       await axios.patch(`${import.meta.env.VITE_API_URL}/orders/status/${id}`, {
//         status,
//       })
//       refetch()
//     } catch (err) {
//       console.error(err)
//       alert('Failed to update status')
//     }
//   }

//   if (isLoading) return <LoadingSpinner />

//   return (
//     <div className="p-6 bg-gray-50 min-h-screen">
//       <h2 className="text-3xl font-bold mb-8 text-gray-800">All Orders</h2>

//       <div className="overflow-x-auto">
//         <table className="min-w-full bg-white shadow-lg rounded-lg overflow-hidden">
//           <thead className="bg-gray-100 text-gray-600 uppercase text-sm">
//             <tr>
//               <th className="py-3 px-5 text-left">Book</th>
//               <th className="py-3 px-5 text-left">Price</th>
//               <th className="py-3 px-5 text-left">Payment</th>
//               <th className="py-3 px-5 text-left">Status</th>
//               <th className="py-3 px-5 text-left">Action</th>
//               <th className="py-3 px-5 text-left">Customer Name</th>
//               <th className="py-3 px-5 text-left">Phone</th>
//               <th className="py-3 px-5 text-left">Address</th>
//             </tr>
//           </thead>

//           <tbody className="text-gray-700">
//             {orders.map((order, idx) => (
//               <tr
//                 key={order._id}
//                 className={idx % 2 === 0 ? 'bg-white' : 'bg-gray-50'}
//               >
//                 <td className="py-3 px-5 font-medium">{order.name}</td>
//                 <td className="py-3 px-5">৳{order.price}</td>

//                 <td className="py-3 px-5">
//                   <span
//                     className={`px-3 py-1 rounded-full text-xs font-semibold ${
//                       order.paymentStatus === 'paid'
//                         ? 'bg-green-100 text-green-700'
//                         : 'bg-yellow-100 text-yellow-700'
//                     }`}
//                   >
//                     {order.paymentStatus}
//                   </span>
//                 </td>

//                 <td className="py-3 px-5">
//                   <select
//                     className="border border-gray-300 rounded px-2 py-1 text-sm"
//                     value={order.status}
//                     disabled={
//                       order.status === 'cancelled' ||
//                       order.status === 'delivered'
//                     }
//                     onChange={(e) => updateStatus(order._id, e.target.value)}
//                   >
//                     <option value="pending">Pending</option>
//                     <option value="shipped">Shipped</option>
//                     <option value="delivered">Delivered</option>
//                   </select>
//                 </td>

//                 <td className="py-3 px-5">
//                   {order.status === 'pending' && (
//                     <button
//                       className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-sm"
//                       onClick={() => updateStatus(order._id, 'cancelled')}
//                     >
//                       Cancel
//                     </button>
//                   )}
//                 </td>

//                 <td className="py-3 px-5">{order.customerInfo?.name || '-'}</td>
//                 <td className="py-3 px-5">
//                   {order.customerInfo?.phone || '-'}
//                 </td>
//                 <td className="py-3 px-5">
//                   {order.customerInfo?.address || '-'}
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>

//         {!orders.length && (
//           <p className="text-center mt-6 text-gray-500">No orders found</p>
//         )}
//       </div>
//     </div>
//   )
// }

// export default Orders

import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import LoadingSpinner from '../../../components/Common/LoadingSpinner'
import useAuth from '../../../hooks/useAuth'

function Orders() {
  const { user } = useAuth()

  const {
    data: orders = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ['librarian-orders'],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/librarian/orders?email=${user.email}`
      )
      return res.data
    },
  })

  const updateStatus = async (id, status) => {
    try {
      await axios.patch(`${import.meta.env.VITE_API_URL}/orders/status/${id}`, {
        status,
      })
      refetch()
    } catch (err) {
      console.error(err)
      alert('Failed to update status')
    }
  }

  if (isLoading) return <LoadingSpinner />

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h2 className="text-3xl font-bold mb-8 text-gray-800">All Orders</h2>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow-lg rounded-lg overflow-hidden">
          <thead className="bg-gray-100 text-gray-600 uppercase text-sm">
            <tr>
              <th className="py-3 px-5 text-left">Book</th>
              <th className="py-3 px-5 text-left">Price</th>
              <th className="py-3 px-5 text-left">Payment</th>
              <th className="py-3 px-5 text-left">Status</th>
              <th className="py-3 px-5 text-left">Action</th>
              <th className="py-3 px-5 text-left">Customer Name</th>
              <th className="py-3 px-5 text-left">Phone</th>
              <th className="py-3 px-5 text-left">Address</th>
            </tr>
          </thead>

          <tbody className="text-gray-700">
            {orders.map((order, idx) => (
              <tr
                key={order._id}
                className={idx % 2 === 0 ? 'bg-white' : 'bg-gray-50'}
              >
                <td className="py-3 px-5 font-medium">{order.name}</td>
                <td className="py-3 px-5">৳{order.price}</td>

                <td className="py-3 px-5">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      order.paymentStatus === 'paid'
                        ? 'bg-green-100 text-green-700'
                        : 'bg-yellow-100 text-yellow-700'
                    }`}
                  >
                    {order.paymentStatus}
                  </span>
                </td>

                <td className="py-3 px-5">
                  <select
                    className="border border-gray-300 rounded px-2 py-1 text-sm"
                    value={order.status}
                    disabled={
                      order.status === 'cancelled' ||
                      order.status === 'delivered'
                    }
                    onChange={(e) => updateStatus(order._id, e.target.value)}
                  >
                    <option value="pending">Pending</option>
                    <option value="shipped">Shipped</option>
                    <option value="delivered">Delivered</option>
                  </select>
                </td>

                <td className="py-3 px-5">
                  {order.status === 'pending' && (
                    <button
                      className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-sm"
                      onClick={() => updateStatus(order._id, 'cancelled')}
                    >
                      Cancel
                    </button>
                  )}
                </td>

                <td className="py-3 px-5">{order.customerInfo?.name || '-'}</td>
                <td className="py-3 px-5">
                  {order.customerInfo?.phone || '-'}
                </td>
                <td className="py-3 px-5">
                  {order.customerInfo?.address || '-'}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {!orders.length && (
          <p className="text-center mt-6 text-gray-500">No orders found</p>
        )}
      </div>
    </div>
  )
}

export default Orders
