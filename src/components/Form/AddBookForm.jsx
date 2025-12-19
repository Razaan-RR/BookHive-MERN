import React from 'react'
import { FaBookOpen, FaUpload } from 'react-icons/fa'
import { useForm } from 'react-hook-form'
import { imageUpload } from '../../utils/imageUpload'
import axios from 'axios'
import { useMutation } from '@tanstack/react-query'
import toast from 'react-hot-toast'
import { getAuth } from 'firebase/auth'

function AddBookForm() {
  const auth = getAuth()
  const user = auth.currentUser

  const { mutateAsync } = useMutation({
    mutationFn: async (payload) =>
      await axios.post(`${import.meta.env.VITE_API_URL}/books`, payload),
    onSuccess: () => {
      toast.success('Book added successfully')
    },
    onError: (error) => {
      console.log(error)
      toast.error('Failed to add book')
    },
  })

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm()

  const onSubmit = async (data) => {
    if (!user?.email) {
      toast.error('User email not found. Please log in again.')
      return
    }

    const { name, author, price, status, description, image } = data
    const imageFile = image[0]

    try {
      const imageUrl = await imageUpload(imageFile)

      const bookData = {
        name,
        author,
        price: Number(price),
        status,
        description,
        image: imageUrl,
        email: user.email,
      }

      await mutateAsync(bookData)
      reset()
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-(--bg) px-4">
      <div className="w-full max-w-3xl card animate-fadeInUp">
        <div className="text-center mb-8">
          <div className="mx-auto mb-4 h-14 w-14 flex items-center justify-center rounded-full bg-(--primary) text-white">
            <FaBookOpen size={24} />
          </div>
          <h1 className="text-2xl font-bold">Add New Book</h1>
          <p className="text-sm opacity-80 mt-1">
            Fill in the details to publish a new book
          </p>
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          <div>
            <label className="text-sm mb-1 block">Book Name</label>
            <input
              type="text"
              placeholder="Enter book name"
              {...register('name', { required: 'Book name is required' })}
            />
            {errors.name && (
              <p className="text-xs text-red-500 mt-1">{errors.name.message}</p>
            )}
          </div>

          <div>
            <label className="text-sm mb-1 block">Author Name</label>
            <input
              type="text"
              placeholder="Enter author name"
              {...register('author', { required: 'Author name is required' })}
            />
            {errors.author && (
              <p className="text-xs text-red-500 mt-1">
                {errors.author.message}
              </p>
            )}
          </div>

          <div>
            <label className="text-sm mb-1 block">Price</label>
            <input
              type="number"
              placeholder="Book price"
              {...register('price', {
                required: 'Price is required',
                min: { value: 0, message: 'Price must be positive' },
              })}
            />
            {errors.price && (
              <p className="text-xs text-red-500 mt-1">
                {errors.price.message}
              </p>
            )}
          </div>

          <div>
            <label className="text-sm mb-1 block">Status</label>
            <select {...register('status', { required: 'Status is required' })}>
              <option value="published">Published</option>
              <option value="unpublished">Unpublished</option>
            </select>
            {errors.status && (
              <p className="text-xs text-red-500 mt-1">
                {errors.status.message}
              </p>
            )}
          </div>

          <div className="md:col-span-2">
            <label className="text-sm mb-1 block">Book Description</label>
            <textarea
              rows="4"
              placeholder="Write a short description about the book"
              {...register('description', {
                required: 'Description is required',
              })}
            ></textarea>
            {errors.description && (
              <p className="text-xs text-red-500 mt-1">
                {errors.description.message}
              </p>
            )}
          </div>

          <div className="md:col-span-2">
            <label className="text-sm mb-2 block">Book Image</label>
            <label className="flex flex-col items-center justify-center border-2 border-dashed border-(--border) rounded-lg py-8 cursor-pointer hover:bg-(--hover) transition">
              <FaUpload size={22} className="mb-2 text-(--primary)" />
              <span className="text-sm">Click to upload image</span>
              <input
                type="file"
                className="hidden"
                {...register('image', { required: 'Image is required' })}
              />
            </label>
            {errors.image && (
              <p className="text-xs text-red-500 mt-2">
                {errors.image.message}
              </p>
            )}
          </div>

          <div className="md:col-span-2">
            <button
              type="submit"
              className="w-full bg-(--primary) text-white py-3 rounded-lg hover:bg-blue-700 transition"
            >
              Save Book
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default AddBookForm
