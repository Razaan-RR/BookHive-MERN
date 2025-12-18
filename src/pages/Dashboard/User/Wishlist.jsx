import { useState } from 'react'
import { Link } from 'react-router-dom'
import Container from '../../../components/Common/Container'

function Wishlist() {
  const [books] = useState(
    JSON.parse(localStorage.getItem('wishlist')) || []
  )

  return (
    <Container>
      <div className="py-16">
        <h2 className="text-4xl font-extrabold text-center mb-12">
          My <span className="text-(--primary)">Wishlist</span>
        </h2>

        {books.length === 0 && (
          <p className="text-center opacity-70">
            Your wishlist is empty
          </p>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {books.map(book => (
            <div
              key={book._id}
              className="rounded-[1.8rem] overflow-hidden bg-gradient-to-br from-(--primary)/10 to-(--secondary)/10 shadow-xl hover:scale-[1.03] transition"
            >
              <div className="h-72 overflow-hidden">
                <img
                  src={book.image}
                  alt={book.name}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="p-6 flex flex-col gap-4">
                <h3 className="text-xl font-bold">{book.name}</h3>
                <p className="text-sm opacity-80">{book.author}</p>

                <div className="flex items-center justify-between mt-4">
                  <span className="font-bold text-(--secondary)">
                    ৳ {book.price}
                  </span>

                  <Link
                    to={`/book/${book._id}`}
                    className="px-4 py-2 rounded-lg border border-(--primary) text-(--primary) hover:bg-(--primary) hover:text-white"
                  >
                    View
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Container>
  )
}

export default Wishlist
