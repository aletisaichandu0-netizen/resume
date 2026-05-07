import { useEffect, useRef } from 'react'
import { gsap } from '../animations/gsap'
import MagneticButton from '../components/ui/MagneticButton'

const PROJECTS = [
  {
    num: '01', year: '2023',
    name: 'Wbamrut', subtitle: 'Municipal GIS Platform',
    desc: 'GIS platform managing water, green-space, and property tax data across West Bengal municipalities. Draw tools, layer analysis, compare/split views, and RBAC user management.',
    stack: ['Angular', 'GeoServer', 'Leaflet', 'WMS', 'Keycloak'],
    accent: '#D9C5B0',
  },
  {
    num: '02', year: '2023',
    name: 'SLIS-G', subtitle: 'Geospatial Analytics',
    desc: 'Ingests satellite and drone imagery through ML models for automated alert generation and real-time map insights. ML-driven dashboards and drone imagery visualisation layers.',
    stack: ['Angular', 'GIS', 'Satellite Data', 'ML Integration'],
    accent: '#9B9DAB',
  },
  {
    num: '03', year: '2024',
    name: 'APAIMS', subtitle: 'Agricultural Information System',
    desc: 'Large-scale system with dynamic tables, multi-level headers, filters, and exports. Fully reusable PrimeNG component library and Node.js middleware serving 10,000+ records.',
    stack: ['Angular 18', 'PrimeNG', 'TypeScript', 'Node.js'],
    accent: '#C4A98A',
  },
  {
    num: '04', year: '2022',
    name: 'APWRIMS', subtitle: 'Water Resource Management',
    desc: 'Angular interfaces for water-resource activity management. Streamlined API integration improving data flow and reporting for government stakeholders across Andhra Pradesh.',
    stack: ['Angular', 'Bootstrap', 'REST APIs'],
    accent: '#9C9378',
  },
]

function Card({ project }) {
  const ref = useRef()
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(ref.current, { opacity: 0, y: 48, duration: 0.8, ease: 'power3.out', scrollTrigger: { trigger: ref.current, start: 'top 88%' } })
    })
    return () => ctx.revert()
  }, [])

  return (
    <div ref={ref} className="group rounded-2xl overflow-hidden border border-ink-600 hover:border-ink-500 transition-colors duration-500 bg-ink-800">
      <div className="h-px w-full" style={{ background: project.accent }} />
      <div className="p-10 md:p-12">
        <div className="flex items-start justify-between mb-8">
          <div>
            <span className="font-mono text-xs mb-2 block" style={{ color: project.accent, opacity: 0.65 }}>{project.num} / {project.year}</span>
            <h3 className="font-serif text-sand-100 leading-tight" style={{ fontSize: 'clamp(24px,3vw,40px)' }}>{project.name}</h3>
            <p className="text-sm mt-1" style={{ color: project.accent }}>{project.subtitle}</p>
          </div>
          <MagneticButton
            className="w-12 h-12 rounded-full border flex items-center justify-center opacity-40 group-hover:opacity-100 transition-opacity duration-300"
            style={{ borderColor: `${project.accent}55`, color: project.accent }}
            aria-label={`View ${project.name}`}
          >
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
              <path d="M3 13L13 3M13 3H5M13 3V11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </MagneticButton>
        </div>
        <p className="text-sand-500 leading-relaxed mb-8" style={{ fontSize: '15px', maxWidth: '60ch' }}>{project.desc}</p>
        <div className="flex flex-wrap gap-2">
          {project.stack.map(t => (
            <span key={t} className="font-mono text-xs px-3 py-1.5 rounded-md" style={{ background: `${project.accent}10`, border: `1px solid ${project.accent}30`, color: project.accent }}>{t}</span>
          ))}
        </div>
      </div>
    </div>
  )
}

export default function Work() {
  const headRef = useRef()
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.work-label', { opacity: 0, y: 12, duration: 0.6, ease: 'power2.out', scrollTrigger: { trigger: '.work-label', start: 'top 88%' } })
      gsap.from('.work-line',  { yPercent: 105, duration: 0.9, stagger: 0.09, ease: 'expo.out', scrollTrigger: { trigger: headRef.current, start: 'top 84%' } })
    })
    return () => ctx.revert()
  }, [])

  return (
    <section id="work" className="px-8 md:px-16 py-30 border-t border-ink-700">
      <div className="max-w-[1400px] mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
          <div>
            <p className="work-label label mb-6">/ Selected work</p>
            <div ref={headRef}>
              {['Key', 'Projects'].map((w, i) => (
                <div key={i} className="overflow-hidden">
                  <h2 className={`work-line font-serif leading-[1.05] tracking-[-0.02em] ${i === 1 ? 'text-sand-500 italic' : 'text-sand-100'}`} style={{ fontSize: 'clamp(40px,6vw,80px)' }}>{w}</h2>
                </div>
              ))}
            </div>
          </div>
          <p className="label text-sand-600 max-w-xs" style={{ fontSize: '12px', lineHeight: '1.7' }}>
            Production applications for government agencies, agritech platforms, and enterprise clients.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-5">
          {PROJECTS.map(p => <Card key={p.name} project={p} />)}
        </div>
      </div>
    </section>
  )
}
