import { useHlsVideo } from '../hooks/useHlsVideo'
import { personalInfo, socialLinks, HLS_SRC } from '../data/portfolio'
import Marquee from './Marquee'

export default function Footer() {
  const { videoRef, failed, ready } = useHlsVideo(HLS_SRC)
  const year = new Date().getFullYear()

  return (
    <footer className="relative overflow-hidden border-t border-stroke">
      <Marquee />

      <div className="relative px-6 py-20 md:py-28">
        <div className="absolute inset-0 -z-10 bg-bg">
          {!failed && (
            <video
              ref={videoRef}
              className={`h-full w-full object-cover transition-opacity duration-1000 ${
                ready ? 'opacity-15' : 'opacity-0'
              }`}
              style={{ transform: 'scaleY(-1)' }}
              autoPlay
              muted
              loop
              playsInline
              aria-hidden="true"
            />
          )}
          <div className="absolute inset-0 bg-bg/85" />
        </div>

        <div className="mx-auto flex max-w-6xl flex-col gap-10 md:flex-row md:items-end md:justify-between">
          <div>
            <div className="font-display italic text-2xl">S.</div>
            <p className="mt-2 text-sm text-muted">© {year} {personalInfo.name}</p>
            {personalInfo.availableForOpportunities && (
              <div className="mt-4 inline-flex items-center gap-2 rounded-full border border-stroke px-3 py-1.5 text-xs text-muted">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#4E85BF] opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full accent-gradient" />
                </span>
                Available for opportunities
              </div>
            )}
          </div>

          <nav aria-label="Social links" className="flex gap-6 text-sm">
            <a
              href={socialLinks.github !== '[ADD GITHUB URL]' ? socialLinks.github : undefined}
              target="_blank"
              rel="noreferrer"
              className="text-muted transition-colors hover:text-text-primary"
            >
              GitHub
            </a>
            <a
              href={socialLinks.linkedin !== '[ADD LINKEDIN]' ? socialLinks.linkedin : undefined}
              target="_blank"
              rel="noreferrer"
              className="text-muted transition-colors hover:text-text-primary"
            >
              LinkedIn
            </a>
            <a
              href={
                personalInfo.email !== '[ADD EMAIL]' ? `mailto:${personalInfo.email}` : undefined
              }
              className="text-muted transition-colors hover:text-text-primary"
            >
              Email
            </a>
          </nav>
        </div>
      </div>
    </footer>
  )
}
