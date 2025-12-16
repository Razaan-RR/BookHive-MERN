import React from 'react'
import Navbar from '../pages/Navbar'
import Footer from '../pages/Footer'
import { Outlet } from 'react-router-dom'

function RootLayout() {
  return (
    <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="grow pb-24">
          <Outlet />
        </main>
        <Footer />
    </div>
  )
}

export default RootLayout
