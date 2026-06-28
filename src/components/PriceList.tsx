import { motion } from 'framer-motion'
import { priceList } from '../config'

export function PriceList() {
  return (
    <section id="prices" className="section-padding relative overflow-hidden scroll-mt-24">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[36rem] h-[36rem] rounded-full bg-pastel-blue/30 blur-3xl -z-10" />

      <div className="page-container max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <p className="text-sm font-semibold uppercase tracking-widest text-sky-400 mb-3">
            Services & Pricing
          </p>
          <h2 className="font-display text-4xl sm:text-5xl font-semibold mb-4">
            Price List
          </h2>
          <p className="text-ink-muted max-w-xl mx-auto">
            Our latest in-studio prices. Updated {priceList.lastUpdated}.
          </p>
        </motion.div>

        <div className="space-y-8">
          {priceList.categories.map((category, catIndex) => (
            <motion.div
              key={category.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: catIndex * 0.1 }}
              className="glass rounded-3xl overflow-hidden"
            >
              <div className="px-6 sm:px-8 py-5 bg-linear-to-r from-pastel-pink/50 to-pastel-blue/50 border-b border-white/60">
                <h3 className="font-display text-xl sm:text-2xl font-semibold">
                  {category.name}
                </h3>
                {category.description && (
                  <p className="text-sm text-ink-muted mt-1">{category.description}</p>
                )}
              </div>

              <ul className="divide-y divide-pink-100/60">
                {category.items.map((item, itemIndex) => (
                  <motion.li
                    key={item.name}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: itemIndex * 0.05 }}
                    className="px-6 sm:px-8 py-4 sm:py-5 hover:bg-white/40 transition-colors"
                  >
                    <div className="flex items-baseline gap-3">
                      <span className="font-medium shrink-0">{item.name}</span>
                      <span
                        className="flex-1 border-b border-dotted border-ink-muted/25 min-w-[1rem] mb-1"
                        aria-hidden
                      />
                      <span className="font-semibold text-sky-600 shrink-0 tabular-nums">
                        {item.price}
                      </span>
                    </div>
                    {'note' in item && typeof item.note === 'string' && (
                      <p className="text-sm text-ink-muted mt-1.5">{item.note}</p>
                    )}
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        <motion.blockquote
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-10 text-center font-display text-lg sm:text-xl italic text-ink-muted max-w-lg mx-auto"
        >
          &ldquo;{priceList.quote}&rdquo;
        </motion.blockquote>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-6 text-center"
        >
          <p className="text-sm text-ink-muted">{priceList.footerNote}</p>
        </motion.div>
      </div>
    </section>
  )
}
