'use client'

import { motion } from 'framer-motion'
import { skillGroups } from '../data/portfolio'
import { useReducedMotion } from '../hooks/useReducedMotion'

export default function Skills() {
  const reducedMotion = useReducedMotion()

  return (
    <section
      id="skills"
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
            <span className="w-1.5 h-1.5 rounded-full bg-[#F32E35]" />
            <span>04 / SKILLS</span>
          </motion.h2>
        </div>

        {/* Right Column: Clean Typography Columns */}
        <div className="lg:col-span-9 flex flex-col items-start w-full">
          <motion.div
            initial={{ opacity: 0, y: reducedMotion ? 0 : 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="mb-14 sm:mb-16"
          >
            <h3 className="font-['Bebas_Neue'] uppercase text-4xl sm:text-5xl text-[#121114] dark:text-[#F5F2F2] tracking-tight leading-none mb-2 font-normal">
              TECHNICAL PROFICIENCY
            </h3>
            <p className="font-['Inter'] text-sm sm:text-base text-[#585563] dark:text-[#A9A5AC]">
              Systems programming, application architecture, and security toolchains.
            </p>
          </motion.div>

          {/* 3 Typography Columns with generous whitespace */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-10 sm:gap-12 w-full">
            {skillGroups.map((group, idx) => (
              <motion.div
                key={group.category}
                initial={{ opacity: 0, y: reducedMotion ? 0 : 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.5, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="flex flex-col items-start"
              >
                <h4 className="font-['IBM_Plex_Mono'] text-xs uppercase tracking-widest text-[#585563] dark:text-[#A9A5AC] mb-5 block font-normal m-0">
                  {group.category}
                </h4>

                <ul className="space-y-3 font-['Inter'] text-base sm:text-lg text-[#121114] dark:text-[#F5F2F2]">
                  {group.items.map((item) => (
                    <li
                      key={item}
                      className="hover:text-[#E10600] transition-colors cursor-default"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}