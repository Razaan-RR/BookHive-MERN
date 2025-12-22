import React from 'react'
import { useForm } from 'react-hook-form'
import useAuth from '../../hooks/useAuth'
import SocialLogin from '../Auth/SocialLogin'
import axios from 'axios'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { saveOrUpdateUser } from '../../utils/index'
import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom'
import LoadingSpinner from '../../components/Common/LoadingSpinner'
import { FaUser, FaEnvelope, FaLock, FaImage } from 'react-icons/fa'

const Register = () => {
  const { registerUser, updateUserProfile, user, loading } = useAuth()
  const location = useLocation()
  const navigate = useNavigate()
  const from = location.state?.from?.pathname || '/'
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  if (loading) return <LoadingSpinner />
  if (user) return <Navigate to={from} replace={true} />

  // const handleRegistration = async (data) => {
  //   try {
  //     if (!data.photo || !data.photo[0]) {
  //       toast.error('Please upload a photo')
  //       return
  //     }

  //     const imageFile = data.photo[0]
  //     const formData = new FormData()
  //     formData.append('image', imageFile)

  //     const img_API_URL = `https://api.imgbb.com/1/upload?expiration=600&key=${
  //       import.meta.env.VITE_IMAGE_HOST_KEY
  //     }`

  //     const imgRes = await axios.post(img_API_URL, formData)
  //     const photoURL = imgRes.data.data.url || imgRes.data.data.display_url

  //     await registerUser(data.email, data.password)

  //     await saveOrUpdateUser({
  //       name: data.name,
  //       email: data.email,
  //       photo: photoURL,
  //     })

  //     // await updateUserProfile({
  //     //   displayName: data.name,
  //     //   photoURL,
  //     // })

  //     await updateUserProfile(data.name, photoURL)

  //     toast.success('Congrats! Registration successful.')
  //     setTimeout(() => {
  //       navigate(from, { replace: true })
  //     }, 800)
  //   } catch (error) {
  //     toast.error(`Sorry! Registration failed: ${error.message}`)
  //   }
  // }

  const handleRegistration = async (data) => {
    try {
      if (!data.photo || !data.photo[0]) {
        toast.error('Please upload a photo')
        return
      }

      const imageFile = data.photo[0]
      const formData = new FormData()
      formData.append('image', imageFile)

      const img_API_URL = `https://api.imgbb.com/1/upload?expiration=600&key=${
        import.meta.env.VITE_IMAGE_HOST_KEY
      }`

      const imgRes = await axios.post(img_API_URL, formData)
      const photoURL = imgRes.data.data.url || imgRes.data.data.display_url

      await registerUser(data.email, data.password)

      // ✅ THIS IS THE FIX
      await updateUserProfile(data.name, photoURL)

      toast.success('Congrats! Registration successful.')
      setTimeout(() => {
        navigate(from, { replace: true })
      }, 800)
    } catch (error) {
      toast.error(`Sorry! Registration failed: ${error.message}`)
    }
  }

  const onError = (errors) => {
    if (errors.email) toast.error('Valid email is required')
    if (errors.password) toast.error('Password is invalid')
  }

  return (
    <div className="py-20 relative min-h-screen flex items-center justify-center overflow-hidden bg-bg px-4">
      <div className="absolute -top-40 -left-40 w-96 h-96 bg-(--primary)/30 blur-[140px] rounded-full animate-pulse-slow" />
      <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-(--secondary)/30 blur-[140px] rounded-full animate-pulse-slow" />

      <div className="relative z-10">
        <div className="absolute -top-8 left-1/2 -translate-x-1/2 w-16 h-16 rounded-2xl bg-(--primary) flex items-center justify-center shadow-lg z-20">
          <span className="text-3xl">📚</span>
        </div>

        <div className="w-full max-w-5xl grid grid-cols-1 lg:grid-cols-2 rounded-3xl overflow-hidden shadow-2xl">
          <div
            className="hidden lg:flex flex-col justify-center px-10 py-12 backdrop-blur-xl bg-(--card-bg)/40 relative"
            style={{
              backgroundImage:
                "url('https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?q=80&w=1200')",
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          >
            <div className="absolute inset-0 bg-(--card-bg)/70 backdrop-blur-sm" />

            <div className="relative z-10 animate-fadeInUp">
              <span className="inline-block mb-6 px-6 py-2 rounded-full text-3xl font-bold bg-(--secondary)/25 text-(--text) shadow-sm">
                Create Your Account ✨
              </span>

              <p className="mt-4 text-lg opacity-80 max-w-sm">
                Join BookHive today and start exploring books, knowledge, and
                stories curated just for you.
              </p>
            </div>
          </div>

          <div className="relative backdrop-blur-xl bg-(--card-bg)/70 p-6 sm:p-8 animate-fadeInUp">
            <form
              onSubmit={handleSubmit(handleRegistration, onError)}
              className="space-y-5 mt-6"
            >
              <div>
                <label className="flex items-center gap-2 mb-1 font-medium">
                  <FaUser className="text-sm opacity-70" />
                  Name
                </label>
                <input
                  type="text"
                  {...register('name', { required: true })}
                  placeholder="Enter your full name"
                  className="w-full px-4 py-2"
                />
                {errors.name && (
                  <p className="text-sm text-red-500 mt-1">Name is required</p>
                )}
              </div>

              <div>
                <label className="flex items-center gap-2 mb-1 font-medium">
                  <FaImage className="text-sm opacity-70" />
                  Photo
                </label>
                <input
                  type="file"
                  {...register('photo', { required: true })}
                  accept="image/*"
                  className="w-full"
                />
                {errors.photo && (
                  <p className="text-sm text-red-500 mt-1">Photo is required</p>
                )}
              </div>

              <div>
                <label className="flex items-center gap-2 mb-1 font-medium">
                  <FaEnvelope className="text-sm opacity-70" />
                  Email
                </label>
                <input
                  type="email"
                  {...register('email', { required: true })}
                  placeholder="Enter your email"
                  className="w-full px-4 py-2"
                />
                {errors.email && (
                  <p className="text-sm text-red-500 mt-1">Email is required</p>
                )}
              </div>

              <div>
                <label className="flex items-center gap-2 mb-1 font-medium">
                  <FaLock className="text-sm opacity-70" />
                  Password
                </label>
                <input
                  type="password"
                  {...register('password', {
                    required: true,
                    minLength: 6,
                    pattern: /^(?=.*[a-z])(?=.*[A-Z]).{6,}$/,
                  })}
                  placeholder="Create a password"
                  className="w-full px-4 py-2"
                />
                {errors.password && (
                  <p className="text-sm text-red-500 mt-1">
                    Password must be at least 6 characters with upper & lower
                    case
                  </p>
                )}
              </div>

              <button
                type="submit"
                className="btn w-full text-white font-semibold tracking-wide rounded-3xl"
                style={{ backgroundColor: 'var(--primary)' }}
              >
                Register
              </button>
            </form>

            <div className="my-6 flex items-center gap-3">
              <div className="flex-1 h-px bg-(--border)" />
              <span className="text-sm opacity-60">or</span>
              <div className="flex-1 h-px bg-(--border)" />
            </div>

            <SocialLogin />

            <p className="mt-6 text-center text-sm">
              Already have an account?{' '}
              <Link to="/auth/login" className="font-semibold hover:underline">
                Log In
              </Link>
            </p>
          </div>
        </div>
      </div>

      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  )
}

export default Register
