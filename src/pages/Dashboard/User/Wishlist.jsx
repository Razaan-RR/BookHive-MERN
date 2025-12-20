import { useEffect, useState } from 'react'
import Container from '../../../components/Common/Container'
import axios from 'axios'
import useAuth from '../../../hooks/useAuth'
import Card from '../../../components/Home/Card'
import { FaHeartCrack } from 'react-icons/fa6'

function Wishlist() {
  const { user } = useAuth()
  const [books, setBooks] = useState([])

  useEffect(() => {
    const fetchWishlist = async () => {
      if (!user?.email) return
      const { data } = await axios.get(
        `${import.meta.env.VITE_API_URL}/wishlist/${user.email}`
      )
      setBooks(data)
    }
    fetchWishlist()
  }, [user])

  return (
    <Container>
      <div className="py-16">
        <h2 className="text-4xl font-extrabold text-center mb-12 animate-fadeInUp">
          My <span className="text-[var(--primary)]">Wishlist</span>
        </h2>

        {books.length === 0 && (
          <div className="text-center animate-fadeInUp">
            <FaHeartCrack className="mx-auto text-6xl text-[var(--secondary)] mb-4 animate-float" />
            <p className="opacity-70 text-lg">
              Your wishlist is empty. Start adding your favorite books!
            </p>
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 animate-fadeInUp">
          {books.map(book => (
            <Card key={book._id} book={book} />
          ))}
        </div>
      </div>
    </Container>
  )
}

export default Wishlist
