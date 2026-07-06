import { useMemo, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ZoomIn } from 'lucide-react'
import portfolioItems from '../data/portfolio.json'
import {
  DEFAULT_PORTFOLIO_CATEGORY,
  PORTFOLIO_PREVIEW_COUNT,
  portfolioImageClass,
  type PortfolioItem,
} from '../types/portfolio'

const items = portfolioItems as PortfolioItem[]

function getNumericOrder(item: PortfolioItem) {
  if (item.sortOrder !== undefined && item.sortOrder < 999999) return item.sortOrder
  const filename = item.src.split('/').pop() ?? ''
  const match = filename.match(/^(\d+)/)
  return match ? parseInt(match[1], 10) : 999999
}

function sortItems(list: PortfolioItem[]) {
  return [...list].sort((a, b) => getNumericOrder(a) - getNumericOrder(b))
}

type PortfolioGalleryProps = {
  variant?: 'preview' | 'full'
}

export function PortfolioGallery({ variant = 'full' }: PortfolioGalleryProps) {
  const isPreview = variant === 'preview'
  const [activeCategory, setActiveCategory] = useState('All')
  const [selectedId, setSelectedId] = useState<string | null>(null)

  const categories = useMemo(
    () => ['All', ...new Set(items.map((item) => item.category))],
    [],
  )

  const nailArtItems = useMemo(
    () => sortItems(items.filter((item) => item.category === DEFAULT_PORTFOLIO_CATEGORY)),
    [],
  )

  const filtered = useMemo(() => {
    if (isPreview) {
      return nailArtItems.slice(0, PORTFOLIO_PREVIEW_COUNT)
    }

    const pool =
      activeCategory === 'All'
        ? items
        : items.filter((item) => item.category === activeCategory)

    return sortItems(pool)
  }, [isPreview, activeCategory, nailArtItems])

  const selected = items.find((item) => item.id === selectedId)

  return (
    <>
      {!isPreview && categories.length > 1 && (
        <div className="sticky top-[4.5rem] z-40 -mx-4 px-4 py-4 mb-8 bg-cream/90 backdrop-blur-md border-b border-pink-100/60 sm:static sm:mx-0 sm:px-0 sm:py-0 sm:mb-10 sm:bg-transparent sm:backdrop-blur-none sm:border-0">
          <div className="flex flex-wrap justify-center gap-2">
            {categories.map((category) => (
              <button
                key={category}
                type="button"
                onClick={() => setActiveCategory(category)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  activeCategory === category
                    ? 'bg-ink text-white shadow-md'
                    : 'glass text-ink-muted hover:text-ink hover:bg-white/80'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      )}

      <motion.div
        layout={!isPreview}
        className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4"
      >
        <AnimatePresence mode={isPreview ? undefined : 'popLayout'}>
          {filtered.map((item, index) => (
            <motion.button
              key={item.id}
              type="button"
              layout={!isPreview}
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={isPreview ? undefined : { opacity: 0, scale: 0.92 }}
              transition={{ duration: 0.35, delay: isPreview ? index * 0.05 : index * 0.02 }}
              onClick={() => setSelectedId(item.id)}
              className="group relative overflow-hidden rounded-2xl sm:rounded-3xl text-left bg-white shadow-md shadow-pink-100/40 border border-pink-100/60 focus:outline-none focus-visible:ring-2 focus-visible:ring-pink-300"
            >
              <img
                src={item.src}
                alt={item.alt}
                loading="lazy"
                className={portfolioImageClass}
              />
              <div className="p-3 sm:p-4 border-t border-pink-100/50">
                <span className="text-[10px] sm:text-xs uppercase tracking-widest text-pink-400 font-semibold mb-1 block">
                  {item.category}
                </span>
                <p className="text-ink font-display text-base sm:text-lg font-semibold leading-snug">
                  {item.title}
                </p>
              </div>
              <div className="absolute top-3 right-3 p-2 rounded-full bg-white/90 text-ink shadow-md opacity-0 group-hover:opacity-100 transition-opacity">
                <ZoomIn size={16} />
              </div>
            </motion.button>
          ))}
        </AnimatePresence>
      </motion.div>

      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-8 bg-ink/80 backdrop-blur-sm"
            onClick={() => setSelectedId(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: 'spring', stiffness: 300, damping: 28 }}
              className="relative max-w-3xl w-full bg-white rounded-3xl overflow-hidden shadow-2xl shadow-pink-200/30 border border-pink-100/80"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                type="button"
                onClick={() => setSelectedId(null)}
                className="absolute top-4 right-4 z-20 p-2.5 rounded-full bg-white/95 text-ink hover:bg-white transition-colors shadow-lg border border-pink-100/80"
                aria-label="Close"
              >
                <X size={20} />
              </button>
              <img
                src={selected.src}
                alt={selected.alt}
                className="w-full max-h-[85vh] object-contain bg-white block"
              />
              <div className="p-5 sm:p-6">
                <span className="text-xs uppercase tracking-widest text-pink-400 font-semibold">
                  {selected.category}
                </span>
                <h3 className="font-display text-2xl font-semibold mt-1">{selected.title}</h3>
                {selected.description && (
                  <p className="text-ink-muted mt-2 text-sm">{selected.description}</p>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export { items as portfolioItems }
