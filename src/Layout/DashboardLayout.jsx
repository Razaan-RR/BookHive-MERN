import { Outlet } from 'react-router-dom'
import Sidebar from '../components/Dashboard/Sidebar/Sidebar'

const DashboardLayout = () => {
  return (
    <div className="min-h-screen flex bg-white">
      <div className="hidden md:block w-64 fixed inset-y-0 left-0">
        <Sidebar />
      </div>
      <div className="flex-1 md:ml-64 p-5">
        <Outlet />
      </div>
    </div>
  )
}

export default DashboardLayout
