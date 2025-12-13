import React, { useState, useRef, useEffect } from 'react'
import { Link, NavLink } from 'react-router-dom'
import useAuth from '../hooks/useAuth'
import { FaMoon, FaSun, FaBars, FaTimes } from 'react-icons/fa'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import logo from '../assets/logo.png'

const Navbar = () => {
  const { user, logOut } = useAuth()
  const [mobileOpen, setMobileOpen] = useState(false)
  const [userMenuOpen, setUserMenuOpen] = useState(false)
  const [darkMode, setDarkMode] = useState(false)

  const userMenuRef = useRef(null)
  const mobileMenuRef = useRef(null)

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (userMenuRef.current && !userMenuRef.current.contains(e.target))
        setUserMenuOpen(false)
      if (mobileMenuRef.current && !mobileMenuRef.current.contains(e.target))
        setMobileOpen(false)
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleLogOut = () => {
    logOut()
      .then(() => toast.success('Logged out successfully'))
      .catch((err) => console.log(err))
  }

  const toggleTheme = () => {
    setDarkMode((prev) => !prev)
    document.documentElement.setAttribute(
      'data-theme',
      darkMode ? 'light' : 'dark'
    )
  }

  const links = (
    <>
      <li>
        <NavLink
          to="/"
          onClick={() => setMobileOpen(false)}
          className="px-5 py-2 transition-all font-medium"
        >
          Home
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/books"
          onClick={() => setMobileOpen(false)}
          className="px-5 py-2 transition-all font-medium"
        >
          Books
        </NavLink>
      </li>
      {user && (
        <li>
          <NavLink
            to="/dashboard"
            onClick={() => setMobileOpen(false)}
            className="px-5 py-2 transition-all font-medium"
          >
            Dashboard
          </NavLink>
        </li>
      )}
    </>
  )

  return (
    <nav className="w-full h-14 bg-bg shadow-md sticky top-0 z-50 transition-all mt-4">
      <div className="container mx-auto flex items-center justify-between px-4 py-3">
        <div className="flex items-center gap-2">
          <Link to="/" className="flex items-center gap-2">
            <img src={logo} alt="Logo" className="w-10 h-10 object-contain" />
            <span
              className="font-extrabold text-2xl tracking-wider drop-shadow-lg"
              style={{
                background:
                  'linear-gradient(90deg, var(--primary), var(--secondary))',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              BookHive
            </span>
          </Link>
        </div>
        <ul className="hidden lg:flex gap-4 items-center">{links}</ul>
        <div className="flex items-center gap-3 ml-4">
          <div className="relative" ref={userMenuRef}>
            {user ? (
              <>
                <button
                  onClick={() => setUserMenuOpen((prev) => !prev)}
                  className="avatar-btn w-9 h-9 rounded-full overflow-hidden flex items-center justify-center p-0 bg-transparent"
                >
                  <img
                    src={user.photoURL || '/default-profile.png'}
                    alt={user.displayName || 'User'}
                    className="w-full h-full object-cover"
                  />
                </button>
              </>
            ) : (
              <div className=" login-btn hidden lg:flex gap-3">
                <Link
                  to="/auth/login"
                  className="px-5 py-2 transition-all font-medium"
                >
                  Log In
                </Link>
                <Link
                  to="/auth/register"
                  className="px-5 py-2 transition-all font-medium"
                >
                  Register
                </Link>
              </div>
            )}
          </div>
          <button
            onClick={toggleTheme}
            className="p-2 transition-all text-xl shadow-md"
            aria-label="Toggle Theme"
          >
            {darkMode ? <FaSun className="text-yellow-400" /> : <FaMoon />}
          </button>
          <div className="lg:hidden flex items-center">
            <button
              onClick={() => setMobileOpen((prev) => !prev)}
              aria-label="Toggle menu"
              className="p-2 transition-all text-xl"
            >
              {mobileOpen ? <FaTimes /> : <FaBars />}
            </button>
          </div>
        </div>
      </div>
      {mobileOpen && (
        <ul
          className="lg:hidden bg-card-bg w-full flex flex-col gap-2 p-4 shadow-md animate-fadeInUp"
          ref={mobileMenuRef}
        >
          {links}
          {!user && (
            <>
              <Link
                to="/auth/login"
                className=" login-btn px-4 py-2 transition-all font-medium"
                onClick={() => setMobileOpen(false)}
              >
                Log In
              </Link>
              <Link
                to="/auth/register"
                className="px-4 py-2 transition-all font-medium"
                onClick={() => setMobileOpen(false)}
              >
                Register
              </Link>
            </>
          )}
        </ul>
      )}
      <ToastContainer position="top-right" autoClose={3000} />
    </nav>
  )
}

export default Navbar
