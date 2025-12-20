import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import LoadingSpinner from '../Common/LoadingSpinner'

const bgImages = [
  'https://images.unsplash.com/photo-1507842217343-583bb7270b66?auto=format&fit=crop&w=800&q=60',
  'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=800&q=60',
  'https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=800&q=60',
  'https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?auto=format&fit=crop&w=800&q=60',
  'https://images.unsplash.com/photo-1495446815901-a7297e633e8d?auto=format&fit=crop&w=800&q=60',
  'https://images.unsplash.com/photo-1509021436665-8f07dbf5bf1d?auto=format&fit=crop&w=800&q=60',
]

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

  if (loading) 
    return <LoadingSpinner></LoadingSpinner>

  return (
    <section className="overflow-hidden py-16 px-4 sm:px-6 md:px-10 lg:px-20">
      <div className="max-w-7xl mx-auto text-center">
        <span className="inline-block mb-16 mt-10 px-6 py-2 rounded-full text-2xl sm:text-3xl font-bold bg-(--secondary)/25 text-(--text) shadow-sm">
          Latest Arrivals 📚
        </span>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {books.map((book, index) => (
            <div
              key={book._id}
              className="relative group rounded-3xl overflow-hidden bg-(--card-bg) border border-(--border) shadow-xl transition-all duration-500 sm:hover:-translate-y-3"
            >
              <div className="absolute inset-0">
                <div className="absolute -top-24 -left-24 w-56 h-56 bg-(--primary) opacity-20 blur-3xl rounded-full" />
                <div className="absolute -bottom-24 -right-24 w-56 h-56 bg-(--secondary) opacity-2 blur-5xl rounded-full" />
              </div>

              <div className="absolute top-0 right-0 w-24 h-24 bg-linear-to-br from-(--primary) to-(--secondary) clip-path-diagonal opacity-90" />

              <div className="relative h-56 sm:h-64 lg:h-72 p-4">
                <div className="h-full rounded-2xl overflow-hidden shadow-inner">
                  <img
                    src={book.image}
                    alt={book.name}
                    className="w-full h-full object-cover transition-transform duration-700 sm:group-hover:scale-110"
                  />
                </div>
              </div>

              <div className="relative p-6 pt-2 overflow-hidden">
                <div
                  className="absolute inset-0 bg-cover bg-center opacity-15"
                  style={{
                    backgroundImage: `url(${bgImages[index % bgImages.length]})`,
                  }}
                />

                <div className="relative">
                  <span className="inline-block mb-3 px-3 py-1 rounded-full text-xs font-semibold bg-(--secondary) text-black">
                    ৳ {book.price}
                  </span>

                  <h3 className="text-lg font-semibold mb-1 line-clamp-1">
                    {book.name}
                  </h3>

                  <p className="text-sm opacity-70 mb-5">{book.author}</p>

                  <Link
                    to={`/book/${book._id}`}
                    className="block text-center py-2.5 rounded-xl text-sm font-semibold text-white bg-linear-to-r from-(--primary) to-(--secondary) hover:brightness-110 transition"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default LatestBooks
