import { Navbar } from './components/Navbar'
import { Hero } from './components/Hero'
import { Products } from './components/Products'
import { PriceList } from './components/PriceList'
import { Portfolio } from './components/Portfolio'
import { Features } from './components/Features'
import { Reviews } from './components/Reviews'
import { ContactCTA } from './components/ContactCTA'
import { Footer, FloatingWhatsApp } from './components/Footer'

export default function App() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Products />
        <PriceList />
        <Portfolio />
        <Features />
        <Reviews />
        <ContactCTA />
      </main>
      <Footer />
      <FloatingWhatsApp />
    </>
  )
}
