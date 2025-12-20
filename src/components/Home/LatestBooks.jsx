import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

const LatestBooks = () => {
  const [books, setBooks] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchLatestBooks = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_URL}/books/latest?limit=6`
        )
        setBooks(res.data)
      } catch (error) {
        console.error('Failed to load latest books', error)
      } finally {
        setLoading(false)
      }
    }

    fetchLatestBooks()
  }, [])

  if (loading) {
    return <p className="text-center py-16">Loading latest books...</p>
  }

  return (
    <section className="py-16 px-4 sm:px-6 md:px-10 lg:px-20">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-2xl sm:text-3xl font-bold mb-10 text-center">
          Latest Arrivals 📚
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {books.map((book) => (
            <div
              key={book._id}
              className="relative group rounded-3xl overflow-hidden bg-(--card-bg) border border-(--border) shadow-xl transition-all duration-500 sm:hover:-translate-y-3"
            >
              <div className="absolute inset-0">
                <div className="absolute -top-24 -left-24 w-56 h-56 bg-(--primary) opacity-20 blur-3xl rounded-full" />
                <div className="absolute -bottom-24 -right-24 w-56 h-56 bg-(--secondary) opacity-20 blur-3xl rounded-full" />
              </div>

              <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-(--primary) to-(--secondary) clip-path-diagonal opacity-90" />

              <div className="relative h-56 sm:h-64 lg:h-72 p-4">
                <div className="h-full rounded-2xl overflow-hidden shadow-inner">
                  <img
                    src={book.image}
                    alt={book.name}
                    className="w-full h-full object-cover transition-transform duration-700 sm:group-hover:scale-110"
                  />
                </div>
              </div>

              <div className="relative p-6 pt-2">
                <span className="inline-block mb-3 px-3 py-1 rounded-full text-xs font-semibold bg-(--secondary) text-black">
                  ৳ {book.price}
                </span>

                <h3 className="text-lg font-semibold mb-1 line-clamp-1">
                  {book.name}
                </h3>

                <p className="text-sm opacity-70 mb-5">{book.author}</p>

                <Link
                  to={`/book/${book._id}`}
                  className="block text-center py-2.5 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-(--primary) to-(--secondary) hover:brightness-110 transition"
                >
                  View Details
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default LatestBooks
