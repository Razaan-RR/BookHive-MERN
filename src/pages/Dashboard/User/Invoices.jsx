import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import useAuth from '../../../hooks/useAuth'
import Container from '../../../components/Common/Container'
import LoadingSpinner from '../../../components/Common/LoadingSpinner'
import {
  FaFileInvoiceDollar,
  FaBook,
  FaCalendarAlt,
  FaMoneyBillWave,
} from 'react-icons/fa'

function Invoices() {
  const { user } = useAuth()

  const { data: invoices = [], isLoading } = useQuery({
    enabled: !!user?.email,
    queryKey: ['invoices', user?.email],
    queryFn: async () => {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/invoices/${user.email}`
      )
      return res.data
    },
  })

  if (isLoading) return <LoadingSpinner />

  return (
    <section
      className="relative py-16 overflow-hidden"
      style={{ backgroundColor: 'var(--bg)' }}
    >
      <div className="absolute -top-40 -left-40 w-96 h-96 bg-(--primary)/30 blur-[140px] rounded-full animate-pulse-slow" />
      <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-(--secondary)/30 blur-[140px] rounded-full animate-pulse-slow" />

      <Container>
        <div className="relative animate-fadeInUp">
          <div className="mb-14 text-center px-4">
            <span className="inline-flex items-center gap-2 mb-5 px-6 py-2 rounded-full text-lg sm:text-xl font-bold bg-(--secondary)/25">
              Invoices <span>🧾</span>
            </span>

            <h1 className="text-3xl sm:text-4xl font-extrabold leading-tight">
              Your Payment History
            </h1>

            <p className="opacity-70 mt-3 max-w-xl mx-auto">
              View all completed payments and keep track of your book purchases.
            </p>
          </div>

          <div className="grid gap-6">
            {invoices.length === 0 && (
              <div className="card text-center py-16">
                <p className="opacity-70 text-lg">No invoices found</p>
              </div>
            )}

            {invoices.map((invoice) => (
              <div
                key={invoice._id}
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
                        {invoice.name}
                      </h3>

                      <div className="flex items-center gap-2 mt-2 text-sm opacity-70">
                        <FaCalendarAlt />
                        {new Date(invoice.orderDate).toLocaleDateString()}
                      </div>

                      <p className="mt-2 text-sm opacity-60 break-all">
                        Payment ID: {invoice.transactionId}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-2 px-5 py-2 rounded-xl bg-green-100 text-green-700 font-semibold">
                      <FaMoneyBillWave />৳{invoice.price}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  )
}

export default Invoices
