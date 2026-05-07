import { useEffect, useRef } from 'react'
import { gsap, ScrollTrigger } from '../animations/gsap'

export default function Hero() {
  const sectionRef = useRef()
  const lineRefs   = useRef([])
  const tagRef     = useRef()
  const descRef    = useRef()
  const ctaRef     = useRef()
  const scrollRef  = useRef()
  const gridRef    = useRef()

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.2 })

      tl.from(gridRef.current, { opacity: 0, duration: 2, ease: 'power2.out' }, 0)
        .from(tagRef.current,  { opacity: 0, y: 12, duration: 0.6, ease: 'power2.out' }, 0.7)
        .from(lineRefs.current, { yPercent: 110, duration: 1.0, stagger: 0.1, ease: 'expo.out' }, 0.95)
        .from([descRef.current, ctaRef.current], { opacity: 0, y: 24, duration: 0.7, stagger: 0.12, ease: 'power3.out' }, 1.6)
        .from(scrollRef.current, { opacity: 0, y: 8, duration: 0.5 }, 2.1)

      gsap.to('.hero-headline', {
        yPercent: -16, ease: 'none',
        scrollTrigger: { trigger: sectionRef.current, start: 'top top', end: 'bottom top', scrub: true },
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  const lines = [
    { text: 'Frontend',   className: 'text-sand-100' },
    { text: 'Engineer',   className: 'text-sand-300 italic' },
    { text: '& GIS',      className: 'text-sand-100' },
    { text: 'Specialist', className: 'text-sand-500 italic' },
  ]

  return (
    <section ref={sectionRef} id="hero" className="relative min-h-screen flex flex-col justify-end pb-20 px-8 md:px-16 overflow-hidden">

      {/* Background grid */}
      <div ref={gridRef} className="absolute inset-0 opacity-[0.04]" style={{
        backgroundImage: 'linear-gradient(#F7F1ED 1px,transparent 1px),linear-gradient(90deg,#F7F1ED 1px,transparent 1px)',
        backgroundSize: '80px 80px',
      }} />

      {/* Radial glow */}
      <div className="absolute top-1/3 right-1/4 w-[500px] h-[500px] rounded-full pointer-events-none" style={{
        background: 'radial-gradient(circle,rgba(217,197,176,0.07) 0%,transparent 70%)',
      }} />

      <div className="relative max-w-[1400px] mx-auto w-full">
        <p ref={tagRef} className="label mb-10">Senior Frontend Engineer — Hyderabad, India</p>

        <div className="hero-headline mb-12">
          {lines.map(({ text, className }, i) => (
            <div key={i} className="overflow-hidden">
              <h1
                ref={el => lineRefs.current[i] = el}
                className={`font-serif leading-[0.92] tracking-[-0.02em] ${className}`}
                style={{ fontSize: 'clamp(56px, 10vw, 140px)' }}
              >
                {text}
              </h1>
            </div>
          ))}
        </div>

        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
          <p ref={descRef} className="text-sand-500 max-w-sm leading-relaxed" style={{ fontSize: 'clamp(15px,1.5vw,18px)' }}>
            4+ years crafting scalable Angular &amp; React applications.
            Deep expertise in GIS, design systems, and AI-powered workflows.
          </p>

          <div ref={ctaRef} className="flex items-center gap-6">
            <a
              href="#work"
              onClick={e => { e.preventDefault(); document.getElementById('work')?.scrollIntoView({ behavior: 'smooth' }) }}
              className="flex items-center gap-3 bg-sand-300 text-ink-900 px-8 py-4 rounded-lg font-sans font-medium text-sm hover:bg-sand-200 transition-colors duration-300"
            >
              View Work
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                <path d="M3 13L13 3M13 3H5M13 3V11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </a>
            <a href="mailto:aletisaichandu0@gmail.com"
              className="label text-sand-500 hover:text-sand-200 transition-colors duration-300 border-b border-ink-600 hover:border-sand-500 pb-px">
              Get in touch
            </a>
          </div>
        </div>
      </div>

      {/* Scroll hint */}
      <div ref={scrollRef} className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3">
        <span className="label" style={{ fontSize: '10px' }}>scroll</span>
        <div className="w-px h-10 overflow-hidden">
          <div className="w-full h-full bg-gradient-to-b from-sand-500 to-transparent animate-slideDown" />
        </div>
      </div>
    </section>
  )
}
