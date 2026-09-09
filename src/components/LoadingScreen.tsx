import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

const WORDS = ['Build', 'Secure', 'Create', 'Explore']
const DURATION = 2700

type LoadingScreenProps = {
  onComplete: () => void
}

export default function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const [count, setCount] = useState(0)
  const [wordIndex, setWordIndex] = useState(0)
  const startRef = useRef<number | null>(null)
  const frameRef = useRef<number>(0)

  useEffect(() => {
    const tick = (timestamp: number) => {
      if (startRef.current === null) startRef.current = timestamp
      const elapsed = timestamp - startRef.current
      const progress = Math.min(elapsed / DURATION, 1)
      setCount(Math.floor(progress * 100))

      if (progress < 1) {
        frameRef.current = requestAnimationFrame(tick)
      } else {
        setCount(100)
        window.setTimeout(onComplete, 400)
      }
    }

    frameRef.current = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frameRef.current)
  }, [onComplete])

  useEffect(() => {
    const interval = window.setInterval(() => {
      setWordIndex((i) => (i + 1) % WORDS.length)
    }, 650)
    return () => window.clearInterval(interval)
  }, [])

  return (
    <div className="fixed inset-0 z-[9999] bg-bg flex flex-col justify-between px-6 py-6 md:px-10 md:py-10">
      <div className="text-xs uppercase tracking-[0.3em] text-muted">Portfolio</div>

      <div className="flex-1 flex items-center justify-center">
        <AnimatePresence mode="wait">
          <motion.span
            key={WORDS[wordIndex]}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.4 }}
            className="font-display italic text-4xl md:text-6xl text-text-primary"
          >
            {WORDS[wordIndex]}
          </motion.span>
        </AnimatePresence>
      </div>

      <div className="flex items-end justify-between gap-6">
        <div className="w-full max-w-xs h-px bg-stroke/50 relative overflow-hidden rounded-full">
          <div
            className="absolute inset-y-0 left-0 accent-gradient rounded-full transition-all duration-100 ease-linear"
            style={{ width: `${count}%` }}
          />
        </div>
        <div className="font-display text-5xl md:text-7xl tabular-nums shrink-0">
          {String(count).padStart(3, '0')}
        </div>
      </div>
    </div>
  )
}
