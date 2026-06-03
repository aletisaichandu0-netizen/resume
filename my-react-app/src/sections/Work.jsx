import { useEffect, useRef } from 'react'
import { gsap } from '../animations/gsap'

const PROJECTS = [
  {
    slug: 'apaims',     num: '01', year: '2024', name: 'APAIMS',
    tone: 'AgriTech · Enterprise', client: 'Govt. of Andhra Pradesh', role: 'Lead Frontend Engineer',
    stat: '10K+', statLabel: 'Agricultural records',
    desc: 'Large-scale Agricultural Information Management System — data-rich dashboards with dynamic filtering, multi-level headers, and export pipelines.',
    deliverables: ['Angular 18', 'PrimeNG', 'PostgreSQL', 'Node.js'],
    accent: '#F2590D',
  },
  {
    slug: 'slis-g',     num: '02', year: '2023', name: 'SLIS-G',
    tone: 'GIS · AI Platform', client: 'Vassar Labs', role: 'Full Stack Engineer',
    stat: 'RAG', statLabel: 'AI-powered alerts',
    desc: 'Geospatial analytics platform ingesting satellite and drone imagery through ML models with RAG-style retrieval for automated alert generation.',
    deliverables: ['Angular', 'GeoServer', 'ML / AI', 'OpenLayers'],
    accent: '#60A5FA',
  },
  {
    slug: 'wbamrut',    num: '03', year: '2023', name: 'Wbamrut',
    tone: 'Municipal GIS · Team Lead', client: 'Govt. of West Bengal', role: 'Team Lead · 5 Engineers',
    stat: '5', statLabel: 'Engineers led',
    desc: 'GIS-based platform managing water, green-space, and property tax data across West Bengal municipalities — draw tools, layer analysis, RBAC.',
    deliverables: ['Angular', 'Leaflet', 'Keycloak', 'GeoServer'],
    accent: '#22D3EE',
  },
  {
    slug: 'apwrims',    num: '04', year: '2022', name: 'APWRIMS',
    tone: 'Water Resource · Agile', client: 'Govt. of Andhra Pradesh', role: 'Frontend Engineer',
    stat: '30%', statLabel: 'Load-time reduction',
    desc: 'Angular interfaces for water-resource activity management — REST API integration, reporting, performance optimisation, and agile sprint delivery.',
    deliverables: ['Angular', 'Bootstrap', 'REST APIs', 'PostgreSQL'],
    accent: '#FBBF24',
  },
  {
    slug: 'fieldwise',  num: '05', year: '2022', name: 'FieldWise IoT',
    tone: 'IoT · Real-time', client: 'Vassar Labs · IoT Division', role: 'Engineering Intern',
    stat: 'IoT', statLabel: 'Real-time data',
    desc: 'Angular app integrating real-time IoT sensor data via RESTful APIs — interactive Leaflet maps, reactive forms, and UX improvements.',
    deliverables: ['Angular', 'Leaflet', 'REST APIs', 'Reactive Forms'],
    accent: '#4ADE80',
  },
]

function ProjectCard({ project }) {
  return (
    <div className="group w-full shrink-0 md:w-[520px]">
      <article className="flex flex-col gap-5">

        {/* Image card */}
        <div className="transition-transform duration-500 ease-[cubic-bezier(0.34,1.2,0.64,1)] group-hover:-translate-y-[10px]">
          <div className="relative overflow-hidden"
            style={{
              aspectRatio: '4 / 5', borderRadius: '20px',
              border: '1px solid var(--color-border)',
              WebkitMaskImage: '-webkit-radial-gradient(white, black)', isolation: 'isolate',
            }}>
            {/* Blank placeholder */}
            <div className="absolute inset-0" style={{ background: 'var(--color-placeholder)' }} />
            {/* Accent glow */}
            <div className="pointer-events-none absolute inset-0" style={{
              background: `radial-gradient(ellipse 65% 50% at 15% 100%, ${project.accent}20 0%, transparent 60%)`,
            }} />
            {/* Top meta */}
            <div className="absolute inset-x-0 top-0 flex items-center justify-between px-6 py-6 font-mono text-[10px] uppercase tracking-[0.22em] md:px-8 md:py-8 md:text-[11px]"
              style={{ color: `${project.accent}cc` }}>
              <span>{project.tone}</span>
              <span style={{ color: 'var(--color-text-ultra)' }}>{project.num}</span>
            </div>
            {/* Bottom vignette */}
            <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-[200px]" style={{
              background: 'linear-gradient(to top, var(--color-placeholder-bot, rgba(0,0,0,0.9)) 0%, transparent 100%)',
            }} />
            {/* Stat */}
            <div className="absolute bottom-0 left-0 px-6 pb-7 md:px-8 md:pb-10">
              <span className="block font-archivo leading-none tracking-[-0.04em] text-[3.5rem] md:text-[5rem]"
                style={{ color: project.accent }}>{project.stat}</span>
              <span className="mt-1 block font-mono text-[10px] uppercase tracking-[0.2em]"
                style={{ color: `${project.accent}70` }}>{project.statLabel}</span>
            </div>
            {/* Hover CTA */}
            <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100">
              <span className="rounded-full px-6 py-3 font-mono text-[11px] uppercase tracking-[0.28em] text-white backdrop-blur-sm"
                style={{ background: `${project.accent}22`, border: `1px solid ${project.accent}44` }}>
                View Project
              </span>
            </div>
          </div>
        </div>

        {/* Below card info */}
        <div className="flex flex-col gap-2 px-1">
          <div className="flex items-baseline justify-between gap-4">
            <span className="font-display text-[20px] leading-tight tracking-[-0.01em] md:text-[22px]"
              style={{ color: 'var(--color-text)' }}>{project.name}</span>
            <span className="shrink-0 font-mono text-[11px] tracking-[0.1em]"
              style={{ color: 'var(--color-text-dim)' }}>{project.year}</span>
          </div>
          <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.16em]"
            style={{ color: 'var(--color-text-dim)' }}>
            <span>{project.client}</span>
            <span style={{ opacity: 0.5 }}>·</span>
            <span>{project.role}</span>
          </div>
          <p className="leading-[1.65] tracking-[-0.01em] font-light"
            style={{ fontSize: '14px', color: 'var(--color-text-muted)' }}>{project.desc}</p>
          <ul className="flex flex-wrap gap-[6px] pt-1">
            {project.deliverables.map(d => (
              <li key={d} className="rounded-full px-3 py-[5px] font-mono text-[10px] tracking-[0.06em]"
                style={{ border: `1px solid ${project.accent}22`, color: 'var(--color-text-dim)' }}>{d}</li>
            ))}
          </ul>
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
      gsap.from('[data-work-head]',  { opacity: 0, y: 16, duration: 0.7, ease: 'power3.out', scrollTrigger: { trigger: '[data-work-head]', start: 'top 86%' } })

      gsap.matchMedia().add('(min-width: 769px)', () => {
        const section = cardsRef.current
        const track   = trackRef.current
        if (!section || !track) return
        const cardItems = gsap.utils.toArray('li', track)
        const clamp     = gsap.utils.clamp(-10, 10)
        gsap.fromTo(track, { x: 0 }, {
          x: () => -(track.scrollWidth - section.offsetWidth + 80),
          ease: 'none',
          scrollTrigger: {
            trigger: section, start: 'top top+=80',
            end: () => `+=${Math.max(0, track.scrollWidth - section.offsetWidth + 160)}`,
            pin: true, pinSpacing: true, scrub: 0.6, invalidateOnRefresh: true,
            onUpdate: (self) => {
              const skew = clamp(self.getVelocity() / -350)
              gsap.to(cardItems, { skewX: skew, duration: 1.2, ease: 'power3.out', overwrite: 'auto' })
            },
          },
        })
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} id="work" className="relative" style={{ background: 'var(--color-bg)' }}>
      {/* Header */}
      <div className="px-4 pb-8 pt-16 sm:px-6 md:px-16 md:pb-12 md:pt-28 lg:px-24">
        <p data-work-label className="label mb-5 md:mb-8">03 — Selected Work</p>
        <div data-work-head className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between md:gap-6">
          <h2 className="font-display leading-[0.95] tracking-[-0.02em]"
            style={{ fontSize: 'clamp(2.6rem, 6vw, 5.5rem)', color: 'var(--color-text)' }}>
            Selected Work
          </h2>
          <p className="max-w-[44ch] text-[14px] leading-[1.72]" style={{ color: 'var(--color-text-dim)' }}>
            Government platforms, enterprise tools, AI-powered field apps — built to ship.
          </p>
        </div>
      </div>

      {/* Cards */}
      <div ref={cardsRef} data-feature-cards-section className="pb-4 overflow-hidden">
        <ul ref={trackRef} data-feature-cards-track
          className="flex flex-col gap-10 px-4 sm:px-6 md:flex-row md:gap-9 md:pl-20 md:pr-20">
          {PROJECTS.map((p) => (
            <li key={p.slug} className="w-full shrink-0 md:w-[520px]">
              <ProjectCard project={p} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
