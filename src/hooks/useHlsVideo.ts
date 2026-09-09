import { useEffect, useRef, useState } from 'react'
import Hls from 'hls.js'

export function useHlsVideo(src: string) {
  const videoRef = useRef<HTMLVideoElement | null>(null)
  const [failed, setFailed] = useState(false)
  const [ready, setReady] = useState(false)

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    let hls: Hls | null = null
    let cancelled = false

    const handleFail = () => {
      if (!cancelled) setFailed(true)
    }

    const handleReady = () => {
      if (!cancelled) setReady(true)
    }

    try {
      if (Hls.isSupported()) {
        hls = new Hls({ enableWorker: true })
        hls.loadSource(src)
        hls.attachMedia(video)
        hls.on(Hls.Events.MANIFEST_PARSED, handleReady)
        hls.on(Hls.Events.ERROR, (_event, data) => {
          if (data?.fatal) {
            handleFail()
          }
        })
      } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
        video.src = src
        video.addEventListener('loadedmetadata', handleReady)
        video.addEventListener('error', handleFail)
      } else {
        handleFail()
      }
    } catch {
      handleFail()
    }

    return () => {
      cancelled = true
      if (hls) {
        hls.destroy()
      }
      video.removeEventListener('loadedmetadata', handleReady)
      video.removeEventListener('error', handleFail)
    }
  }, [src])

  return { videoRef, failed, ready }
}
