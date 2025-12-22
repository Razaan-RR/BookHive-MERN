import { useState, useEffect } from 'react'
import { FaUserCircle } from 'react-icons/fa'
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage'
import { toast, Toaster } from 'react-hot-toast'
import useAuth from '../../../hooks/useAuth'
import Container from '../../../components/Common/Container'

const MyProfile = () => {
  const { user, updateUserProfile } = useAuth()
  const [name, setName] = useState('')
  const [photo, setPhoto] = useState(null) // file selected
  const [preview, setPreview] = useState('') // preview URL
  const [loading, setLoading] = useState(false)

  // Initialize local states when user loads
  useEffect(() => {
    if (user) {
      setName(user.displayName || '')
      setPreview(user.photoURL || 'https://i.ibb.co/MBtjqXQ/no-avatar.gif')
    }
  }, [user])

  // Update preview whenever a new file is selected
  useEffect(() => {
    if (!photo) return
    const objectUrl = URL.createObjectURL(photo)
    setPreview(objectUrl)
    return () => URL.revokeObjectURL(objectUrl)
  }, [photo])

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!name && !photo) return
    setLoading(true)

    try {
      let photoURL = user?.photoURL || null

      // Upload new photo if selected
      if (photo) {
        const storage = getStorage()
        const photoRef = ref(storage, `profileImages/${user.uid}-${Date.now()}`)
        await uploadBytes(photoRef, photo)
        photoURL = await getDownloadURL(photoRef)
      }

      // Update Firebase and backend
      await updateUserProfile(name, photoURL)

      // Update local state immediately for instant UI update
      setPhoto(null)
      setPreview(photoURL)
      toast.success('Profile updated successfully!')
    } catch (err) {
      console.error(err)
      toast.error('Failed to update profile')
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className="relative min-h-screen py-20 overflow-hidden" style={{ backgroundColor: 'var(--bg)' }}>
      <Toaster position="top-right" reverseOrder={false} />
      <Container>
        <div className="max-w-lg mx-auto relative animate-fadeInUp">
          <div className="text-center mb-12">
            <span className="inline-flex items-center gap-2 mb-4 px-6 py-2 rounded-full text-lg sm:text-xl font-bold bg-(--secondary)/25">
              My Profile 👤
            </span>
            <h1 className="text-3xl sm:text-4xl font-extrabold leading-tight">
              Your Account, Your Style
            </h1>
            <p className="opacity-70 mt-2">
              Update your name and profile image with a touch of magic.
            </p>
          </div>

          <div className="relative group rounded-3xl bg-(--card-bg)/80 backdrop-blur-xl border border-(--border) shadow-2xl p-8 overflow-hidden">
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-(--primary)/20 to-(--secondary)/20 opacity-0 group-hover:opacity-100 transition-all duration-700 pointer-events-none" />

            <div className="absolute top-4 left-4 w-12 h-12 rounded-full bg-(--primary)/70 flex items-center justify-center text-white text-2xl shadow-lg">
              📖
            </div>
            <div className="absolute top-8 right-6 w-10 h-10 rounded-full bg-(--secondary)/60 flex items-center justify-center text-white text-xl shadow-lg">
              📚
            </div>

            <div className="flex justify-center mb-6 relative">
              <div className="relative group">
                <img
                  src={preview}
                  alt="Profile"
                  className="h-32 w-32 rounded-full object-cover border-4 border-(--primary) shadow-2xl transition-transform duration-500 group-hover:scale-105"
                />
                {!preview && <FaUserCircle className="absolute h-32 w-32 text-(--primary)/50 top-0 left-0" />}
                <div className="absolute -bottom-2 -right-2 w-8 h-8 rounded-full bg-(--secondary) flex items-center justify-center text-white shadow-lg cursor-pointer">
                  ✎
                </div>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col gap-5 relative z-10">
              <div>
                <label className="text-sm text-(--text)/70">Email</label>
                <input
                  type="email"
                  value={user?.email || ''}
                  disabled
                  className="w-full mt-2 px-4 py-2 rounded-xl bg-(--card-bg) border border-(--border) focus:outline-none focus:ring-2 focus:ring-(--primary) transition"
                />
              </div>

              <div>
                <label className="text-sm text-(--text)/70">Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter your name"
                  className="w-full mt-2 px-4 py-2 rounded-xl bg-(--card-bg) border border-(--border) focus:outline-none focus:ring-2 focus:ring-(--primary) transition"
                />
              </div>

              <div>
                <label className="text-sm text-(--text)/70">Profile Image</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setPhoto(e.target.files[0])}
                  className="w-full mt-2"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full mt-4 flex justify-center items-center gap-2 px-6 py-3 rounded-2xl bg-(--primary) text-white font-semibold hover:scale-105 hover:shadow-xl transition"
              >
                {loading ? 'Updating...' : 'Update Profile'}
              </button>
            </form>
          </div>
        </div>
      </Container>
    </section>
  )
}

export default MyProfile
