import { useParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import Container from '../../components/Common/Container'
import LoadingSpinner from '../../components/Common/LoadingSpinner'
import { useState } from 'react'
import BookPurchaseModal from '../../components/Modal/BookPurchaseModal'

function BookDetails() {
  const { id } = useParams()
  const [isOpen, setIsOpen] = useState(false)

  const { data: book = {}, isLoading } = useQuery({
    queryKey: ['book', id],
    queryFn: async () => {
      const res = await axios(`${import.meta.env.VITE_API_URL}/book/${id}`)
      return res.data
    },
  })

  if (isLoading) return <LoadingSpinner />

  const { image, name, author, price, status, description } = book

  return (
    <Container>
      <div className="mx-auto max-w-6xl px-4 py-12 grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div className="w-full overflow-hidden rounded-2xl border-2 border-(--secondary)">
          <img
            src={image}
            alt={name}
            className="w-full h-full object-cover hover:scale-105 transition"
          />
        </div>

        <div className="flex flex-col gap-6">
          <div>
            <h1 className="text-3xl font-extrabold">{name}</h1>
            <p className="text-sm opacity-80 mt-1">By {author}</p>
          </div>

          <span className="w-fit px-4 py-1 rounded-full text-sm bg-(--primary)/10 text-(--primary) font-semibold">
            {status}
          </span>

          <p className="text-base opacity-90 leading-relaxed">{description}</p>

          <div className="flex items-center justify-between mt-4">
            <span className="text-3xl font-bold">BDT {price}</span>
            <button
              onClick={() => setIsOpen(true)}
              className="px-6 py-3 rounded-xl bg-(--primary) text-white font-semibold hover:opacity-90 transition"
            >
              Order Now
            </button>
          </div>
        </div>
      </div>

      <BookPurchaseModal
        isOpen={isOpen}
        closeModal={() => setIsOpen(false)}
        book={book}
      />
    </Container>
  )
}

export default BookDetails
