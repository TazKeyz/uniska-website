import { useState } from 'react'
import { motion } from 'framer-motion'
import { ShoppingBag } from 'lucide-react'
import { PressOnDetailModal } from './PressOnDetailModal'
import { pressOnImageFrameClass, type PressOnProduct } from '../types/press-on'

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
}

const item = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
}

type PressOnGridProps = {
  products: PressOnProduct[]
  animateOnScroll?: boolean
}

export function PressOnGrid({ products, animateOnScroll = true }: PressOnGridProps) {
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const selected = products.find((product) => product.id === selectedId) ?? null

  if (products.length === 0) {
    return <p className="text-center text-ink-muted">Press-on sets coming soon.</p>
  }

  return (
    <>
      <motion.div
        variants={container}
        initial={animateOnScroll ? 'hidden' : false}
        whileInView={animateOnScroll ? 'show' : undefined}
        animate={animateOnScroll ? undefined : 'show'}
        viewport={{ once: true, margin: '-50px' }}
        className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
      >
        {products.map((product) => (
          <motion.article
            key={product.id}
            variants={item}
            whileHover={{ y: -6 }}
            className="group glass rounded-3xl overflow-hidden flex flex-col h-full"
          >
            <button
              type="button"
              onClick={() => setSelectedId(product.id)}
              className={`relative block w-full ${pressOnImageFrameClass} overflow-hidden cursor-pointer bg-pastel-pink/40`}
              aria-label={`View ${product.name}`}
            >
              <img
                src={product.fullSrc}
                alt={product.alt}
                className="absolute inset-0 w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-linear-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <span className="absolute bottom-4 left-4 right-4 text-white font-display text-lg font-semibold drop-shadow opacity-0 group-hover:opacity-100 transition-opacity">
                View set
              </span>
            </button>

            <div className="p-5 flex flex-col flex-1">
              <div className="flex items-start justify-between gap-3 mb-4">
                <h3 className="font-display text-xl font-semibold">{product.name}</h3>
                <span className="font-semibold text-pink-500 shrink-0 tabular-nums">
                  {product.priceDisplay}
                </span>
              </div>
              <button
                type="button"
                onClick={() => setSelectedId(product.id)}
                className="inline-flex items-center gap-2 w-full justify-center py-3 rounded-full text-sm font-semibold bg-linear-to-r from-pink-300 to-rose-300 text-ink hover:shadow-md hover:shadow-pink-200/50 transition-all mt-auto"
              >
                <ShoppingBag size={16} />
                Choose shape & length
              </button>
            </div>
          </motion.article>
        ))}
      </motion.div>

      <PressOnDetailModal product={selected} onClose={() => setSelectedId(null)} />
    </>
  )
}
