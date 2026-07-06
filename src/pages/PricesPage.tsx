import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeft } from 'lucide-react'
import { PriceList } from '../components/PriceList'

export function PricesPage() {
  return (
    <main className="min-h-screen pt-28 pb-20 relative">
      <div className="absolute inset-0 -z-10 bg-linear-to-b from-cream via-pastel-blue/15 to-cream" />

      <div className="page-container max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-sm font-medium text-ink-muted hover:text-ink transition-colors mb-8"
          >
            <ArrowLeft size={16} />
            Back to home
          </Link>
        </motion.div>

        <PriceList variant="page" />
      </div>
    </main>
  )
}
