import { BrandName } from './BrandName'
import { siteConfig } from '../config'

export function Footer() {
  return (
    <footer className="border-t border-pink-100/80 py-12">
      <div className="page-container">
        <div className="flex flex-col items-center text-center">
          <BrandName variant="footer" className="mb-1" />
          <p className="text-sm text-ink-muted mt-3 max-w-sm">{siteConfig.tagline}</p>
        </div>

        <p className="text-center text-xs text-ink-muted mt-8">
          © {new Date().getFullYear()} {siteConfig.brandName}. All rights reserved.
        </p>
      </div>
    </footer>
  )
}

export { FloatingWhatsApp } from './FloatingWhatsApp'
