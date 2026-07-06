import { Outlet } from 'react-router-dom'
import { Navbar } from './Navbar'
import { Footer, FloatingWhatsApp } from './Footer'

export function Layout() {
  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
      <FloatingWhatsApp />
    </>
  )
}
