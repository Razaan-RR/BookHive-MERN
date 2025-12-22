import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { toast } from 'react-hot-toast'

function EditBook() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [book, setBook] = useState(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const { data } = await axios.get(
          `${import.meta.env.VITE_API_URL}/book/${id}`
        )
        setBook(data)
      } catch (err) {
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    fetchBook()
  }, [id])

  const handleChange = (e) => {
    setBook({ ...book, [e.target.name]: e.target.value })
  }

  const handleSave = async () => {
    setSaving(true)
    try {
      await axios.patch(
        `${import.meta.env.VITE_API_URL}/books/update/${id}`,
        {
          name: book.name,
          price: book.price,
          description: book.description,
          image: book.image,
        }
      )

      toast.success('Book updated successfully')
      navigate('/dashboard/my-books')
    } catch (err) {
      console.error(err)
      toast.error('Failed to update book')
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return <div className="p-10 text-center">Loading book...</div>
  }

  return (
    <div className="max-w-3xl mx-auto p-6 animate-fadeInUp">
      <h1 className="text-3xl font-bold mb-6">Edit Book</h1>

      <div className="space-y-4">
        <input
          name="name"
          value={book.name}
          onChange={handleChange}
          className="w-full p-3 border rounded-lg"
          placeholder="Book Name"
        />

        <input
          name="image"
          value={book.image}
          onChange={handleChange}
          className="w-full p-3 border rounded-lg"
          placeholder="Image URL"
        />

        <input
          type="number"
          name="price"
          value={book.price}
          onChange={handleChange}
          className="w-full p-3 border rounded-lg"
          placeholder="Price"
        />

        <textarea
          name="description"
          value={book.description}
          onChange={handleChange}
          rows="4"
          className="w-full p-3 border rounded-lg"
          placeholder="Description"
        />

        <div className="flex justify-end pt-4">
          <button
            onClick={handleSave}
            disabled={saving}
            className="px-6 py-2 rounded-lg bg-blue-600 text-white font-semibold"
          >
            {saving ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
      </div>
    </div>
  )
}

export default EditBook
