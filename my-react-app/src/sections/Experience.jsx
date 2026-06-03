import { useEffect, useRef } from 'react'
import { gsap } from '../animations/gsap'

const JOBS = [
  {
    company: 'Vassar Labs',
    division: 'Climate / AgriTech Division',
    role: 'Software Development Engineer',
    period: 'Sep 2022 — Present',
    duration: '3+ years',
    accent: '#d4a96c',
    type: 'Full-time',
    bullets: [
      { impact: 'Architected', text: 'Angular (v2–18) and React.js web apps across multiple product lines for enterprise government clients' },
      { impact: '10K+ records', text: 'Designed and optimised PostgreSQL schemas with complex filtering, aggregation, and export pipelines' },
      { impact: 'Design System', text: 'Built reusable PrimeNG component library across 5+ projects aligned with Micro Frontend principles, cutting delivery time 40%' },
      { impact: 'AI/ML', text: 'Integrated RAG-style retrieval into geospatial dashboards for automated alert generation from satellite/drone imagery' },
      { impact: 'Full-stack', text: 'Developed Node.js middleware, REST APIs, and Python scripts for backend data pipelines and AI workflow automation' },
      { impact: 'Analytics', text: 'Integrated Highcharts and PrimeNG Charts for advanced dashboards serving government and enterprise stakeholders' },
      { impact: '30% faster', text: 'Achieved load-time reduction via lazy loading, memoisation, and code-splitting — improving Lighthouse scores' },
      { impact: 'GIS', text: 'Developed tools with Leaflet, OpenLayers, and GeoServer for spatial data visualisation, layer filtering, and analysis' },
      { impact: 'Security', text: 'Implemented Keycloak IAM (RBAC) for enterprise-grade access control as a first-class engineering concern' },
      { impact: 'Lead', text: 'Led 5 engineers — code reviews, TypeScript mentoring, and AI-assisted workflow knowledge-sharing sessions' },
    ],
  },
  {
    company: 'Vassar Labs',
    division: 'IoT Division',
    role: 'Software Engineering Intern',
    period: 'Mar 2022 — Sep 2022',
    duration: '6 months',
    accent: '#60A5FA',
    type: 'Internship',
    bullets: [
      { impact: 'Angular', text: 'Built web applications — components, services, reactive forms integrated with RESTful APIs for real-time IoT data exchange' },
      { impact: 'GIS', text: 'Gained hands-on experience with Leaflet and OpenLayers, integrating interactive maps into IoT monitoring dashboards' },
    ],
  },
]

export default function Experience() {
  const sectionRef = useRef()

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('[data-exp-label]', { opacity: 0, y: 12, duration: 0.6, ease: 'power2.out', scrollTrigger: { trigger: '[data-exp-label]', start: 'top 88%' } })
      gsap.from('[data-exp-head]',  { opacity: 0, y: 18, duration: 0.7, ease: 'power3.out', scrollTrigger: { trigger: '[data-exp-head]', start: 'top 86%' } })
      gsap.utils.toArray('[data-exp-card]', sectionRef.current).forEach((el) => {
        gsap.fromTo(el, { opacity: 0, y: 36 },
          { opacity: 1, y: 0, duration: 0.85, ease: 'power3.out', scrollTrigger: { trigger: el, start: 'top 88%', once: true } })
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} id="experience" className="relative overflow-hidden px-4 py-20 sm:px-6 md:px-16 md:py-32 lg:px-24"
      style={{ background: 'var(--color-bg)' }}>

      <div className="pointer-events-none absolute inset-0 z-0 grid-bg" />
      <div className="pointer-events-none absolute -right-24 top-1/4 z-0 h-80 w-80 rounded-full blur-[100px]"
        style={{ background: 'var(--color-accent)', opacity: 0.06 }} />
      <div className="pointer-events-none absolute -left-16 bottom-1/4 z-0 h-64 w-64 rounded-full blur-[90px]"
        style={{ background: '#60A5FA', opacity: 0.05 }} />

      <div className="relative z-10 mx-auto max-w-[1100px]">

        <div className="flex items-center gap-4 mb-10">
          <div className="accent-line" />
          <p data-exp-label className="label">04 — Work History</p>
        </div>

        {/* Section header */}
        <div data-exp-head className="mb-10 rounded-[20px] p-7 backdrop-blur-sm md:mb-14 md:p-10"
          style={{ background: 'var(--color-bg-raised)', border: '1px solid var(--color-border)', boxShadow: 'var(--shadow-card)' }}>
          <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
            <h2 className="font-display leading-[0.93] tracking-[-0.025em]"
              style={{
                fontSize: 'clamp(2.2rem, 5.5vw, 4.8rem)',
                background: 'linear-gradient(135deg, var(--color-text) 40%, var(--color-text-muted) 100%)',
                WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
              }}>
              Work<br /><span style={{ fontStyle: 'italic' }}>Experience</span>
            </h2>
            <div className="flex flex-col gap-2 md:items-end">
              <span className="font-mono text-[11px] uppercase tracking-[0.20em]" style={{ color: 'var(--color-text-dim)' }}>
                Currently at Vassar Labs
              </span>
              <span className="font-mono text-[10px]" style={{ color: 'var(--color-accent)' }}>
                4+ years · Hyderabad, India
              </span>
            </div>
          </div>
        </div>

        {/* Timeline */}
        <div className="relative flex flex-col gap-5">
          {/* Timeline vertical line — desktop */}
          <div className="absolute left-[19px] top-6 bottom-6 w-px hidden md:block"
            style={{ background: 'linear-gradient(to bottom, var(--color-accent), transparent)' }} />

          {JOBS.map((job, i) => (
            <div key={i} data-exp-card className="flex gap-0 md:gap-8">

              {/* Timeline dot — desktop */}
              <div className="hidden md:flex flex-col items-center flex-shrink-0 pt-6">
                <div className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
                  style={{ background: 'var(--color-bg-elevated)', border: `2px solid ${job.accent}`, boxShadow: `0 0 20px ${job.accent}30` }}>
                  <div className="w-2.5 h-2.5 rounded-full" style={{ background: job.accent }} />
                </div>
              </div>

              {/* Card */}
              <div className="service-card group relative flex-1 overflow-hidden rounded-[20px] p-7 transition-[box-shadow] duration-300 md:p-9"
                style={{
                  background: 'var(--color-bg-raised)',
                  border: '1px solid var(--color-border)',
                  borderLeft: `3px solid ${job.accent}`,
                  boxShadow: 'var(--shadow-card)',
                }}>
                <div className="service-card-shine pointer-events-none absolute inset-0 z-0" />
                <div className="absolute left-0 right-0 top-0 h-[2px] opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                  style={{ background: `linear-gradient(90deg, transparent, ${job.accent}60, transparent)` }} />

                <div className="relative z-10">
                  {/* Header row */}
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-3 mb-7">
                    <div>
                      <div className="flex items-center gap-2 mb-1.5">
                        <h3 className="font-display leading-tight" style={{ fontSize: 'clamp(18px,2vw,26px)', color: 'var(--color-text)' }}>
                          {job.company}
                        </h3>
                        <span className="rounded-full px-2 py-0.5 font-mono text-[9px] uppercase tracking-[0.14em]"
                          style={{ background: `${job.accent}14`, color: job.accent, border: `1px solid ${job.accent}25` }}>
                          {job.type}
                        </span>
                      </div>
                      <p className="font-mono text-[10.5px] uppercase tracking-[0.18em]" style={{ color: job.accent }}>
                        {job.division}
                      </p>
                    </div>
                    <div className="md:text-right shrink-0">
                      <p className="font-mono text-[11px] mb-1.5" style={{ color: 'var(--color-text-dim)' }}>{job.role}</p>
                      <span className="inline-flex items-center gap-2 font-mono text-[10.5px] px-3 py-1.5 rounded-lg"
                        style={{ border: `1px solid ${job.accent}28`, color: job.accent, background: `${job.accent}0A` }}>
                        <span className="w-1.5 h-1.5 rounded-full" style={{ background: job.accent }} />
                        {job.period}
                      </span>
                      <p className="mt-1.5 font-mono text-[9.5px]" style={{ color: 'var(--color-text-ultra)' }}>{job.duration}</p>
                    </div>
                  </div>

                  {/* Bullets with impact labels */}
                  <ul className="grid md:grid-cols-2 gap-x-8 gap-y-2.5">
                    {job.bullets.map(({ impact, text }, j) => (
                      <li key={j} className="flex gap-3 leading-relaxed">
                        <span className="flex-shrink-0 mt-[5px] w-1.5 h-1.5 rounded-full" style={{ background: job.accent }} />
                        <span style={{ fontSize: '13px', color: 'var(--color-text-muted)' }}>
                          <span className="font-mono text-[10.5px] uppercase tracking-[0.10em] mr-1.5"
                            style={{ color: job.accent, fontFamily: "'JetBrains Mono', monospace" }}>
                            [{impact}]
                          </span>
                          {text}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
