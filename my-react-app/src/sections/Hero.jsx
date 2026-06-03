import { useEffect, useRef } from 'react'
import { gsap } from '../animations/gsap'

const LETTERS = ['A', 'L', 'E', 'T', 'I']

const QUICK_STATS = [
  { n: '4+',   label: 'Years' },
  { n: '10K+', label: 'Records scaled' },
  { n: '5',    label: 'Engineers led' },
  { n: '40%',  label: 'Faster delivery' },
]

export default function Hero() {
  const sectionRef = useRef()

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.8, defaults: { ease: 'power4.out' } })

      tl.from('[data-hero-letter]',  { duration: 1.2, opacity: 0, yPercent: 110, stagger: 0.07 })
        .from('[data-hero-tagline]', { duration: 0.9, yPercent: 120, stagger: 0.1 }, '-=0.7')
        .from('[data-hero-kicker]',  { opacity: 0, y: 18, duration: 0.7 }, '-=0.5')
        .from('[data-hero-bio]',     { opacity: 0, y: 16, duration: 0.6 }, '-=0.35')
        .from('[data-hero-cta]',     { opacity: 0, y: 14, duration: 0.55 }, '-=0.25')
        .from('[data-hero-stats] > *', { opacity: 0, y: 12, duration: 0.5, stagger: 0.08 }, '-=0.2')
        .from('[data-scroll-hint]',  { opacity: 0, y: 8, duration: 0.4 }, '-=0.1')

      gsap.to('[data-hero-letters]', {
        yPercent: -8, ease: 'none',
        scrollTrigger: { trigger: sectionRef.current, start: 'top top', end: 'bottom top', scrub: true },
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative flex min-h-[100svh] flex-col items-center justify-center overflow-hidden px-4 pb-12 pt-24 sm:px-6"
      style={{ background: 'var(--color-bg)' }}
    >
      {/* Radial glow */}
      <div className="pointer-events-none absolute inset-0" style={{
        background: 'radial-gradient(ellipse 80% 55% at 50% 55%, var(--color-glow-hero) 0%, transparent 65%)',
      }} />
      {/* Subtle noise texture */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.025]" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
      }} />

      {/* 4 corner glitches */}
      <div className="corner-glitch corner-tl" />
      <div className="corner-glitch corner-tr" />
      <div className="corner-glitch corner-bl" />
      <div className="corner-glitch corner-br" />

      {/* Role badge */}
      <div data-hero-kicker className="relative z-10 mb-8 flex items-center gap-3">
        <span className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 font-mono text-[10.5px] uppercase tracking-[0.24em]"
          style={{ background: 'var(--color-surface)', border: '1px solid var(--color-border-strong)', color: 'var(--color-text-dim)' }}>
          <span className="h-1.5 w-1.5 rounded-full animate-pulse" style={{ background: 'var(--color-success)' }} />
          Available · Hyderabad, India
        </span>
      </div>

      {/* Name letters */}
      <ul data-hero-letters className="relative z-10 flex list-none items-center justify-center text-center select-none">
        {LETTERS.map((letter, i) => (
          <li key={i} className="overflow-hidden leading-[0.85] tracking-[-0.02em]"
            style={{ fontSize: 'clamp(4rem, 27vw, 23rem)', color: 'var(--color-yellow)', paddingInline: '0.5px' }}>
            <span data-hero-letter className="block font-display">{letter}</span>
          </li>
        ))}
      </ul>

      {/* Taglines */}
      <div className="relative z-10 mt-3 text-center" style={{ color: 'var(--color-accent)' }}>
        <h2 className="font-display uppercase" style={{ fontSize: 'clamp(0.6rem, 1.9vw, 1.55rem)', letterSpacing: '0.12em' }}>
          <span data-hero-tagline className="block overflow-hidden">SENIOR FRONTEND ENGINEER</span>
          <span data-hero-tagline className="block overflow-hidden" style={{ color: 'var(--color-text-dim)', fontSize: '0.78em' }}>
            ANGULAR · REACT · GIS · AI/ML · NODE.JS
          </span>
        </h2>
      </div>

      {/* Bio line */}
      <p data-hero-bio className="relative z-10 mt-6 max-w-[52ch] text-center leading-relaxed"
        style={{ fontSize: 'clamp(13.5px, 1.3vw, 15.5px)', color: 'var(--color-text-muted)' }}>
        Building enterprise-scale government and agritech platforms at Vassar Labs.
        Specialising in geospatial systems, AI integration, and high-performance Angular & React applications.
      </p>

      {/* CTA row */}
      <div data-hero-cta className="relative z-10 mt-8 flex flex-wrap items-center justify-center gap-4">
        <a
          href="#work"
          onClick={(e) => { e.preventDefault(); document.getElementById('work')?.scrollIntoView({ behavior: 'smooth' }) }}
          className="flex items-center gap-2.5 rounded-xl px-7 py-3.5 font-sans text-sm font-medium transition-all duration-300 hover:opacity-90 hover:scale-[1.02]"
          style={{ background: 'linear-gradient(135deg, var(--color-accent) 0%, var(--color-yellow) 100%)', color: '#0d0b08', boxShadow: '0 4px 28px var(--color-accent-glow), 0 2px 8px rgba(0,0,0,0.3)' }}
        >
          View Work
          <svg width="13" height="13" viewBox="0 0 16 16" fill="none">
            <path d="M3 13L13 3M13 3H5M13 3V11" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
          </svg>
        </a>
        <a
          href="#contact"
          onClick={(e) => { e.preventDefault(); document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }) }}
          className="flex items-center gap-2.5 rounded-xl px-7 py-3.5 font-sans text-sm font-medium transition-all duration-300 hover:border-[var(--color-border-strong)]"
          style={{ background: 'var(--color-surface)', border: '1px solid var(--color-border)', color: 'var(--color-text-80)' }}
        >
          Get in touch
        </a>
      </div>

      {/* Quick stats bar */}
      <div data-hero-stats className="relative z-10 mt-12 flex flex-wrap items-center justify-center gap-8">
        {QUICK_STATS.map(({ n, label }, i) => (
          <div key={i} className="flex flex-col items-center gap-0.5">
            <span className="font-display font-normal leading-none" style={{ fontSize: 'clamp(1.4rem, 2.5vw, 2rem)', color: 'var(--color-accent)' }}>{n}</span>
            <span className="font-mono text-[9.5px] uppercase tracking-[0.22em]" style={{ color: 'var(--color-text-ultra)' }}>{label}</span>
          </div>
        ))}
      </div>

      {/* Scroll hint */}
      <div data-scroll-hint className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2.5">
        <span className="font-mono text-[9px] uppercase tracking-[0.24em]" style={{ color: 'var(--color-text-ultra)' }}>scroll</span>
        <div className="w-px h-9 overflow-hidden" style={{ background: 'var(--color-border)' }}>
          <div className="w-full h-full animate-slide-down" style={{ background: 'linear-gradient(to bottom, var(--color-accent), transparent)' }} />
        </div>
      </div>
    </section>
  )
}
