import { Outlet } from 'react-router-dom'
import { Navbar } from './Navbar'
import { Footer, FloatingWhatsApp } from './Footer'
import { ScrollToTop } from './ScrollToTop'

export function Layout() {
  return (
    <>
      <ScrollToTop />
      <Navbar />
      <Outlet />
      <Footer />
      <FloatingWhatsApp />
    </>
  )
}
