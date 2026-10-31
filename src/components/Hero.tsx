'use client'

import { motion } from 'framer-motion'
import { personalInfo } from '../data/portfolio'
import { useReducedMotion } from '../hooks/useReducedMotion'
import { useTheme } from '../context/ThemeContext'
import VectorWordmark from './originkit/ui/vector-wordmark'
import MagneticButton from './ui/MagneticButton'
import EmberHusk from './originkit/ui/ember-husk'
import { playClickPop, playHoverTick } from '../utils/sound'

export default function Hero() {
  const reducedMotion = useReducedMotion()
  const { isLight } = useTheme()

  const scrollToWork = () => {
    playClickPop(0.04)
    const el = document.querySelector('#projects')
    el?.scrollIntoView({ behavior: reducedMotion ? 'auto' : 'smooth' })
  }

  const scrollToContact = () => {
    playClickPop(0.04)
    const el = document.querySelector('#contact')
    el?.scrollIntoView({ behavior: reducedMotion ? 'auto' : 'smooth' })
  }

  return (
    <section
      id="hero"
      className="relative min-h-[92vh] sm:min-h-screen w-full flex flex-col justify-center pt-24 sm:pt-28 pb-12 sm:pb-16 px-5 sm:px-8 md:px-12 max-w-[1440px] mx-auto z-10"
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 xl:gap-20 w-full items-center my-auto">
        {/* Left Column: Monumental Name & Narrative */}
        <div className="lg:col-span-6 xl:col-span-6 flex flex-col items-start text-left z-20">
          {/* Status Indicator */}
          <motion.div
            initial={{ opacity: 0, y: reducedMotion ? 0 : 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="flex items-center gap-2.5 mb-3 select-none"
          >
            <span className="w-2 h-2 rounded-full bg-[#1cec84] shadow-[0_0_8px_#1cec84]" />
            <span className="font-['IBM_Plex_Mono'] text-xs uppercase tracking-widest text-[#585563] dark:text-[#A9A5AC]">
              AVAILABLE FOR CREATIVE PROJECTS
            </span>
          </motion.div>

          {/* Monumental Interactive Vector Wordmark Name */}
          <motion.div
            initial={{ opacity: 0, y: reducedMotion ? 0 : 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="w-full relative my-1 select-none"
          >
            <h1 className="sr-only">Muhammed Sahil — Cybersecurity Engineer &amp; Full-Stack Architect</h1>
            <div className="w-full h-[120px] sm:h-[150px] md:h-[180px] lg:h-[200px] xl:h-[220px] relative -ml-1 sm:-ml-2">
              <VectorWordmark
                key={isLight ? 'wordmark-light' : 'wordmark-dark'}
                text="SAHIL"
                background="transparent"
                textColor={isLight ? "#121114" : "#F5F2F2"}
                shade={isLight ? "#B8B5C0" : "#7D7A85"}
                accent="#E10600"
                reach={260}
                speed={reducedMotion ? 0 : 45}
                damping={60}
                font={{
                  fontFamily: "'Moonhouse', sans-serif",
                  fontWeight: 400,
                  fontSize: "280px",
                  letterSpacing: "0.04em",
                }}
                handles={{ size: 90, spread: 26, labels: true }}
                style={{
                  minWidth: 0,
                  minHeight: 0,
                  width: '100%',
                  height: '100%',
                  background: 'transparent',
                }}
              />
            </div>
          </motion.div>

          {/* Dynamic Role & Narrative */}
          <motion.div
            initial={{ opacity: 0, y: reducedMotion ? 0 : 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="mt-3 sm:mt-4 max-w-xl"
          >
            <p className="font-['Inter'] font-semibold text-xl sm:text-2xl md:text-3xl text-[#121114] dark:text-[#F5F2F2] leading-snug tracking-tight m-0">
              {personalInfo.title}
            </p>
            <p className="mt-3 font-['Inter'] text-sm sm:text-base text-[#585563] dark:text-[#A9A5AC] leading-relaxed">
              {personalInfo.description}
            </p>
          </motion.div>

          {/* Essential Action CTAs */}
          <motion.div
            initial={{ opacity: 0, y: reducedMotion ? 0 : 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="mt-7 sm:mt-9 flex flex-wrap items-center gap-3.5"
          >
            <MagneticButton
              label="VIEW WORK ↓"
              size={46}
              color="#E10600"
              textColor="#FFFFFF"
              onClick={scrollToWork}
            />

            <MagneticButton
              label="CONTACT →"
              size={46}
              color={isLight ? "#121114" : "#020203"}
              textColor={isLight ? "#FFFFFF" : "#F5F2F2"}
              onClick={scrollToContact}
            />

            <a
              href={personalInfo.github}
              target="_blank"
              rel="noopener noreferrer"
              onMouseEnter={() => playHoverTick(0.02)}
              className="editorial-link px-3 py-2 text-xs"
            >
              <span>GITHUB</span>
              <span>↗</span>
            </a>
          </motion.div>
        </div>

        {/* Right Column: OriginKit Ember Husk 3D Interactive Procedural Core */}
        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: reducedMotion ? 0.01 : 0.8, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-6 xl:col-span-6 flex flex-col justify-center items-center w-full relative select-none pointer-events-auto overflow-visible lg:pl-6 xl:pl-10"
        >
          {/* Seamless unconstrained 3D viewport with wide bleed buffer and generous spacing from left text */}
          <div className="w-[110%] sm:w-[135%] lg:w-[145%] xl:w-[155%] -left-[5%] sm:-left-[17%] lg:-left-[14%] xl:-left-[16%] lg:translate-x-6 xl:translate-x-10 h-[400px] sm:h-[540px] lg:h-[720px] xl:h-[780px] relative flex items-center justify-center bg-transparent overflow-visible pointer-events-auto">
            <EmberHusk
              size={3.2}
              core={{
                flow: 10,
                color: '#E10600',
                hotColor: '#FFAE34',
                intensity: 10,
              }}
              drift={{
                bob: 5,
                spin: 4,
                sway: 5,
              }}
              response={{
                reach: 9,
                repel: 7,
                settle: 5,
                strength: 7.5,
              }}
              style={{
                width: '100%',
                height: '100%',
                background: 'transparent',
                overflow: 'visible',
              }}
            />
          </div>
        </motion.div>
      </div>
    </section>
  )
}