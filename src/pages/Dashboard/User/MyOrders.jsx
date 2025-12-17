import Container from '../../../components/Common/Container'

function MyOrders() {
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
              <tr className="hover:bg-(--hover)">
                <td className="px-4 py-4 border-b font-semibold">
                  Atomic Habits
                </td>
                <td className="px-4 py-4 border-b">12 Sep 2025</td>
                <td className="px-4 py-4 border-b">
                  <span className="px-3 py-1 rounded-full text-sm bg-(--secondary)/20 text-(--text)">
                    Pending
                  </span>
                </td>
                <td className="px-4 py-4 border-b">
                  <span className="px-3 py-1 rounded-full text-sm bg-red-100 text-red-600">
                    Unpaid
                  </span>
                </td>
                <td className="px-4 py-4 border-b flex gap-2 justify-center">
                  <button className="bg-(--primary) text-white rounded-lg px-4 py-1">
                    Pay Now
                  </button>
                  <button className="bg-red-500 text-white rounded-lg px-4 py-1">
                    Cancel
                  </button>
                </td>
              </tr>

              <tr className="hover:bg-(--hover)">
                <td className="px-4 py-4 border-b font-semibold">
                  The Psychology of Money
                </td>
                <td className="px-4 py-4 border-b">05 Sep 2025</td>
                <td className="px-4 py-4 border-b">
                  <span className="px-3 py-1 rounded-full text-sm bg-green-100 text-green-600">
                    Completed
                  </span>
                </td>
                <td className="px-4 py-4 border-b">
                  <span className="px-3 py-1 rounded-full text-sm bg-green-100 text-green-600">
                    Paid
                  </span>
                </td>
                <td className="px-4 py-4 border-b text-center">
                  <span className="text-sm opacity-70">—</span>
                </td>
              </tr>

              <tr className="hover:bg-(--hover)">
                <td className="px-4 py-4 border-b font-semibold">
                  Deep Work
                </td>
                <td className="px-4 py-4 border-b">01 Sep 2025</td>
                <td className="px-4 py-4 border-b">
                  <span className="px-3 py-1 rounded-full text-sm bg-gray-200 text-gray-600">
                    Cancelled
                  </span>
                </td>
                <td className="px-4 py-4 border-b">
                  <span className="px-3 py-1 rounded-full text-sm bg-gray-200 text-gray-600">
                    Unpaid
                  </span>
                </td>
                <td className="px-4 py-4 border-b text-center">
                  <span className="text-sm opacity-70">—</span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </Container>
  )
}

export default MyOrders
