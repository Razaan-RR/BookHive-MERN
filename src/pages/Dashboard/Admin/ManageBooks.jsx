import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { FaTrash } from 'react-icons/fa'
import { toast } from 'react-hot-toast'
import useAuth from '../../../hooks/useAuth'

function ManageBooks() {
  const { user } = useAuth()
  const [books, setBooks] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const { data } = await axios.get(
          `${import.meta.env.VITE_API_URL}/books`
        )
        setBooks(data)
      } catch (err) {
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    fetchBooks()
  }, [])

  const toggleStatus = async (id, currentStatus) => {
    const newStatus =
      currentStatus === 'published' ? 'unpublished' : 'published'

    try {
      await axios.patch(`${import.meta.env.VITE_API_URL}/books/status/${id}`, {
        status: newStatus,
      })

      setBooks((prev) =>
        prev.map((book) =>
          book._id === id ? { ...book, status: newStatus } : book
        )
      )

      toast.success(`Book ${newStatus}`)
    } catch (err) {
      console.error(err)
      toast.error('Failed to update status')
    }
  }

  const deleteBook = (id) => {
    toast(
      (t) => (
        <div className="flex flex-col gap-3">
          <p className="font-semibold">
            This will delete the book and ALL its orders.
          </p>

          <div className="flex gap-3 justify-end">
            <button
              onClick={() => toast.dismiss(t.id)}
              className="px-3 py-1 rounded bg-gray-200 text-gray-800"
            >
              Cancel
            </button>

            <button
              onClick={async () => {
                toast.dismiss(t.id)
                try {
                  await axios.delete(
                    `${import.meta.env.VITE_API_URL}/books/${id}`,
                    {
                      data: { adminEmail: user.email },
                    }
                  )

                  setBooks((prev) =>
                    prev.filter((book) => book._id !== id)
                  )
                  toast.success('Book and related orders deleted')
                } catch (err) {
                  console.error(err)
                  toast.error('Failed to delete book')
                }
              }}
              className="px-3 py-1 rounded bg-red-600 text-white"
            >
              Delete
            </button>
          </div>
        </div>
      ),
      {
        duration: 6000,
      }
    )
  }

  if (loading) {
    return <div className="p-10 text-center">Loading books...</div>
  }

  return (
    <div className="min-h-screen px-6 py-10">
      <h1 className="text-3xl font-bold mb-6">Manage Books</h1>

      <div className="overflow-x-auto card">
        <table className="w-full">
          <thead>
            <tr className="text-left uppercase text-sm opacity-70">
              <th className="p-3">Book</th>
              <th className="p-3">Title</th>
              <th className="p-3">Status</th>
              <th className="p-3 text-right">Action</th>
            </tr>
          </thead>

          <tbody>
            {books.map((book) => (
              <tr key={book._id} className="border-t">
                <td className="p-3">
                  <img
                    src={book.image}
                    alt={book.name}
                    className="h-14 w-10 object-cover rounded"
                  />
                </td>

                <td className="p-3 font-medium">{book.name}</td>

                <td className="p-3">
                  <button
                    onClick={() => toggleStatus(book._id, book.status)}
                    className={`px-3 py-1 text-xs rounded-full font-semibold ${
                      book.status === 'published'
                        ? 'bg-yellow-500 text-white'
                        : 'bg-green-600 text-white'
                    }`}
                  >
                    {book.status === 'published'
                      ? 'Published'
                      : 'Unpublished'}
                  </button>
                </td>

                <td className="p-3 text-right">
                  <button
                    onClick={() => deleteBook(book._id)}
                    className="flex items-center gap-2 text-red-600 hover:text-red-800"
                  >
                    <FaTrash />
                    Delete
                  </button>
                </td>
              </tr>
            ))}

            {books.length === 0 && (
              <tr>
                <td colSpan="4" className="p-6 text-center opacity-70">
                  No books found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default ManageBooks
