'use client'

import { useRef, useState, type CSSProperties, type MouseEvent } from 'react'
import { motion, useSpring, useTransform } from 'framer-motion'
import { playHoverTick, playClickPop } from '@/utils/sound'
import { useReducedMotion } from '@/hooks/useReducedMotion'

export interface MagneticButtonProps {
  label?: string
  size?: number | string
  background?: string
  color?: string
  textColor?: string
  onClick?: () => void
  font?: {
    fontFamily?: string
    fontSize?: string | number
    fontWeight?: number | string
    letterSpacing?: string
    textTransform?: 'uppercase' | 'lowercase' | 'capitalize' | 'none'
  }
  style?: CSSProperties
  className?: string
}

/**
 * Default Portfolio Button: Futuristic Magnetic Liquid Pill Button
 * Features magnetic cursor tracking, chromatic glowing border,
 * interactive cursor-glare reflection, and native Web Audio feedback.
 */
export default function MagneticButton({
  label = 'Explore',
  size = 46,
  color = '#E10600',
  textColor = '#FFFFFF',
  onClick,
  font,
  style,
  className = '',
}: MagneticButtonProps) {
  const btnRef = useRef<HTMLButtonElement>(null)
  const reducedMotion = useReducedMotion()

  const [isHovered, setIsHovered] = useState(false)
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })

  // Magnetic Pull Springs
  const springConfig = { stiffness: 240, damping: 20, mass: 0.5 }
  const x = useSpring(0, springConfig)
  const y = useSpring(0, springConfig)

  // Subtle Parallax on the Text Label
  const textX = useTransform(x, (val) => val * 0.35)
  const textY = useTransform(y, (val) => val * 0.35)

  const numHeight = typeof size === 'number' ? size : parseInt(size as string, 10) || 46
  const paddingX = Math.round(numHeight * 0.55)

  const handleMouseMove = (e: MouseEvent<HTMLButtonElement>) => {
    if (reducedMotion || !btnRef.current) return
    const rect = btnRef.current.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2

    // Magnetic pull distance (up to ~18px translation)
    const distFactor = 0.32
    const pullX = (e.clientX - centerX) * distFactor
    const pullY = (e.clientY - centerY) * distFactor

    x.set(pullX)
    y.set(pullY)

    // Track local cursor for radial liquid glare
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    })
  }

  const handleMouseEnter = () => {
    setIsHovered(true)
    playHoverTick(0.025)
  }

  const handleMouseLeave = () => {
    setIsHovered(false)
    x.set(0)
    y.set(0)
  }

  const handleClick = () => {
    playClickPop(0.04)
    onClick?.()
  }

  const isRed = color.toUpperCase().includes('E10600') || color.toUpperCase().includes('RED')

  return (
    <motion.button
      ref={btnRef}
      type="button"
      onClick={handleClick}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        x: reducedMotion ? 0 : x,
        y: reducedMotion ? 0 : y,
        height: numHeight,
        paddingLeft: paddingX,
        paddingRight: paddingX,
        ...style,
      }}
      whileTap={{ scale: 0.96 }}
      className={`relative inline-flex items-center justify-center rounded-full select-none cursor-pointer overflow-hidden transition-shadow duration-300 group focus:outline-none focus-visible:ring-2 focus-visible:ring-[#E10600] focus-visible:ring-offset-2 ${className}`}
    >
      {/* Dynamic Animated Chromatic Glow Border */}
      <span
        className={`absolute inset-0 rounded-full transition-opacity duration-500 pointer-events-none ${
          isHovered ? 'opacity-100' : 'opacity-40'
        }`}
        style={{
          padding: '1px',
          background: isRed
            ? 'linear-gradient(135deg, rgba(225,6,0,0.8), rgba(78,80,222,0.4), rgba(225,6,0,0.2))'
            : 'linear-gradient(135deg, rgba(255,255,255,0.4), rgba(125,122,133,0.3), rgba(255,255,255,0.1))',
          WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
          WebkitMaskComposite: 'xor',
          maskComposite: 'exclude',
        }}
      />

      {/* Solid/Glassmorphic Base Background */}
      <span
        className="absolute inset-0 rounded-full transition-colors duration-300 pointer-events-none"
        style={{
          background: isRed
            ? isHovered
              ? 'radial-gradient(circle at 50% 50%, #E10600, #9B0400)'
              : '#E10600'
            : isHovered
            ? 'rgba(37, 37, 37, 0.95)'
            : 'rgba(16, 15, 21, 0.85)',
          boxShadow: isRed
            ? isHovered
              ? '0 0 24px rgba(225, 6, 0, 0.45), inset 0 1px 0 rgba(255,255,255,0.2)'
              : '0 4px 14px rgba(225, 6, 0, 0.25), inset 0 1px 0 rgba(255,255,255,0.15)'
            : isHovered
            ? '0 0 20px rgba(0, 0, 0, 0.6), inset 0 1px 0 rgba(255,255,255,0.15)'
            : '0 2px 8px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255,255,255,0.08)',
        }}
      />

      {/* Interactive Cursor-Tracking Liquid Glare Reflection */}
      <span
        className="absolute inset-0 rounded-full pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{
          background: `radial-gradient(circle 60px at ${mousePos.x}px ${mousePos.y}px, rgba(255, 255, 255, 0.22), transparent 70%)`,
        }}
      />

      {/* Subtle Horizontal Glass Sheen Line */}
      <span
        aria-hidden="true"
        className="absolute top-0 left-1/4 right-1/4 h-[1px] bg-gradient-to-r from-transparent via-white/30 to-transparent pointer-events-none"
      />

      {/* Kinetic Text Label with Parallax Motion */}
      <motion.span
        style={{
          x: reducedMotion ? 0 : textX,
          y: reducedMotion ? 0 : textY,
          color: textColor,
          fontFamily: font?.fontFamily || "'Inter', sans-serif",
          fontSize: font?.fontSize || '12px',
          fontWeight: font?.fontWeight || 600,
          letterSpacing: font?.letterSpacing || '0.08em',
          textTransform: font?.textTransform || 'uppercase',
        }}
        className="relative z-10 whitespace-nowrap inline-flex items-center gap-1.5 transition-transform duration-200"
      >
        {label}
      </motion.span>
    </motion.button>
  )
}

