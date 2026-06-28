import { motion } from 'framer-motion'
import { ShoppingBag } from 'lucide-react'
import { products, getWhatsAppUrl } from '../config'

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
}

const item = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
}

export function Products() {
  return (
    <section id="shop" className="section-padding relative">
      <div className="absolute inset-0 -z-10 bg-linear-to-b from-cream via-pastel-pink/20 to-cream" />

      <div className="page-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <p className="text-sm font-semibold uppercase tracking-widest text-pink-400 mb-3">
            The Collection
          </p>
          <h2 className="font-display text-4xl sm:text-5xl font-semibold mb-4">
            Press-On Sets
          </h2>
          <p className="text-ink-muted max-w-xl mx-auto">
            Each set includes 24 nails in multiple sizes, adhesive tabs, glue, a mini file,
            and a cuticle stick — everything you need for a flawless application.
          </p>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-50px' }}
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {products.map((product) => (
            <motion.article
              key={product.id}
              variants={item}
              whileHover={{ y: -6 }}
              className="group glass rounded-3xl overflow-hidden"
            >
              <div
                className={`relative h-56 bg-linear-to-br ${product.gradient} flex items-center justify-center overflow-hidden`}
              >
                {product.tag && (
                  <span className="absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-semibold bg-white/80 text-ink backdrop-blur-sm">
                    {product.tag}
                  </span>
                )}
                <div className="w-20 h-28 rounded-t-full rounded-b-lg bg-white/30 backdrop-blur-sm border border-white/50 shadow-inner group-hover:scale-110 transition-transform duration-500" />
              </div>

              <div className="p-6">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="font-display text-xl font-semibold">{product.name}</h3>
                  <span className="font-semibold text-pink-500">{product.price}</span>
                </div>
                <p className="text-sm text-ink-muted mb-5">{product.description}</p>
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
      </div>
    </section>
  )
}
