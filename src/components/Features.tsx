import { motion } from 'framer-motion'
import { Heart, Clock, Palette, Package } from 'lucide-react'

const features = [
  {
    icon: Heart,
    title: 'Handcrafted Quality',
    description: 'Each set is carefully designed and quality-checked for a salon-perfect finish.',
  },
  {
    icon: Clock,
    title: 'Lasts 2+ Weeks',
    description: 'Premium materials and proper application mean your nails stay flawless for weeks.',
  },
  {
    icon: Palette,
    title: 'Custom Designs',
    description: "Can't find your dream set? Message me on WhatsApp for a fully bespoke design.",
  },
  {
    icon: Package,
    title: 'Complete Kit',
    description: 'Every order includes adhesive, glue, file, and cuticle stick — ready to apply.',
  },
]

export function Features() {
  return (
    <section id="about" className="section-padding">
      <div className="page-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <p className="text-sm font-semibold uppercase tracking-widest text-pink-400 mb-3">
            Why Uniska
          </p>
          <h2 className="font-display text-4xl sm:text-5xl font-semibold">
            Beauty without the salon wait
          </h2>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -4 }}
              className="glass rounded-2xl p-6 text-center"
            >
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-linear-to-br from-pink-200 to-sky-200 mb-4">
                <feature.icon size={22} className="text-ink" />
              </div>
              <h3 className="font-display text-lg font-semibold mb-2">{feature.title}</h3>
              <p className="text-sm text-ink-muted leading-relaxed">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
