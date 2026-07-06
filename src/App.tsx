import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Layout } from './components/Layout'
import { HomePage } from './pages/HomePage'
import { PressOnsPage } from './pages/PressOnsPage'
import { PricesPage } from './pages/PricesPage'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/press-ons" element={<PressOnsPage />} />
          <Route path="/prices" element={<PricesPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
