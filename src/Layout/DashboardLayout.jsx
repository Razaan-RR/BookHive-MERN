import { NavLink, Outlet } from 'react-router-dom'

const DashboardLayout = () => {
  return (
    <div className="min-h-screen flex">
      <aside className="w-64 bg-base-200 p-5">
        <h2 className="text-xl font-bold mb-6">Dashboard</h2>

        <nav className="space-y-3">
          <NavLink to="/dashboard" className="block">
            Dashboard Home
          </NavLink>
        </nav>
      </aside>

      <main className="flex-1 p-6 bg-base-100">
        <Outlet />
      </main>
    </div>
  )
}

export default DashboardLayout
