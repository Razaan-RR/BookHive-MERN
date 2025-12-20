import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import LoadingSpinner from '../../components/Common/LoadingSpinner'

function Banner() {
  const [books, setBooks] = useState([])
  const [current, setCurrent] = useState(0)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/books`)
        setBooks(res.data.slice(0, 3))
      } catch (err) {
        console.error('Failed to fetch books:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchBooks()
  }, [])

  useEffect(() => {
    if (books.length === 0) return
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % books.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [books])

  if (loading) return <LoadingSpinner />

  if (books.length === 0)
    return (
      <div className="flex items-center justify-center h-[60vh]">
        <p className="text-lg text-gray-500">No books available for banner.</p>
      </div>
    )

  return (
    <section className="overflow-hidden relative w-full h-[80vh] lg:h-[90vh] flex items-center justify-center rounded-3xl">
      <div className="absolute inset-0 bg-linear-to-r from-blue-600 to-yellow-400 opacity-80 z-0"></div>

      {books.map((book, index) => (
        <div
          key={book._id}
          className={`absolute inset-0 flex flex-col lg:flex-row items-center justify-center gap-12 px-6 lg:px-20 transition-opacity duration-1000 ${
            index === current ? 'opacity-100 z-10' : 'opacity-0 z-0'
          }`}
        >
          <div className="lg:w-1/2 text-center lg:text-left space-y-6">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-tight">
              {book.name}
            </h1>
            <p className="text-lg sm:text-xl text-white/90">
              {book.description.slice(0, 150)}...
            </p>
            <div className="flex justify-center lg:justify-start gap-4 mt-4">
              <Link
                to="/books"
                className="btn btn-primary btn-lg rounded-full text-black p-5! hover:scale-105 transition-transform"
              >
                Explore All Books
              </Link>
              <Link
                to={`/book/${book._id}`}
                className="btn btn-outline btn-lg rounded-full text-white p-5! border-white hover:bg-white hover:text-blue-600 transition-all"
              >
                View Details
              </Link>
            </div>
          </div>

          <div className="lg:w-1/4 w-3/4 max-w-xs lg:max-w-xs mx-auto my-4">
            <img
              src={book.image}
              alt={book.name}
              className="w-full h-full object-cover rounded-2xl shadow-2xl animate-float"
            />
          </div>
        </div>
      ))}

      <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-yellow-300 opacity-30 rounded-full filter blur-3xl animate-pulse-slow"></div>
      <div className="absolute -top-16 -left-16 w-48 h-48 bg-blue-500 opacity-20 rounded-full filter blur-2xl animate-pulse-slow"></div>
    </section>
  )
}

export default Banner
