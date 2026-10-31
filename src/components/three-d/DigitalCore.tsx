'use client'

import { useRef, useEffect, useState, useMemo, Suspense } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { useGLTF, useAnimations } from '@react-three/drei'
import * as THREE from 'three'
import { useReducedMotion } from '../../hooks/useReducedMotion'
import { useTheme } from '../../context/ThemeContext'
import ErrorBoundary from '../ErrorBoundary'

interface PoliceUnitModelProps {
  scrollProgress: number
  scrollSettle: React.MutableRefObject<number>
  manualRotY: React.MutableRefObject<number>
  manualRotX: React.MutableRefObject<number>
  manualRotYVel: React.MutableRefObject<number>
  manualRotXVel: React.MutableRefObject<number>
  isDragging: React.MutableRefObject<boolean>
  lastDragTime: React.MutableRefObject<number>
  mouseRef: React.MutableRefObject<{ x: number; y: number }>
}

// Interactive GLTF Model Component using rank_3_police.glb with dynamic LED systems
function PoliceUnitModel({
  scrollProgress,
  scrollSettle,
  manualRotY,
  manualRotX,
  manualRotYVel,
  manualRotXVel,
  isDragging,
  lastDragTime,
  mouseRef,
}: PoliceUnitModelProps) {
  const groupRef = useRef<THREE.Group>(null)
  const internalLightRef = useRef<THREE.PointLight>(null)
  const leftEyeLightRef = useRef<THREE.PointLight>(null)
  const rightEyeLightRef = useRef<THREE.PointLight>(null)

  const { scene, animations } = useGLTF('/rank_3_police.glb')
  const { actions } = useAnimations(animations, groupRef)
  const reducedMotion = useReducedMotion()

  // Compute bounding box and normalization scale to fit choreographic viewport targets
  const { centerOffset, baseScale } = useMemo(() => {
    const box = new THREE.Box3().setFromObject(scene)
    const center = new THREE.Vector3()
    box.getCenter(center)
    const size = new THREE.Vector3()
    box.getSize(size)
    const maxDim = Math.max(size.x, size.y, size.z)
    // Scale normalized to ~1.6 units for a balanced, professional presentation that does not overcrowd
    const scale = maxDim > 0 ? 1.6 / maxDim : 1
    return {
      centerOffset: [-center.x, -center.y, -center.z] as [number, number, number],
      baseScale: scale,
    }
  }, [scene])

  // Isolate and clone target materials for dynamic LED control (eyes, white LEDs, red details)
  const materials = useMemo(() => {
    const cloned: {
      eye: THREE.MeshStandardMaterial | null
      emissionWhite: THREE.MeshStandardMaterial | null
      redParts: THREE.MeshStandardMaterial | null
    } = {
      eye: null,
      emissionWhite: null,
      redParts: null,
    }

    scene.traverse((child: any) => {
      if (child.isMesh && child.material) {
        const matName = child.material.name

        // Eye mesh (ctrl_eye / Object_10)
        if (matName === 'ctrl_eye' || child.name === 'Object_10' || child.name === 'Object_12') {
          if (!cloned.eye) {
            const m = child.material.clone()
            m.emissive = new THREE.Color('#FF1E27')
            m.emissiveIntensity = 0.2
            m.toneMapped = false
            cloned.eye = m
          }
          child.material = cloned.eye
        }
        // White emission strips and indicator blocks
        else if (matName === 'emission_white') {
          if (!cloned.emissionWhite) {
            const m = child.material.clone()
            m.emissive = new THREE.Color('#FFFFFF')
            m.emissiveIntensity = 0.5
            m.toneMapped = false
            cloned.emissionWhite = m
          }
          child.material = cloned.emissionWhite
        }
        // Red accent hardware details
        else if (matName === 'red_parts') {
          if (!cloned.redParts) {
            const m = child.material.clone()
            m.emissive = new THREE.Color('#F32E35')
            m.emissiveIntensity = 0.3
            m.toneMapped = false
            cloned.redParts = m
          }
          child.material = cloned.redParts
        }
      }
    })

    return cloned
  }, [scene])

  // Play model animations if present
  useEffect(() => {
    if (reducedMotion) return

    if (actions && Object.keys(actions).length > 0) {
      const actionName = actions['Object_0'] ? 'Object_0' : Object.keys(actions)[0]
      const action = actions[actionName]
      if (action) {
        action.reset().fadeIn(0.6).play()
      }
    }

    return () => {
      if (actions) {
        Object.values(actions).forEach((act) => act?.stop())
      }
    }
  }, [actions, reducedMotion])

  // Spatial choreographic targets based on scroll progress
  // 0.00 - 0.20 : Hero (Right flank, prominent)
  // 0.20 - 0.45 : About (Shifts to left side, rotating)
  // 0.45 - 0.72 : Projects (Shifts to right side, architectural viewing angle)
  // 0.72 - 0.86 : Experience & Skills (Receded into background, subtle presence)
  // 0.86 - 1.00 : Contact (Last page: comes close, turns forward to face user, eyes ignite)
  const computeTargetTransform = (p: number, isMobile: boolean) => {
    if (isMobile) {
      if (p < 0.2) return { x: 0, y: -0.7, z: -0.4, scale: 0.8, rotY: p * 1.5 }
      if (p < 0.45) return { x: 0.3, y: -0.35, z: -0.6, scale: 0.7, rotY: 0.6 + p }
      if (p < 0.72) return { x: -0.3, y: 0.1, z: -0.8, scale: 0.65, rotY: 1.2 + p }
      if (p < 0.88) return { x: 0, y: 0.25, z: -1.6, scale: 0.48, rotY: 2.0 + p }
      const t = Math.min((p - 0.88) / 0.12, 1)
      return {
        x: 0,
        y: THREE.MathUtils.lerp(0.25, -0.32, t),
        z: THREE.MathUtils.lerp(-1.6, -0.35, t),
        scale: THREE.MathUtils.lerp(0.48, 0.72, t),
        rotY: THREE.MathUtils.lerp(2.0, 0.0, t),
      }
    }

    if (p < 0.2) {
      // Hero (Right flank on desktop)
      return { x: 1.8, y: -0.1, z: 0.0, scale: 1.0, rotY: p * 1.2 }
    }
    if (p < 0.45) {
      // About (Left flank)
      const t = (p - 0.2) / 0.25
      return {
        x: THREE.MathUtils.lerp(1.8, -1.75, t),
        y: THREE.MathUtils.lerp(-0.1, -0.15, t),
        z: THREE.MathUtils.lerp(0.0, -0.25, t),
        scale: THREE.MathUtils.lerp(1.0, 0.95, t),
        rotY: 0.3 + p * 2.0,
      }
    }
    if (p < 0.72) {
      // Projects (Right flank)
      const t = (p - 0.45) / 0.27
      return {
        x: THREE.MathUtils.lerp(-1.75, 1.85, t),
        y: THREE.MathUtils.lerp(-0.15, 0.05, t),
        z: THREE.MathUtils.lerp(-0.25, -0.35, t),
        scale: THREE.MathUtils.lerp(0.95, 0.9, t),
        rotY: 1.2 + p * 2.2,
      }
    }
    if (p < 0.88) {
      // Experience & Skills (Receded into background)
      const t = (p - 0.72) / 0.16
      return {
        x: THREE.MathUtils.lerp(1.85, 0.0, t),
        y: THREE.MathUtils.lerp(0.05, 0.25, t),
        z: THREE.MathUtils.lerp(-0.35, -1.6, t),
        scale: THREE.MathUtils.lerp(0.9, 0.55, t),
        rotY: 2.2 + p * 1.5,
      }
    }
    // Contact (Calm resting state at balanced scale & depth on right flank, facing forward)
    const t = Math.min((p - 0.88) / 0.12, 1)
    return {
      x: THREE.MathUtils.lerp(0.0, 2.05, t),
      y: THREE.MathUtils.lerp(0.25, -0.28, t),
      z: THREE.MathUtils.lerp(-1.6, -0.2, t),
      scale: THREE.MathUtils.lerp(0.55, 0.85, t),
      rotY: THREE.MathUtils.lerp(3.0, 0.0, t),
    }
  }

  useFrame((state) => {
    if (!groupRef.current) return

    const time = state.clock.getElapsedTime()
    const isMobile = window.innerWidth < 1024
    const target = computeTargetTransform(scrollProgress, isMobile)

    // Smooth position interpolation
    const lerpSpeed = 0.075
    groupRef.current.position.x = THREE.MathUtils.lerp(
      groupRef.current.position.x,
      target.x,
      lerpSpeed
    )
    groupRef.current.position.y = THREE.MathUtils.lerp(
      groupRef.current.position.y,
      target.y,
      lerpSpeed
    )
    groupRef.current.position.z = THREE.MathUtils.lerp(
      groupRef.current.position.z,
      target.z,
      lerpSpeed
    )

    // Scale interpolation
    const currentScale = groupRef.current.scale.x
    const newScale = THREE.MathUtils.lerp(currentScale, target.scale, lerpSpeed)
    groupRef.current.scale.setScalar(newScale)

    // --- Interactive Mouse Drag & Physics Inertia ---
    if (!isDragging.current) {
      manualRotYVel.current *= 0.93
      manualRotXVel.current *= 0.93
      manualRotY.current += manualRotYVel.current
      manualRotX.current += manualRotXVel.current
      manualRotX.current = THREE.MathUtils.clamp(manualRotX.current, -0.85, 0.85)

      // Gently restore toward section choreography if left untouched for > 5 seconds
      if (performance.now() - lastDragTime.current > 5000) {
        manualRotY.current = THREE.MathUtils.lerp(manualRotY.current, 0, 0.006)
        manualRotX.current = THREE.MathUtils.lerp(manualRotX.current, 0, 0.006)
      }
    }

    if (!reducedMotion) {
      // Interactive mouse parallax (head turns toward cursor)
      const mouseParallaxX = mouseRef.current.x * 0.22
      const mouseParallaxY = -mouseRef.current.y * 0.16

      const targetRotX = mouseParallaxY + manualRotX.current
      const targetRotY = target.rotY + manualRotY.current
      const targetRotZ = -mouseParallaxX * 0.2

      groupRef.current.rotation.x = THREE.MathUtils.lerp(
        groupRef.current.rotation.x,
        targetRotX,
        0.08
      )
      groupRef.current.rotation.y = THREE.MathUtils.lerp(
        groupRef.current.rotation.y,
        targetRotY,
        0.08
      )
      groupRef.current.rotation.z = THREE.MathUtils.lerp(
        groupRef.current.rotation.z,
        targetRotZ,
        0.08
      )
    } else {
      groupRef.current.rotation.y = target.rotY + manualRotY.current
      groupRef.current.rotation.x = manualRotX.current
    }

    // --- LED Animation System (Red & White) ---
    // 1. Scroll-settle glow (enhances when scrolling pauses)
    const settle = scrollSettle.current
    // 2. End page intensity factor (Contact section at last page)
    const endFactor = THREE.MathUtils.clamp((scrollProgress - 0.88) / 0.12, 0, 1)

    // Internal LED strips breathing effect (White)
    if (materials.emissionWhite) {
      const ledPulse = Math.sin(time * 3.2) * 0.5 + 0.5
      const whiteIntensity = (0.45 + 0.45 * ledPulse) * (1.0 + 0.9 * settle)
      materials.emissionWhite.emissiveIntensity = whiteIntensity
    }

    // Hardware accents breathing effect (Red)
    if (materials.redParts) {
      const redPulse = Math.cos(time * 2.6) * 0.5 + 0.5
      const redIntensity = (0.3 + 0.35 * redPulse) * (1.0 + 0.7 * settle)
      materials.redParts.emissiveIntensity = redIntensity
    }

    // --- EYES LED Effect (Red & White) ---
    const redColor = new THREE.Color('#FF1E27')
    const whiteColor = new THREE.Color('#FFFFFF')
    // Dynamic color cycle between vibrant Red and laser White
    const eyeColorCycle = Math.sin(time * 4.5) * 0.5 + 0.5
    const eyeColor = new THREE.Color().lerpColors(
      redColor,
      whiteColor,
      Math.pow(eyeColorCycle, 1.6)
    )

    if (materials.eye) {
      // Standby glow on earlier pages (brightens subtly when settled)
      const standbyEye = (0.18 + 0.15 * Math.sin(time * 2.0)) * (1.0 + 1.2 * settle)
      // High-intensity LED activation on the last page
      const endEyeGlow = 3.8 * (0.8 + 0.35 * Math.sin(time * 8.0) + 0.15 * Math.cos(time * 16.0))

      materials.eye.emissive.copy(eyeColor)
      materials.eye.emissiveIntensity = THREE.MathUtils.lerp(standbyEye, endEyeGlow, endFactor)
    }

    // Internal chassis point light
    if (internalLightRef.current) {
      const internalColor = new THREE.Color().lerpColors(
        redColor,
        whiteColor,
        Math.sin(time * 2.4) * 0.5 + 0.5
      )
      internalLightRef.current.color.copy(internalColor)
      internalLightRef.current.intensity = 0.6 + 0.7 * settle + 1.4 * endFactor
    }

    // Dual Eye Spotlights projecting forward
    if (leftEyeLightRef.current && rightEyeLightRef.current) {
      const eyeLightIntensity = THREE.MathUtils.lerp(
        settle * 0.35,
        3.2 * (0.8 + 0.3 * Math.sin(time * 7.5)),
        endFactor
      )

      // Left eye tactical red LED beam
      leftEyeLightRef.current.intensity = eyeLightIntensity
      leftEyeLightRef.current.color.copy(redColor)

      // Right eye laser white LED beam
      rightEyeLightRef.current.intensity = eyeLightIntensity
      rightEyeLightRef.current.color.copy(whiteColor)
    }
  })

  return (
    <group ref={groupRef} dispose={null}>
      {/* Internal Head/Visor LED PointLight */}
      <pointLight
        ref={internalLightRef}
        position={[0, -0.25, 0.15]}
        distance={2.4}
        decay={2}
        intensity={0.8}
        color="#FFFFFF"
      />

      {/* Left Eye LED Projector */}
      <pointLight
        ref={leftEyeLightRef}
        position={[-0.16, -0.3, 0.45]}
        distance={3.0}
        decay={2}
        intensity={0}
        color="#FF1E27"
      />

      {/* Right Eye LED Projector */}
      <pointLight
        ref={rightEyeLightRef}
        position={[0.16, -0.3, 0.45]}
        distance={3.0}
        decay={2}
        intensity={0}
        color="#FFFFFF"
      />

      <group scale={baseScale}>
        <primitive object={scene} position={centerOffset} />
      </group>
    </group>
  )
}

// Preload the GLB asset
useGLTF.preload('/rank_3_police.glb')

export default function DigitalCore() {
  const [scrollProgress, setScrollProgress] = useState(0)
  const [hasInteracted, setHasInteracted] = useState(false)
  const { isLight } = useTheme()

  // Drag rotation physics state
  const isDragging = useRef(false)
  const lastPointer = useRef({ x: 0, y: 0 })
  const manualRotY = useRef(0)
  const manualRotX = useRef(0)
  const manualRotYVel = useRef(0)
  const manualRotXVel = useRef(0)
  const lastDragTime = useRef(0)
  const mouseRef = useRef({ x: 0, y: 0 })

  // Scroll settle detection (glow triggers when scrolling ends)
  const lastScrollTime = useRef(0)
  const scrollSettle = useRef(0)

  // Track global scroll and settle state
  useEffect(() => {
    let scrollTimer: ReturnType<typeof setTimeout> | null = null

    const handleScroll = () => {
      const maxScroll = Math.max(
        document.documentElement.scrollHeight - window.innerHeight,
        1
      )
      const progress = Math.min(Math.max(window.scrollY / maxScroll, 0), 1)
      setScrollProgress(progress)

      lastScrollTime.current = performance.now()
      scrollSettle.current = 0

      if (scrollTimer) clearTimeout(scrollTimer)
      scrollTimer = setTimeout(() => {
        // Scrolling ended!
        scrollSettle.current = 1
      }, 160)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => {
      window.removeEventListener('scroll', handleScroll)
      if (scrollTimer) clearTimeout(scrollTimer)
    }
  }, [])

  // Global mouse drag rotation listeners
  useEffect(() => {
    const handlePointerDown = (e: PointerEvent) => {
      if (e.button !== 0) return

      // Allow clicks on links, buttons, form elements, and navbar without hijacking
      const target = e.target as HTMLElement | null
      if (target?.closest('a, button, input, textarea, select, [role="button"], nav')) {
        return
      }

      isDragging.current = true
      setHasInteracted(true)
      lastPointer.current = { x: e.clientX, y: e.clientY }
      lastDragTime.current = performance.now()
      document.body.style.cursor = 'grabbing'
    }

    const handlePointerMove = (e: PointerEvent) => {
      const x = (e.clientX / window.innerWidth) * 2 - 1
      const y = -(e.clientY / window.innerHeight) * 2 + 1
      mouseRef.current = { x, y }

      if (isDragging.current) {
        const dx = e.clientX - lastPointer.current.x
        const dy = e.clientY - lastPointer.current.y
        lastPointer.current = { x: e.clientX, y: e.clientY }
        lastDragTime.current = performance.now()

        const sens = 0.007
        manualRotYVel.current = dx * sens
        manualRotXVel.current = -dy * sens

        manualRotY.current += dx * sens
        manualRotX.current = THREE.MathUtils.clamp(
          manualRotX.current - dy * sens,
          -0.85,
          0.85
        )
      }
    }

    const handlePointerUp = () => {
      if (isDragging.current) {
        isDragging.current = false
        lastDragTime.current = performance.now()
        document.body.style.cursor = ''
      }
    }

    window.addEventListener('pointerdown', handlePointerDown)
    window.addEventListener('pointermove', handlePointerMove)
    window.addEventListener('pointerup', handlePointerUp)
    window.addEventListener('pointercancel', handlePointerUp)

    return () => {
      window.removeEventListener('pointerdown', handlePointerDown)
      window.removeEventListener('pointermove', handlePointerMove)
      window.removeEventListener('pointerup', handlePointerUp)
      window.removeEventListener('pointercancel', handlePointerUp)
      document.body.style.cursor = ''
    }
  }, [])

  return (
    <>
      <div
        className="fixed inset-0 pointer-events-none z-[5] overflow-hidden"
        aria-hidden="true"
      >
        <ErrorBoundary fallback={null}>
          <Canvas
            camera={{ position: [0, 0, 4.8], fov: 38 }}
            dpr={[1, 1.5]}
            gl={{
              antialias: true,
              alpha: true,
              powerPreference: 'high-performance',
              stencil: false,
              depth: true,
            }}
            style={{ width: '100%', height: '100%', display: 'block', background: 'transparent' }}
          >
            {/* Subtle balanced lighting for the stylized 3D model */}
            <ambientLight intensity={isLight ? 1.2 : 0.8} />
            <directionalLight position={[5, 8, 5]} intensity={isLight ? 1.5 : 1.2} />
            <directionalLight position={[-5, 3, -2]} intensity={isLight ? 0.7 : 0.5} />

            {/* Restrained red and blue accent lighting */}
            <pointLight position={[2, 1, 2]} intensity={0.8} distance={8} color="#E10600" />
            <pointLight position={[-3, -3, -2]} intensity={0.5} distance={8} color="#4E50DE" />

            <Suspense fallback={null}>
              <PoliceUnitModel
                scrollProgress={scrollProgress}
                scrollSettle={scrollSettle}
                manualRotY={manualRotY}
                manualRotX={manualRotX}
                manualRotYVel={manualRotYVel}
                manualRotXVel={manualRotXVel}
                isDragging={isDragging}
                lastDragTime={lastDragTime}
                mouseRef={mouseRef}
              />
            </Suspense>
          </Canvas>
        </ErrorBoundary>
      </div>

      {/* Floating Interactive Drag Helper Badge (fades after first drag) */}
      {!hasInteracted && (
        <div className="fixed bottom-6 right-6 z-20 pointer-events-none select-none transition-opacity duration-700 animate-pulse hidden sm:block">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#100F15]/90 backdrop-blur-md border border-white/15 text-[11px] font-['IBM_Plex_Mono'] text-[#A9A5AC] shadow-[0_0_20px_rgba(0,0,0,0.5)]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#E10600] animate-ping" />
            <span>DRAG ANYWHERE TO ROTATE 3D MODEL</span>
          </div>
        </div>
      )}
    </>
  )
}

