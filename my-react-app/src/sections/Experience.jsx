import { useEffect, useRef } from 'react'
import { gsap } from '../animations/gsap'

const JOBS = [
  {
    company: 'Vassar Labs', division: 'Climate / AgriTech',
    role: 'Software Development Engineer', period: 'Sep 2022 — Present',
    accent: '#D9C5B0',
    bullets: [
      'Architected scalable Angular (v2–18) applications across 5+ product lines',
      'Built reusable PrimeNG Design System used company-wide',
      'Developed custom GIS tools with Leaflet, OpenLayers, and GeoServer',
      'Integrated Highcharts & PrimeNG Charts for advanced analytics dashboards',
      '30% load-time reduction via lazy loading, memoisation, code-splitting',
      'Implemented enterprise IAM with Keycloak RBAC',
      'Led 5 engineers with code reviews and TypeScript standards',
    ],
  },
  {
    company: 'Vassar Labs', division: 'IoT Division',
    role: 'Software Engineering Intern', period: 'Mar 2022 — Sep 2022',
    accent: '#9B9DAB',
    bullets: [
      'Built Angular applications — components, services, reactive forms',
      'Integrated RESTful APIs between Angular frontends and backends',
      'Early GIS exposure via Leaflet and OpenLayers in IoT dashboards',
      'Collaborated on input validation, template-driven forms, UX improvements',
    ],
  },
]

export default function Experience() {
  const sectionRef = useRef()
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.exp-label',     { opacity: 0, y: 12, duration: 0.6, ease: 'power2.out', scrollTrigger: { trigger: '.exp-label', start: 'top 88%' } })
      gsap.from('.exp-head-line', { yPercent: 105, duration: 0.9, stagger: 0.09, ease: 'expo.out', scrollTrigger: { trigger: '.exp-head', start: 'top 84%' } })
      JOBS.forEach((_, i) => {
        gsap.from(`.job-${i}`, { opacity: 0, y: 32, duration: 0.7, ease: 'power3.out', scrollTrigger: { trigger: `.job-${i}`, start: 'top 86%' } })
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} id="experience" className="px-8 md:px-16 py-30 border-t border-ink-700">
      <div className="max-w-[1400px] mx-auto">
        <p className="exp-label label mb-6">/ Work history</p>
        <div className="exp-head mb-16">
          {['Work', 'Experience'].map((w, i) => (
            <div key={i} className="overflow-hidden">
              <h2 className={`exp-head-line font-serif leading-[1.05] tracking-[-0.02em] ${i === 1 ? 'text-sand-500 italic' : 'text-sand-100'}`} style={{ fontSize: 'clamp(40px,6vw,80px)' }}>{w}</h2>
            </div>
          ))}
        </div>

        <div className="flex flex-col gap-px bg-ink-700">
          {JOBS.map((job, i) => (
            <div key={i} className={`job-${i} bg-ink-900 p-10 md:p-12 hover:bg-ink-800 transition-colors duration-300`} style={{ borderLeft: `2px solid ${job.accent}` }}>
              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-8">
                <div>
                  <h3 className="font-serif text-sand-100 leading-tight mb-1" style={{ fontSize: 'clamp(22px,2.5vw,32px)' }}>{job.company}</h3>
                  <p className="font-mono text-xs" style={{ color: job.accent }}>{job.division}</p>
                </div>
                <div className="md:text-right">
                  <p className="font-mono text-xs text-sand-500 mb-2">{job.role}</p>
                  <span className="font-mono text-xs px-3 py-1.5 rounded-md border" style={{ borderColor: `${job.accent}44`, color: job.accent, background: `${job.accent}08` }}>{job.period}</span>
                </div>
              </div>
              <ul className="grid md:grid-cols-2 gap-x-12 gap-y-3">
                {job.bullets.map((b, j) => (
                  <li key={j} className="flex gap-3 text-sand-500 leading-relaxed" style={{ fontSize: '14px' }}>
                    <span className="flex-shrink-0 mt-2 w-1 h-1 rounded-full" style={{ background: job.accent }} />
                    {b}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
