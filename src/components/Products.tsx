import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ShoppingBag, X } from 'lucide-react'
import { getWhatsAppUrl } from '../config'
import pressOns from '../data/press-ons.json'

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
}

const item = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
}

export function Products() {
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const selected = pressOns.find((product) => product.id === selectedId)

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

        {pressOns.length === 0 ? (
          <p className="text-center text-ink-muted">Press-on sets coming soon.</p>
        ) : (
          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-50px' }}
            className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          >
            {pressOns.map((product) => (
              <motion.article
                key={product.id}
                variants={item}
                whileHover={{ y: -6 }}
                className="group glass rounded-3xl overflow-hidden"
              >
                <button
                  type="button"
                  onClick={() => setSelectedId(product.id)}
                  className="relative block w-full h-56 overflow-hidden cursor-pointer"
                  aria-label={`View ${product.name}`}
                >
                  <img
                    src={product.coverSrc}
                    alt={product.alt}
                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  <span className="absolute bottom-4 left-4 right-4 text-white font-display text-lg font-semibold drop-shadow opacity-0 group-hover:opacity-100 transition-opacity">
                    View set
                  </span>
                </button>

                <div className="p-5">
                  <h3 className="font-display text-xl font-semibold mb-4">{product.name}</h3>
                  <a
                    href={getWhatsAppUrl(`Hi! I'd like to order the ${product.name} press-on set.`)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 w-full justify-center py-3 rounded-full text-sm font-semibold bg-ink text-white hover:bg-ink/90 transition-colors"
                  >
                    <ShoppingBag size={16} />
                    Order via WhatsApp
                  </a>
                </div>
              </motion.article>
            ))}
          </motion.div>
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
                type="button"
                onClick={() => setSelectedId(null)}
                className="absolute top-4 right-4 z-10 p-2 rounded-full bg-white/80 text-ink hover:bg-white transition-colors"
                aria-label="Close"
              >
                <X size={20} />
              </button>
              <img
                src={selected.fullSrc}
                alt={selected.alt}
                className="w-full max-h-[70vh] object-contain bg-white/50"
              />
              <div className="p-5 sm:p-6">
                <h3 className="font-display text-2xl font-semibold">{selected.name}</h3>
                <a
                  href={getWhatsAppUrl(`Hi! I'd like to order the ${selected.name} press-on set.`)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 mt-4 px-6 py-3 rounded-full text-sm font-semibold bg-ink text-white hover:bg-ink/90 transition-colors"
                >
                  <ShoppingBag size={16} />
                  Order via WhatsApp
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
