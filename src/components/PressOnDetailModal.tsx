import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ShoppingBag, X, Sparkles, Heart, ZoomIn } from 'lucide-react'
import { getWhatsAppUrl } from '../config'
import { pressOnImageFrameClass, type PressOnProduct } from '../types/press-on'

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
          : 'bg-white text-ink-muted hover:bg-pastel-pink/30 hover:text-ink border border-pink-200/70 shadow-sm'
      }`}
    >
      {label}
    </button>
  )
}

export function PressOnDetailModal({ product, onClose }: PressOnDetailModalProps) {
  const [shape, setShape] = useState<PressOnShape | null>(null)
  const [length, setLength] = useState<PressOnLength | null>(null)
  const [imageExpanded, setImageExpanded] = useState(false)

  useEffect(() => {
    if (product) {
      setShape(null)
      setLength(null)
      setImageExpanded(false)
    }
  }, [product?.id])

  const canOrder = shape !== null && length !== null

  const orderMessage =
    product && canOrder
      ? `Hi! I'd like to order the ${product.name} press-on set (${product.priceDisplay}).\n\nShape: ${shape}\nLength: ${length}`
      : ''

  return (
    <AnimatePresence>
      {product && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] overflow-y-auto overscroll-contain bg-rose-950/30 backdrop-blur-md"
          onClick={onClose}
        >
          <div className="min-h-full flex items-end sm:items-center justify-center p-0 sm:p-6">
            <motion.div
              initial={{ opacity: 0, y: 40, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 24, scale: 0.98 }}
              transition={{ type: 'spring', stiffness: 320, damping: 30 }}
              className="relative w-full sm:max-w-lg rounded-t-[2rem] sm:rounded-[2rem] border border-pink-100/90 bg-cream shadow-2xl shadow-pink-300/40"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="sticky top-0 z-50 flex justify-end p-3 sm:p-4 bg-linear-to-b from-cream from-70% to-transparent pointer-events-none">
                <button
                  type="button"
                  onClick={onClose}
                  className="pointer-events-auto p-2.5 rounded-full bg-white text-ink hover:bg-pastel-pink/50 transition-colors shadow-lg shadow-pink-200/50 border border-pink-100/80"
                  aria-label="Close"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="-mt-14 sm:-mt-16 relative">
                <div className="pointer-events-none absolute -top-16 -right-10 w-40 h-40 rounded-full bg-pastel-pink/70 blur-3xl" />
                <div className="pointer-events-none absolute top-1/3 -left-12 w-36 h-36 rounded-full bg-pastel-blue/60 blur-3xl" />

                <div className="relative bg-linear-to-br from-pastel-pink/80 via-white to-pastel-blue/70 px-4 pt-2 pb-4 border-b border-pink-100/70">
                <button
                  type="button"
                  onClick={() => setImageExpanded(true)}
                  className={`relative z-10 block w-full ${pressOnImageFrameClass} overflow-hidden rounded-2xl group cursor-zoom-in`}
                  aria-label={`View full size image of ${product.name}`}
                >
                  <img
                    src={product.fullSrc}
                    alt={product.alt}
                    className="absolute inset-0 w-full h-full object-cover object-center drop-shadow-md group-hover:scale-[1.02] transition-transform duration-300"
                  />
                  <span className="absolute bottom-2 right-2 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-white/90 text-ink shadow-md border border-pink-100/80 opacity-90 group-hover:opacity-100 transition-opacity">
                    <ZoomIn size={14} className="text-pink-400" />
                    Tap to enlarge
                  </span>
                </button>
              </div>

              <div className="relative px-5 sm:px-6 pb-6 pt-5 space-y-5 bg-linear-to-b from-cream via-white to-pastel-pink/25">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-widest text-pink-400 mb-1">
                      Your pick ✨
                    </p>
                    <h3 className="font-display text-2xl font-semibold leading-tight text-ink">
                      {product.name}
                    </h3>
                  </div>
                  <span className="font-semibold text-pink-500 shrink-0 tabular-nums text-lg bg-white/80 px-3 py-1 rounded-full border border-pink-100 shadow-sm">
                    {product.priceDisplay}
                  </span>
                </div>

                <div className="rounded-2xl bg-white/75 border border-pink-100/80 p-4 shadow-sm shadow-pink-100/40">
                  <p className="text-sm font-semibold text-ink mb-2.5 flex items-center gap-1.5">
                    <Sparkles size={15} className="text-pink-400" />
                    Pick your shape
                    <span className="text-pink-400 text-xs font-bold">*</span>
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
                  {shape === null && (
                    <p className="text-xs text-pink-400/80 mt-2">Please choose a shape to continue 💅</p>
                  )}
                </div>

                <div className="rounded-2xl bg-white/75 border border-sky-100/80 p-4 shadow-sm shadow-sky-100/30">
                  <p className="text-sm font-semibold text-ink mb-2.5 flex items-center gap-1.5">
                    <Heart size={14} className="text-rose-400 fill-rose-200" />
                    Choose your length
                    <span className="text-pink-400 text-xs font-bold">*</span>
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
                  {length === null && (
                    <p className="text-xs text-pink-400/80 mt-2">Please choose a length to continue 💖</p>
                  )}
                </div>

                <div className="rounded-2xl bg-linear-to-br from-pastel-pink/80 via-white to-pastel-blue/80 p-4 border border-white shadow-sm shadow-pink-100/50">
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

                {canOrder ? (
                  <a
                    href={getWhatsAppUrl(orderMessage)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 w-full py-3.5 rounded-full text-sm font-semibold bg-linear-to-r from-pink-300 via-rose-300 to-pink-400 text-ink hover:shadow-lg hover:shadow-pink-200/60 transition-all hover:-translate-y-0.5"
                  >
                    <ShoppingBag size={16} />
                    Order {shape} · {length} via WhatsApp
                  </a>
                ) : (
                  <button
                    type="button"
                    disabled
                    className="inline-flex items-center justify-center gap-2 w-full py-3.5 rounded-full text-sm font-semibold bg-pastel-pink/50 text-ink-muted border border-pink-200/60 cursor-not-allowed"
                    aria-disabled
                  >
                    <ShoppingBag size={16} />
                    Pick shape & length to order
                  </button>
                )}
              </div>
            </div>
            </motion.div>
          </div>

          <AnimatePresence>
            {imageExpanded && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-ink/85 backdrop-blur-sm"
                onClick={() => setImageExpanded(false)}
              >
                <button
                  type="button"
                  onClick={() => setImageExpanded(false)}
                  className="absolute top-4 right-4 z-10 p-2.5 rounded-full bg-white text-ink hover:bg-pastel-pink/50 transition-colors shadow-lg"
                  aria-label="Close full size image"
                >
                  <X size={22} />
                </button>
                <motion.img
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 28 }}
                  src={product.fullSrc}
                  alt={product.alt}
                  className="max-w-full max-h-[90vh] object-contain rounded-2xl shadow-2xl"
                  onClick={(e) => e.stopPropagation()}
                />
                <p className="absolute bottom-6 left-0 right-0 text-center text-sm text-white/80 font-medium">
                  {product.name}
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
