import { motion } from 'framer-motion'
import { experience } from '../data/portfolio'

export default function Experience() {
  return (
    <section id="experience" className="relative px-6 py-28 md:py-40">
      <div className="mx-auto max-w-4xl">
        <span className="text-xs uppercase tracking-[0.3em] text-muted">EXPERIENCE</span>
        <h2 className="mt-4 font-display italic text-3xl md:text-5xl">Where I've Learned</h2>

        <div className="mt-16 flex flex-col divide-y divide-stroke border-t border-stroke">
          {experience.map((entry, i) => (
            <motion.div
              key={entry.organization}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="grid grid-cols-1 gap-4 py-10 md:grid-cols-[140px_1fr]"
            >
              <div className="text-sm text-muted">{entry.dates}</div>
              <div>
                <h3 className="font-display italic text-xl md:text-2xl">{entry.organization}</h3>
                <p className="mt-1 text-sm text-muted">{entry.role}</p>
                <p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted">
                  {entry.description}
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {entry.areas.map((area) => (
                    <span
                      key={area}
                      className="rounded-full border border-stroke px-3 py-1 text-xs text-muted"
                    >
                      {area}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
