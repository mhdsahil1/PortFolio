import { motion } from 'framer-motion'
import { projects } from '../data/portfolio'
import type { Project } from '../data/portfolio'

function ProjectCard({ project, index }: { project: Project; index: number }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5, delay: (index % 3) * 0.08 }}
      className={`group gradient-border relative flex flex-col overflow-hidden rounded-2xl border border-stroke bg-surface ${
        project.featured ? 'md:col-span-2' : ''
      }`}
    >
      {/* Preview area */}
      <div className="relative h-48 w-full overflow-hidden bg-gradient-to-br from-stroke/60 to-bg md:h-56">
        <div className="absolute inset-0 flex items-center justify-center font-display italic text-4xl text-muted/40 transition-transform duration-500 group-hover:scale-105">
          {project.title}
        </div>
        <div className="absolute inset-0 bg-bg/0 backdrop-blur-0 transition-all duration-500 group-hover:bg-bg/40 group-hover:backdrop-blur-sm" />
      </div>

      <div className="flex flex-1 flex-col gap-4 p-6 md:p-8">
        <div>
          {project.educational && (
            <span className="mb-2 inline-block rounded-full border border-stroke px-2.5 py-0.5 text-[10px] uppercase tracking-[0.2em] text-muted">
              Educational Project
            </span>
          )}
          <h3 className="font-display italic text-2xl md:text-3xl">{project.title}</h3>
          {project.subtitle && <p className="mt-1 text-sm text-muted">{project.subtitle}</p>}
        </div>

        <p className="text-sm leading-relaxed text-muted">{project.description}</p>

        {project.features && (
          <ul className="grid grid-cols-2 gap-x-4 gap-y-1 text-xs text-muted">
            {project.features.slice(0, 6).map((feature) => (
              <li key={feature} className="flex items-center gap-1.5">
                <span className="h-1 w-1 shrink-0 rounded-full bg-muted" />
                {feature}
              </li>
            ))}
          </ul>
        )}

        <div className="mt-auto flex flex-wrap gap-2 pt-2">
          {project.technologies.map((tech) => (
            <span
              key={tech}
              className="rounded-full border border-stroke bg-bg px-2.5 py-1 text-[11px] text-muted"
            >
              {tech}
            </span>
          ))}
        </div>

        <div className="mt-4 flex gap-3">
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noreferrer"
              className="rounded-full border border-stroke px-4 py-2 text-xs font-medium text-text-primary transition-colors hover:border-white/30"
            >
              GitHub
            </a>
          )}
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noreferrer"
              className="rounded-full bg-text-primary px-4 py-2 text-xs font-medium text-bg transition-transform duration-300 hover:scale-105"
            >
              Live Demo ↗
            </a>
          )}
        </div>
      </div>
    </motion.article>
  )
}

export default function Projects() {
  return (
    <section id="projects" className="relative px-6 py-28 md:py-40">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col items-start gap-2">
          <span className="text-xs uppercase tracking-[0.3em] text-muted">SELECTED WORK</span>
          <h2 className="font-display italic text-3xl md:text-5xl">Featured Projects</h2>
          <p className="mt-4 max-w-xl text-sm md:text-base text-muted">
            A selection of projects built across cybersecurity, software development, web
            applications, and systems.
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-6 md:grid-cols-2">
          {projects.map((project, i) => (
            <ProjectCard key={project.slug} project={project} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
