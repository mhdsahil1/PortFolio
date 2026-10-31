'use client'

import { lazy, Suspense, useEffect, useRef, useState } from 'react'
import { personalInfo } from '../data/portfolio'
import { useReducedMotion } from '../hooks/useReducedMotion'
import { useTheme } from '../context/ThemeContext'

const VelourBolster = lazy(() => import('./originkit/ui/velour-bolster'))
const Gravitygloss = lazy(() => import('./originkit/ui/gravitygloss'))

export default function Footer() {
  const currentYear = new Date().getFullYear()
  const reducedMotion = useReducedMotion()
  const { isLight } = useTheme()
  const [inView, setInView] = useState(false)
  const footerRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const el = footerRef.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true)
          observer.disconnect()
        }
      },
      { rootMargin: '600px' }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: reducedMotion ? 'auto' : 'smooth' })
  }

  return (
    <footer
      ref={footerRef}
      className="relative py-12 px-5 sm:px-8 md:px-12 max-w-[1240px] mx-auto z-10 border-t border-[#E2E0E8] dark:border-[#292630]/60 font-['IBM_Plex_Mono'] text-xs text-[#585563] dark:text-[#A9A5AC]"
    >
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <span className="text-[#585563] dark:text-[#A9A5AC] uppercase tracking-wider font-semibold">
            {personalInfo.name.toUpperCase()}
          </span>
          <span className="mx-2 text-[#D4D1DC] dark:text-[#292630]">/</span>
          <span>© {currentYear}</span>
        </div>

        <div className="flex items-center gap-6">
          <div className="w-[180px] h-[64px] relative inline-flex items-center justify-center">
            {inView ? (
              <Suspense
                fallback={
                  <button
                    type="button"
                    onClick={scrollToTop}
                    className="font-['IBM_Plex_Mono'] text-xs font-semibold uppercase tracking-wider text-[#121114] dark:text-[#F5F2F2] px-4 py-2 rounded-full border border-[#E2E0E8] dark:border-[#292630]"
                  >
                    BACK TO TOP ↑
                  </button>
                }
              >
                <VelourBolster
                  text="BACK TO TOP ↑"
                  fabric={isLight ? "#121114" : "#17151D"}
                  textColor={isLight ? "#FFFFFF" : "#F5F2F2"}
                  background="transparent"
                  buttonWidth={900}
                  buttonHeight={380}
                  radius={190}
                  font={{
                    fontFamily: "'IBM Plex Mono', monospace",
                    fontWeight: 600,
                    letterSpacing: "0.06em",
                  }}
                  drift={reducedMotion ? 0 : 4}
                  response={{
                    puff: 6,
                    bulge: 6,
                    press: 6,
                    wobble: 6,
                    drag: 5,
                    ripple: 6,
                    release: 0.8,
                  }}
                  onClick={scrollToTop}
                  style={{
                    width: '100%',
                    height: '100%',
                    aspectRatio: 'auto',
                  }}
                />
              </Suspense>
            ) : (
              <button
                type="button"
                onClick={scrollToTop}
                className="font-['IBM_Plex_Mono'] text-xs font-semibold uppercase tracking-wider text-[#121114] dark:text-[#F5F2F2] px-4 py-2 rounded-full border border-[#E2E0E8] dark:border-[#292630]"
              >
                BACK TO TOP ↑
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Interactive Gravitygloss Showcase at Footer End - Unconstrained full-width animation stage */}
      <div className="mt-14 sm:mt-20 mb-6 w-screen relative left-1/2 -translate-x-1/2 flex flex-col items-center justify-center select-none overflow-visible pointer-events-auto">
        <div className="w-full h-[500px] sm:h-[620px] md:h-[720px] relative flex items-center justify-center overflow-visible">
          {inView ? (
            <Suspense fallback={null}>
              <Gravitygloss
                text={"THANK\nYOU"}
                textColor={isLight ? "#121114" : "#FFFFFF"}
                sphereColor="#FFA500"
                sphereShade="#FFAE34"
                size={135}
                pull={55}
                speed={reducedMotion ? 0 : 35}
                background="transparent"
                font={{
                  fontFamily: "'Anton', 'Impact', sans-serif",
                  fontWeight: 800,
                  fontSize: 185,
                }}
                advanced={{
                  angle: 30,
                  perspective: 70,
                  stretch: 126,
                  reach: 480,
                  hover: 92,
                  sphereMid: "#FF6A00",
                  reflectColor: "#FFAE34",
                }}
                style={{ width: "100%", height: "100%", background: "transparent", overflow: "visible" }}
              />
            </Suspense>
          ) : null}
        </div>
      </div>
    </footer>
  )
}