import { motion } from 'framer-motion'
import { exploration } from '../data/portfolio'

export default function Exploration() {
  return (
    <section className="relative px-6 py-20 md:py-28">
      <div className="mx-auto max-w-6xl">
        <span className="text-xs uppercase tracking-[0.3em] text-muted">ONGOING</span>
        <h2 className="mt-4 font-display italic text-2xl md:text-4xl">Currently Exploring</h2>

        <div className="mt-10 flex flex-wrap gap-3">
          {exploration.map((topic, i) => (
            <motion.span
              key={topic}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              className="rounded-full border border-stroke bg-surface/60 px-4 py-2 text-sm text-muted transition-colors duration-200 hover:text-text-primary hover:border-white/20"
            >
              {topic}
            </motion.span>
          ))}
        </div>
      </div>
    </section>
  )
}
