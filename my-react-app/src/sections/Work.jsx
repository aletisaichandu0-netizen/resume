import { useEffect, useRef, useState } from 'react'
import { gsap } from '../animations/gsap'

const BASE = process.env.PUBLIC_URL || ''

const PROJECTS = [
  {
    slug: 'apaims', num: '01', year: '2024', name: 'APAIMS 2.0',
    tone: 'AgriTech · GIS · Enterprise',
    client: 'Govt. of Andhra Pradesh', role: 'Lead Frontend Engineer',
    stat: '10K+', statLabel: 'Agricultural records',
    desc: 'Large-scale Agricultural Information Management System — data-rich dashboards with dynamic filtering, multi-level headers, PrimeNG Design System, and export pipelines for AP government stakeholders.',
    fullDesc: 'APAIMS 2.0 is the flagship agricultural intelligence platform for Andhra Pradesh government, serving district collectors and agri-department officials. Built with Angular 18 and PrimeNG, it manages 10,000+ farmer records with advanced GIS map layers, ownership analytics, farmer holding category charts, and multi-level export pipelines. Integrated a fully reusable PrimeNG Design System and Node.js middleware for optimised API communication, reducing feature delivery time by 40%.',
    deliverables: ['Angular 18', 'PrimeNG', 'TypeScript', 'Node.js', 'PostgreSQL', 'REST APIs', 'Leaflet', 'Bootstrap'],
    accent: '#F2590D',
    images: [
      `${BASE}/projects/apaims.png`,
      `${BASE}/projects/apaims-2.png`,
      `${BASE}/projects/apaims-mobile.png`,
    ],
  },
  {
    slug: 'mahanidan', num: '02', year: '2024', name: 'Mahanidan',
    tone: 'AgriTech · GIS · Maharashtra',
    client: 'Govt. of Maharashtra', role: 'Lead Frontend Engineer',
    stat: '44.8K', statLabel: 'Villages mapped',
    desc: 'State-wide agriculture intelligence platform for Maharashtra — crop planning, bund boundary mapping, scheme management, farmer advisory, and district-level dashboards with multi-language support.',
    fullDesc: 'Mahanidan is the Maharashtra State Agriculture Department\'s flagship platform covering crop planning, GIS mapping, scheme management, and farmer advisory. Features include bund boundary management (22K villages published, 49.1% coverage), district-wise village distribution charts, crop health monitoring, pest forewarning layers, weather overlays, and a unified farmer database. Built with Angular 19 and PrimeNG 19, a config-driven Leaflet map engine, SSR, Keycloak RBAC, and full multi-language (i18n) support.',
    deliverables: ['Angular 19', 'PrimeNG 19', 'Leaflet GIS', 'Chart.js', 'ECharts', 'Keycloak', 'ngx-translate', 'SSR'],
    accent: '#A855F7',
    images: [`${BASE}/projects/mahaagrinex.png`],
  },
  {
    slug: 'slis-g', num: '03', year: '2023', name: 'SLIS-G',
    tone: 'Satellite · AI · GIS',
    client: 'Vassar Labs', role: 'Full Stack Engineer',
    stat: 'RAG', statLabel: 'AI-powered alerts',
    desc: 'Space-Based Land Use Intelligence System — satellite & drone imagery ingested through ML models with RAG-style retrieval and prompt engineering for automated geospatial alert generation.',
    fullDesc: 'SLIS-G (Space Based Land Use Intelligence System for Guwahati) is an AI-powered geospatial analytics platform that ingests satellite and drone imagery through ML classification models. Integrated RAG-style retrieval patterns and prompt engineering to automate alert generation from classified land-use changes. Led frontend development for AI/ML-driven alert dashboards, drone imagery visualisation layers, and OpenLayers-based spatial query tools. Applied Responsible AI principles for government compliance.',
    deliverables: ['Angular', 'OpenLayers', 'GeoServer', 'ML / AI', 'RAG Patterns', 'Bootstrap', 'REST APIs', 'WMS'],
    accent: '#F59E0B',
    images: [`${BASE}/projects/slis-g.png`],
  },
  {
    slug: 'wbamrut', num: '04', year: '2023', name: 'WB-AMRUT',
    tone: 'Municipal GIS · Urban Gov',
    client: 'Dept. of Urban Dev & Municipal Affairs, Govt. of West Bengal', role: 'Team Lead · 5 Engineers',
    stat: '5', statLabel: 'Engineers led',
    desc: 'GIS-based Urban Web Governance System for West Bengal municipalities — draw tools, layer analysis, compare/split views, Keycloak RBAC, water/green-space & property tax data management.',
    fullDesc: 'WB-AMRUT is a GIS-Based Urban Web Governance System for the Department of Urban Development & Municipal Affairs, Govt. of West Bengal. Led a team of 5 engineers to deliver the full Angular UI including interactive draw tools, layer analysis panels, compare/split views for before/after spatial analysis, and Keycloak IAM with RBAC for enterprise-grade user management. Manages water, green-space, and property tax data across West Bengal municipalities.',
    deliverables: ['Angular', 'Leaflet', 'OpenLayers', 'GeoServer', 'Keycloak', 'WMS', 'PostgreSQL', 'Bootstrap'],
    accent: '#22D3EE',
    images: [`${BASE}/projects/wbamrut.png`],
  },
  {
    slug: 'apwrims', num: '05', year: '2022', name: 'APWRIMS',
    tone: 'Water Resource · Analytics',
    client: 'AP Water Resources Dept. / National Hydrology Project', role: 'Frontend Engineer',
    stat: '51L+', statLabel: 'Platform visitors',
    desc: 'AP Water Resources Information & Management System — rainfall dashboards, reservoir & tank storage analytics, soil moisture charts, river gauge monitoring, and GIS water conservation maps.',
    fullDesc: 'APWRIMS is developed and maintained under the National Hydrology Project for the AP Water Resources Department. The platform monitors 113 reservoirs (444.57 TMC storage), 38,628 minor irrigation tanks (124.47 TMC), soil moisture levels, ground water (624.87 TMC), and 14,03,859 water conservation structures. Features Highcharts-powered analytics, river gauge stations, GIS district layers, and a bulletin report system. Achieved 51 lakh+ visitors.',
    deliverables: ['Angular', 'Bootstrap', 'Highcharts', 'Leaflet', 'REST APIs', 'PostgreSQL', 'Node.js'],
    accent: '#60A5FA',
    images: [`${BASE}/projects/apwrims.png`],
  },
  {
    slug: 'fieldwise', num: '06', year: '2022', name: 'FieldWise IoT',
    tone: 'IoT · GIS · Real-time',
    client: 'Vassar Labs · IoT Division', role: 'Engineering Intern',
    stat: 'IoT', statLabel: 'Real-time sensor data',
    desc: 'Angular app integrating real-time IoT sensor data via RESTful APIs — interactive Leaflet & OpenLayers maps, reactive forms, and UX improvements for field data collection dashboards.',
    fullDesc: 'FieldWise is a national-scale IoT field intelligence platform built during my internship at Vassar Labs\' IoT Division. Integrated real-time sensor data via RESTful APIs into Angular-based dashboards, built interactive Leaflet and OpenLayers GIS maps with state/district boundary layers across India, developed reactive forms for field data collection, and collaborated on UX improvements with senior engineers.',
    deliverables: ['Angular', 'Leaflet', 'OpenLayers', 'REST APIs', 'TypeScript', 'Reactive Forms', 'Bootstrap'],
    accent: '#4ADE80',
    images: [`${BASE}/projects/fieldwise.png`],
  },
  {
    slug: 'realpage', num: '07', year: '2023', name: 'RealPage',
    tone: 'Enterprise · Full-stack',
    client: 'Vassar Labs', role: 'Full Stack Developer',
    stat: 'WCAG', statLabel: 'Accessibility compliant',
    desc: 'Portfolio and capability showcase site backed by a Node.js REST API — dynamic project data served from PostgreSQL, responsive design, and WCAG accessibility compliance across all device types.',
    fullDesc: 'RealPage is a service-based enterprise portfolio and capability showcase platform. Extended the Angular frontend with a Node.js backend serving dynamic project data via REST endpoints backed by PostgreSQL. Ensured WCAG accessibility compliance, cross-browser compatibility, and fully responsive layouts across all device types. Spring Boot was used for select API services, and Bootstrap provided the responsive grid system. Code is kept private due to client confidentiality.',
    deliverables: ['Angular', 'Node.js', 'Spring Boot', 'PostgreSQL', 'Bootstrap', 'REST APIs', 'WCAG'],
    accent: '#EDE4DC',
    images: null,
    private: true,
  },
]

/* ── Image Gallery ─────────────────────────────────────────── */
function ImageGallery({ images, accent, num, year }) {
  const [idx, setIdx]   = useState(0)
  const imgRef          = useRef()
  const navigatingRef   = useRef(false)

  const navigate = (dir) => {
    if (navigatingRef.current) return
    navigatingRef.current = true
    const next = (idx + dir + images.length) % images.length
    const el   = imgRef.current
    gsap.to(el, {
      opacity: 0, x: dir * -28, duration: 0.18, ease: 'power2.in',
      onComplete: () => {
        setIdx(next)
        gsap.fromTo(el,
          { opacity: 0, x: dir * 28 },
          { opacity: 1, x: 0, duration: 0.22, ease: 'power2.out', onComplete: () => { navigatingRef.current = false } }
        )
      },
    })
  }

  return (
    <div className="relative w-full overflow-hidden" style={{ borderRadius: '20px 20px 0 0', aspectRatio: '16/9' }}>
      <img
        ref={imgRef}
        src={images[idx]}
        alt={`Screenshot ${idx + 1}`}
        className="w-full h-full object-cover object-top"
        style={{ display: 'block' }}
      />

      <div className="pointer-events-none absolute inset-0" style={{
        background: 'linear-gradient(to top, var(--color-bg-raised) 0%, transparent 50%)',
      }} />

      <div className="absolute top-4 left-5 font-mono text-[10px] uppercase tracking-[0.22em]"
        style={{ color: `${accent}cc` }}>
        {num} · {year}
      </div>

      {images.length > 1 && (
        <>
          {/* Count badge */}
          <div className="absolute top-4 right-5 font-mono text-[10px] uppercase tracking-[0.18em] px-2.5 py-1 rounded-full"
            style={{ background: 'rgba(0,0,0,0.48)', border: `1px solid ${accent}35`, color: `${accent}cc` }}>
            {idx + 1} / {images.length}
          </div>

          {/* Prev */}
          <button
            onClick={() => navigate(-1)}
            className="absolute left-3 top-1/2 -translate-y-1/2 flex h-9 w-9 items-center justify-center rounded-full transition-all duration-200 hover:scale-110"
            style={{ background: 'rgba(0,0,0,0.55)', border: '1px solid rgba(255,255,255,0.15)', color: 'rgba(255,255,255,0.85)' }}
            aria-label="Previous screenshot"
          >
            <svg width="10" height="16" viewBox="0 0 10 16" fill="none">
              <path d="M8 2L2 8L8 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>

          {/* Next */}
          <button
            onClick={() => navigate(1)}
            className="absolute right-3 top-1/2 -translate-y-1/2 flex h-9 w-9 items-center justify-center rounded-full transition-all duration-200 hover:scale-110"
            style={{ background: 'rgba(0,0,0,0.55)', border: '1px solid rgba(255,255,255,0.15)', color: 'rgba(255,255,255,0.85)' }}
            aria-label="Next screenshot"
          >
            <svg width="10" height="16" viewBox="0 0 10 16" fill="none">
              <path d="M2 2L8 8L2 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>

          {/* Dots */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-1.5">
            {images.map((_, i) => (
              <button
                key={i}
                onClick={() => setIdx(i)}
                aria-label={`Screenshot ${i + 1}`}
                style={{
                  height: '6px',
                  width: i === idx ? '20px' : '6px',
                  borderRadius: '9999px',
                  background: i === idx ? accent : 'rgba(255,255,255,0.38)',
                  border: 'none',
                  padding: 0,
                  cursor: 'pointer',
                  transition: 'width 0.22s ease, background 0.22s ease',
                }}
              />
            ))}
          </div>
        </>
      )}
    </div>
  )
}

/* ── Project Detail Modal ──────────────────────────────────── */
function ProjectModal({ project, onClose }) {
  const overlayRef  = useRef()
  const panelRef    = useRef()
  const closingRef  = useRef(false)

  useEffect(() => {
    const scrollY = window.scrollY
    document.body.style.overflow  = 'hidden'
    document.body.style.position  = 'fixed'
    document.body.style.top       = `-${scrollY}px`
    document.body.style.width     = '100%'
    return () => {
      document.body.style.overflow  = ''
      document.body.style.position  = ''
      document.body.style.top       = ''
      document.body.style.width     = ''
      window.scrollTo(0, scrollY)
    }
  }, [])

  useEffect(() => {
    gsap.fromTo(overlayRef.current, { opacity: 0 },        { opacity: 1,  duration: 0.3,  ease: 'power2.out' })
    gsap.fromTo(panelRef.current,   { y: 32, opacity: 0 }, { y: 0, opacity: 1, duration: 0.42, ease: 'expo.out' })
  }, [])

  const close = () => {
    if (closingRef.current) return
    closingRef.current = true
    gsap.to(panelRef.current,   { y: 24, opacity: 0, duration: 0.25, ease: 'power2.in' })
    gsap.to(overlayRef.current, { opacity: 0, duration: 0.3, ease: 'power2.in', onComplete: onClose })
  }

  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') close() }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, []) // eslint-disable-line

  const hasImages = project.images?.length > 0

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[200] flex items-center justify-center p-4 md:p-8"
      style={{ background: 'rgba(0,0,0,0.72)', backdropFilter: 'blur(14px)' }}
      onClick={(e) => { if (e.target === e.currentTarget) close() }}
    >
      <div
        ref={panelRef}
        className="relative w-full max-w-2xl max-h-[88svh] overflow-y-auto rounded-[20px]"
        style={{ background: 'var(--color-bg-raised)', border: '1px solid var(--color-border)', boxShadow: '0 32px 80px rgba(0,0,0,0.6)' }}
      >
        {/* Close button */}
        <button
          onClick={close}
          className="sticky top-4 float-right mr-4 z-20 flex h-9 w-9 items-center justify-center rounded-full transition-all duration-200 hover:scale-110"
          style={{ background: 'var(--color-bg-elevated)', border: '1px solid var(--color-border)', color: 'var(--color-text-muted)' }}
          aria-label="Close"
        >
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <path d="M1 1L11 11M11 1L1 11" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
          </svg>
        </button>

        {/* Gallery */}
        {hasImages && (
          <ImageGallery
            images={project.images}
            accent={project.accent}
            num={project.num}
            year={project.year}
          />
        )}

        {/* Content */}
        <div className="px-6 pb-8 pt-4 md:px-8 md:pb-10 md:pt-5">

          {/* Header */}
          <div className="flex flex-wrap items-start justify-between gap-4 mb-6">
            <div>
              <span className="mb-2 block font-mono text-[10px] uppercase tracking-[0.24em]"
                style={{ color: project.accent }}>{project.tone}</span>
              <h2 className="font-display leading-tight tracking-[-0.02em]"
                style={{ fontSize: 'clamp(1.8rem, 4vw, 3rem)', color: 'var(--color-text)' }}>
                {project.name}
              </h2>
            </div>
            <div className="flex flex-col items-end gap-1.5">
              <span className="font-archivo leading-none" style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)', color: project.accent }}>
                {project.stat}
              </span>
              <span className="font-mono text-[9.5px] uppercase tracking-[0.18em]"
                style={{ color: `${project.accent}80` }}>{project.statLabel}</span>
            </div>
          </div>

          {/* Meta row */}
          <div className="flex flex-wrap gap-2 mb-6">
            <span className="rounded-full px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.14em]"
              style={{ background: `${project.accent}12`, border: `1px solid ${project.accent}28`, color: project.accent }}>
              {project.client}
            </span>
            <span className="rounded-full px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.14em]"
              style={{ background: 'var(--color-surface)', border: '1px solid var(--color-border)', color: 'var(--color-text-dim)' }}>
              {project.role}
            </span>
          </div>

          {/* Divider */}
          <div className="mb-6 h-px" style={{ background: 'var(--color-border)' }} />

          {/* Full description */}
          <p className="mb-8 leading-[1.82]"
            style={{ fontSize: 'clamp(14px, 1.35vw, 16px)', color: 'var(--color-text-muted)' }}>
            {project.fullDesc}
          </p>

          {/* Tech stack */}
          <div>
            <p className="mb-3 font-mono text-[10px] uppercase tracking-[0.26em]"
              style={{ color: 'var(--color-text-dim)' }}>
              Tech Stack & Tools
            </p>
            <div className="flex flex-wrap gap-2">
              {project.deliverables.map(d => (
                <span key={d}
                  className="rounded-full px-4 py-2 font-mono text-[11px] tracking-[0.05em]"
                  style={{ border: `1px solid ${project.accent}28`, color: 'var(--color-text-muted)', background: `${project.accent}0A` }}>
                  {d}
                </span>
              ))}
            </div>
          </div>

          {/* Private notice */}
          {!hasImages && (
            <div className="mt-6 flex items-center gap-3 rounded-xl px-4 py-3"
              style={{ background: 'var(--color-surface)', border: '1px solid var(--color-border)' }}>
              {project.private ? (
                <>
                  <span className="text-base flex-shrink-0">🔒</span>
                  <span className="font-mono text-[10.5px] uppercase tracking-[0.16em]"
                    style={{ color: 'var(--color-text-dim)' }}>
                    Private — code & screenshots confidential
                  </span>
                </>
              ) : (
                <span className="font-mono text-[10.5px] uppercase tracking-[0.18em]"
                  style={{ color: 'var(--color-text-ultra)' }}>
                  Screenshot coming soon
                </span>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

/* ── Project Card ──────────────────────────────────────────── */
function ProjectCard({ project, onOpen }) {
  const thumb    = project.images?.[0]
  const hasMulti = project.images?.length > 1

  return (
    <div className="group w-full shrink-0 md:w-[500px]">
      <article className="flex flex-col gap-5">

        <div className="transition-transform duration-500 ease-[cubic-bezier(0.34,1.15,0.64,1)] group-hover:-translate-y-3">
          <div className="relative overflow-hidden"
            style={{
              aspectRatio: '4 / 5', borderRadius: '18px',
              border: '1px solid var(--color-border)',
              WebkitMaskImage: '-webkit-radial-gradient(white, black)',
              isolation: 'isolate',
            }}>

            {thumb ? (
              <img src={thumb} alt={project.name}
                className="absolute inset-0 h-full w-full object-cover object-top scale-[1.18] transition-transform duration-700 ease-[cubic-bezier(0.34,1.15,0.64,1)] group-hover:scale-[1.28]"
                loading="lazy" />
            ) : (
              <div className="absolute inset-0" style={{ background: 'var(--color-placeholder)' }} />
            )}

            <div className="pointer-events-none absolute inset-0" style={{
              background: 'linear-gradient(180deg, rgba(0,0,0,0.22) 0%, rgba(0,0,0,0.02) 38%, rgba(0,0,0,0.78) 100%)',
            }} />
            <div className="pointer-events-none absolute inset-0" style={{
              background: `radial-gradient(ellipse 70% 50% at 10% 100%, ${project.accent}26 0%, transparent 55%)`,
            }} />

            {/* Top meta */}
            <div className="absolute inset-x-0 top-0 flex items-center justify-between px-6 py-5 md:px-7 md:py-6">
              <span className="rounded-full px-2.5 py-1 font-mono text-[9.5px] uppercase tracking-[0.16em] backdrop-blur-md"
                style={{ color: `${project.accent}f0`, background: 'rgba(0,0,0,0.38)', border: `1px solid ${project.accent}28` }}>
                {project.tone}
              </span>
              <div className="flex items-center gap-2">
                {hasMulti && (
                  <span className="rounded-full px-2 py-0.5 font-mono text-[9px] uppercase tracking-[0.14em]"
                    style={{ color: `${project.accent}cc`, background: 'rgba(0,0,0,0.48)', border: `1px solid ${project.accent}30` }}>
                    {project.images.length} shots
                  </span>
                )}
                <span className="font-mono text-[10px]" style={{ color: 'rgba(255,255,255,0.35)' }}>{project.num}</span>
              </div>
            </div>

            {/* Stat */}
            <div className="absolute bottom-0 left-0 px-6 pb-7 md:px-7 md:pb-9">
              <span className="block font-archivo leading-none tracking-[-0.04em] text-[3.2rem] md:text-[4.5rem]"
                style={{ color: project.accent, textShadow: `0 0 40px ${project.accent}55` }}>
                {project.stat}
              </span>
              <span className="mt-1 block font-mono text-[9.5px] uppercase tracking-[0.2em]"
                style={{ color: `${project.accent}90` }}>
                {project.statLabel}
              </span>
            </div>

            {!thumb && (
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="font-mono text-[9.5px] uppercase tracking-[0.28em] select-none"
                  style={{ color: 'var(--color-text-ultra)' }}>image coming soon</span>
              </div>
            )}

            {/* Hover CTA */}
            <button
              onClick={() => onOpen(project)}
              className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100 w-full cursor-pointer"
              aria-label={`View ${project.name}`}>
              <span className="rounded-full px-6 py-3 font-mono text-[10.5px] uppercase tracking-[0.26em] text-white backdrop-blur-md"
                style={{ background: `${project.accent}25`, border: `1px solid ${project.accent}55` }}>
                {hasMulti ? `View ${project.images.length} Screenshots` : 'View Project'}
              </span>
            </button>
          </div>
        </div>

        {/* Below card */}
        <div className="flex flex-col gap-2 px-1 cursor-pointer" onClick={() => onOpen(project)}>
          <div className="flex items-baseline justify-between gap-3">
            <span className="font-display text-[19px] leading-tight tracking-[-0.01em] md:text-[21px] hover:underline decoration-[var(--color-accent)] underline-offset-4"
              style={{ color: 'var(--color-text)' }}>{project.name}</span>
            <span className="shrink-0 font-mono text-[10.5px] tracking-[0.1em]"
              style={{ color: 'var(--color-text-ultra)' }}>{project.year}</span>
          </div>
          <div className="flex flex-wrap items-center gap-1.5 font-mono text-[9.5px] uppercase tracking-[0.14em]"
            style={{ color: 'var(--color-text-dim)' }}>
            <span>{project.client}</span>
            <span style={{ opacity: 0.4 }}>·</span>
            <span>{project.role}</span>
          </div>
          <p className="leading-[1.7] font-light"
            style={{ fontSize: '13.5px', color: 'var(--color-text-muted)', marginTop: '2px' }}>
            {project.desc}
          </p>
          <div className="flex flex-wrap gap-1.5 pt-1.5">
            {project.deliverables.slice(0, 5).map(d => (
              <span key={d} className="rounded-full px-3 py-[4px] font-mono text-[9.5px] tracking-[0.05em]"
                style={{ border: `1px solid ${project.accent}25`, color: 'var(--color-text-dim)', background: `${project.accent}08` }}>
                {d}
              </span>
            ))}
          </div>
        </div>
      </article>
    </div>
  )
}

/* ── Work Section ──────────────────────────────────────────── */
export default function Work() {
  const sectionRef          = useRef()
  const cardsRef            = useRef()
  const trackRef            = useRef()
  const [active, setActive] = useState(null)

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
    <>
      <section ref={sectionRef} id="work" className="relative" style={{ background: 'var(--color-bg)' }}>
        <div className="px-4 pb-8 pt-20 sm:px-6 md:px-16 md:pb-14 md:pt-32 lg:px-24">
          <div className="flex items-center gap-4 mb-8">
            <div className="accent-line" />
            <p data-work-label className="label">03 — Selected Work</p>
          </div>
          <div data-work-head className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <h2 className="font-display leading-[0.93] tracking-[-0.025em]"
              style={{ fontSize: 'clamp(2.6rem, 6vw, 5.5rem)', color: 'var(--color-text)' }}>
              Selected<br />
              <span style={{ color: 'var(--color-accent)', fontStyle: 'italic' }}>Work</span>
            </h2>
            <p className="max-w-[44ch] leading-[1.75]" style={{ fontSize: '14px', color: 'var(--color-text-dim)' }}>
              7 production platforms — government GIS, AI analytics, enterprise agritech & full-stack. Click any card for details.
            </p>
          </div>
        </div>

        <div ref={cardsRef} data-feature-cards-section className="overflow-hidden pb-6">
          <ul ref={trackRef} data-feature-cards-track
            className="flex flex-col gap-10 px-4 sm:px-6 md:flex-row md:gap-8 md:pl-20 md:pr-20">
            {PROJECTS.map((p) => (
              <li key={p.slug} className="w-full shrink-0 md:w-[500px]">
                <ProjectCard project={p} onOpen={setActive} />
              </li>
            ))}
          </ul>
        </div>
      </section>

      {active && (
        <ProjectModal project={active} onClose={() => setActive(null)} />
      )}
    </>
  )
}
