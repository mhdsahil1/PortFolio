import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { useReducedMotion } from '../hooks/useReducedMotion'

const TEXT = 'BUILDING THE FUTURE • '

export default function Marquee() {
  const trackRef = useRef<HTMLDivElement | null>(null)
  const reducedMotion = useReducedMotion()

  useEffect(() => {
    if (reducedMotion || !trackRef.current) return

    const tween = gsap.to(trackRef.current, {
      xPercent: -50,
      duration: 40,
      ease: 'none',
      repeat: -1,
    })

    return () => {
      tween.kill()
    }
  }, [reducedMotion])

  return (
    <div className="relative w-full overflow-hidden border-y border-stroke py-6">
      <div ref={trackRef} className="flex w-max whitespace-nowrap will-change-transform">
        <span className="font-display italic text-3xl md:text-5xl text-muted/50 pr-4">
          {TEXT.repeat(6)}
        </span>
        <span className="font-display italic text-3xl md:text-5xl text-muted/50 pr-4">
          {TEXT.repeat(6)}
        </span>
      </div>
    </div>
  )
}
