import { Outlet } from 'react-router-dom'
import Sidebar from '../components/Dashboard/Sidebar/Sidebar'

const DashboardLayout = () => {
  return (
    <div className="flex justify-center items-start min-h-screen bg-white">
      <div className='w-1/5'>
        <Sidebar />
      </div>

      <div className="w-4/5 p-5 min-h-screen">
        <Outlet />
      </div>
    </div>
  )
}

export default DashboardLayout
