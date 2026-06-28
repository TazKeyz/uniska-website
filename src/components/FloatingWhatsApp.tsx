import { motion } from 'framer-motion'
import { MessageCircle } from 'lucide-react'
import { getWhatsAppUrl } from '../config'

export function FloatingWhatsApp() {
  return (
    <motion.a
      href={getWhatsAppUrl()}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 1, duration: 0.4 }}
      whileHover={{ scale: 1.08 }}
      whileTap={{ scale: 0.95 }}
      aria-label="Chat on WhatsApp"
      className="fixed bottom-6 right-6 z-50 flex items-center justify-center w-14 h-14 rounded-full bg-[#25D366] text-white shadow-lg shadow-green-300/40 hover:shadow-xl transition-shadow"
    >
      <MessageCircle size={28} />
    </motion.a>
  )
}
