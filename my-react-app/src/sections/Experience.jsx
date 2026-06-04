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
      { tag: 'Architecture',  text: 'Architected Angular (v2–18) and React.js web apps across multiple product lines — responsiveness, cross-browser compatibility, and maintainability for enterprise government clients' },
      { tag: 'Database',      text: 'Designed and optimised PostgreSQL schemas handling 10,000+ agricultural records with complex multi-level filtering, aggregation, and export pipelines' },
      { tag: 'Design System', text: 'Built and maintained a reusable PrimeNG-based component library across 5+ projects aligned with Micro Frontend principles — reducing feature delivery time by 40%' },
      { tag: 'AI/ML',         text: 'Integrated AI/ML services and RAG-style retrieval into geospatial dashboards — automated alert generation from satellite/drone imagery and real-time intelligent map insights' },
      { tag: 'Backend',       text: 'Developed Node.js middleware, REST APIs, and Python utility scripts for data pipelines, API proxying, and AI workflow automation' },
      { tag: 'Visualisation', text: 'Integrated Highcharts and PrimeNG Charts for advanced analytics dashboards — translating complex data into interactive visualisations for government stakeholders' },
      { tag: 'Performance',   text: 'Optimised application performance via lazy loading, memoisation, and code-splitting — reducing initial load times by 30% and improving Lighthouse scores' },
      { tag: 'GIS',           text: 'Developed custom GIS tools with Leaflet, OpenLayers, and GeoServer for spatial data visualisation, layer filtering, and geospatial analysis' },
      { tag: 'Security',      text: 'Implemented IAM with Keycloak (RBAC) for enterprise-grade user and role management — applying security and compliance as first-class engineering concerns' },
      { tag: 'Delivery',      text: 'Owned feature delivery end-to-end — estimated effort, implemented features, wrote unit and integration tests, performed code reviews, and supported CI/CD pipelines' },
      { tag: 'AI Tools',      text: 'Leveraged AI-powered coding tools (Claude Code, GitHub Copilot) daily to accelerate development velocity, prototype features rapidly, and improve code quality' },
      { tag: 'Lead',          text: 'Led a team of 5 engineers — code reviews, TypeScript best practices, mentoring junior developers, and knowledge-sharing sessions on modern frontend and AI workflows' },
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
      { tag: 'Angular',  text: 'Built and maintained Angular-based web applications — components, services, reactive forms, and modules integrated with RESTful APIs for real-time IoT data exchange' },
      { tag: 'GIS',      text: 'Gained GIS exposure (Leaflet, OpenLayers) by integrating interactive maps into IoT dashboards; collaborated on input validation, template-driven forms, and UX improvements' },
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
      <div className="pointer-events-none absolute -right-24 top-1/4 z-0 h-80 w-80 rounded-full blur-[100px]" style={{ background: 'var(--color-accent)', opacity: 0.05 }} />
      <div className="pointer-events-none absolute -left-16 bottom-1/4 z-0 h-64 w-64 rounded-full blur-[90px]" style={{ background: '#60A5FA', opacity: 0.04 }} />

      <div className="relative z-10 mx-auto max-w-[1100px]">

        <div className="flex items-center gap-4 mb-10">
          <div className="accent-line" />
          <p data-exp-label className="label">04 — Work History</p>
        </div>

        {/* Header */}
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
            <div className="flex flex-col gap-1.5 md:items-end">
              <span className="font-mono text-[12.5px] uppercase tracking-[0.14em]" style={{ color: 'var(--color-text-muted)' }}>Vassar Labs, Hyderabad</span>
              <span className="font-mono text-[12px]" style={{ color: 'var(--color-accent)' }}>Sep 2022 — Present · 3+ years</span>
            </div>
          </div>
        </div>

        {/* Timeline */}
        <div className="relative flex flex-col gap-5">
          <div className="absolute left-[19px] top-6 bottom-6 w-px hidden md:block"
            style={{ background: 'linear-gradient(to bottom, var(--color-accent), transparent)' }} />

          {JOBS.map((job, i) => (
            <div key={i} data-exp-card className="flex gap-0 md:gap-8">

              {/* Dot */}
              <div className="hidden md:flex flex-col items-center flex-shrink-0 pt-6">
                <div className="w-10 h-10 rounded-full flex items-center justify-center"
                  style={{ background: 'var(--color-bg-elevated)', border: `2px solid ${job.accent}`, boxShadow: `0 0 20px ${job.accent}28` }}>
                  <div className="w-2.5 h-2.5 rounded-full" style={{ background: job.accent }} />
                </div>
              </div>

              {/* Card */}
              <div className="service-card group relative flex-1 overflow-hidden rounded-[20px] p-7 transition-[box-shadow] duration-300 md:p-9"
                style={{ background: 'var(--color-bg-raised)', border: '1px solid var(--color-border)', borderLeft: `3px solid ${job.accent}`, boxShadow: 'var(--shadow-card)' }}>
                <div className="service-card-shine pointer-events-none absolute inset-0 z-0" />
                <div className="absolute left-0 right-0 top-0 h-[2px] opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                  style={{ background: `linear-gradient(90deg, transparent, ${job.accent}55, transparent)` }} />

                <div className="relative z-10">
                  {/* Header */}
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-3 mb-7">
                    <div>
                      <div className="flex items-center gap-2 mb-1.5">
                        <h3 className="font-display leading-tight" style={{ fontSize: 'clamp(20px,2.2vw,30px)', color: 'var(--color-text)' }}>
                          {job.company}
                        </h3>
                        <span className="rounded-full px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.12em]"
                          style={{ background: `${job.accent}18`, color: job.accent, border: `1px solid ${job.accent}30` }}>
                          {job.type}
                        </span>
                      </div>
                      <p className="font-mono text-[12px] uppercase tracking-[0.16em] mt-1" style={{ color: job.accent }}>{job.division}</p>
                    </div>
                    <div className="md:text-right shrink-0">
                      <p className="font-mono text-[13px] font-medium mb-2" style={{ color: 'var(--color-text-80)' }}>{job.role}</p>
                      <span className="inline-flex items-center gap-2 font-mono text-[12px] px-3.5 py-2 rounded-lg"
                        style={{ border: `1px solid ${job.accent}35`, color: job.accent, background: `${job.accent}10` }}>
                        <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: job.accent }} />
                        {job.period}
                      </span>
                      <p className="mt-1.5 font-mono text-[11px]" style={{ color: 'var(--color-text-dim)' }}>{job.duration}</p>
                    </div>
                  </div>

                  {/* Bullets */}
                  <ul className="grid md:grid-cols-2 gap-x-10 gap-y-3">
                    {job.bullets.map(({ tag, text }, j) => (
                      <li key={j} className="flex gap-3 leading-[1.65]">
                        <span className="flex-shrink-0 mt-[7px] w-1.5 h-1.5 rounded-full" style={{ background: job.accent }} />
                        <span style={{ fontSize: '14px', color: 'var(--color-text-80)' }}>
                          <span className="font-mono text-[10.5px] uppercase tracking-[0.10em] mr-1.5 font-semibold" style={{ color: job.accent }}>
                            [{tag}]
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

        {/* Education */}
        <div className="mt-5 rounded-[16px] px-7 py-5 flex flex-col gap-2 md:flex-row md:items-center md:justify-between"
          style={{ background: 'var(--color-bg-raised)', border: '1px solid var(--color-border)' }}>
          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.20em] mb-1.5" style={{ color: 'var(--color-text-dim)' }}>Education</p>
            <p className="font-display text-[1.15rem]" style={{ color: 'var(--color-text)' }}>Jawaharlal Nehru Technological University</p>
            <p className="font-mono text-[12.5px] mt-0.5" style={{ color: 'var(--color-text-muted)' }}>B.Tech in Computer Science</p>
          </div>
          <span className="font-mono text-[12px] px-4 py-2 rounded-lg mt-2 md:mt-0"
            style={{ border: '1px solid var(--color-border)', color: 'var(--color-text-80)' }}>
            Jun 2018 — Apr 2022
          </span>
        </div>
      </div>
    </section>
  )
}
