import { motion } from 'framer-motion'
import { MessageCircle } from 'lucide-react'
import { siteConfig, getWhatsAppUrl } from '../config'
import { SocialLinks } from './SocialLinks'
import { BrandName } from './BrandName'

export function FloatingWhatsApp() {
  return (
    <motion.a
      href={getWhatsAppUrl()}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 1.5, type: 'spring', stiffness: 200 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      className="fixed bottom-6 right-6 z-50 flex items-center justify-center w-14 h-14 rounded-full bg-[#25D366] text-white shadow-lg shadow-green-300/40 hover:shadow-xl transition-shadow"
      aria-label="Contact on WhatsApp"
    >
      <MessageCircle size={26} />
    </motion.a>
  )
}

export function Footer() {
  return (
    <footer className="border-t border-pink-100/80 py-12">
      <div className="page-container">
        <div className="flex flex-col items-center gap-8 sm:gap-6">
          <div className="text-center">
            <BrandName variant="footer" className="mb-1" />
            <p className="text-sm text-ink-muted mt-3">{siteConfig.tagline}</p>
          </div>

          <SocialLinks />

          <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-center">
            <a
              href={getWhatsAppUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="text-ink-muted hover:text-ink transition-colors"
            >
              WhatsApp: {siteConfig.phoneDisplay}
            </a>
            <a
              href={siteConfig.freshaUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-ink-muted hover:text-ink transition-colors"
            >
              Fresha
            </a>
            <span className="text-ink-muted">{siteConfig.address}</span>
          </div>
        </div>

        <p className="text-center text-xs text-ink-muted mt-8">
          © {new Date().getFullYear()} {siteConfig.brandName}. All rights reserved.
        </p>
      </div>
    </footer>
  )
}
