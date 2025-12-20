import { Link } from 'react-router-dom'
import logo from '../../../../src/assets/logo.png'
import { GrLogout } from 'react-icons/gr'
import { FcSettings } from 'react-icons/fc'
import { FaArrowLeft } from 'react-icons/fa'
import useAuth from '../../../hooks/useAuth'
import useRole from '../../../hooks/useRole'
import MenuItem from '../Menu/MenuItem'
import AdminMenu from '../Menu/AdminMenu'
import LibrarianMenu from '../Menu/LibrarianMenu'
import UserMenu from '../Menu/UserMenu'

const Sidebar = ({ isCollapsed }) => {
  const { logOut } = useAuth()
  const [role, isRoleLoading] = useRole()

  if (isRoleLoading) return null

  return (
    <div
      style={{
        backgroundColor: 'var(--bg)',
        borderColor: 'rgba(0,0,0,0.06)',
      }}
      className={`fixed inset-y-0 left-0 px-2 py-4 flex flex-col justify-between
        border-r backdrop-blur-xl shadow-lg
        transition-all duration-300 ease-in-out
        ${isCollapsed ? 'w-16' : 'w-64'}
      `}
    >
      <div>
        <div className="flex justify-center mb-4">
          <Link to="/" className="group">
            {!isCollapsed && (
              <img
                src={logo}
                alt="BookCourier Logo"
                width="100"
                className="transition-transform duration-300 group-hover:scale-105"
              />
            )}
          </Link>
        </div>

        <div className="flex justify-center mb-8">
          <Link
            to="/"
            style={{
              background:
                'linear-gradient(135deg, var(--primary), var(--secondary))',
            }}
            className={`group relative overflow-hidden
              flex items-center px-4 py-2 rounded-full text-white text-sm font-medium
              shadow-md hover:shadow-xl transition-all duration-300
              ${isCollapsed ? 'justify-center w-10 h-10 p-0 rounded-full' : ''}
            `}
          >
            <FaArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            {!isCollapsed && (
              <span className="ml-3 tracking-wide">Back to Home</span>
            )}

            <span className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-20 blur-xl bg-white transition" />
          </Link>
        </div>

        <nav className="space-y-1">
          {role === 'user' && <UserMenu isCollapsed={isCollapsed} />}
          {role === 'librarian' && <LibrarianMenu isCollapsed={isCollapsed} />}
          {role === 'admin' && <AdminMenu isCollapsed={isCollapsed} />}
        </nav>
      </div>

      <div>
        <div className="my-4 h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent" />

        <MenuItem
          icon={FcSettings}
          label="Profile"
          address="/dashboard/my-profile"
          isCollapsed={isCollapsed}
        />

        <button
          onClick={logOut}
          className={`group relative mt-4 flex w-full items-center px-4 py-2
            rounded-xl text-gray-600 overflow-hidden
            transition-all duration-300
            hover:text-red-600 hover:shadow-md
            ${isCollapsed ? 'justify-center' : ''}
          `}
        >
          <span className="absolute inset-0 bg-red-50 opacity-0 group-hover:opacity-100 transition" />
          <GrLogout className="w-5 h-5 relative z-10" />
          {!isCollapsed && (
            <span className="ml-4 font-medium relative z-10">
              Logout
            </span>
          )}
        </button>
      </div>
    </div>
  )
}

export default Sidebar
