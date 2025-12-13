import React from 'react'
import { useForm } from 'react-hook-form'
import useAuth from '../../hooks/useAuth'
import SocialLogin from '../Auth/SocialLogin'
import axios from 'axios'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { saveOrUpdateUser } from '../../utils/index'
import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom'

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

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading...
      </div>
    )
  if (user) return <Navigate to={from} replace={true} />

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

      const imgRes = await axios.post(img_API_URL, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })

      const photoURL = imgRes.data.data.url || imgRes.data.data.display_url

      const userProfile = {
        displayName: data.name,
        photoURL: photoURL,
      }

      await registerUser(data.email, data.password)

      await saveOrUpdateUser({
        name: data.name,
        email: data.email,
        photo: photoURL,
      })

      await updateUserProfile(userProfile)

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
    <div className="min-h-screen flex items-center justify-center bg-bg px-4">
      <div className="card w-full max-w-md animate-fadeInUp">
        <h3 className="text-3xl font-extrabold text-center mb-2">
          Join <span style={{ color: 'var(--primary)' }}>BookHive</span>
        </h3>
        <p className="text-center mb-6 text-sm">
          Create an account to start your reading journey
        </p>

        <form
          onSubmit={handleSubmit(handleRegistration, onError)}
          className="space-y-5"
        >
          <div>
            <label className="block mb-1 font-medium">Name</label>
            <input
              type="text"
              {...register('name', { required: true })}
              placeholder="Enter your full name"
            />
            {errors.name && (
              <p className="text-sm text-red-500 mt-1">Name is required</p>
            )}
          </div>

          <div>
            <label className="block mb-1 font-medium">Photo</label>
            <input
              type="file"
              {...register('photo', { required: true })}
              accept="image/*"
            />
            {errors.photo && (
              <p className="text-sm text-red-500 mt-1">Photo is required</p>
            )}
          </div>

          <div>
            <label className="block mb-1 font-medium">Email</label>
            <input
              type="email"
              {...register('email', { required: true })}
              placeholder="Enter your email"
            />
            {errors.email && (
              <p className="text-sm text-red-500 mt-1">Email is required</p>
            )}
          </div>

          <div>
            <label className="block mb-1 font-medium">Password</label>
            <input
              type="password"
              {...register('password', {
                required: true,
                minLength: 6,
                pattern: /^(?=.*[a-z])(?=.*[A-Z]).{6,}$/,
              })}
              placeholder="Create a password"
            />
            {errors.password && (
              <p className="text-sm text-red-500 mt-1">
                Password must be at least 6 characters with upper & lower case
              </p>
            )}
          </div>

          <button
            type="submit"
            className="btn w-full"
            style={{ backgroundColor: 'var(--primary)', color: '#fff' }}
          >
            Register
          </button>
        </form>

        <p className="mt-6 text-center text-sm">
          Already have an account?{' '}
          <Link to="/auth/login" className="font-semibold">
            Log In
          </Link>
        </p>

        <div className="mt-5">
          <SocialLogin />
        </div>
      </div>

      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  )
}

export default Register
