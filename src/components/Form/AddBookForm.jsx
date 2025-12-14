import React from 'react'
import { FaBookOpen, FaUpload } from 'react-icons/fa'

function AddBookForm() {
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

        <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="text-sm mb-1 block">Book Name</label>
            <input type="text" placeholder="Enter book name" />
          </div>

          <div>
            <label className="text-sm mb-1 block">Author Name</label>
            <input type="text" placeholder="Enter author name" />
          </div>

          <div>
            <label className="text-sm mb-1 block">Price</label>
            <input type="number" placeholder="Book price" />
          </div>

          <div>
            <label className="text-sm mb-1 block">Status</label>
            <select>
              <option value="published">Published</option>
              <option value="unpublished">Unpublished</option>
            </select>
          </div>

          <div className="md:col-span-2">
            <label className="text-sm mb-1 block">Book Description</label>
            <textarea
              rows="4"
              placeholder="Write a short description about the book"
            ></textarea>
          </div>

          <div className="md:col-span-2">
            <label className="text-sm mb-2 block">Book Image</label>
            <label className="flex flex-col items-center justify-center border-2 border-dashed border-(--border) rounded-lg py-8 cursor-pointer hover:bg-(--hover) transition">
              <FaUpload size={22} className="mb-2 text-(--primary)" />
              <span className="text-sm">Click to upload image</span>
              <input type="file" className="hidden" />
            </label>
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
