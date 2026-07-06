import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeft } from 'lucide-react'
import { PressOnGrid } from '../components/PressOnGrid'
import pressOns from '../data/press-ons.json'
import type { PressOnProduct } from '../types/press-on'

const products = pressOns as PressOnProduct[]

export function PressOnsPage() {
  return (
    <main className="min-h-screen pt-28 pb-20">
      <div className="absolute inset-0 -z-10 bg-linear-to-b from-cream via-pastel-pink/20 to-cream" />

      <div className="page-container">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-sm font-medium text-ink-muted hover:text-ink transition-colors mb-8"
          >
            <ArrowLeft size={16} />
            Back to home
          </Link>

          <p className="text-sm font-semibold uppercase tracking-widest text-pink-400 mb-3">
            Press-On Sets
          </p>
          <h1 className="font-display text-4xl sm:text-5xl font-semibold mb-4">
            All sets on sale
          </h1>
          <p className="text-ink-muted max-w-2xl">
            Browse every press-on set currently available. Tap a design to view the full set, then
            order via WhatsApp.
          </p>
          {products.length > 0 && (
            <p className="text-sm text-ink-muted mt-3">
              {products.length} set{products.length === 1 ? '' : 's'} available
            </p>
          )}
        </motion.div>

        <PressOnGrid products={products} animateOnScroll={false} />
      </div>
    </main>
  )
}
