import { useEffect, useRef } from 'react'
import { gsap } from '../animations/gsap'

const SERVICES = [
  {
    number: '01', title: 'Frontend Engineering', accent: '#F2590D',
    desc: 'SPAs, micro-frontends, and design systems shipped at scale. Deep Angular and React expertise with performance-first thinking.',
    tags: ['Angular v2–18', 'React.js', 'TypeScript', 'RxJS', 'Redux', 'HTML5 / CSS3'],
  },
  {
    number: '02', title: 'GIS & Geospatial', accent: '#60A5FA',
    desc: 'Spatial data visualisation, layer analysis, and satellite imagery integration for government and enterprise platforms.',
    tags: ['Leaflet', 'OpenLayers', 'GeoServer', 'WMS', 'Spatial Analysis', 'Drone Data'],
  },
  {
    number: '03', title: 'AI & Data Integration', accent: '#A855F7',
    desc: 'RAG pipelines, Azure OpenAI, prompt engineering, and LLM-powered workflows embedded into production dashboards.',
    tags: ['RAG Pipelines', 'Azure OpenAI', 'LangChain', 'Semantic Kernel', 'Claude Code'],
  },
  {
    number: '04', title: 'Backend & Cloud', accent: '#4ADE80',
    desc: 'Node.js middleware, REST APIs, PostgreSQL schema design, and Azure cloud services powering full-stack delivery.',
    tags: ['Node.js', 'Python', 'PostgreSQL', 'Azure App Service', 'Docker', 'CI/CD'],
  },
]

function ServiceCard({ service }) {
  const cardRef = useRef()

  useEffect(() => {
    const card = cardRef.current
    if (!card) return
    const onMove = (e) => {
      const r = card.getBoundingClientRect()
      gsap.to(card, {
        rotationX: ((e.clientY - r.top  - r.height / 2) / r.height) * -6,
        rotationY: ((e.clientX - r.left - r.width  / 2) / r.width)  *  6,
        transformPerspective: 1200, duration: 0.5, ease: 'power2.out',
      })
    }
    const onLeave = () => gsap.to(card, { rotationX: 0, rotationY: 0, duration: 0.7, ease: 'elastic.out(1, 0.3)' })
    card.addEventListener('mousemove', onMove)
    card.addEventListener('mouseleave', onLeave)
    return () => { card.removeEventListener('mousemove', onMove); card.removeEventListener('mouseleave', onLeave) }
  }, [])

  return (
    <div
      ref={cardRef}
      data-scroll-reveal
      className="service-card group relative flex flex-col gap-6 overflow-hidden rounded-2xl p-8 transition-[transform,box-shadow] duration-300 hover:-translate-y-2 hover:shadow-[0_24px_48px_rgba(0,0,0,0.25)] md:p-10"
      style={{ background: 'var(--color-surface)', border: '1px solid var(--color-border)', backdropFilter: 'blur(4px)', transformStyle: 'preserve-3d' }}
    >
      <div className="service-card-shine pointer-events-none absolute inset-0 z-0" />
      <div className="absolute left-0 right-0 top-0 h-px opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{ background: `linear-gradient(90deg, transparent, ${service.accent}80, transparent)` }} />

      <div className="relative z-10 flex flex-col gap-6">
        <span className="font-mono text-[11px] tracking-[0.32em]" style={{ color: service.accent }}>
          {service.number}
        </span>
        <div>
          <h3 className="mb-3 font-display text-[1.4rem] leading-tight tracking-[-0.01em]"
            style={{ color: 'var(--color-text)' }}>
            {service.title}
          </h3>
          <p className="text-[14px] leading-[1.75]" style={{ color: 'var(--color-text-muted)' }}>
            {service.desc}
          </p>
        </div>
        <ul className="flex flex-wrap gap-2">
          {service.tags.map((tag) => (
            <li key={tag} className="rounded-full px-3 py-[6px] font-mono text-[11px] tracking-[0.06em]"
              style={{ border: `1px solid ${service.accent}28`, color: 'var(--color-text-muted)' }}>
              {tag}
            </li>
          ))}
        </ul>
      </div>

      {/* Bottom accent bar */}
      <div className="absolute bottom-0 left-0 h-[3px] w-full scale-x-0 transition-transform duration-500 ease-[cubic-bezier(0.34,1.2,0.64,1)] group-hover:scale-x-100"
        style={{ background: `linear-gradient(90deg, transparent, ${service.accent}, transparent)`, transformOrigin: 'center' }} />
    </div>
  )
}

export default function Stack() {
  const sectionRef = useRef()

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('[data-stack-label]', { opacity: 0, y: 12, duration: 0.6, ease: 'power2.out', scrollTrigger: { trigger: '[data-stack-label]', start: 'top 88%' } })
      gsap.from('[data-stack-head]', { opacity: 0, y: 16, duration: 0.7, ease: 'power3.out', scrollTrigger: { trigger: '[data-stack-head]', start: 'top 86%' } })

      gsap.utils.toArray('[data-scroll-reveal]', sectionRef.current).forEach((el) => {
        gsap.fromTo(el, { opacity: 0, y: 40 },
          { opacity: 1, y: 0, duration: 0.9, ease: 'power2.out', scrollTrigger: { trigger: el, start: 'top 90%', once: true } })
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} id="stack" className="relative overflow-hidden px-4 pb-0 pt-16 sm:px-6 md:px-16 md:pt-32 lg:px-24"
      style={{ background: 'var(--color-bg)' }}>

      {/* Grid lines */}
      <div className="pointer-events-none absolute inset-0 z-0 grid-bg" />

      {/* Ambient glows */}
      <div className="pointer-events-none absolute -left-16 top-1/4 z-0 h-72 w-72 rounded-full opacity-15 blur-[80px]"
        style={{ background: '#F2590D' }} />
      <div className="pointer-events-none absolute -right-16 bottom-1/4 z-0 h-64 w-64 rounded-full opacity-10 blur-[70px]"
        style={{ background: '#A855F7' }} />

      {/* Glass section header */}
      <div data-scroll-reveal
        className="relative z-10 mb-6 rounded-[20px] p-6 backdrop-blur-md sm:p-7 md:mb-14 md:p-10"
        style={{ border: '1px solid var(--color-border)', background: 'var(--color-surface)' }}>
        <p data-stack-label className="label mb-5">02 — Technical Stack</p>
        <div data-stack-head className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <h2 className="font-display leading-[0.95] tracking-[-0.02em]"
            style={{
              fontSize: 'clamp(2.6rem, 6.5vw, 5.5rem)',
              background: 'linear-gradient(90deg, var(--color-text) 30%, var(--color-text-muted) 100%)',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
            }}>
            Built to ship.<br />Tooled to scale.
          </h2>
          <p className="max-w-[36ch] text-[14px] leading-[1.72] md:text-right"
            style={{ color: 'var(--color-text-muted)' }}>
            4+ years spanning government platforms, AI pipelines, and geospatial systems.
          </p>
        </div>
      </div>

      {/* Cards */}
      <div className="relative z-10 grid grid-cols-1 gap-5 md:grid-cols-2" style={{ perspective: '1200px' }}>
        {SERVICES.map((service) => (
          <ServiceCard key={service.number} service={service} />
        ))}
      </div>
    </section>
  )
}
