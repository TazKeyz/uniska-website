import { motion } from 'framer-motion'
import { Sparkles, Calendar, Star } from 'lucide-react'
import { siteConfig } from '../config'
import { BrandName } from './BrandName'
import { getNailArtPhoto } from '../utils/portfolio'

const offerings = ['Gel & Polygel', 'Nail Art', 'Press-On Sets']

export function Hero() {
  const heroPhoto = getNailArtPhoto(1)

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden pt-24 scroll-mt-24">
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-20 -left-32 w-96 h-96 rounded-full bg-pastel-pink/60 blur-3xl animate-float" />
        <div className="absolute bottom-20 -right-32 w-[28rem] h-[28rem] rounded-full bg-pastel-blue/70 blur-3xl animate-float-delayed" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[40rem] h-[40rem] rounded-full bg-linear-to-br from-pink-100/40 to-sky-100/40 blur-3xl" />
      </div>

      <div className="page-container w-full">
        <div className="grid lg:grid-cols-2 gap-10 xl:gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass text-sm font-medium text-ink-muted mb-6"
            >
              <Sparkles size={16} className="text-pink-400" />
              Kingsburgh nail studio
            </motion.div>

            <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl font-semibold leading-[1.1] tracking-tight mb-6">
              Nail services &{' '}
              <span className="text-gradient">press-ons</span>
            </h1>

            <p className="text-lg text-ink-muted leading-relaxed max-w-lg mb-6">
              {siteConfig.description}
            </p>

            <div className="flex flex-wrap gap-2 mb-8">
              {offerings.map((item) => (
                <span
                  key={item}
                  className="px-3 py-1.5 rounded-full text-xs font-semibold bg-linear-to-r from-pastel-pink/80 to-pastel-blue/80 text-ink"
                >
                  {item}
                </span>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row flex-wrap gap-4">
              <motion.a
                href={siteConfig.freshaUrl}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full font-semibold bg-linear-to-r from-sky-300 to-blue-300 text-ink shadow-lg shadow-sky-200/50 hover:shadow-xl transition-shadow"
              >
                <Calendar size={20} />
                Book on Fresha
              </motion.a>

              <motion.a
                href="#shop"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full font-semibold bg-linear-to-r from-pink-300 to-rose-300 text-ink shadow-lg shadow-pink-200/50 hover:shadow-xl hover:shadow-pink-200/60 transition-shadow"
              >
                View Press-Ons
              </motion.a>

              <motion.a
                href="#prices"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full font-semibold glass hover:bg-white/80 transition-colors"
              >
                View Prices
              </motion.a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="relative hidden lg:block overflow-visible"
          >
            <div className="relative aspect-square max-w-lg mx-auto overflow-visible">
              <motion.a
                href={siteConfig.freshaUrl}
                target="_blank"
                rel="noopener noreferrer"
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute top-12 -left-3 w-44 h-64 rounded-3xl bg-linear-to-br from-zinc-950 via-zinc-900 to-zinc-800 shadow-2xl shadow-black/35 -rotate-8 border border-white/10 overflow-hidden flex flex-col items-center justify-center px-4 py-6 text-center hover:border-white/20 hover:shadow-black/45 transition-all"
              >
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(255,255,255,0.08),transparent_50%)]" />
                <div className="relative z-10 w-full">
                  <div className="flex justify-center gap-0.5 mb-3">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} size={15} className="fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <p className="text-white font-display text-2xl font-semibold leading-none tracking-tight">
                    {siteConfig.freshaRating.toFixed(1)}
                  </p>
                  <p className="text-zinc-300 text-sm font-medium mt-1.5">on Fresha</p>
                  <p className="text-zinc-400 text-xs mt-2.5">{siteConfig.freshaReviewCount}+ reviews</p>
                  <span className="inline-block mt-4 px-4 py-2 rounded-full bg-white text-zinc-900 text-[11px] font-semibold tracking-wide">
                    Book now
                  </span>
                </div>
              </motion.a>

              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
                className="absolute top-14 -right-3 w-44 h-64 rounded-3xl shadow-2xl shadow-pink-200/40 rotate-8 overflow-hidden border border-white/60"
              >
                {heroPhoto ? (
                  <img
                    src={heroPhoto.src}
                    alt={heroPhoto.alt}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                ) : (
                  <div className="absolute inset-0 bg-linear-to-br from-sky-200 to-blue-300" />
                )}
                <div className="absolute inset-0 bg-linear-to-t from-black/35 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4">
                  <p className="text-white font-display text-base font-semibold drop-shadow">Nail Art</p>
                </div>
              </motion.div>

              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-52 h-72 rounded-3xl bg-linear-to-br from-pink-100 via-white to-sky-100 shadow-2xl shadow-pink-100/50 z-10 overflow-hidden border border-white/80 flex items-center justify-center p-6"
              >
                <BrandName variant="hero" />
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
