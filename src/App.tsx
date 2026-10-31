import { lazy, Suspense, useEffect } from 'react'
import Lenis from 'lenis'
import 'lenis/dist/lenis.css'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Projects from './components/Projects'
import Experience from './components/Experience'
import Skills from './components/Skills'
import Contact from './components/Contact'
import Footer from './components/Footer'
import ThemePullCord from './components/ThemePullCord'
import DotField from './components/kokonutui/dot-field'

// Feature flag: set to true whenever you want to re-enable the 143MB 3D model
const ENABLE_3D_MODEL = false

const DigitalCore = ENABLE_3D_MODEL
  ? lazy(() => import('./components/three-d/DigitalCore'))
  : null

export default function App() {
  // Initialize buttery-smooth Lenis inertia scrolling
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1.8,
      infinite: false,
    })

    let rafId: number
    function raf(time: number) {
      lenis.raf(time)
      rafId = requestAnimationFrame(raf)
    }

    rafId = requestAnimationFrame(raf)

    return () => {
      cancelAnimationFrame(rafId)
      lenis.destroy()
    }
  }, [])

  return (
    <>
      {/* Keyboard Accessibility Skip Link */}
      <a href="#main-content" className="skip-to-content">
        Skip to main content
      </a>

      {/* Clean Minimal Navigation */}
      <Navbar />

      {/* Interactive Halftone Dot Field Background */}
      <DotField
        className="fixed inset-0 pointer-events-none z-0 min-h-screen w-full bg-transparent text-[#121114]/15 dark:text-[#A9A5AC]/25"
        spacing={22}
        interactive={true}
        listenOnWindow={true}
        mask={false}
      >
        {null}
      </DotField>

      {/* Continuous 3D Digital Core Sculpture (set ENABLE_3D_MODEL to true to re-enable) */}
      {ENABLE_3D_MODEL && DigitalCore && (
        <Suspense fallback={null}>
          <DigitalCore />
        </Suspense>
      )}

      {/* Main Editorial Content Flow (z-10) */}
      <div className="relative z-10 min-h-screen flex flex-col bg-transparent">
        <main id="main-content" tabIndex={-1} className="flex-1 focus:outline-none">
          {/* Hero Section */}
          <Hero />

          {/* About Section */}
          <About />

          {/* Selected Work (Projects) */}
          <Projects />

          {/* Experience & Education */}
          <Experience />

          {/* Technical Skills */}
          <Skills />

          {/* Contact Section */}
          <Contact />
        </main>

        {/* Minimal Footer */}
        <Footer />
      </div>

      {/* Interactive Physical Pull-Cord Lamp */}
      <ThemePullCord />
    </>
  )
}