import React from 'react'
import Navbar from '../pages/Navbar'
import { Outlet } from 'react-router'
import Footer from '../pages/Footer'

function AuthLayout() {
  return (
    <div>
        <Navbar></Navbar>
        <Outlet></Outlet>
        <Footer></Footer>
    </div>
  )
}

export default AuthLayout