import { motion } from 'framer-motion'
import { personalInfo } from '../data/portfolio'

export default function Contact() {
  const hasEmail = personalInfo.email !== '[ADD EMAIL]'

  return (
    <section id="contact" className="relative px-6 py-28 md:py-40">
      <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6 }}
          className="font-display italic text-3xl leading-tight md:text-5xl lg:text-6xl text-balance"
        >
          Let's Build Something Useful.
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mt-6 max-w-xl text-sm md:text-base text-muted"
        >
          Interested in cybersecurity, software development, or building something challenging?
          Let's connect.
        </motion.p>

        <motion.a
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          href={hasEmail ? `mailto:${personalInfo.email}` : undefined}
          aria-disabled={!hasEmail}
          className={`gradient-border mt-10 inline-flex items-center gap-2 rounded-full border border-stroke px-8 py-4 text-sm font-medium transition-colors duration-300 ${
            hasEmail
              ? 'text-text-primary hover:border-transparent'
              : 'cursor-not-allowed text-muted'
          }`}
        >
          {hasEmail ? 'Get in Touch ↗' : `Get in Touch — ${personalInfo.email}`}
        </motion.a>
      </div>
    </section>
  )
}
