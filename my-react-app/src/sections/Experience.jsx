import { useEffect, useRef } from 'react'
import { gsap } from '../animations/gsap'

const JOBS = [
  {
    company: 'Vassar Labs', division: 'Climate / AgriTech Division',
    role: 'Software Development Engineer', period: 'Sep 2022 — Present',
    accent: '#e7cfb1',
    bullets: [
      'Architected Angular (v2–18) and React.js web apps across multiple product lines for enterprise government clients',
      'Designed and optimised PostgreSQL schemas handling 10,000+ agricultural records with complex filtering, aggregation, and export pipelines',
      'Built reusable PrimeNG Design System across 5+ projects — aligned with Micro Frontend principles, cutting feature delivery time by 40%',
      'Integrated AI/ML services and RAG-style retrieval into geospatial dashboards for automated alert generation from satellite/drone imagery',
      'Developed Node.js middleware, REST APIs, and Python scripts for backend data pipelines and AI workflow automation',
      'Integrated Highcharts and PrimeNG Charts for advanced analytics dashboards serving government and enterprise stakeholders',
      'Achieved 30% load-time reduction via lazy loading, memoisation, and code-splitting — improving Lighthouse scores across production builds',
      'Developed GIS tools with Leaflet, OpenLayers, and GeoServer for spatial data visualisation, layer filtering, and geospatial analysis',
      'Implemented Keycloak IAM (RBAC) for enterprise-grade security and compliance as first-class engineering concerns',
      'Led a team of 5 engineers — code reviews, TypeScript best practices, mentoring, and AI-assisted workflow knowledge-sharing sessions',
    ],
  },
  {
    company: 'Vassar Labs', division: 'IoT Division',
    role: 'Software Engineering Intern', period: 'Mar 2022 — Sep 2022',
    accent: '#60A5FA',
    bullets: [
      'Built Angular-based web applications — components, services, reactive forms, and modules integrated with RESTful APIs for real-time IoT data exchange',
      'Gained GIS exposure (Leaflet, OpenLayers) by integrating interactive maps into IoT dashboards; collaborated on input validation, template-driven forms, and UX improvements',
    ],
  },
]

export default function Experience() {
  const sectionRef = useRef()

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('[data-exp-label]', { opacity: 0, y: 12, duration: 0.6, ease: 'power2.out', scrollTrigger: { trigger: '[data-exp-label]', start: 'top 88%' } })
      gsap.from('[data-exp-head]',  { opacity: 0, y: 16, duration: 0.7, ease: 'power3.out', scrollTrigger: { trigger: '[data-exp-head]', start: 'top 86%' } })
      gsap.utils.toArray('[data-exp-card]', sectionRef.current).forEach((el) => {
        gsap.fromTo(el, { opacity: 0, y: 40 },
          { opacity: 1, y: 0, duration: 0.85, ease: 'power3.out', scrollTrigger: { trigger: el, start: 'top 88%', once: true } })
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} id="experience" className="relative overflow-hidden px-4 py-16 sm:px-6 md:px-16 md:py-32 lg:px-24"
      style={{ background: 'var(--color-bg)' }}>

      {/* Grid lines */}
      <div className="pointer-events-none absolute inset-0 z-0 grid-bg" />

      {/* Ambient glows */}
      <div className="pointer-events-none absolute -right-20 top-1/3 z-0 h-80 w-80 rounded-full opacity-08 blur-[90px]"
        style={{ background: 'var(--color-accent)' }} />
      <div className="pointer-events-none absolute -left-16 bottom-1/4 z-0 h-64 w-64 rounded-full opacity-06 blur-[80px]"
        style={{ background: '#60A5FA' }} />

      <div className="relative z-10 mx-auto max-w-[1100px]">
        <p data-exp-label className="label mb-5">04 — Work History</p>

        {/* Glass header */}
        <div data-exp-head className="mb-8 rounded-[20px] p-6 backdrop-blur-md sm:p-7 md:mb-14 md:p-10"
          style={{ border: '1px solid var(--color-border)', background: 'var(--color-surface)' }}>
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <h2 className="font-display leading-[0.95] tracking-[-0.02em]"
              style={{
                fontSize: 'clamp(2.4rem, 5.5vw, 5rem)',
                background: 'linear-gradient(90deg, var(--color-text) 30%, var(--color-text-muted) 100%)',
                WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
              }}>
              Work<br />Experience
            </h2>
            <p className="max-w-[36ch] text-[14px] leading-[1.72]" style={{ color: 'var(--color-text-muted)' }}>
              4+ years building enterprise-grade systems for government agencies, agritech, and IoT platforms.
            </p>
          </div>
        </div>

        {/* Job cards */}
        <div className="flex flex-col gap-5">
          {JOBS.map((job, i) => (
            <div key={i} data-exp-card
              className="service-card group relative overflow-hidden rounded-2xl p-8 md:p-10 transition-[background,box-shadow] duration-300"
              style={{
                background: 'var(--color-surface)',
                border: '1px solid var(--color-border)',
                borderLeft: `3px solid ${job.accent}`,
              }}>
              <div className="service-card-shine pointer-events-none absolute inset-0 z-0" />
              <div className="absolute left-0 right-0 top-0 h-px opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                style={{ background: `linear-gradient(90deg, transparent, ${job.accent}55, transparent)` }} />

              <div className="relative z-10">
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-8">
                  <div>
                    <h3 className="font-display leading-tight mb-1" style={{ fontSize: 'clamp(20px,2.2vw,30px)', color: 'var(--color-text)' }}>
                      {job.company}
                    </h3>
                    <p className="font-mono text-[11px] uppercase tracking-[0.18em]" style={{ color: job.accent }}>{job.division}</p>
                  </div>
                  <div className="md:text-right shrink-0">
                    <p className="font-mono text-[11px] mb-2" style={{ color: 'var(--color-text-dim)' }}>{job.role}</p>
                    <span className="inline-block font-mono text-[11px] px-3 py-1.5 rounded-lg"
                      style={{ border: `1px solid ${job.accent}30`, color: job.accent, background: `${job.accent}0C` }}>
                      {job.period}
                    </span>
                  </div>
                </div>

                <ul className="grid md:grid-cols-2 gap-x-10 gap-y-3">
                  {job.bullets.map((b, j) => (
                    <li key={j} className="flex gap-3 leading-relaxed" style={{ fontSize: '13.5px', color: 'var(--color-text-muted)' }}>
                      <span className="flex-shrink-0 mt-[6px] w-1.5 h-1.5 rounded-full" style={{ background: job.accent }} />
                      {b}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
