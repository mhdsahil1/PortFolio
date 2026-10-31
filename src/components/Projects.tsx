'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { primaryProjects, secondaryProjects, type Project } from '../data/portfolio'
import { useReducedMotion } from '../hooks/useReducedMotion'
import { useTheme } from '../context/ThemeContext'
import MagneticButton from './ui/MagneticButton'

function PrimaryProjectItem({ project }: { project: Project }) {
  const [hovered, setHovered] = useState(false)
  const reducedMotion = useReducedMotion()
  const { isLight } = useTheme()

  return (
    <article
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="group relative py-16 sm:py-24 border-b border-[#E2E0E8] dark:border-[#292630]/60 last:border-b-0 transition-colors"
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-start">
        {/* Left: Metadata & Project Heading */}
        <div className="lg:col-span-8 flex flex-col items-start text-left">
          {/* Category Number & Name */}
          <div className="flex items-center gap-2 mb-3 font-['IBM_Plex_Mono'] text-xs uppercase tracking-widest text-[#585563] dark:text-[#A9A5AC]">
            <span
              className={`w-1.5 h-1.5 rounded-full transition-colors duration-200 ${
                hovered ? 'bg-[#E10600]' : 'bg-[#868391] dark:bg-[#68646D]'
              }`}
            />
            <span>
              {project.categoryNumber} / {project.category}
            </span>
          </div>

          {/* Large Project Title */}
          <div className="relative my-1">
            <h4
              className={`font-['Bebas_Neue'] uppercase text-5xl sm:text-7xl md:text-8xl tracking-tight leading-[0.88] text-[#121114] dark:text-[#F5F2F2] transition-transform duration-200 select-none font-normal ${
                hovered && !reducedMotion ? 'translate-x-2' : ''
              }`}
            >
              {project.title}
            </h4>
          </div>

          {/* Subtitle if available */}
          {project.subtitle && (
            <p className="mt-2 font-['IBM_Plex_Mono'] text-xs uppercase tracking-wider text-[#E10600]">
              {project.subtitle}
            </p>
          )}

          {/* Clean Description */}
          <p className="mt-4 max-w-2xl font-['Inter'] text-base sm:text-lg text-[#585563] dark:text-[#A9A5AC] leading-relaxed">
            {project.description}
          </p>

          {/* Verified Features */}
          {project.features && project.features.length > 0 && (
            <ul className="mt-5 space-y-1.5 font-['IBM_Plex_Mono'] text-xs text-[#585563] dark:text-[#A9A5AC] max-w-xl">
              {project.features.map((feature) => (
                <li key={feature} className="flex items-center gap-2">
                  <span className="text-[#E10600] select-none">•</span>
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          )}

          {/* Tech Stack */}
          <div className="mt-6 flex flex-wrap items-center gap-x-3 gap-y-1.5 font-['IBM_Plex_Mono'] text-xs text-[#121114] dark:text-[#F5F2F2]">
            {project.technologies.map((tech, idx) => (
              <span key={tech} className="flex items-center gap-3">
                <span className="text-[#585563] dark:text-[#A9A5AC]">{tech}</span>
                {idx < project.technologies.length - 1 && (
                  <span className="text-[#D4D1DC] dark:text-[#292630] select-none">·</span>
                )}
              </span>
            ))}
          </div>

          {/* Project CTAs */}
          <div className="mt-8 flex flex-wrap items-center gap-4">
            {project.liveUrl && (
              <MagneticButton
                label="VIEW PROJECT ↗"
                size={44}
                color="#E10600"
                textColor="#FFFFFF"
                onClick={() => window.open(project.liveUrl, '_blank', 'noopener,noreferrer')}
              />
            )}

            {project.githubUrl && (
              <MagneticButton
                label="SOURCE CODE ↗"
                size={44}
                color={isLight ? "#121114" : "#020203"}
                textColor={isLight ? "#FFFFFF" : "#F5F2F2"}
                onClick={() => window.open(project.githubUrl, '_blank', 'noopener,noreferrer')}
              />
            )}
          </div>
        </div>

        {/* Right: Architectural Summary Card */}
        <div className="lg:col-span-4 w-full">
          <div
            className={`surface-card p-6 rounded-xl transition-all duration-300 ${
              hovered && !reducedMotion ? 'border-[#121114] dark:border-[#3E3A49] -translate-y-1' : ''
            }`}
          >
            <div className="flex items-center justify-between pb-3 border-b border-[#E2E0E8] dark:border-[#292630] font-['IBM_Plex_Mono'] text-[11px] text-[#585563] dark:text-[#A9A5AC]">
              <span>STATUS</span>
              <span className="text-[#121114] dark:text-[#F5F2F2]">
                {project.liveUrl ? 'PRODUCTION' : 'RESEARCH / LAB'}
              </span>
            </div>

            <div className="py-4 space-y-3 font-['IBM_Plex_Mono'] text-xs">
              <div>
                <span className="text-[#585563] dark:text-[#A9A5AC] block text-[10px] uppercase">DOMAIN</span>
                <span className="text-[#121114] dark:text-[#F5F2F2] font-medium">{project.category}</span>
              </div>
              <div>
                <span className="text-[#585563] dark:text-[#A9A5AC] block text-[10px] uppercase">PRIMARY TECH</span>
                <span className="text-[#585563] dark:text-[#A9A5AC]">{project.technologies.slice(0, 3).join(', ')}</span>
              </div>
            </div>

            <div className="pt-3 border-t border-[#E2E0E8] dark:border-[#292630] flex items-center justify-between font-['IBM_Plex_Mono'] text-[11px]">
              <span className="text-[#585563] dark:text-[#A9A5AC]">ID</span>
              <span className="text-[#585563] dark:text-[#A9A5AC]">{project.slug}</span>
            </div>
          </div>
        </div>
      </div>
    </article>
  )
}

export default function Projects() {
  const reducedMotion = useReducedMotion()

  return (
    <section
      id="projects"
      className="relative py-28 sm:py-36 px-5 sm:px-8 md:px-12 max-w-[1240px] mx-auto z-10 border-t border-[#E2E0E8] dark:border-[#292630]/60"
    >
      {/* Section Header */}
      <motion.div
        initial={{ opacity: 0, y: reducedMotion ? 0 : 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="flex flex-col items-start gap-2 mb-12 sm:mb-16"
      >
        <h2 className="flex items-center gap-2 font-['IBM_Plex_Mono'] text-xs uppercase tracking-widest text-[#585563] dark:text-[#A9A5AC] m-0">
          <span className="w-1.5 h-1.5 rounded-full bg-[#F32E35]" />
          <span>02 / SELECTED WORK</span>
        </h2>
        <h3 className="font-['Bebas_Neue'] uppercase text-5xl sm:text-6xl md:text-7xl text-[#121114] dark:text-[#F5F2F2] tracking-tight text-left leading-[0.9] select-none my-1 font-normal">
          FEATURED SYSTEMS
        </h3>
        <p className="font-['Inter'] text-base text-[#585563] dark:text-[#A9A5AC] max-w-xl text-left leading-relaxed">
          Security-focused software, low-level operating system experiments, and modern full-stack platforms.
        </p>
      </motion.div>

      {/* Main Large Editorial Projects */}
      <div className="flex flex-col">
        {primaryProjects.map((project) => (
          <PrimaryProjectItem key={project.slug} project={project} />
        ))}
      </div>

      {/* More Work Section */}
      <div className="mt-24 sm:mt-32 pt-16 border-t border-[#E2E0E8] dark:border-[#292630]/60">
        <h3 className="flex items-center gap-2 mb-8 font-['IBM_Plex_Mono'] text-xs uppercase tracking-widest text-[#585563] dark:text-[#A9A5AC] font-normal m-0">
          <span className="w-1.5 h-1.5 rounded-full bg-[#868391] dark:bg-[#68646D]" />
          <span>ADDITIONAL RESEARCH &amp; TOOLING</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {secondaryProjects.map((project) => (
            <div
              key={project.slug}
              className="surface-card p-6 flex flex-col justify-between group hover:border-[#121114] dark:hover:border-[#3E3A49] transition-all"
            >
              <div>
                <div className="flex items-center justify-between pb-3 border-b border-[#E2E0E8] dark:border-[#292630] font-['IBM_Plex_Mono'] text-[11px] text-[#585563] dark:text-[#A9A5AC] mb-4">
                  <span>{project.category}</span>
                  <span>{project.categoryNumber}</span>
                </div>

                <h4 className="font-['Inter'] font-semibold text-lg text-[#121114] dark:text-[#F5F2F2] mb-1 group-hover:text-[#E10600] dark:group-hover:text-white transition-colors">
                  {project.title}
                </h4>

                {project.subtitle && (
                  <p className="font-['IBM_Plex_Mono'] text-xs text-[#F32E35] mb-3">
                    {project.subtitle}
                  </p>
                )}

                <p className="font-['Inter'] text-sm text-[#585563] dark:text-[#A9A5AC] leading-relaxed mb-6">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-1.5 mb-6">
                  {project.technologies.map((t) => (
                    <span key={t} className="tech-tag text-[10px]">
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-[#E2E0E8] dark:border-[#292630] flex items-center gap-4">
                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="editorial-link"
                  >
                    <span>LAUNCH</span>
                    <span>↗</span>
                  </a>
                )}
                {project.githubUrl && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="editorial-link"
                  >
                    <span>SOURCE</span>
                    <span>↗</span>
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}