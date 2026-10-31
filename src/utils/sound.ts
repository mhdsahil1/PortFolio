/**
 * Lightweight Zero-Asset Web Audio Synthesizer
 * Generates futuristic micro-haptic clicks, pops, and chimes on the fly
 * without downloading any audio files.
 */

let audioCtx: AudioContext | null = null

function getAudioContext(): AudioContext | null {
  if (typeof window === 'undefined') return null
  if (!audioCtx) {
    const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext
    if (AudioContextClass) {
      audioCtx = new AudioContextClass()
    }
  }
  if (audioCtx && audioCtx.state === 'suspended') {
    audioCtx.resume().catch(() => {})
  }
  return audioCtx
}

/** Subtle high-tech tick on button/card hover */
export function playHoverTick(volume = 0.03): void {
  const ctx = getAudioContext()
  if (!ctx) return

  try {
    const osc = ctx.createOscillator()
    const gain = ctx.createGain()

    osc.type = 'sine'
    osc.frequency.setValueAtTime(1400, ctx.currentTime)
    osc.frequency.exponentialRampToValueAtTime(800, ctx.currentTime + 0.03)

    gain.gain.setValueAtTime(volume, ctx.currentTime)
    gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.03)

    osc.connect(gain)
    gain.connect(ctx.destination)

    osc.start()
    osc.stop(ctx.currentTime + 0.035)
  } catch {
    // Graceful fallback if audio is blocked
  }
}

/** Crisp futuristic mechanical pop on clicks */
export function playClickPop(volume = 0.05): void {
  const ctx = getAudioContext()
  if (!ctx) return

  try {
    const osc = ctx.createOscillator()
    const gain = ctx.createGain()

    osc.type = 'triangle'
    osc.frequency.setValueAtTime(620, ctx.currentTime)
    osc.frequency.exponentialRampToValueAtTime(180, ctx.currentTime + 0.05)

    gain.gain.setValueAtTime(volume, ctx.currentTime)
    gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.05)

    osc.connect(gain)
    gain.connect(ctx.destination)

    osc.start()
    osc.stop(ctx.currentTime + 0.055)
  } catch {
    // Graceful fallback
  }
}

/** Ethereal harmonic chime for special achievements or toggle */
export function playEtherealChime(frequency = 880, volume = 0.04): void {
  const ctx = getAudioContext()
  if (!ctx) return

  try {
    const osc = ctx.createOscillator()
    const gain = ctx.createGain()

    osc.type = 'sine'
    osc.frequency.setValueAtTime(frequency, ctx.currentTime)
    osc.frequency.exponentialRampToValueAtTime(frequency * 1.5, ctx.currentTime + 0.18)

    gain.gain.setValueAtTime(volume, ctx.currentTime)
    gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.2)

    osc.connect(gain)
    gain.connect(ctx.destination)

    osc.start()
    osc.stop(ctx.currentTime + 0.22)
  } catch {
    // Graceful fallback
  }
}

