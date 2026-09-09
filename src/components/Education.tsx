import { motion } from 'framer-motion'
import { education } from '../data/portfolio'

export default function Education() {
  return (
    <section id="education" className="relative px-6 py-28 md:py-32">
      <div className="mx-auto max-w-4xl">
        <span className="text-xs uppercase tracking-[0.3em] text-muted">EDUCATION</span>
        <h2 className="mt-4 font-display italic text-3xl md:text-5xl">Academic Background</h2>

        <div className="mt-14 flex flex-col gap-6">
          {education.map((entry, i) => (
            <motion.div
              key={entry.title}
              initial={{ opacity: 0, x: -16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="flex flex-col gap-2 border-l border-stroke pl-6 md:flex-row md:items-baseline md:justify-between"
            >
              <div>
                <h3 className="text-base md:text-lg font-medium text-text-primary">
                  {entry.title}
                </h3>
                {entry.subtitle && <p className="mt-1 text-sm text-muted">{entry.subtitle}</p>}
                {entry.meta.length > 0 && (
                  <p className="mt-1 text-xs text-muted">{entry.meta.join(' · ')}</p>
                )}
              </div>
              {entry.score && (
                <div className="shrink-0 text-sm text-muted">Score: {entry.score}</div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
