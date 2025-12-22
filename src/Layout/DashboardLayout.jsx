import { Outlet } from 'react-router-dom'
import { useState, useEffect } from 'react'
import Sidebar from '../components/Dashboard/Sidebar/Sidebar'
import { FaBars } from 'react-icons/fa'

const DashboardLayout = () => {
  const [isCollapsed, setIsCollapsed] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768) 
      if (window.innerWidth < 768) setIsCollapsed(true)
    }
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return (
    <div className="flex min-h-screen bg-white">
      <div className={`${isCollapsed ? 'w-16' : 'w-64'} transition-all duration-300`}>
        <Sidebar isCollapsed={isCollapsed} />
      </div>

      <div className="flex-1 p-5 min-h-screen transition-all duration-300">
        {!isMobile && (
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="mb-4 p-2 rounded-md hover:bg-gray-200 transition"
          >
            <FaBars />
          </button>
        )}

        <Outlet />
      </div>
    </div>
  )
}

export default DashboardLayout
