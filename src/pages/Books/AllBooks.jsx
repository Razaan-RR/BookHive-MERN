import Card from '../../components/Home/Card'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import LoadingSpinner from '../../components/Common/LoadingSpinner'
import Container from '../../components/Common/Container'

function AllBooks() {
  const { data: books = [], isLoading } = useQuery({
    queryKey: ['books'],
    queryFn: async () => {
      const result = await axios(`${import.meta.env.VITE_API_URL}/books`)
      return result.data
    },
  })

  if (isLoading) return <LoadingSpinner />

  return (
    <Container>
      {books && books.length > 0 ? (
        <div className="pt-12 mb-24 px-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {books.map((book) => (
            <Card key={book._id} book={book} />
          ))}
        </div>
      ) : null}
    </Container>
  )
}

export default AllBooks
