import { useEffect, useRef } from 'react'
import { gsap } from '../animations/gsap'

const STATS = [
  { n: '4+',  label: 'Years experience',  sub: 'Vassar Labs, 2022–present' },
  { n: '6+',  label: 'Products shipped',  sub: 'Government & enterprise' },
  { n: '5',   label: 'Engineers led',     sub: 'Code reviews · Mentoring' },
  { n: '40%', label: 'Faster delivery',   sub: 'Via shared design system' },
]

const DIFFERENTIATORS = [
  { icon: '◈', title: 'GIS Specialist',        desc: 'Leaflet · OpenLayers · GeoServer · WMS · Satellite/Drone data · Spatial Analysis' },
  { icon: '◉', title: 'AI/ML Integration',      desc: 'RAG Pipelines · Azure OpenAI · Prompt Engineering · GitHub Copilot · Claude Code' },
  { icon: '◐', title: 'Enterprise Angular',      desc: 'v2–19 · PrimeNG Design System · Micro Frontends · 10K+ record systems' },
]

export default function About() {
  const sectionRef = useRef()
  const fillRef    = useRef()

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('[data-about-label]',       { opacity: 0, y: 12, duration: 0.6, ease: 'power2.out', scrollTrigger: { trigger: '[data-about-label]', start: 'top 88%' } })
      gsap.from('[data-about-heading] > div', { yPercent: 110, duration: 0.9, stagger: 0.07, ease: 'expo.out', scrollTrigger: { trigger: '[data-about-heading]', start: 'top 85%' } })
      gsap.from('[data-about-stat]',        { opacity: 0, y: 20, duration: 0.6, stagger: 0.09, ease: 'power2.out', scrollTrigger: { trigger: '[data-about-stat]', start: 'top 88%' } })
      gsap.from('[data-about-diff]',        { opacity: 0, y: 24, duration: 0.7, stagger: 0.1,  ease: 'power3.out', scrollTrigger: { trigger: '[data-about-diff]', start: 'top 88%' } })
      gsap.from('[data-about-para]',        { opacity: 0, y: 20, duration: 0.6, stagger: 0.1,  ease: 'power3.out', scrollTrigger: { trigger: '[data-about-para]', start: 'top 88%' } })

      const span = fillRef.current?.querySelector('span')
      if (span && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        gsap.to(span, {
          backgroundSize: '200% 200%', ease: 'none',
          scrollTrigger: { trigger: fillRef.current, start: 'top 78%', end: 'bottom 32%', scrub: true },
        })
      }
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} id="about" className="relative px-4 py-24 sm:px-6 md:px-16 md:py-36 lg:px-24"
      style={{ background: 'var(--color-bg)' }}>
      <div className="mx-auto max-w-[1100px]">

        <div className="flex items-center gap-4 mb-14">
          <div className="accent-line" />
          <p data-about-label className="label">01 — About</p>
        </div>

        <div className="grid gap-16 md:grid-cols-[1fr_1.1fr] md:gap-28 items-start">

          {/* Left: heading + stats */}
          <div>
            <div data-about-heading className="mb-12">
              {[
                { text: 'Rare blend of', color: 'var(--color-text-muted)', italic: false },
                { text: 'GIS · AI · Enterprise', color: 'var(--color-accent)', italic: true },
                { text: 'frontend engineering', color: 'var(--color-text)', italic: false },
              ].map(({ text, color, italic }, i) => (
                <div key={i} className="overflow-hidden">
                  <h2 className="font-display leading-[1.06] tracking-[-0.025em]"
                    style={{ fontSize: 'clamp(26px, 3.8vw, 54px)', color, fontStyle: italic ? 'italic' : 'normal' }}>
                    {text}
                  </h2>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-2 gap-4">
              {STATS.map(({ n, label, sub }) => (
                <div key={label} data-about-stat className="rounded-2xl p-5 flex flex-col gap-1.5"
                  style={{ background: 'var(--color-bg-raised)', border: '1px solid var(--color-stat-border)' }}>
                  <span className="font-display leading-none" style={{ fontSize: 'clamp(22px,2.8vw,38px)', color: 'var(--color-yellow)' }}>{n}</span>
                  <span className="font-mono text-[11px] uppercase tracking-[0.16em]" style={{ color: 'var(--color-text-80)' }}>{label}</span>
                  <span className="font-mono text-[11px]" style={{ color: 'var(--color-text-dim)' }}>{sub}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right: bio + differentiators */}
          <div className="flex flex-col gap-6 md:pt-3">
            {[
              'Results-driven Senior Frontend Engineer with 4+ years designing, building, and deploying scalable, enterprise-grade web applications across government, agriculture, and climate-tech domains.',
              'What sets me apart: I sit at the intersection of three typically separate specialisations — geospatial engineering, AI/ML integration, and high-performance frontend architecture — all inside a single production context at Vassar Labs.',
              'Proven track record leading cross-functional teams, owning feature delivery end-to-end, and optimising performance at scale — with a consulting mindset focused on translating complex requirements into reliable, maintainable solutions.',
            ].map((text, i) => (
              <p key={i} data-about-para className="leading-[1.78]"
                style={{ fontSize: 'clamp(15px, 1.25vw, 16px)', color: 'var(--color-text-muted)', maxWidth: '54ch' }}>
                {i === 1
                  ? <><span style={{ color: 'var(--color-text-80)' }}>What sets me apart: </span>{text.replace('What sets me apart: ', '')}</>
                  : text}
              </p>
            ))}

            <div className="flex flex-col gap-3 pt-1">
              {DIFFERENTIATORS.map(({ icon, title, desc }) => (
                <div key={title} data-about-diff className="flex items-start gap-3.5 rounded-xl px-4 py-3.5"
                  style={{ background: 'var(--color-bg-raised)', border: '1px solid var(--color-border)' }}>
                  <span className="mt-0.5 text-base flex-shrink-0" style={{ color: 'var(--color-accent)' }}>{icon}</span>
                  <div>
                    <p className="font-mono text-[11px] uppercase tracking-[0.16em] mb-0.5" style={{ color: 'var(--color-text-80)' }}>{title}</p>
                    <p className="font-mono text-[11.5px] leading-relaxed" style={{ color: 'var(--color-text-dim)' }}>{desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Fill-text */}
        <div className="mt-20 md:mt-28">
          <p ref={fillRef} className="fill-text js-fill">
            <span>
              Results-driven engineer with a strong consulting mindset — translating complex government and agritech requirements into production-ready, scalable full-stack solutions. Expert in Angular, React, GIS tooling, and AI workflow integration.
            </span>
          </p>
        </div>
      </div>
    </section>
  )
}
