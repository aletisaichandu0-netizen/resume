import { useEffect, useRef } from 'react'
import { gsap } from '../animations/gsap'

const ABOUT_IMAGES = [
  '/about/work-1.png', '/about/work-2.png', '/about/work-3.png', '/about/work-4.png',
  '/about/work-5.png', '/about/work-6.png', '/about/work-7.png', '/about/work-8.png',
]

const STATS = [
  { n: '4+',  label: 'Years experience' },
  { n: '5+',  label: 'Products shipped' },
  { n: '5',   label: 'Engineers led' },
  { n: '40%', label: 'Faster delivery' },
]

export default function About() {
  const sectionRef = useRef()
  const fillRef    = useRef()

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('[data-about-label]', { opacity: 0, y: 12, duration: 0.6, ease: 'power2.out', scrollTrigger: { trigger: '[data-about-label]', start: 'top 88%' } })
      gsap.from('[data-about-stat]',  { opacity: 0, y: 20, duration: 0.6, stagger: 0.1,  ease: 'power2.out', scrollTrigger: { trigger: '[data-about-stat]', start: 'top 88%' } })
      gsap.from('[data-about-para]',  { opacity: 0, y: 24, duration: 0.7, stagger: 0.12, ease: 'power3.out', scrollTrigger: { trigger: '[data-about-para]', start: 'top 88%' } })
      gsap.from('.about-ring',        { opacity: 0, duration: 1.2, ease: 'power2.out', scrollTrigger: { trigger: '.about-ring', start: 'top 80%' } })

      const span = fillRef.current?.querySelector('span')
      if (span && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        gsap.to(span, {
          backgroundSize: '200% 200%',
          ease: 'none',
          scrollTrigger: { trigger: fillRef.current, start: 'top 80%', end: 'bottom 35%', scrub: true },
        })
      }
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} id="about" className="relative px-4 py-20 sm:px-6 md:px-16 md:py-32 lg:px-24"
      style={{ background: 'var(--color-bg)' }}>
      <div className="mx-auto max-w-[1100px]">

        <p data-about-label className="label mb-10 md:mb-16">01 — About</p>

        <div className="grid gap-16 md:grid-cols-2 md:gap-24 items-start">

          {/* Left: heading + stats */}
          <div>
            <div className="mb-10 md:mb-14">
              {['Building', 'interfaces that', 'perform & delight.'].map((line, i) => (
                <div key={i} className="overflow-hidden">
                  <h2 className="font-display leading-[1.08] tracking-[-0.025em]"
                    style={{
                      fontSize: 'clamp(28px, 4vw, 58px)',
                      color: i === 1 ? 'var(--color-accent)' : i === 2 ? 'var(--color-text-muted)' : 'var(--color-text)',
                      fontStyle: i === 1 ? 'italic' : 'normal',
                    }}>
                    {line}
                  </h2>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-2 gap-x-8 gap-y-6">
              {STATS.map(({ n, label }) => (
                <div key={label} data-about-stat className="pt-4" style={{ borderTop: '1px solid var(--color-stat-border)' }}>
                  <div className="font-display mb-1" style={{ fontSize: 'clamp(24px,3vw,42px)', color: 'var(--color-yellow)' }}>{n}</div>
                  <div className="label">{label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: description */}
          <div className="flex flex-col gap-5 md:pt-6">
            {[
              'Senior Frontend Engineer at Vassar Labs (Climate/AgriTech) with 4+ years architecting scalable Angular and React applications for enterprise government clients across agriculture, water resource, and climate-tech domains.',
              'Full-stack proficiency spanning GIS tools (Leaflet, OpenLayers, GeoServer), AI/ML integration (RAG pipelines, Azure OpenAI), PostgreSQL schema design, and Node.js backend development.',
              'Currently exploring 3D web (Three.js), Micro Frontend architecture, and Azure cloud certifications (AZ-204).',
            ].map((text, i) => (
              <p key={i} data-about-para className="leading-relaxed"
                style={{ fontSize: 'clamp(14px,1.3vw,16px)', color: 'var(--color-text-muted)', maxWidth: '52ch' }}>
                {text}
              </p>
            ))}
          </div>
        </div>

        {/* Fill-text + 3D ring */}
        <div className="relative mt-20 md:mt-32" style={{ transformStyle: 'preserve-3d' }}>
          <p ref={fillRef} className="fill-text js-fill">
            <span>
              I build platforms that work for real people in complex situations — government systems, AI-powered field tools, GIS dashboards, climate risk visualisation. Four years of shipping things that matter, close to engineers, close to the problem.
            </span>
          </p>

          <div className="about-ring" style={{ '--total': ABOUT_IMAGES.length }}>
            {ABOUT_IMAGES.map((src, i) => (
              <img key={i} src={src} alt="" style={{ '--i': i }} loading="lazy" />
            ))}
          </div>

          {/* Edge vignette */}
          <div className="pointer-events-none absolute inset-0 hidden md:block" style={{
            background: 'linear-gradient(90deg, var(--color-bg) 0%, transparent 18%, transparent 82%, var(--color-bg) 100%)',
          }} />
        </div>
      </div>
    </section>
  )
}
