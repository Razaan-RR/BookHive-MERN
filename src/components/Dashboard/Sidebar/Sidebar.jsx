import { useState } from 'react'
import { Link } from 'react-router-dom'
import logo from '../../../../src/assets/logo.png'
import { GrLogout } from 'react-icons/gr'
import { FcSettings } from 'react-icons/fc'
import { AiOutlineBars } from 'react-icons/ai'
import { BsGraphUp } from 'react-icons/bs'
import useAuth from '../../../hooks/useAuth'
import MenuItem from '../Menu/MenuItem'
import AdminMenu from '../Menu/AdminMenu'
import LibrarianMenu from '../Menu/LibrarianMenu'
import UserMenu from '../Menu/UserMenu'

const Sidebar = () => {
  const { logOut, user } = useAuth()
  const [isActive, setActive] = useState(false)

  // Sidebar Responsive Handler
  const handleToggle = () => {
    setActive(!isActive)
  }

  return (
    <>
      {/* Small Screen Navbar */}
      <div className="bg-gray-100 text-gray-800 flex justify-between md:hidden">
        <div className="block cursor-pointer p-4 font-bold">
          <Link to="/">
            <img src={logo} alt="BookCourier Logo" width="100" height="100" />
          </Link>
        </div>
        <button
          onClick={handleToggle}
          className="mobile-menu-button p-4 focus:outline-none focus:bg-gray-200"
        >
          <AiOutlineBars className="h-5 w-5" />
        </button>
      </div>

      {/* Sidebar */}
      <div
        className={`z-10 md:fixed flex flex-col justify-between overflow-x-hidden bg-gray-100 w-64 space-y-6 px-2 py-4 absolute inset-y-0 left-0 transform ${
          isActive ? '-translate-x-full' : 'translate-x-0'
        } transition duration-200 ease-in-out`}
      >
        <div className="flex flex-col h-full">
          {/* Top Logo */}
          <div className="w-full hidden md:flex px-4 py-2 shadow-lg rounded-lg justify-center items-center bg-lime-100 mx-auto">
            <Link to="/">
              <img src={logo} alt="BookCourier Logo" width="100" height="100" />
            </Link>
          </div>

          {/* Menu Items */}
          <div className="flex flex-col justify-between flex-1 mt-6">
            <nav>
              {/* Common Dashboard */}
              <MenuItem
                icon={BsGraphUp}
                label="Statistics"
                address="/dashboard"
              />
              {/* Role-based Menus */}
              {user?.role === 'user' && <UserMenu />}
              {user?.role === 'librarian' && <LibrarianMenu />}
              {user?.role === 'admin' && <AdminMenu />}
            </nav>
          </div>

          {/* Bottom Profile & Logout */}
          <div>
            <hr />
            <MenuItem
              icon={FcSettings}
              label="Profile"
              address="/dashboard/my-profile"
            />
            <button
              onClick={logOut}
              className="flex cursor-pointer w-full items-center px-4 py-2 mt-5 text-gray-600 hover:bg-gray-300 hover:text-gray-700 transition-colors duration-300 transform"
            >
              <GrLogout className="w-5 h-5" />
              <span className="mx-4 font-medium">Logout</span>
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

export default Sidebar
