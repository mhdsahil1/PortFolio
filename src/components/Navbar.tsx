import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { navLinks } from '../data/portfolio'

export default function Navbar() {
  const [active, setActive] = useState('#home')
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const sections = navLinks
      .map((link) => document.querySelector(link.href))
      .filter((el): el is Element => el !== null)

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActive(`#${entry.target.id}`)
          }
        })
      },
      { rootMargin: '-40% 0px -50% 0px', threshold: 0 }
    )

    sections.forEach((section) => observer.observe(section))
    return () => observer.disconnect()
  }, [])

  const handleNavClick = (href: string) => {
    setMenuOpen(false)
    const el = document.querySelector(href)
    el?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <nav className="fixed top-0 left-0 right-0 flex justify-center pt-4 md:pt-6 px-4 z-50">
      <div className="w-full max-w-4xl rounded-full backdrop-blur-md border border-white/10 bg-surface/80 px-3 py-2 flex items-center justify-between gap-2">
        {/* Logo */}
        <a
          href="#home"
          onClick={(e) => {
            e.preventDefault()
            handleNavClick('#home')
          }}
          className="group relative h-9 w-9 shrink-0 rounded-full accent-gradient p-[1.5px] transition-transform duration-300 group-hover:scale-110 hover:scale-110"
          aria-label="Go to top"
        >
          <span className="flex h-full w-full items-center justify-center rounded-full bg-bg font-display italic text-lg">
            S.
          </span>
        </a>

        {/* Desktop nav */}
        <ul className="hidden md:flex items-center gap-1 text-sm">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                onClick={(e) => {
                  e.preventDefault()
                  handleNavClick(link.href)
                }}
                className={`px-3 py-1.5 rounded-full transition-colors duration-200 ${
                  active === link.href
                    ? 'text-text-primary bg-stroke/50'
                    : 'text-muted hover:text-text-primary hover:bg-stroke/50'
                }`}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        {/* CTA */}
        <a
          href="#contact"
          onClick={(e) => {
            e.preventDefault()
            handleNavClick('#contact')
          }}
          className="hidden md:inline-flex gradient-border relative items-center rounded-full border border-white/10 px-4 py-1.5 text-sm text-text-primary transition-colors hover:border-transparent"
        >
          Say hi ↗
        </a>

        {/* Mobile menu toggle */}
        <button
          type="button"
          onClick={() => setMenuOpen((o) => !o)}
          className="md:hidden inline-flex h-9 w-9 items-center justify-center rounded-full text-muted hover:text-text-primary hover:bg-stroke/50"
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
        >
          {menuOpen ? '✕' : '☰'}
        </button>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="absolute top-[calc(100%+0.5rem)] left-4 right-4 md:hidden rounded-2xl border border-white/10 bg-surface/95 backdrop-blur-md p-3"
          >
            <ul className="flex flex-col gap-1 text-sm">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={(e) => {
                      e.preventDefault()
                      handleNavClick(link.href)
                    }}
                    className={`block px-3 py-2 rounded-lg transition-colors duration-200 ${
                      active === link.href
                        ? 'text-text-primary bg-stroke/50'
                        : 'text-muted hover:text-text-primary hover:bg-stroke/50'
                    }`}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
              <li>
                <a
                  href="#contact"
                  onClick={(e) => {
                    e.preventDefault()
                    handleNavClick('#contact')
                  }}
                  className="mt-1 block rounded-lg border border-white/10 px-3 py-2 text-center text-text-primary"
                >
                  Say hi ↗
                </a>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}
