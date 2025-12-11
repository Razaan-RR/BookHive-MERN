import React from 'react'
import { Outlet } from 'react-router'
import Navbar from '../pages/Navbar'
import Footer from '../pages/Footer'

function RootLayout() {
  return (
    <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="grow">
          <Outlet />
        </main>
        <Footer />
    </div>
  )
}

export default RootLayout
