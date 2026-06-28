import { motion } from 'framer-motion'
import { Sparkles, MapPin, Palette, ShoppingBag } from 'lucide-react'

const features = [
  {
    icon: Sparkles,
    title: 'In-Studio Services',
    description:
      'Gel overlays, polygel tips, manicures, and nail art — done with care at our Kingsburgh studio.',
  },
  {
    icon: Palette,
    title: 'Custom Nail Art',
    description:
      'From French and ombré to chrome and detailed art. Every set tailored to your style.',
  },
  {
    icon: ShoppingBag,
    title: 'Press-On Sets',
    description:
      'Custom press-on nail sets — browse the shop section and order when you are ready.',
  },
  {
    icon: MapPin,
    title: 'Easy to Reach',
    description:
      'Convenient Kingsburgh location — book your appointment online through Fresha.',
  },
]

export function Features() {
  return (
    <section id="about" className="section-padding scroll-mt-24">
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
          <h2 className="font-display text-4xl sm:text-5xl font-semibold mb-4">
            Studio services & press-ons
          </h2>
          <p className="text-ink-muted max-w-xl mx-auto">
            Whether you book a gel appointment or order a press-on set, you get the same attention to
            detail.
          </p>
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
