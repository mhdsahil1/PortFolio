import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { AnimatePresence, motion } from 'framer-motion'
import { useHlsVideo } from '../hooks/useHlsVideo'
import { useReducedMotion } from '../hooks/useReducedMotion'
import { personalInfo, HLS_SRC } from '../data/portfolio'

export default function Hero() {
  const { videoRef, failed, ready } = useHlsVideo(HLS_SRC)
  const reducedMotion = useReducedMotion()
  const nameRef = useRef<HTMLHeadingElement | null>(null)
  const staggerRef = useRef<HTMLDivElement | null>(null)
  const [roleIndex, setRoleIndex] = useState(0)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })

      if (reducedMotion) {
        gsap.set([nameRef.current, staggerRef.current?.children ?? []], {
          opacity: 1,
          y: 0,
          filter: 'blur(0px)',
        })
        return
      }

      tl.fromTo(
        nameRef.current,
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 1.2, delay: 0.1 }
      ).fromTo(
        staggerRef.current ? Array.from(staggerRef.current.children) : [],
        { opacity: 0, y: 20, filter: 'blur(10px)' },
        { opacity: 1, y: 0, filter: 'blur(0px)', duration: 1, stagger: 0.1, delay: 0.3 },
        '<'
      )
    })

    return () => ctx.revert()
  }, [reducedMotion])

  useEffect(() => {
    const interval = window.setInterval(() => {
      setRoleIndex((i) => (i + 1) % personalInfo.roles.length)
    }, 2400)
    return () => window.clearInterval(interval)
  }, [])

  return (
    <section
      id="home"
      className="relative flex min-h-[100svh] w-full flex-col items-center justify-center overflow-hidden px-6"
    >
      {/* Background video */}
      <div className="absolute inset-0 -z-10 bg-bg">
        {!failed && (
          <video
            ref={videoRef}
            className={`h-full w-full object-cover transition-opacity duration-1000 ${
              ready ? 'opacity-40' : 'opacity-0'
            }`}
            autoPlay
            muted
            loop
            playsInline
            aria-hidden="true"
          />
        )}
        <div className="absolute inset-0 bg-bg/70" />
        <div className="absolute inset-0 bg-gradient-to-b from-bg/20 via-transparent to-bg" />
      </div>

      <div className="mx-auto flex max-w-4xl flex-col items-center text-center">
        <span className="text-xs uppercase tracking-[0.3em] text-muted">
          {personalInfo.eyebrow}
        </span>

        <h1
          ref={nameRef}
          className="mt-6 font-display italic text-6xl leading-[0.95] md:text-8xl lg:text-9xl"
        >
          {personalInfo.name}
        </h1>

        <div ref={staggerRef} className="mt-6 flex flex-col items-center gap-4">
          <p className="text-base md:text-lg text-muted">
            A{' '}
            <AnimatePresence mode="wait">
              <motion.span
                key={personalInfo.roles[roleIndex]}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.4 }}
                className="inline-block text-text-primary"
              >
                {personalInfo.roles[roleIndex]}
              </motion.span>
            </AnimatePresence>{' '}
            building secure software.
          </p>

          <p className="max-w-xl text-sm md:text-base text-muted">{personalInfo.description}</p>

          <div className="mt-4 flex flex-col items-center gap-3 sm:flex-row">
            <a
              href="#projects"
              onClick={(e) => {
                e.preventDefault()
                document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' })
              }}
              className="inline-flex items-center justify-center gap-2 rounded-full bg-text-primary px-6 py-3 text-sm font-medium text-bg transition-transform duration-300 hover:scale-105 gradient-border"
            >
              View Projects →
            </a>
            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault()
                document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })
              }}
              className="gradient-border inline-flex items-center justify-center gap-2 rounded-full border border-stroke px-6 py-3 text-sm font-medium text-text-primary transition-colors duration-300 hover:border-transparent"
            >
              Let's Connect →
            </a>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3">
        <span className="text-[10px] uppercase tracking-[0.3em] text-muted">Scroll</span>
        <div className="relative h-12 w-px overflow-hidden bg-stroke">
          <div className="absolute left-0 top-0 h-3 w-px accent-gradient animate-scroll-down" />
        </div>
      </div>
    </section>
  )
}
