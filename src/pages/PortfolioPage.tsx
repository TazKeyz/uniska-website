import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeft } from 'lucide-react'
import { PortfolioGallery } from '../components/PortfolioGallery'
import portfolioItems from '../data/portfolio.json'
import type { PortfolioItem } from '../types/portfolio'

const items = portfolioItems as PortfolioItem[]

export function PortfolioPage() {
  return (
    <main className="min-h-screen pt-28 pb-20 relative">
      <div className="absolute inset-0 -z-10 bg-linear-to-b from-cream via-pastel-pink/15 to-cream" />

      <div className="page-container">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-10"
        >
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-sm font-medium text-ink-muted hover:text-ink transition-colors mb-8"
          >
            <ArrowLeft size={16} />
            Back to home
          </Link>

          <p className="text-sm font-semibold uppercase tracking-widest text-pink-400 mb-3">
            Our Work
          </p>
          <h1 className="font-display text-4xl sm:text-5xl font-semibold mb-4">Portfolio</h1>
          <p className="text-ink-muted max-w-2xl">
            Browse our full collection of nail art, gel sets, and more. Use the filters to explore
            by category.
          </p>
          {items.length > 0 && (
            <p className="text-sm text-ink-muted mt-3">
              {items.length} photo{items.length === 1 ? '' : 's'}
            </p>
          )}
        </motion.div>

        <PortfolioGallery variant="full" />
      </div>
    </main>
  )
}
