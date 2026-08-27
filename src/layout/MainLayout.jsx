import React from 'react'
import Navbar from '../components/navbar/Navbar'
import Footer from '../components/footer/Footer'
import { Outlet } from 'react-router-dom'
export default function MainLayout() {
  return (
    <div className="min-h-screen bg-[#dbe7ee] text-[#091E27] dark:bg-zinc-950 dark:text-zinc-100">
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  )
}
