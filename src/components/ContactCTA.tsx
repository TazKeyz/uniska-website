import { motion } from 'framer-motion'
import { MessageCircle, Calendar, MapPin } from 'lucide-react'
import { siteConfig, getWhatsAppUrl } from '../config'
import { SocialLinks } from './SocialLinks'

export function ContactCTA() {
  return (
    <section id="contact" className="section-padding scroll-mt-24">
      <div className="page-container">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="relative rounded-[2rem] overflow-hidden"
        >
          <div className="absolute inset-0 bg-linear-to-br from-pink-200 via-rose-100 to-sky-200" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.4),transparent_50%)]" />

          <div className="relative px-8 py-16 sm:px-16 sm:py-20 text-center">
            <h2 className="font-display text-4xl sm:text-5xl font-semibold mb-4">
              Get in touch
            </h2>
            <p className="text-ink-muted max-w-lg mx-auto mb-8">
              Book an in-studio appointment on Fresha, or message on WhatsApp for press-on orders
              and questions.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <motion.a
                href={siteConfig.freshaUrl}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full font-semibold bg-linear-to-r from-sky-300 to-blue-300 text-ink shadow-lg hover:shadow-xl transition-shadow"
              >
                <Calendar size={20} />
                Book on Fresha
              </motion.a>

              <motion.a
                href={getWhatsAppUrl()}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full font-semibold bg-[#25D366] text-white shadow-lg shadow-green-200/50 hover:shadow-xl transition-shadow"
              >
                <MessageCircle size={20} />
                WhatsApp {siteConfig.phoneDisplay}
              </motion.a>
            </div>

            <p className="inline-flex items-center justify-center gap-2 text-sm text-ink-muted mb-10">
              <MapPin size={16} className="text-sky-400 shrink-0" />
              {siteConfig.address}
            </p>

            <div>
              <p className="text-sm font-medium text-ink-muted mb-4">Follow us</p>
              <SocialLinks />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
