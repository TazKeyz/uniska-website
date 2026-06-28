import type { ReactNode } from 'react'
import { motion } from 'framer-motion'
import { siteConfig } from '../config'

type SocialKey = keyof typeof siteConfig.socials

const socialMeta: Record<
  SocialKey,
  { label: string; icon: ReactNode; hoverClass: string }
> = {
  instagram: {
    label: 'Instagram',
    hoverClass: 'hover:bg-pink-200/80 hover:text-pink-600',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5">
        <rect x="2" y="2" width="20" height="20" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
  facebook: {
    label: 'Facebook',
    hoverClass: 'hover:bg-sky-200/80 hover:text-blue-600',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
      </svg>
    ),
  },
  tiktok: {
    label: 'TikTok',
    hoverClass: 'hover:bg-pastel-pink/80 hover:text-ink',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
        <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
      </svg>
    ),
  },
}

type SocialLinksProps = {
  variant?: 'icons' | 'text'
  className?: string
}

export function SocialLinks({ variant = 'icons', className = '' }: SocialLinksProps) {
  const entries = Object.entries(siteConfig.socials) as [SocialKey, string][]

  if (variant === 'text') {
    return (
      <div className={`flex flex-wrap items-center justify-center gap-6 text-sm ${className}`}>
        {entries.map(([key, url]) => (
          <a
            key={key}
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-ink-muted hover:text-ink transition-colors"
          >
            {socialMeta[key].label}
          </a>
        ))}
      </div>
    )
  }

  return (
    <div className={`flex items-center justify-center gap-3 ${className}`}>
      {entries.map(([key, url], i) => (
        <motion.a
          key={key}
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.1 }}
          whileHover={{ scale: 1.08, y: -2 }}
          whileTap={{ scale: 0.95 }}
          aria-label={socialMeta[key].label}
          className={`flex items-center justify-center w-11 h-11 rounded-full glass text-ink-muted transition-colors ${socialMeta[key].hoverClass}`}
        >
          {socialMeta[key].icon}
        </motion.a>
      ))}
    </div>
  )
}
