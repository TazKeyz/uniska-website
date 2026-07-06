import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { PressOnGrid } from './PressOnGrid'
import pressOns from '../data/press-ons.json'
import type { PressOnProduct } from '../types/press-on'

const allProducts = pressOns as PressOnProduct[]
const HOME_PREVIEW_LIMIT = 4

export function Products() {
  const previewProducts = allProducts.slice(0, HOME_PREVIEW_LIMIT)
  const hasMore = allProducts.length > HOME_PREVIEW_LIMIT

  return (
    <section id="shop" className="section-padding relative scroll-mt-24">
      <div className="absolute inset-0 -z-10 bg-linear-to-b from-cream via-pastel-pink/20 to-cream" />

      <div className="page-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <p className="text-sm font-semibold uppercase tracking-widest text-pink-400 mb-3">
            Press-On Sets
          </p>
          <h2 className="font-display text-4xl sm:text-5xl font-semibold mb-4">
            Order from home
          </h2>
          <p className="text-ink-muted max-w-xl mx-auto">
            Custom press-on nail sets to complement our in-studio services — order via WhatsApp.
            Tap a set to view the full design.
          </p>
        </motion.div>

        <PressOnGrid products={previewProducts} />

        {allProducts.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mt-10"
          >
            <Link
              to="/press-ons"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-semibold bg-linear-to-r from-pink-300 to-rose-300 text-ink shadow-lg shadow-pink-200/50 hover:shadow-xl hover:-translate-y-0.5 transition-all"
            >
              See all sets
              <ArrowRight size={18} />
            </Link>
            {hasMore && (
              <p className="text-sm text-ink-muted mt-3">
                {allProducts.length - HOME_PREVIEW_LIMIT} more set
                {allProducts.length - HOME_PREVIEW_LIMIT === 1 ? '' : 's'} available
              </p>
            )}
          </motion.div>
        )}
      </div>
    </section>
  )
}
