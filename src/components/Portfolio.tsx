import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight, ImageIcon } from 'lucide-react'
import { PortfolioGallery } from './PortfolioGallery'
import portfolioItems from '../data/portfolio.json'
import { DEFAULT_PORTFOLIO_CATEGORY, PORTFOLIO_PREVIEW_COUNT } from '../types/portfolio'
import type { PortfolioItem } from '../types/portfolio'

const items = portfolioItems as PortfolioItem[]

const nailArtCount = items.filter((item) => item.category === DEFAULT_PORTFOLIO_CATEGORY).length
const hasMorePortfolio =
  nailArtCount > PORTFOLIO_PREVIEW_COUNT ||
  items.some((item) => item.category !== DEFAULT_PORTFOLIO_CATEGORY)

export function Portfolio() {
  return (
    <section id="portfolio" className="section-padding relative overflow-hidden scroll-mt-24">
      <div className="absolute top-0 left-0 w-72 h-72 rounded-full bg-pastel-pink/50 blur-3xl -z-10" />
      <div className="absolute bottom-0 right-0 w-72 h-72 rounded-full bg-pastel-blue/50 blur-3xl -z-10" />

      <div className="page-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <p className="text-sm font-semibold uppercase tracking-widest text-pink-400 mb-3">
            Our Work
          </p>
          <h2 className="font-display text-4xl sm:text-5xl font-semibold mb-4">Portfolio</h2>
          <p className="text-ink-muted max-w-xl mx-auto">Check out my awesome sets!</p>
        </motion.div>

        {items.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass rounded-3xl p-10 sm:p-14 text-center max-w-lg mx-auto"
          >
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-linear-to-br from-pink-200 to-sky-200 mb-5">
              <ImageIcon size={24} className="text-ink-muted" />
            </div>
            <h3 className="font-display text-xl font-semibold mb-2">Photos coming soon</h3>
            <p className="text-sm text-ink-muted leading-relaxed">
              Add photos to{' '}
              <code className="px-1.5 py-0.5 rounded bg-pastel-blue/50 text-ink text-xs">
                public/portfolio/
              </code>
              , then rebuild the site.
            </p>
          </motion.div>
        ) : (
          <>
            <PortfolioGallery variant="preview" />

            {hasMorePortfolio && (
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="text-center mt-10"
              >
                <Link
                  to="/portfolio"
                  className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-semibold bg-linear-to-r from-pink-300 to-rose-300 text-ink shadow-lg shadow-pink-200/50 hover:shadow-xl hover:-translate-y-0.5 transition-all"
                >
                  Show more
                  <ArrowRight size={18} />
                </Link>
              </motion.div>
            )}
          </>
        )}
      </div>
    </section>
  )
}
