'use client'

import { motion } from 'framer-motion'
import { disciplines } from '../data/portfolio'
import { useReducedMotion } from '../hooks/useReducedMotion'

export default function About() {
  const reducedMotion = useReducedMotion()

  return (
    <section
      id="about"
      className="relative py-28 sm:py-36 px-5 sm:px-8 md:px-12 max-w-[1240px] mx-auto z-10 border-t border-[#E2E0E8] dark:border-[#292630]/60"
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
            <span className="w-1.5 h-1.5 rounded-full bg-[#F32E35]" />
            <span>01 / ABOUT</span>
          </motion.h2>
        </div>

        {/* Right Column: Editorial Narrative & Disciplines */}
        <div className="lg:col-span-9 flex flex-col items-start">
          <motion.div
            initial={{ opacity: 0, y: reducedMotion ? 0 : 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="space-y-6 max-w-2xl text-left"
          >
            <p className="font-['Inter'] font-normal text-2xl sm:text-3xl md:text-4xl text-[#121114] dark:text-[#F5F2F2] leading-snug tracking-tight">
              I work across cybersecurity, full-stack development, and systems engineering.
            </p>

            <p className="font-['Inter'] text-lg sm:text-xl text-[#585563] dark:text-[#A9A5AC] leading-relaxed">
              I enjoy understanding what happens underneath the abstraction, then building something useful with it.
            </p>
          </motion.div>

          {/* Minimal Discipline List */}
          <motion.div
            initial={{ opacity: 0, y: reducedMotion ? 0 : 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="mt-14 sm:mt-16 pt-8 border-t border-[#E2E0E8] dark:border-[#292630]/60 w-full"
          >
            <h3 className="font-['IBM_Plex_Mono'] text-[11px] uppercase tracking-widest text-[#868391] dark:text-[#68646D] block mb-4 m-0 font-normal">
              DISCIPLINES &amp; FOCUS
            </h3>

            <div className="flex flex-wrap items-center gap-x-6 gap-y-3 font-['IBM_Plex_Mono'] text-xs sm:text-sm text-[#121114] dark:text-[#F5F2F2] tracking-wider uppercase">
              {disciplines.map((item, idx) => (
                <div key={item} className="flex items-center gap-6">
                  <span className="hover:text-[#F32E35] transition-colors">
                    {item}
                  </span>
                  {idx < disciplines.length - 1 && (
                    <span className="text-[#D4D1DC] dark:text-[#292630] select-none">/</span>
                  )}
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}