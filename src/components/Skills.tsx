import { motion } from 'framer-motion'
import { skills } from '../data/portfolio'

export default function Skills() {
  return (
    <section id="skills" className="relative px-6 py-28 md:py-40">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col items-start gap-2">
          <span className="text-xs uppercase tracking-[0.3em] text-muted">
            SKILLS &amp; TECHNOLOGIES
          </span>
          <h2 className="font-display italic text-3xl md:text-5xl">What I Work With</h2>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-6 md:grid-cols-2">
          {skills.map((category, i) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="gradient-border rounded-2xl border border-stroke bg-surface p-6 md:p-8"
            >
              <h3 className="text-sm uppercase tracking-[0.2em] text-muted">{category.title}</h3>
              <div className="mt-5 flex flex-wrap gap-2">
                {category.skills.map((skill) => (
                  <span
                    key={skill}
                    className="rounded-full border border-stroke bg-bg px-3 py-1.5 text-xs md:text-sm text-text-primary transition-colors duration-200 hover:border-white/20"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
