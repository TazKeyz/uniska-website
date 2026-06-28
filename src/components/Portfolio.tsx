import { useMemo, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ZoomIn, ImageIcon, ChevronDown } from 'lucide-react'
import portfolioItems from '../data/portfolio.json'
import {
  DEFAULT_PORTFOLIO_CATEGORY,
  PORTFOLIO_PREVIEW_COUNT,
  type PortfolioItem,
} from '../types/portfolio'

const items = portfolioItems as PortfolioItem[]

function getNumericOrder(item: PortfolioItem) {
  if (item.sortOrder !== undefined && item.sortOrder < 999999) return item.sortOrder
  const filename = item.src.split('/').pop() ?? ''
  const match = filename.match(/^(\d+)/)
  return match ? parseInt(match[1], 10) : 999999
}

function sortByNumeric(a: PortfolioItem, b: PortfolioItem) {
  return getNumericOrder(a) - getNumericOrder(b)
}

function sortItems(list: PortfolioItem[]) {
  return [...list].sort(sortByNumeric)
}

export function Portfolio() {
  const [expanded, setExpanded] = useState(false)
  const [activeCategory, setActiveCategory] = useState(DEFAULT_PORTFOLIO_CATEGORY)
  const [selectedId, setSelectedId] = useState<string | null>(null)

  const categories = useMemo(
    () => ['All', ...new Set(items.map((item) => item.category))],
    [],
  )

  const nailArtItems = useMemo(
    () => sortItems(items.filter((item) => item.category === DEFAULT_PORTFOLIO_CATEGORY)),
    [],
  )

  const previewItems = useMemo(
    () => nailArtItems.slice(0, PORTFOLIO_PREVIEW_COUNT),
    [nailArtItems],
  )

  const filtered = useMemo(() => {
    if (!expanded) return previewItems

    const pool =
      activeCategory === 'All'
        ? items
        : items.filter((item) => item.category === activeCategory)

    return sortItems(pool)
  }, [expanded, activeCategory, previewItems])

  const selected = items.find((item) => item.id === selectedId)

  const canShowMore =
    !expanded &&
    (nailArtItems.length > PORTFOLIO_PREVIEW_COUNT ||
      items.some((item) => item.category !== DEFAULT_PORTFOLIO_CATEGORY))

  return (
    <section id="portfolio" className="section-padding relative overflow-hidden">
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
          <h2 className="font-display text-4xl sm:text-5xl font-semibold mb-4">
            Portfolio
          </h2>
          <p className="text-ink-muted max-w-xl mx-auto">
            {expanded
              ? 'Browse our full collection of nail art, gel sets, and press-ons.'
              : 'A selection of our latest nail art — numbered designs 1–6.'}
          </p>
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
              Name your photos with numbers (e.g.{' '}
              <code className="px-1.5 py-0.5 rounded bg-pastel-pink/50 text-ink text-xs">1.jpg</code>
              ,{' '}
              <code className="px-1.5 py-0.5 rounded bg-pastel-pink/50 text-ink text-xs">2.jpg</code>
              ) inside{' '}
              <code className="px-1.5 py-0.5 rounded bg-pastel-blue/50 text-ink text-xs">
                public/portfolio/Nail Art/
              </code>
              , then restart the dev server.
            </p>
          </motion.div>
        ) : (
          <>
            {expanded && categories.length > 1 && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex flex-wrap justify-center gap-2 mb-10"
              >
                {categories.map((category) => (
                  <button
                    key={category}
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
              </motion.div>
            )}

            <motion.div layout className="grid grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4">
              <AnimatePresence mode="popLayout">
                {filtered.map((item, index) => (
                  <motion.button
                    key={item.id}
                    layout
                    initial={{ opacity: 0, scale: 0.92 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.92 }}
                    transition={{ duration: 0.35, delay: index * 0.04 }}
                    onClick={() => setSelectedId(item.id)}
                    className="group relative overflow-hidden rounded-2xl sm:rounded-3xl text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-pink-300"
                  >
                    <div className="relative w-full aspect-[4/5]">
                      <img
                        src={item.src}
                        alt={item.alt}
                        loading="lazy"
                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-linear-to-t from-ink/70 via-ink/10 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />
                      <div className="absolute inset-0 flex flex-col justify-end p-4 sm:p-5">
                        <span className="text-[10px] sm:text-xs uppercase tracking-widest text-pink-200 font-semibold mb-1">
                          {item.category}
                        </span>
                        <p className="text-white font-display text-base sm:text-lg font-semibold">
                          {item.title}
                        </p>
                      </div>
                      <div className="absolute top-3 right-3 p-2 rounded-full bg-white/20 backdrop-blur-sm text-white opacity-0 group-hover:opacity-100 transition-opacity">
                        <ZoomIn size={16} />
                      </div>
                    </div>
                  </motion.button>
                ))}
              </AnimatePresence>
            </motion.div>

            {canShowMore && (
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="text-center mt-10"
              >
                <button
                  onClick={() => {
                    setExpanded(true)
                    setActiveCategory(DEFAULT_PORTFOLIO_CATEGORY)
                  }}
                  className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-semibold bg-linear-to-r from-pink-300 to-rose-300 text-ink shadow-lg shadow-pink-200/50 hover:shadow-xl hover:shadow-pink-200/60 transition-all hover:-translate-y-0.5"
                >
                  Show more
                  <ChevronDown size={18} />
                </button>
              </motion.div>
            )}

            {expanded && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center mt-8"
              >
                <button
                  onClick={() => {
                    setExpanded(false)
                    setActiveCategory(DEFAULT_PORTFOLIO_CATEGORY)
                  }}
                  className="text-sm font-medium text-ink-muted hover:text-ink transition-colors"
                >
                  Show less
                </button>
              </motion.div>
            )}
          </>
        )}
      </div>

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
              className="relative max-w-3xl w-full glass rounded-3xl overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setSelectedId(null)}
                className="absolute top-4 right-4 z-10 p-2 rounded-full bg-white/80 text-ink hover:bg-white transition-colors"
                aria-label="Close"
              >
                <X size={20} />
              </button>
              <img
                src={selected.src}
                alt={selected.alt}
                className="w-full max-h-[70vh] object-cover"
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
    </section>
  )
}
