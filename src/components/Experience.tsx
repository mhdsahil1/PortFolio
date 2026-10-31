'use client'

import { motion } from 'framer-motion'
import { experience, personalInfo } from '../data/portfolio'
import { useReducedMotion } from '../hooks/useReducedMotion'

export default function Experience() {
  const reducedMotion = useReducedMotion()

  return (
    <section
      id="experience"
      className="relative py-28 sm:py-36 px-5 sm:px-8 md:px-12 max-w-[1240px] mx-auto z-10 border-t border-[#E2E0E8] dark:border-[#292630]/60 cv-auto"
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14">
        {/* Left Column: Marker */}
        <div className="lg:col-span-3">
          <motion.h2
            initial={{ opacity: 0, y: reducedMotion ? 0 : 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="flex items-center gap-2 font-['IBM_Plex_Mono'] text-xs uppercase tracking-widest text-[#585563] dark:text-[#A9A5AC] m-0"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#F32E35]" />
            <span>03 / BACKGROUND</span>
          </motion.h2>
        </div>

        {/* Right Column: Experience Timeline + Education */}
        <div className="lg:col-span-9 flex flex-col items-start w-full">
          {/* Experience Header */}
          <motion.div
            initial={{ opacity: 0, y: reducedMotion ? 0 : 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="mb-12 w-full"
          >
            <h3 className="font-['Bebas_Neue'] uppercase text-4xl sm:text-5xl text-[#121114] dark:text-[#F5F2F2] tracking-tight leading-none mb-2 font-normal">
              EXPERIENCE
            </h3>
            <p className="font-['Inter'] text-sm sm:text-base text-[#585563] dark:text-[#A9A5AC]">
              Practical industry internships in cybersecurity research and secure engineering.
            </p>
          </motion.div>

          {/* Clean Experience Timeline */}
          <div className="space-y-10 w-full mb-16 sm:mb-20">
            {experience.map((entry, idx) => (
              <motion.div
                key={entry.organization}
                initial={{ opacity: 0, y: reducedMotion ? 0 : 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.5, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="grid grid-cols-1 md:grid-cols-12 gap-4 pb-10 border-b border-[#E2E0E8] dark:border-[#292630]/60 last:border-b-0 items-start"
              >
                <div className="md:col-span-4 font-['IBM_Plex_Mono'] text-xs uppercase text-[#585563] dark:text-[#A9A5AC] tracking-wider pt-1">
                  {entry.period}
                </div>

                <div className="md:col-span-8 flex flex-col items-start">
                  <h4 className="font-['Inter'] font-semibold text-xl text-[#121114] dark:text-[#F5F2F2] m-0">
                    {entry.organization}
                  </h4>
                  <span className="font-['IBM_Plex_Mono'] text-xs uppercase tracking-wider text-[#F32E35] mt-1 mb-3">
                    {entry.role}
                  </span>
                  <p className="font-['Inter'] text-sm sm:text-base text-[#585563] dark:text-[#A9A5AC] leading-relaxed">
                    {entry.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Education Block */}
          <motion.div
            initial={{ opacity: 0, y: reducedMotion ? 0 : 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="pt-10 border-t border-[#E2E0E8] dark:border-[#292630]/60 w-full"
          >
            <h3 className="font-['Bebas_Neue'] uppercase text-4xl sm:text-5xl text-[#121114] dark:text-[#F5F2F2] tracking-tight leading-none mb-6 font-normal">
              EDUCATION
            </h3>

            <div className="surface-card p-6 sm:p-8 rounded-xl w-full">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-2">
                <h4 className="font-['Inter'] font-semibold text-lg sm:text-xl text-[#121114] dark:text-[#F5F2F2] m-0">
                  {personalInfo.education.degree}
                </h4>
                <span className="font-['IBM_Plex_Mono'] text-xs uppercase text-[#585563] dark:text-[#A9A5AC]">
                  {personalInfo.education.years}
                </span>
              </div>

              <div className="font-['IBM_Plex_Mono'] text-xs text-[#F32E35] uppercase tracking-wider mb-3">
                {personalInfo.education.specialization}
              </div>

              <p className="font-['Inter'] text-sm text-[#585563] dark:text-[#A9A5AC]">
                {personalInfo.education.institution}
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}