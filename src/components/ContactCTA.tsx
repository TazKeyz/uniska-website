import { motion } from 'framer-motion'
import { MessageCircle, Calendar } from 'lucide-react'
import { siteConfig, getWhatsAppUrl } from '../config'
import { SocialLinks } from './SocialLinks'

export function ContactCTA() {
  return (
    <section id="contact" className="section-padding">
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
              Ready for gorgeous nails?
            </h2>
            <p className="text-ink-muted max-w-lg mx-auto mb-2">
              Book your appointment via WhatsApp or Fresha — we&apos;d love to see you at the studio.
            </p>
            <p className="text-sm text-ink-muted mb-10">{siteConfig.address}</p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-10">
              <motion.a
                href={getWhatsAppUrl()}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full font-semibold bg-[#25D366] text-white shadow-lg shadow-green-200/50 hover:shadow-xl transition-shadow"
              >
                <MessageCircle size={20} />
                Contact on WhatsApp
              </motion.a>

              <motion.a
                href={siteConfig.freshaUrl}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full font-semibold bg-white text-ink shadow-lg hover:shadow-xl transition-shadow"
              >
                <Calendar size={20} />
                Book on Fresha
              </motion.a>
            </div>

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
