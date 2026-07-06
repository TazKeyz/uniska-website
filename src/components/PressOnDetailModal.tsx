import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ShoppingBag, X, Sparkles, Heart } from 'lucide-react'
import { getWhatsAppUrl } from '../config'
import type { PressOnProduct } from '../types/press-on'

export const PRESS_ON_SHAPES = [
  'Almond',
  'Coffin',
  'Square',
  'Oval',
  'Round',
  'Stiletto',
] as const

export const PRESS_ON_LENGTHS = ['Short', 'Medium', 'Long', 'Extra Long'] as const

export type PressOnShape = (typeof PRESS_ON_SHAPES)[number]
export type PressOnLength = (typeof PRESS_ON_LENGTHS)[number]

const kitItems = [
  { emoji: '✨', label: 'Cuticle pusher' },
  { emoji: '💗', label: 'Sticky tabs' },
  { emoji: '💅', label: 'Nail buffer' },
  { emoji: '🫧', label: 'Alcohol wipes' },
  { emoji: '🎀', label: '1 set of 10 nails' },
]

type PressOnDetailModalProps = {
  product: PressOnProduct | null
  onClose: () => void
}

function OptionPill({
  label,
  selected,
  onClick,
}: {
  label: string
  selected: boolean
  onClick: () => void
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`px-3.5 py-2 rounded-full text-sm font-semibold transition-all duration-200 ${
        selected
          ? 'bg-linear-to-r from-pink-300 to-rose-300 text-ink shadow-md shadow-pink-200/60 scale-[1.02]'
          : 'bg-white/70 text-ink-muted hover:bg-white hover:text-ink border border-pink-100/80'
      }`}
    >
      {label}
    </button>
  )
}

export function PressOnDetailModal({ product, onClose }: PressOnDetailModalProps) {
  const [shape, setShape] = useState<PressOnShape>('Almond')
  const [length, setLength] = useState<PressOnLength>('Medium')

  useEffect(() => {
    if (product) {
      setShape('Almond')
      setLength('Medium')
    }
  }, [product?.id])

  const orderMessage = product
    ? `Hi! I'd like to order the ${product.name} press-on set (${product.priceDisplay}).\n\nShape: ${shape}\nLength: ${length}`
    : ''

  return (
    <AnimatePresence>
      {product && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center p-0 sm:p-6 bg-ink/80 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.98 }}
            transition={{ type: 'spring', stiffness: 320, damping: 30 }}
            className="relative w-full sm:max-w-lg max-h-[94vh] glass rounded-t-[2rem] sm:rounded-[2rem] overflow-hidden flex flex-col shadow-2xl shadow-pink-200/30"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={onClose}
              className="absolute top-4 right-4 z-10 p-2 rounded-full bg-white/90 text-ink hover:bg-white transition-colors shadow-sm"
              aria-label="Close"
            >
              <X size={20} />
            </button>

            <div className="overflow-y-auto">
              <div className="relative bg-linear-to-b from-pastel-pink/40 to-white/80 px-4 pt-5 pb-3">
                <img
                  src={product.fullSrc}
                  alt={product.alt}
                  className="w-full max-h-[38vh] object-contain mx-auto drop-shadow-sm"
                />
              </div>

              <div className="px-5 sm:px-6 pb-6 pt-4 space-y-5">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-widest text-pink-400 mb-1">
                      Your pick
                    </p>
                    <h3 className="font-display text-2xl font-semibold leading-tight">
                      {product.name}
                    </h3>
                  </div>
                  <span className="font-semibold text-pink-500 shrink-0 tabular-nums text-lg">
                    {product.priceDisplay}
                  </span>
                </div>

                <div>
                  <p className="text-sm font-semibold text-ink mb-2.5 flex items-center gap-1.5">
                    <Sparkles size={15} className="text-pink-400" />
                    Pick your shape
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {PRESS_ON_SHAPES.map((option) => (
                      <OptionPill
                        key={option}
                        label={option}
                        selected={shape === option}
                        onClick={() => setShape(option)}
                      />
                    ))}
                  </div>
                </div>

                <div>
                  <p className="text-sm font-semibold text-ink mb-2.5 flex items-center gap-1.5">
                    <Heart size={14} className="text-rose-400 fill-rose-200" />
                    Choose your length
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {PRESS_ON_LENGTHS.map((option) => (
                      <OptionPill
                        key={option}
                        label={option}
                        selected={length === option}
                        onClick={() => setLength(option)}
                      />
                    ))}
                  </div>
                </div>

                <div className="rounded-2xl bg-linear-to-br from-pastel-pink/70 via-white/80 to-pastel-blue/70 p-4 border border-white/90">
                  <p className="font-display text-base font-semibold text-ink mb-3">
                    Every set comes with…
                  </p>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {kitItems.map((item) => (
                      <li
                        key={item.label}
                        className="flex items-center gap-2.5 text-sm text-ink bg-white/60 rounded-xl px-3 py-2 border border-pink-100/60"
                      >
                        <span className="text-base leading-none" aria-hidden>
                          {item.emoji}
                        </span>
                        <span>{item.label}</span>
                      </li>
                    ))}
                  </ul>
                  <p className="text-xs text-ink-muted mt-3 leading-relaxed">
                    Everything you need for a dreamy at-home mani — just pick your shape & length,
                    then tap order!
                  </p>
                </div>

                <a
                  href={getWhatsAppUrl(orderMessage)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 w-full py-3.5 rounded-full text-sm font-semibold bg-ink text-white hover:bg-ink/90 transition-colors shadow-lg shadow-pink-200/40"
                >
                  <ShoppingBag size={16} />
                  Order {shape} · {length} via WhatsApp
                </a>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
