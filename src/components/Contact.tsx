'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { personalInfo, socialLinks } from '../data/portfolio'
import { useReducedMotion } from '../hooks/useReducedMotion'
import VenomButton from './originkit/ui/venom-button'

export default function Contact() {
  const [copied, setCopied] = useState(false)
  const reducedMotion = useReducedMotion()

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(personalInfo.email)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <section
      id="contact"
      className="relative py-28 sm:py-36 px-5 sm:px-8 md:px-12 max-w-[1240px] mx-auto z-10 border-t border-[#E2E0E8] dark:border-[#292630]/60 cv-auto"
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14">
        {/* Left Column: Section Marker */}
        <div className="lg:col-span-3">
          <motion.h2
            initial={{ opacity: 0, y: reducedMotion ? 0 : 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="flex items-center gap-2 font-['IBM_Plex_Mono'] text-xs uppercase tracking-widest text-[#585563] dark:text-[#A9A5AC] m-0"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#E10600]" />
            <span>05 / CONTACT</span>
          </motion.h2>
        </div>

        {/* Right Column: Statement & Links */}
        <div className="lg:col-span-9 flex flex-col items-start w-full">
          <motion.div
            initial={{ opacity: 0, y: reducedMotion ? 0 : 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-2xl text-left"
          >
            <h3 className="font-['Bebas_Neue'] uppercase text-5xl sm:text-7xl md:text-8xl text-[#121114] dark:text-[#F5F2F2] tracking-tight leading-[0.88] select-none mb-6 font-normal">
              LET'S BUILD SOMETHING USEFUL.
            </h3>

            <p className="font-['Inter'] text-base sm:text-lg text-[#585563] dark:text-[#A9A5AC] leading-relaxed">
              Available for cybersecurity roles, software engineering, and technical collaborations.
            </p>
          </motion.div>

          {/* Action CTAs */}
          <motion.div
            initial={{ opacity: 0, y: reducedMotion ? 0 : 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="mt-8 sm:mt-10 flex flex-wrap items-center gap-3 sm:gap-4"
          >
            <VenomButton
              label="EMAIL ME ↗"
              size={56}
              background="transparent"
              gooColor="#E10600"
              textColor="#FFFFFF"
              autoplay={false}
              onClick={() => {
                window.location.href = `mailto:${personalInfo.email}`
              }}
              font={{
                fontFamily: "'Inter', sans-serif",
                fontSize: "13px",
                fontWeight: 700,
                letterSpacing: "0.06em",
                textTransform: "uppercase",
              }}
            />

            <VenomButton
              label={copied ? 'COPIED TO CLIPBOARD' : 'COPY EMAIL'}
              size={56}
              background="transparent"
              gooColor="#E10600"
              textColor="#FFFFFF"
              autoplay={false}
              onClick={handleCopyEmail}
              font={{
                fontFamily: "'Inter', sans-serif",
                fontSize: "13px",
                fontWeight: 700,
                letterSpacing: "0.06em",
                textTransform: "uppercase",
              }}
            />
          </motion.div>

          {/* Direct Coordinate Links */}
          <motion.div
            initial={{ opacity: 0, y: reducedMotion ? 0 : 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="mt-14 sm:mt-16 pt-8 border-t border-[#E2E0E8] dark:border-[#292630]/60 w-full flex flex-wrap items-center gap-8 font-['IBM_Plex_Mono'] text-xs uppercase tracking-wider"
          >
            <a
              href={socialLinks.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#585563] hover:text-[#E10600] dark:text-[#A9A5AC] dark:hover:text-[#F32E35] transition-colors"
            >
              GITHUB ↗
            </a>

            <a
              href={socialLinks.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#585563] hover:text-[#E10600] dark:text-[#A9A5AC] dark:hover:text-[#F32E35] transition-colors"
            >
              LINKEDIN ↗
            </a>

            <a
              href={socialLinks.portfolio}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#585563] hover:text-[#E10600] dark:text-[#A9A5AC] dark:hover:text-[#F32E35] transition-colors"
            >
              PORTFOLIO ↗
            </a>

            <span className="text-[#868391] dark:text-[#68646D] ml-auto hidden sm:inline">
              MANGALORE, INDIA
            </span>
          </motion.div>
        </div>
      </div>
    </section>
  )
}