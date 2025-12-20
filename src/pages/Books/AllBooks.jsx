import { useState, useMemo } from 'react'
import Card from '../../components/Home/Card'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import LoadingSpinner from '../../components/Common/LoadingSpinner'
import Container from '../../components/Common/Container'

function AllBooks() {
  const [search, setSearch] = useState('')
  const [sortOrder, setSortOrder] = useState('asc')

  const { data: books = [], isLoading } = useQuery({
    queryKey: ['books'],
    queryFn: async () => {
      const result = await axios(`${import.meta.env.VITE_API_URL}/books`)
      return result.data
    },
  })

  const filteredBooks = useMemo(() => {
    let result = books
    if (search.trim()) {
      const lowerSearch = search.toLowerCase()
      result = result.filter((book) =>
        book.name.toLowerCase().includes(lowerSearch)
      )
    }
    result = result.sort((a, b) =>
      sortOrder === 'asc' ? a.price - b.price : b.price - a.price
    )
    return result
  }, [books, search, sortOrder])

  if (isLoading) return <LoadingSpinner />

  const borderColor = 'var(--secondary)'
  const placeholderColor = 'var(--secondary)'

  return (
    <Container>
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 py-8">
        <input
          type="text"
          placeholder="Search by book name..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{
            borderColor,
            color: 'var(--text)',
            '::placeholder': { color: placeholderColor },
          }}
          className="w-full sm:w-80 px-4 py-2 rounded-lg border-2 focus:outline-none focus:ring-2 focus:ring-(--primary) transition-all placeholder-(--secondary)"
        />

        <select
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
          style={{ borderColor }}
          className="w-10 sm:w-60 px-4 py-2 rounded-lg border-2 focus:outline-none focus:ring-2 focus:ring-(--primary) transition-all text-text"
        >
          <option value="asc">Price: Low → High</option>
          <option value="desc">Price: High → Low</option>
        </select>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {filteredBooks.length > 0 ? (
          filteredBooks.map((book) => <Card key={book._id} book={book} />)
        ) : (
          <p className="col-span-full text-center text-text-secondary">
            No books found.
          </p>
        )}
      </div>
    </Container>
  )
}

export default AllBooks
