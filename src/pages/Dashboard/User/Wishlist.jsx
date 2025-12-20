import { useEffect, useState } from 'react'
import Container from '../../../components/Common/Container'
import axios from 'axios'
import useAuth from '../../../hooks/useAuth'
import Card from '../../../components/Home/Card'
import { FaHeartCrack, FaHeart } from 'react-icons/fa6'

function Wishlist() {
  const { user } = useAuth()
  const [books, setBooks] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchWishlist = async () => {
      if (!user?.email) return
      try {
        const { data } = await axios.get(
          `${import.meta.env.VITE_API_URL}/wishlist/${user.email}`
        )
        setBooks(data)
      } finally {
        setLoading(false)
      }
    }
    fetchWishlist()
  }, [user])

  return (
    <section
      className="relative min-h-screen py-16 overflow-hidden"
      style={{ backgroundColor: 'var(--bg)' }}
    >
      <div className="absolute -top-40 -left-40 w-96 h-96 bg-(--secondary)/20 blur-[160px] rounded-full pointer-events-none" />
      <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-(--primary)/20 blur-[160px] rounded-full pointer-events-none" />

      <Container>
        <div className="relative animate-fadeInUp">
          <div className="mb-14 text-center px-4">
            <span className="inline-flex items-center gap-2 mb-5 px-6 py-2 rounded-full text-lg sm:text-xl font-bold bg-(--secondary)/20">
              My Wishlist <FaHeart className="text-red-500" />
            </span>

            <h1 className="text-3xl sm:text-4xl font-extrabold">
              Books You Love
            </h1>

            <p className="opacity-70 mt-3 max-w-xl mx-auto">
              Save books you adore and come back anytime to read or buy them.
            </p>
          </div>

          {!loading && books.length === 0 && (
            <div className="relative mx-auto max-w-lg rounded-3xl bg-white/60 dark:bg-white/5 backdrop-blur-xl border border-white/30 dark:border-white/10 shadow-xl py-20 px-6 text-center">
              <FaHeartCrack className="mx-auto text-6xl text-(--secondary) mb-6 animate-float" />
              <h3 className="text-xl font-semibold mb-2">
                Your wishlist is empty
              </h3>
              <p className="opacity-70">
                Start adding your favorite books and build your personal
                collection.
              </p>
            </div>
          )}

          {books.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
              {books.map((book) => (
                <div
                  key={book._id}
                  className="
                    group relative
                    bg-white/60 dark:bg-white/5
                    backdrop-blur-xl
                    border border-white/30 dark:border-white/10
                    rounded-3xl
                    shadow-xl
                    transition-all duration-300
                    hover:-translate-y-1 hover:shadow-2xl
                  "
                >
                  <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition" />

                  <div className="relative z-10 p-4">
                    <Card book={book} />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </Container>
    </section>
  )
}

export default Wishlist
