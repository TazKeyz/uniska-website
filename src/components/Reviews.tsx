import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Star, ChevronLeft, ChevronRight, ExternalLink } from 'lucide-react'
import { reviews, siteConfig } from '../config'

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

  const next = () => setCurrent((c) => (c + 1) % reviews.length)
  const prev = () => setCurrent((c) => (c - 1 + reviews.length) % reviews.length)

  return (
    <section id="reviews" className="section-padding relative overflow-hidden">
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
            Don't just take our word for it — see what our clients say on Fresha.
          </p>
        </motion.div>

        <div className="relative max-w-2xl mx-auto">
          <div className="glass rounded-3xl p-8 sm:p-12 min-h-[280px] flex flex-col justify-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={current}
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -30 }}
                transition={{ duration: 0.4 }}
              >
                <Stars count={reviews[current].rating} />
                <blockquote className="font-display text-xl sm:text-2xl leading-relaxed my-6">
                  &ldquo;{reviews[current].text}&rdquo;
                </blockquote>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-semibold">{reviews[current].name}</p>
                    <p className="text-sm text-ink-muted">{reviews[current].date}</p>
                  </div>
                  <div className="flex items-center gap-1 text-sm text-ink-muted">
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
              {reviews.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  className={`w-2 h-2 rounded-full transition-all ${
                    i === current ? 'bg-pink-400 w-6' : 'bg-ink-muted/30'
                  }`}
                  aria-label={`Go to review ${i + 1}`}
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
