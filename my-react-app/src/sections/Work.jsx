import { useEffect, useRef } from 'react'
import { gsap } from '../animations/gsap'

const PROJECTS = [
  {
    slug: 'apaims', num: '01', year: '2024', name: 'APAIMS',
    tone: 'AgriTech · Enterprise', client: 'Govt. of Andhra Pradesh', role: 'Lead Frontend Engineer',
    stat: '10K+', statLabel: 'Agricultural records managed',
    desc: 'Large-scale Agricultural Information Management System — data-rich dashboards with dynamic filtering, multi-level headers, and export pipelines serving Andhra Pradesh government.',
    deliverables: ['Angular 18', 'PrimeNG', 'PostgreSQL', 'Node.js'],
    accent: '#F2590D',
    bgHue: 'rgba(242,89,13,0.06)',
  },
  {
    slug: 'slis-g', num: '02', year: '2023', name: 'SLIS-G',
    tone: 'Geospatial · AI', client: 'Vassar Labs', role: 'Full Stack Engineer',
    stat: 'RAG', statLabel: 'AI-powered geospatial alerts',
    desc: 'Satellite & drone imagery platform with ML-driven alert generation. Integrated RAG-style retrieval and prompt engineering for automated real-time map insights.',
    deliverables: ['Angular', 'GeoServer', 'ML / AI', 'OpenLayers'],
    accent: '#60A5FA',
    bgHue: 'rgba(96,165,250,0.06)',
  },
  {
    slug: 'wbamrut', num: '03', year: '2023', name: 'Wbamrut',
    tone: 'Municipal GIS · Lead', client: 'Govt. of West Bengal', role: 'Team Lead · 5 Engineers',
    stat: '5', statLabel: 'Engineers led end-to-end',
    desc: 'GIS platform managing water, green-space, and property tax data across West Bengal municipalities — draw tools, layer analysis, compare views, and Keycloak RBAC.',
    deliverables: ['Angular', 'Leaflet', 'Keycloak', 'GeoServer'],
    accent: '#22D3EE',
    bgHue: 'rgba(34,211,238,0.06)',
  },
  {
    slug: 'apwrims', num: '04', year: '2022', name: 'APWRIMS',
    tone: 'Water Resource · Agile', client: 'Govt. of Andhra Pradesh', role: 'Frontend Engineer',
    stat: '30%', statLabel: 'Load-time reduction achieved',
    desc: 'Angular interfaces for water-resource activity management — REST API integration, reporting, performance optimisation via lazy loading and memoisation.',
    deliverables: ['Angular', 'Bootstrap', 'REST APIs', 'PostgreSQL'],
    accent: '#FBBF24',
    bgHue: 'rgba(251,191,36,0.06)',
  },
  {
    slug: 'fieldwise', num: '05', year: '2022', name: 'FieldWise IoT',
    tone: 'IoT · Real-time', client: 'Vassar Labs · IoT Division', role: 'Engineering Intern',
    stat: 'IoT', statLabel: 'Real-time sensor data',
    desc: 'Angular app integrating real-time IoT sensor data via RESTful APIs. Interactive Leaflet maps, reactive forms, and UX improvements for field-data collection.',
    deliverables: ['Angular', 'Leaflet', 'REST APIs', 'Reactive Forms'],
    accent: '#4ADE80',
    bgHue: 'rgba(74,222,128,0.06)',
  },
]

function ProjectCard({ project }) {
  return (
    <div className="group w-full shrink-0 md:w-[500px]">
      <article className="flex flex-col gap-5">

        {/* Image card */}
        <div className="transition-transform duration-500 ease-[cubic-bezier(0.34,1.15,0.64,1)] group-hover:-translate-y-3">
          <div className="relative overflow-hidden"
            style={{
              aspectRatio: '4 / 5', borderRadius: '18px',
              border: '1px solid var(--color-border)',
              WebkitMaskImage: '-webkit-radial-gradient(white, black)', isolation: 'isolate',
            }}>
            {/* Gradient placeholder */}
            <div className="absolute inset-0" style={{ background: 'var(--color-placeholder)' }} />

            {/* Project-specific subtle tint */}
            <div className="absolute inset-0" style={{ background: project.bgHue }} />

            {/* Accent glow bottom-left */}
            <div className="pointer-events-none absolute inset-0" style={{
              background: `radial-gradient(ellipse 70% 55% at 10% 100%, ${project.accent}28 0%, transparent 55%)`,
            }} />

            {/* Top meta bar */}
            <div className="absolute inset-x-0 top-0 flex items-center justify-between px-6 py-6 md:px-7 md:py-7"
              style={{ background: 'linear-gradient(to bottom, rgba(0,0,0,0.22), transparent)' }}>
              <span className="font-mono text-[10px] uppercase tracking-[0.22em]" style={{ color: `${project.accent}cc` }}>{project.tone}</span>
              <span className="font-mono text-[10px]" style={{ color: 'var(--color-text-ultra)' }}>{project.num}</span>
            </div>

            {/* "Image coming soon" text — subtle */}
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="font-mono text-[10px] uppercase tracking-[0.28em] select-none" style={{ color: 'var(--color-text-ultra)', opacity: 0.5 }}>image soon</span>
            </div>

            {/* Bottom vignette */}
            <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-[220px]" style={{
              background: 'linear-gradient(to top, var(--color-bg) 0%, transparent 100%)',
            }} />

            {/* Stat overlay */}
            <div className="absolute bottom-0 left-0 px-6 pb-7 md:px-7 md:pb-9">
              <span className="block font-archivo leading-none tracking-[-0.04em] text-[3.4rem] md:text-[4.8rem]"
                style={{ color: project.accent, textShadow: `0 0 60px ${project.accent}40` }}>
                {project.stat}
              </span>
              <span className="mt-1 block font-mono text-[9.5px] uppercase tracking-[0.2em]"
                style={{ color: `${project.accent}75` }}>
                {project.statLabel}
              </span>
            </div>

            {/* Hover overlay */}
            <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100">
              <span className="rounded-full px-6 py-3 font-mono text-[10.5px] uppercase tracking-[0.26em] text-white backdrop-blur-md"
                style={{ background: `${project.accent}20`, border: `1px solid ${project.accent}50` }}>
                View Project
              </span>
            </div>
          </div>
        </div>

        {/* Below-card info */}
        <div className="flex flex-col gap-2 px-1">
          <div className="flex items-baseline justify-between gap-3">
            <span className="font-display text-[19px] leading-tight tracking-[-0.01em] md:text-[21px]"
              style={{ color: 'var(--color-text)' }}>
              {project.name}
            </span>
            <span className="shrink-0 font-mono text-[10.5px] tracking-[0.1em]"
              style={{ color: 'var(--color-text-ultra)' }}>
              {project.year}
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-1.5 font-mono text-[9.5px] uppercase tracking-[0.16em]"
            style={{ color: 'var(--color-text-dim)' }}>
            <span>{project.client}</span>
            <span className="opacity-40">·</span>
            <span>{project.role}</span>
          </div>

          <p className="leading-[1.68] font-light"
            style={{ fontSize: '13.5px', color: 'var(--color-text-muted)', marginTop: '2px' }}>
            {project.desc}
          </p>

          <div className="flex flex-wrap gap-1.5 pt-1.5">
            {project.deliverables.map(d => (
              <span key={d}
                className="rounded-full px-3 py-[4px] font-mono text-[10px] tracking-[0.05em]"
                style={{ border: `1px solid ${project.accent}22`, color: 'var(--color-text-dim)', background: `${project.accent}08` }}>
                {d}
              </span>
            ))}
          </div>
        </div>
      </article>
    </div>
  )
}

export default function Work() {
  const sectionRef = useRef()
  const cardsRef   = useRef()
  const trackRef   = useRef()

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('[data-work-label]', { opacity: 0, y: 12, duration: 0.6, ease: 'power2.out', scrollTrigger: { trigger: '[data-work-label]', start: 'top 88%' } })
      gsap.from('[data-work-head]',  { opacity: 0, y: 18, duration: 0.7, ease: 'power3.out', scrollTrigger: { trigger: '[data-work-head]', start: 'top 86%' } })

      gsap.matchMedia().add('(min-width: 769px)', () => {
        const section = cardsRef.current
        const track   = trackRef.current
        if (!section || !track) return
        const items = gsap.utils.toArray('li', track)
        const clamp = gsap.utils.clamp(-8, 8)
        gsap.fromTo(track, { x: 0 }, {
          x: () => -(track.scrollWidth - section.offsetWidth + 80),
          ease: 'none',
          scrollTrigger: {
            trigger: section, start: 'top top+=80',
            end: () => `+=${Math.max(0, track.scrollWidth - section.offsetWidth + 160)}`,
            pin: true, pinSpacing: true, scrub: 0.7, invalidateOnRefresh: true,
            onUpdate: (self) => {
              const skew = clamp(self.getVelocity() / -400)
              gsap.to(items, { skewX: skew, duration: 1.4, ease: 'power3.out', overwrite: 'auto' })
            },
          },
        })
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} id="work" className="relative" style={{ background: 'var(--color-bg)' }}>

      <div className="px-4 pb-8 pt-20 sm:px-6 md:px-16 md:pb-14 md:pt-32 lg:px-24">
        <div className="flex items-center gap-4 mb-8">
          <div className="accent-line" />
          <p data-work-label className="label">03 — Selected Work</p>
        </div>
        <div data-work-head className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <h2 className="font-display leading-[0.93] tracking-[-0.025em]"
            style={{ fontSize: 'clamp(2.6rem, 6vw, 5.5rem)', color: 'var(--color-text)' }}>
            Selected<br /><span style={{ color: 'var(--color-accent)', fontStyle: 'italic' }}>Work</span>
          </h2>
          <p className="max-w-[42ch] leading-[1.75]"
            style={{ fontSize: '14px', color: 'var(--color-text-dim)' }}>
            Government-scale platforms, AI-powered field apps, and enterprise GIS tools. All production, all shipped.
          </p>
        </div>
      </div>

      <div ref={cardsRef} data-feature-cards-section className="overflow-hidden pb-6">
        <ul ref={trackRef} data-feature-cards-track
          className="flex flex-col gap-10 px-4 sm:px-6 md:flex-row md:gap-8 md:pl-20 md:pr-20">
          {PROJECTS.map((p) => (
            <li key={p.slug} className="w-full shrink-0 md:w-[500px]">
              <ProjectCard project={p} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
