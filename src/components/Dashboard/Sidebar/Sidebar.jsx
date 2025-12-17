// import { Link } from 'react-router-dom'
// import logo from '../../../../src/assets/logo.png'
// import { GrLogout } from 'react-icons/gr'
// import { FcSettings } from 'react-icons/fc'
// import useAuth from '../../../hooks/useAuth'
// import MenuItem from '../Menu/MenuItem'
// import AdminMenu from '../Menu/AdminMenu'
// import LibrarianMenu from '../Menu/LibrarianMenu'
// import UserMenu from '../Menu/UserMenu'

// const Sidebar = () => {
//   const { logOut } = useAuth()

//   return (
//     <div className="fixed inset-y-0 left-0 w-64 bg-gray-100 px-2 py-4 flex flex-col justify-between">
//       <div className="flex justify-center mb-6">
//         <Link to="/">
//           <img src={logo} alt="BookCourier Logo" width="100" />
//         </Link>
//       </div>

//       <nav className="flex-1">
//         <UserMenu />
//         <LibrarianMenu />
//         <AdminMenu />
//       </nav>

//       <div>
//         <hr />
//         <MenuItem
//           icon={FcSettings}
//           label="Profile"
//           address="/dashboard/my-profile"
//         />

//         <button
//           onClick={logOut}
//           className="flex w-full items-center px-4 py-2 mt-5 text-gray-600 hover:bg-gray-300 transition"
//         >
//           <GrLogout className="w-5 h-5" />
//           <span className="mx-4 font-medium">Logout</span>
//         </button>
//       </div>
//     </div>
//   )
// }

// export default Sidebar

import { Link } from 'react-router-dom'
import logo from '../../../../src/assets/logo.png'
import { GrLogout } from 'react-icons/gr'
import { FcSettings } from 'react-icons/fc'
import useAuth from '../../../hooks/useAuth'
import useRole from '../../../hooks/useRole'
import MenuItem from '../Menu/MenuItem'
import AdminMenu from '../Menu/AdminMenu'
import LibrarianMenu from '../Menu/LibrarianMenu'
import UserMenu from '../Menu/UserMenu'

const Sidebar = () => {
  const { logOut } = useAuth()
  const [role, isRoleLoading] = useRole()

  if (isRoleLoading) return null

  return (
    <div className="fixed inset-y-0 left-0 w-64 bg-gray-100 px-2 py-4 flex flex-col justify-between">
      <div className="flex justify-center mb-6">
        <Link to="/">
          <img src={logo} alt="BookCourier Logo" width="100" />
        </Link>
      </div>

      <nav className="flex-1">
        {role === 'user' && <UserMenu />}
        {role === 'librarian' && <LibrarianMenu />}
        {role === 'admin' && <AdminMenu />}
      </nav>

      <div>
        <hr />
        <MenuItem
          icon={FcSettings}
          label="Profile"
          address="/dashboard/my-profile"
        />

        <button
          onClick={logOut}
          className="flex w-full items-center px-4 py-2 mt-5 text-gray-600 hover:bg-gray-300 transition"
        >
          <GrLogout className="w-5 h-5" />
          <span className="mx-4 font-medium">Logout</span>
        </button>
      </div>
    </div>
  )
}

export default Sidebar
