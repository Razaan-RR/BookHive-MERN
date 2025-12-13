import { createBrowserRouter } from 'react-router'
import RootLayout from '../Layout/RootLayout'
import Home from '../pages/Home/Home/Home'
import DashboardLayout from '../Layout/DashboardLayout'
import AuthLayout from '../Layout/AuthLayout'
import PrivateRoute from './PrivateRoute'
import Login from '../pages/Auth/Login'
import Register from '../pages/Auth/Register'
import DashboardHome from '../pages/Dashboard/DashboardHome'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [{ index: true, element: <Home /> }],
  },
  {
    path: '/auth',
    element: <AuthLayout />,
    children: [
      { path: 'login', element: <Login /> },
      { path: 'register', element: <Register /> },
    ],
  },

  {
    path: 'dashboard',
    element: (
      <PrivateRoute>
        <DashboardLayout />
      </PrivateRoute>
    ),
    children: [
      {
        index: true,
        element: <DashboardHome />,
      },
    ],
  },
])
