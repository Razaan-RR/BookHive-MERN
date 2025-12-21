import { useParams } from 'react-router-dom'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import axios from 'axios'
import Container from '../../components/Common/Container'
import LoadingSpinner from '../../components/Common/LoadingSpinner'
import { useState, useEffect } from 'react'
import BookPurchaseModal from '../../components/Modal/BookPurchaseModal'
import { FaHeart, FaBook, FaCartShopping, FaStar } from 'react-icons/fa6'
import useAuth from '../../hooks/useAuth'

function BookDetails() {
  const { id } = useParams()
  const { user } = useAuth()
  const queryClient = useQueryClient()

  const [wishlisted, setWishlisted] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const [rating, setRating] = useState(0)
  const [review, setReview] = useState('')
  const [submittedReviews, setSubmittedReviews] = useState([])

  const { data: book = {}, isLoading: bookLoading } = useQuery({
    queryKey: ['book', id],
    queryFn: async () => {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/book/${id}`)
      return res.data
    },
  })

  const { isLoading: reviewsLoading } = useQuery({
    queryKey: ['reviews', id],
    queryFn: async () => {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/reviews/${id}`)
      setSubmittedReviews(res.data)
      return res.data
    },
  })

  useEffect(() => {
    const fetchWishlist = async () => {
      if (!user?.email) return
      const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/wishlist/${user.email}`)
      setWishlisted(data.some(b => b._id === id))
    }
    fetchWishlist()
  }, [user, id])

  if (bookLoading || reviewsLoading) return <LoadingSpinner />

  const handleWishlist = async () => {
    if (!user?.email) return alert('Please login first')

    if (wishlisted) {
      await axios.post(`${import.meta.env.VITE_API_URL}/wishlist/remove`, {
        email: user.email,
        bookId: id,
      })
      setWishlisted(false)
    } else {
      await axios.post(`${import.meta.env.VITE_API_URL}/wishlist/add`, {
        email: user.email,
        bookId: id,
      })
      setWishlisted(true)
    }
  }

  const handleSubmitReview = async () => {
    if (!rating || !review.trim()) return
    if (!user) return alert('Please login to submit review')

    const newReview = {
      rating,
      review,
      user: {
        name: user.name,
        dp: user.dp || '/default-dp.jpg',
        email: user.email,
      },
      id: Date.now(),
    }

    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/reviews/add`, {
        bookId: id,
        review: newReview,
      })
      setSubmittedReviews(prev => [...prev, newReview])
      setRating(0)
      setReview('')
      queryClient.invalidateQueries(['reviews', id])
    } catch (error) {
      console.error('Failed to submit review:', error)
    }
  }

  const { image, name, author, price, description } = book

  return (
    <Container>
      <div className="mx-auto max-w-5xl px-4 py-10 sm:py-14 grid grid-cols-1 lg:grid-cols-2 gap-10 sm:gap-12">
        <div className="relative rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all bg-[var(--card-bg)] border-2 border-[var(--secondary)]/30 hover:border-[var(--secondary)]/60">
          <div className="absolute inset-0 bg-gradient-to-br from-[var(--primary)]/20 via-transparent to-[var(--secondary)]/20 opacity-50 blur-3xl pointer-events-none"></div>
          <img
            src={image}
            alt={name}
            className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
          />
          <div className="absolute bottom-3 left-3 flex items-center gap-2 bg-[var(--secondary)]/20 backdrop-blur-md px-2 py-1 rounded-full shadow-glow">
            <FaBook className="text-[var(--primary)]" />
            <span className="text-xs sm:text-sm font-semibold truncate">{author}</span>
          </div>
        </div>

        <div className="flex flex-col justify-center gap-5 sm:gap-6">
          <div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-[var(--primary)] drop-shadow-glow truncate">
              {name}
            </h1>
            <p className="mt-1 text-xs sm:text-sm opacity-80 flex items-center gap-1">
              <FaBook className="text-[var(--secondary)]" /> by {author}
            </p>
          </div>

          <p className="text-sm sm:text-base leading-relaxed opacity-90 bg-[var(--card-bg)] p-4 sm:p-5 rounded-2xl shadow-inner-glow border-2 border-[var(--secondary)]/30">
            {description}
          </p>

          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-0 pt-5">
            <span className="text-2xl sm:text-3xl font-extrabold text-[var(--secondary)] flex items-center gap-2 drop-shadow-glow">
              <FaCartShopping className="text-[var(--primary)]" /> ৳ {price}
            </span>

            <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
              <button
                onClick={handleWishlist}
                className={`flex items-center justify-center gap-2 px-5 sm:px-6 py-2 sm:py-3 rounded-xl font-semibold transition-all w-full sm:w-auto ${
                  wishlisted
                    ? 'bg-[var(--secondary)]/30 border-2 border-[var(--secondary)] text-[var(--secondary)] shadow-glow'
                    : 'bg-[var(--primary)]/20 border-2 border-[var(--primary)] text-[var(--primary)] hover:bg-[var(--primary)] hover:text-white shadow-glow hover:shadow-lg'
                }`}
              >
                <FaHeart />
                {wishlisted ? 'Wishlisted' : 'Add to Wishlist'}
              </button>

              <button
                onClick={() => setIsOpen(true)}
                className="flex items-center justify-center gap-2 px-5 sm:px-6 py-2 sm:py-3 rounded-xl bg-gradient-to-r from-[var(--primary)] to-[var(--secondary)] text-white font-semibold shadow-glow hover:scale-105 transition-transform w-full sm:w-auto"
              >
                <FaCartShopping /> Order Now
              </button>
            </div>
          </div>

          <div className="mt-8 bg-[var(--card-bg)] p-4 sm:p-6 rounded-2xl border-2 border-[var(--secondary)]/30 shadow-inner-glow">
            <h2 className="text-lg sm:text-xl font-bold text-[var(--primary)] drop-shadow-glow">
              Reviews & Ratings
            </h2>
            <p className='text-xs mb-3'>*Reviews can be given only by customers that have ordered this book*</p>

            <div className="flex items-center gap-1 mb-3">
              {[1, 2, 3, 4, 5].map(star => (
                <FaStar
                  key={star}
                  className={`cursor-pointer transition-all ${
                    rating >= star ? 'text-yellow-400 scale-110' : 'text-[var(--secondary)]/50'
                  }`}
                  onClick={() => setRating(star)}
                />
              ))}
            </div>

            <textarea
              value={review}
              onChange={e => setReview(e.target.value)}
              placeholder="Write your review..."
              className="w-full p-3 rounded-xl border-2 border-[var(--secondary)]/30 bg-[var(--card-bg)] resize-none text-sm sm:text-base shadow-inner-glow focus:outline-none focus:ring-2 focus:ring-[var(--primary)] transition"
              rows={3}
            />
            <button
              onClick={handleSubmitReview}
              className="mt-3 px-4 py-2 rounded-xl bg-gradient-to-r from-[var(--primary)] to-[var(--secondary)] text-white font-semibold shadow-glow hover:scale-105 transition-transform"
            >
              Submit Review
            </button>

            <div className="mt-4 flex flex-col gap-3 max-h-64 overflow-y-auto">
              {submittedReviews.length === 0 && (
                <p className="text-sm opacity-70">No reviews yet.</p>
              )}
              {submittedReviews.map(r => (
                <div
                  key={r.id}
                  className="bg-[var(--secondary)]/10 p-3 rounded-xl border shadow-glow flex flex-col gap-2"
                >
                  <div className="flex items-center gap-2">
                    <img
                      src={r.user?.dp || '/default-dp.jpg'}
                      alt={r.user?.name || 'User'}
                      className="w-8 h-8 rounded-full object-cover"
                    />
                    <span className="font-semibold text-[var(--primary)]">
                      {r.user?.name || 'Anonymous'}
                    </span>
                  </div>
                  <div className="flex items-center gap-1">
                    {[1, 2, 3, 4, 5].map(star => (
                      <FaStar
                        key={star}
                        className={`text-yellow-400 ${r.rating >= star ? 'scale-110' : 'opacity-50'}`}
                      />
                    ))}
                  </div>
                  <p className="text-sm sm:text-base">{r.review}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <BookPurchaseModal
        isOpen={isOpen}
        closeModal={() => setIsOpen(false)}
        book={book}
        user={user} 
      />
    </Container>
  )
}

export default BookDetails
