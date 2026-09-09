import { motion } from 'framer-motion'
import { philosophy, stats } from '../data/portfolio'

export default function About() {
  return (
    <section id="about" className="relative px-6 py-28 md:py-40">
      <div className="mx-auto max-w-4xl">
        <motion.span
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.5 }}
          className="text-xs uppercase tracking-[0.3em] text-muted"
        >
          {philosophy.eyebrow}
        </motion.span>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mt-6 font-display italic text-3xl leading-tight md:text-5xl lg:text-6xl text-balance"
        >
          {philosophy.heading}
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-10 max-w-2xl text-base md:text-lg leading-relaxed text-muted"
        >
          {philosophy.body}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-20 grid grid-cols-1 gap-8 border-t border-stroke pt-10 sm:grid-cols-3"
        >
          {stats.map((stat) => (
            <div key={stat.label}>
              <div className="font-display text-4xl md:text-5xl accent-gradient-text">
                {stat.value}
              </div>
              <div className="mt-2 text-sm text-muted">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
