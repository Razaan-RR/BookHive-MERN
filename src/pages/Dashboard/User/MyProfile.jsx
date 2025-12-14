import useAuth from '../../../hooks/useAuth'
import { useState } from 'react'

const MyProfile = () => {
  const { user, updateUserProfile } = useAuth()

  const [name, setName] = useState(user?.displayName || '')
  const [photo, setPhoto] = useState(null)

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!name && !photo) return

    await updateUserProfile(name, photo)
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50 px-4">
      <div className="bg-white shadow-lg rounded-2xl w-full max-w-md p-6">
        
        <h2 className="text-2xl font-semibold text-center mb-6">
          My Profile
        </h2>

        {/* Profile Image */}
        <div className="flex justify-center mb-4">
          <img
            src={user?.photoURL || 'https://i.ibb.co/MBtjqXQ/no-avatar.gif'}
            alt="Profile"
            className="h-28 w-28 rounded-full object-cover border-4 border-lime-500"
          />
        </div>

        {/* Profile Form */}
        <form onSubmit={handleSubmit} className="space-y-4">

          <div>
            <label className="text-sm text-gray-600">Email</label>
            <input
              type="email"
              value={user?.email}
              disabled
              className="w-full mt-1 px-4 py-2 bg-gray-100 rounded-lg"
            />
          </div>

          <div>
            <label className="text-sm text-gray-600">Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full mt-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-lime-400"
            />
          </div>

          <div>
            <label className="text-sm text-gray-600">Profile Image</label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setPhoto(e.target.files[0])}
              className="w-full mt-1"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-lime-500 text-white py-2 rounded-lg hover:bg-lime-600 transition"
          >
            Update Profile
          </button>

        </form>
      </div>
    </div>
  )
}

export default MyProfile