'use client'

import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { navLinks } from '../data/portfolio'
import { useReducedMotion } from '../hooks/useReducedMotion'
import MorphicNavbar from './kokonutui/morphic-navbar'

const MORPHIC_NAV_ITEMS = {
  '#projects': { name: 'Work' },
  '#about': { name: 'About' },
  '#experience': { name: 'Experience' },
  '#skills': { name: 'Skills' },
  '#contact': { name: 'Contact' },
}

interface NavbarProps {
  onOpenTerminal?: () => void
  onOpenCrt?: () => void
}

export default function Navbar(_props: NavbarProps) {
  const [active, setActive] = useState('#projects')
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const reducedMotion = useReducedMotion()

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

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
      { rootMargin: '-25% 0px -65% 0px', threshold: 0 }
    )

    sections.forEach((section) => observer.observe(section))
    return () => observer.disconnect()
  }, [])

  const handleNavClick = (href: string) => {
    setMenuOpen(false)
    const el = document.querySelector(href)
    el?.scrollIntoView({ behavior: reducedMotion ? 'auto' : 'smooth' })
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex justify-center pt-3 sm:pt-4 px-4 sm:px-8 pointer-events-none">
      <nav
        aria-label="Main Navigation"
        className={`pointer-events-auto flex items-center justify-between gap-6 max-w-[1240px] w-full px-5 py-2 rounded-2xl transition-all duration-300 ${
          scrolled
            ? 'bg-white/85 dark:bg-[#08070B]/85 backdrop-blur-md border border-[#E2E0E8] dark:border-[#292630] shadow-[0_4px_24px_rgba(0,0,0,0.06)] dark:shadow-[0_8px_30px_rgba(0,0,0,0.6)]'
            : 'bg-transparent border border-transparent'
        }`}
      >
        {/* Brand */}
        <a
          href="#hero"
          onClick={(e) => {
            e.preventDefault()
            window.scrollTo({ top: 0, behavior: reducedMotion ? 'auto' : 'smooth' })
          }}
          className="font-['Moonhouse',sans-serif] text-sm font-semibold tracking-wider text-[#121114] dark:text-[#F5F2F2] hover:text-[#E10600] transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#E10600] ml-16 sm:ml-20 md:ml-0"
          aria-label="Sahil — Back to top"
        >
          SAHIL.
        </a>

        {/* Desktop Split Nav (KokonutUI MorphicNavbar) */}
        <div className="hidden md:flex items-center">
          <MorphicNavbar
            items={MORPHIC_NAV_ITEMS}
            defaultPath="#projects"
            activePath={active}
            onSelectPath={(path) => handleNavClick(path)}
          />
        </div>

        {/* Mobile menu toggle button */}
        <div className="flex md:hidden items-center gap-2">
          <button
            type="button"
            onClick={() => setMenuOpen((o) => !o)}
            className="font-['IBM_Plex_Mono'] text-xs uppercase tracking-wider text-[#121114] dark:text-[#F5F2F2] border border-[#E2E0E8] dark:border-[#292630] px-3 py-1 rounded hover:bg-[#F2F1F6] dark:hover:bg-[#100F15] transition-colors cursor-pointer"
            aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={menuOpen}
          >
            {menuOpen ? 'CLOSE' : 'MENU'}
          </button>
        </div>
      </nav>

      {/* Mobile Navigation Drawer */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: reducedMotion ? 0.01 : 0.2 }}
            className="pointer-events-auto absolute top-16 left-4 right-4 bg-white/95 dark:bg-[#100F15]/95 backdrop-blur-xl border border-[#E2E0E8] dark:border-[#292630] p-6 rounded-xl shadow-xl dark:shadow-2xl flex flex-col gap-4 md:hidden"
          >
            <div className="flex items-center justify-between pb-3 border-b border-[#E2E0E8] dark:border-[#292630]">
              <span className="font-['Moonhouse',sans-serif] text-xs font-semibold tracking-wider text-[#121114] dark:text-[#F5F2F2]">
                SAHIL.
              </span>
              <span className="font-['IBM_Plex_Mono'] text-[11px] text-[#868391] dark:text-[#68646D]">
                INDEX
              </span>
            </div>

            <div className="flex flex-col gap-3 pt-1">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault()
                    handleNavClick(link.href)
                  }}
                  className={`py-2 font-['IBM_Plex_Mono'] text-xs uppercase tracking-wider transition-colors ${
                    active === link.href
                      ? 'text-[#E10600] font-semibold'
                      : 'text-[#585563] hover:text-[#121114] dark:text-[#A9A5AC] dark:hover:text-[#F5F2F2]'
                  }`}
                >
                  {link.label}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}