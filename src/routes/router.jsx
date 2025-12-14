import { createBrowserRouter } from 'react-router-dom'
import RootLayout from '../Layout/RootLayout'
import Home from '../pages/Home/Home/Home'
import DashboardLayout from '../Layout/DashboardLayout'
import AuthLayout from '../Layout/AuthLayout'
import PrivateRoute from './PrivateRoute'
import Login from '../pages/Auth/Login'
import Register from '../pages/Auth/Register'
import BookDetails from '../pages/Books/BookDetails'
import AllBooks from '../pages/Books/AllBooks'
import MyOrders from '../pages/Dashboard/User/MyOrders'
import MyProfile from '../pages/Dashboard/User/MyProfile'
import Wishlist from '../pages/Dashboard/User/Wishlist'
import Invoices from '../pages/Dashboard/User/Invoices'
import AddBook from '../pages/Dashboard/Librarian/AddBook'
import MyBooks from '../pages/Dashboard/Librarian/MyBooks'
import ManageUsers from '../pages/Dashboard/Admin/ManageUsers'
import ManageBooks from '../pages/Dashboard/Admin/ManageBooks'
import Orders from '../pages/Dashboard/Librarian/Orders'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      { index: true, element: <Home /> },
      { path: 'books', element: <AllBooks /> },
      { path: 'book/:id', element: <BookDetails /> },
    ],
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
      // User Dashboard
      {
        path: 'my-orders',
        element: (
          <PrivateRoute>
            <MyOrders />
          </PrivateRoute>
        ),
      },
      {
        path: 'my-profile',
        element: (
          <PrivateRoute>
            <MyProfile />
          </PrivateRoute>
        ),
      },
      {
        path: 'wishlist',
        element: (
          <PrivateRoute>
            <Wishlist />
          </PrivateRoute>
        ),
      },
      {
        path: 'invoices',
        element: (
          <PrivateRoute>
            <Invoices />
          </PrivateRoute>
        ),
      },

      // Librarian Dashboard
      {
        path: 'add-book',
        element: (
          <PrivateRoute>
            <AddBook />
          </PrivateRoute>
        ),
      },
      {
        path: 'my-books',
        element: (
          <PrivateRoute>
            <MyBooks />
          </PrivateRoute>
        ),
      },
      {
        path: 'orders',
        element: (
          <PrivateRoute>
            <Orders />
          </PrivateRoute>
        ),
      },

      // Admin Dashboard
      {
        path: 'manage-users',
        element: (
          <PrivateRoute>
            <ManageUsers />
          </PrivateRoute>
        ),
      },
      {
        path: 'manage-books',
        element: (
          <PrivateRoute>
            <ManageBooks />
          </PrivateRoute>
        ),
      },
    ],
  },
])
