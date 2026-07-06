import { useState, useEffect, useRef } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { siteConfig } from '../config'
import { BrandName } from './BrandName'

type HashNavLink = { label: string; type: 'hash'; hash: string }
type RouteNavLink = { label: string; type: 'route'; to: string }
type NavLink = HashNavLink | RouteNavLink

const navLinks: NavLink[] = [
  { label: 'Press-Ons', type: 'route', to: '/press-ons' },
  { label: 'Prices', type: 'route', to: '/prices' },
  { label: 'Portfolio', type: 'hash', hash: '#portfolio' },
  { label: 'About', type: 'hash', hash: '#about' },
  { label: 'Reviews', type: 'hash', hash: '#reviews' },
  { label: 'Contact', type: 'hash', hash: '#contact' },
]

function scrollToSection(hash: string) {
  const id = hash.replace('#', '')
  const target = document.getElementById(id)
  if (!target) return

  target.scrollIntoView({ behavior: 'smooth', block: 'start' })
  window.history.replaceState(null, '', hash)
}

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const pendingScroll = useRef<string | null>(null)
  const location = useLocation()
  const navigate = useNavigate()
  const isHome = location.pathname === '/'

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [mobileOpen])

  const navigateToHash = (hash: string) => {
    const id = hash.replace('#', '')

    if (isHome) {
      scrollToSection(hash)
      return
    }

    navigate({ pathname: '/', hash: id })
    window.scrollTo({ top: 0 })
  }

  const handleHashNavClick = (hash: string) => (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault()
    pendingScroll.current = hash
    setMobileOpen(false)

    if (!isHome) {
      navigateToHash(hash)
      pendingScroll.current = null
    }
  }

  const handleMenuExitComplete = () => {
    if (!pendingScroll.current) return
    const hash = pendingScroll.current
    pendingScroll.current = null
    navigateToHash(hash)
  }

  const handleDesktopHashClick = (hash: string) => (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault()
    navigateToHash(hash)
  }

  const handleLogoClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault()
    setMobileOpen(false)

    if (!isHome) {
      navigate('/')
    }

    window.history.replaceState(null, '', '/')
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const navLinkClass =
    'text-sm font-medium text-ink-muted hover:text-ink transition-colors'

  const mobileLinkClass = 'py-3 text-ink-muted hover:text-ink font-medium transition-colors'

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
        scrolled ? 'glass py-3' : 'bg-transparent py-5'
      }`}
    >
      <div className="page-container flex items-center justify-between">
        <Link to="/" onClick={handleLogoClick} className="shrink-0" aria-label="Back to home">
          <BrandName variant="nav" />
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) =>
            link.type === 'route' ? (
              <Link key={link.to} to={link.to} className={navLinkClass}>
                {link.label}
              </Link>
            ) : (
              <a
                key={link.hash}
                href={isHome ? link.hash : `/${link.hash}`}
                onClick={handleDesktopHashClick(link.hash)}
                className={navLinkClass}
              >
                {link.label}
              </a>
            ),
          )}
        </nav>

        <div className="hidden md:flex items-center gap-3">
          <a
            href={siteConfig.freshaUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-2.5 rounded-full text-sm font-semibold bg-linear-to-r from-sky-300 to-blue-300 text-ink hover:shadow-lg hover:shadow-sky-200/60 transition-all hover:-translate-y-0.5"
          >
            Book on Fresha
          </a>
        </div>

        <button
          type="button"
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden p-2 rounded-lg hover:bg-pastel-pink/50 transition-colors"
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      <AnimatePresence onExitComplete={handleMenuExitComplete}>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden glass border-t border-white/50 mt-3 overflow-hidden"
          >
            <nav className="flex flex-col px-5 py-4 gap-1">
              {navLinks.map((link) =>
                link.type === 'route' ? (
                  <Link
                    key={link.to}
                    to={link.to}
                    onClick={() => setMobileOpen(false)}
                    className={mobileLinkClass}
                  >
                    {link.label}
                  </Link>
                ) : (
                  <a
                    key={link.hash}
                    href={isHome ? link.hash : `/${link.hash}`}
                    onClick={handleHashNavClick(link.hash)}
                    className={mobileLinkClass}
                  >
                    {link.label}
                  </a>
                ),
              )}
              <a
                href={siteConfig.freshaUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setMobileOpen(false)}
                className="mt-2 py-3 text-center rounded-full bg-linear-to-r from-sky-300 to-blue-300 font-semibold"
              >
                Book on Fresha
              </a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}
