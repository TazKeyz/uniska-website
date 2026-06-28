import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Star, ChevronLeft, ChevronRight, ExternalLink } from 'lucide-react'
import { siteConfig } from '../config'
import reviewsData from '../data/reviews.json'
import type { Review } from '../types/review'

const reviews = reviewsData as Review[]
const CYCLE_MS = 6000

function Stars({ count }: { count: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: count }).map((_, i) => (
        <Star key={i} size={16} className="fill-amber-400 text-amber-400" />
      ))}
    </div>
  )
}

export function Reviews() {
  const [current, setCurrent] = useState(0)
  const [paused, setPaused] = useState(false)

  const next = useCallback(
    () => setCurrent((c) => (c + 1) % reviews.length),
    [],
  )
  const prev = () => setCurrent((c) => (c - 1 + reviews.length) % reviews.length)

  useEffect(() => {
    if (paused || reviews.length <= 1) return
    const timer = setInterval(next, CYCLE_MS)
    return () => clearInterval(timer)
  }, [paused, next])

  const review = reviews[current]

  return (
    <section id="reviews" className="section-padding relative overflow-hidden scroll-mt-24">
      <div className="absolute top-0 right-0 w-80 h-80 rounded-full bg-pastel-blue/50 blur-3xl -z-10" />
      <div className="absolute bottom-0 left-0 w-80 h-80 rounded-full bg-pastel-pink/50 blur-3xl -z-10" />

      <div className="page-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <p className="text-sm font-semibold uppercase tracking-widest text-sky-400 mb-3">
            Client Love
          </p>
          <h2 className="font-display text-4xl sm:text-5xl font-semibold mb-4">
            Fresha Reviews
          </h2>
          <p className="text-ink-muted max-w-xl mx-auto">
            Don&apos;t just take our word for it — see what our clients say on Fresha.
          </p>
        </motion.div>

        <div
          className="relative max-w-2xl mx-auto"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onFocus={() => setPaused(true)}
          onBlur={() => setPaused(false)}
        >
          <div className="glass rounded-3xl p-8 sm:p-12 min-h-[300px] flex flex-col justify-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={review.id}
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -30 }}
                transition={{ duration: 0.4 }}
              >
                <div className="flex items-center gap-4 mb-5">
                  <div className="flex items-center justify-center w-12 h-12 rounded-full bg-linear-to-br from-pink-200 to-sky-200 text-ink font-semibold text-lg shrink-0">
                    {review.initial}
                  </div>
                  <div>
                    <p className="font-semibold">{review.name}</p>
                    <Stars count={review.rating} />
                  </div>
                </div>

                <blockquote className="font-display text-xl sm:text-2xl leading-relaxed mb-6">
                  &ldquo;{review.text}&rdquo;
                </blockquote>

                <div className="flex items-center justify-between gap-4">
                  <p className="text-sm text-ink-muted">{review.date}</p>
                  <div className="flex items-center gap-1 text-sm text-ink-muted shrink-0">
                    <Star size={14} className="fill-amber-400 text-amber-400" />
                    <span>Verified on Fresha</span>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="flex items-center justify-center gap-4 mt-8">
            <button
              onClick={prev}
              className="p-3 rounded-full glass hover:bg-white/80 transition-colors"
              aria-label="Previous review"
            >
              <ChevronLeft size={20} />
            </button>

            <div className="flex gap-2">
              {reviews.map((item, i) => (
                <button
                  key={item.id}
                  onClick={() => setCurrent(i)}
                  className={`h-2 rounded-full transition-all ${
                    i === current ? 'bg-pink-400 w-6' : 'bg-ink-muted/30 w-2'
                  }`}
                  aria-label={`Go to review from ${item.name}`}
                />
              ))}
            </div>

            <button
              onClick={next}
              className="p-3 rounded-full glass hover:bg-white/80 transition-colors"
              aria-label="Next review"
            >
              <ChevronRight size={20} />
            </button>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mt-8"
          >
            <a
              href={siteConfig.freshaUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm font-semibold text-sky-500 hover:text-sky-600 transition-colors"
            >
              See all reviews on Fresha
              <ExternalLink size={14} />
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
