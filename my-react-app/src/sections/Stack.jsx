import { useEffect, useRef } from 'react'
import { gsap } from '../animations/gsap'

const SERVICES = [
  {
    number: '01', title: 'Frontend Engineering', accent: '#F2590D',
    desc: 'SPAs, micro-frontends, and design systems shipped at enterprise scale. 4+ years in Angular (v2–18) and React with a performance-first, architecture-conscious approach.',
    tags: ['Angular v2–18', 'React.js', 'TypeScript', 'RxJS', 'Redux', 'Micro Frontends', 'PrimeNG', 'HTML5/CSS3'],
    highlight: 'Primary · 4+ years',
  },
  {
    number: '02', title: 'GIS & Geospatial', accent: '#60A5FA',
    desc: 'Spatial data visualisation, interactive layer analysis, and satellite/drone imagery integration — deployed across municipal and agricultural government platforms.',
    tags: ['Leaflet', 'OpenLayers', 'GeoServer', 'WMS / WFS', 'Spatial Analysis', 'Basemap Integration', 'Satellite Data'],
    highlight: 'Specialist · 3+ years',
  },
  {
    number: '03', title: 'AI & ML Integration', accent: '#A855F7',
    desc: 'RAG pipelines, prompt engineering, and LLM-powered workflows embedded into production dashboards. Hands-on with Azure AI services and open-source frameworks.',
    tags: ['RAG Pipelines', 'Azure OpenAI', 'AI Search', 'LangChain', 'Semantic Kernel', 'Prompt Engineering', 'Claude Code'],
    highlight: 'Growing · 2+ years',
  },
  {
    number: '04', title: 'Backend & Cloud', accent: '#4ADE80',
    desc: 'Full-stack delivery: Node.js middleware, REST API design, PostgreSQL schema optimisation, and Azure cloud services. CI/CD pipelines and Docker containerisation.',
    tags: ['Node.js', 'Python', 'PostgreSQL', 'Azure App Service', 'Azure Functions', 'Docker', 'CI/CD', 'Git'],
    highlight: 'Full-stack · 4+ years',
  },
]

const EXPLORING = ['Three.js', 'Babylon.js', 'Azure AZ-204', 'Nx Monorepo', 'tRPC', 'Bun.js']

function ServiceCard({ service }) {
  const cardRef = useRef()

  useEffect(() => {
    const card = cardRef.current
    if (!card) return
    const onMove = (e) => {
      const r = card.getBoundingClientRect()
      gsap.to(card, {
        rotationX: ((e.clientY - r.top  - r.height / 2) / r.height) * -5,
        rotationY: ((e.clientX - r.left - r.width  / 2) / r.width)  *  5,
        transformPerspective: 1200, duration: 0.5, ease: 'power2.out',
      })
    }
    const onLeave = () => gsap.to(card, { rotationX: 0, rotationY: 0, duration: 0.7, ease: 'elastic.out(1, 0.35)' })
    card.addEventListener('mousemove', onMove)
    card.addEventListener('mouseleave', onLeave)
    return () => { card.removeEventListener('mousemove', onMove); card.removeEventListener('mouseleave', onLeave) }
  }, [])

  return (
    <div ref={cardRef} data-scroll-reveal
      className="service-card group relative flex flex-col gap-6 overflow-hidden rounded-[20px] p-8 transition-[transform,box-shadow] duration-300 hover:-translate-y-2 md:p-9"
      style={{
        background: 'var(--color-bg-raised)',
        border: '1px solid var(--color-border)',
        boxShadow: 'var(--shadow-card)',
        transformStyle: 'preserve-3d',
      }}>
      <div className="service-card-shine pointer-events-none absolute inset-0 z-0" />

      {/* Top accent line on hover */}
      <div className="absolute left-0 right-0 top-0 h-[2px] opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{ background: `linear-gradient(90deg, transparent 0%, ${service.accent} 50%, transparent 100%)` }} />

      <div className="relative z-10 flex flex-col gap-6">
        {/* Header */}
        <div className="flex items-start justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: service.accent }} />
              <span className="font-mono text-[10px] uppercase tracking-[0.28em]" style={{ color: service.accent }}>
                {service.number}
              </span>
            </div>
            <h3 className="font-display text-[1.35rem] leading-tight tracking-[-0.01em]"
              style={{ color: 'var(--color-text)' }}>
              {service.title}
            </h3>
          </div>
          <span className="mt-1 shrink-0 rounded-full px-2.5 py-1 font-mono text-[9.5px] uppercase tracking-[0.12em]"
            style={{ background: `${service.accent}14`, color: `${service.accent}cc`, border: `1px solid ${service.accent}22` }}>
            {service.highlight}
          </span>
        </div>

        <p className="text-[13.5px] leading-[1.78]" style={{ color: 'var(--color-text-muted)' }}>
          {service.desc}
        </p>

        <div className="flex flex-wrap gap-1.5">
          {service.tags.map((tag) => (
            <span key={tag}
              className="rounded-full px-2.5 py-[5px] font-mono text-[10px] tracking-[0.05em] transition-colors duration-200"
              style={{ border: `1px solid ${service.accent}25`, color: 'var(--color-text-dim)', background: `${service.accent}08` }}>
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Bottom accent bar */}
      <div className="absolute bottom-0 left-0 h-[2px] w-full scale-x-0 transition-transform duration-500 ease-[cubic-bezier(0.34,1.2,0.64,1)] group-hover:scale-x-100"
        style={{ background: `linear-gradient(90deg, transparent, ${service.accent}, transparent)`, transformOrigin: 'center' }} />
    </div>
  )
}

export default function Stack() {
  const sectionRef = useRef()

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('[data-stack-label]', { opacity: 0, y: 12, duration: 0.6, ease: 'power2.out', scrollTrigger: { trigger: '[data-stack-label]', start: 'top 88%' } })
      gsap.from('[data-stack-head]', { opacity: 0, y: 18, duration: 0.7, ease: 'power3.out', scrollTrigger: { trigger: '[data-stack-head]', start: 'top 86%' } })
      gsap.from('[data-exploring]',  { opacity: 0, y: 16, duration: 0.6, ease: 'power2.out', scrollTrigger: { trigger: '[data-exploring]', start: 'top 90%' } })

      gsap.utils.toArray('[data-scroll-reveal]', sectionRef.current).forEach((el) => {
        gsap.fromTo(el, { opacity: 0, y: 36 },
          { opacity: 1, y: 0, duration: 0.85, ease: 'power2.out', scrollTrigger: { trigger: el, start: 'top 90%', once: true } })
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} id="stack" className="relative overflow-hidden px-4 py-20 sm:px-6 md:px-16 md:py-32 lg:px-24"
      style={{ background: 'var(--color-bg)' }}>

      <div className="pointer-events-none absolute inset-0 z-0 grid-bg" />

      {/* Ambient glows */}
      <div className="pointer-events-none absolute -left-24 top-1/3 z-0 h-80 w-80 rounded-full blur-[100px]"
        style={{ background: '#F2590D', opacity: 0.07 }} />
      <div className="pointer-events-none absolute -right-24 bottom-1/3 z-0 h-72 w-72 rounded-full blur-[90px]"
        style={{ background: '#A855F7', opacity: 0.07 }} />
      <div className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-0 h-96 w-96 rounded-full blur-[120px]"
        style={{ background: '#60A5FA', opacity: 0.04 }} />

      <div className="relative z-10 mx-auto max-w-[1100px]">

        <div className="flex items-center gap-4 mb-10">
          <div className="accent-line" />
          <p data-stack-label className="label">02 — Technical Stack</p>
        </div>

        {/* Glass header panel */}
        <div data-scroll-reveal className="mb-10 rounded-[20px] p-7 backdrop-blur-sm md:mb-16 md:p-10"
          style={{ background: 'var(--color-bg-raised)', border: '1px solid var(--color-border)', boxShadow: 'var(--shadow-card)' }}>
          <div data-stack-head className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
            <h2 className="font-display leading-[0.93] tracking-[-0.025em]"
              style={{
                fontSize: 'clamp(2.4rem, 6vw, 5rem)',
                background: 'linear-gradient(135deg, var(--color-text) 40%, var(--color-text-muted) 100%)',
                WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
              }}>
              Built to ship.<br /><span style={{ fontStyle: 'italic' }}>Tooled to scale.</span>
            </h2>
            <p className="max-w-[38ch] leading-[1.78] md:text-right"
              style={{ fontSize: '13.5px', color: 'var(--color-text-dim)' }}>
              4+ years spanning government platforms, AI pipelines, and geospatial systems — four core specialisations that compound.
            </p>
          </div>
        </div>

        {/* Service cards */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2" style={{ perspective: '1200px' }}>
          {SERVICES.map((s) => <ServiceCard key={s.number} service={s} />)}
        </div>

        {/* Currently exploring */}
        <div data-exploring className="mt-8 rounded-[16px] px-6 py-5 flex flex-wrap items-center gap-x-6 gap-y-3 md:px-8"
          style={{ background: 'var(--color-bg-raised)', border: '1px solid var(--color-border)' }}>
          <span className="font-mono text-[10px] uppercase tracking-[0.26em] flex-shrink-0" style={{ color: 'var(--color-accent)' }}>
            Currently exploring ↗
          </span>
          <div className="flex flex-wrap gap-2">
            {EXPLORING.map(t => (
              <span key={t} className="font-mono text-[10.5px] px-3 py-1 rounded-full"
                style={{ background: 'var(--color-surface)', border: '1px solid var(--color-border)', color: 'var(--color-text-dim)' }}>
                {t}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
