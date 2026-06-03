import { useEffect, useRef } from 'react'
import { gsap } from '../animations/gsap'

const LETTERS = ['A', 'L', 'E', 'T', 'I']

export default function Hero() {
  const sectionRef = useRef()

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.8, defaults: { ease: 'power4.out' } })
      tl.from('[data-hero-letter]', { duration: 1.1, opacity: 0, yPercent: 100, stagger: 0.08 })
        .from('[data-hero-tagline]', { duration: 0.9, yPercent: 120, stagger: 0.1 }, '-=0.65')
        .from('[data-hero-kicker]',  { opacity: 0, y: 20, duration: 0.7 }, '-=0.45')
        .from('[data-hero-cta]',     { opacity: 0, y: 16, duration: 0.6 }, '-=0.3')
        .from('[data-scroll-hint]',  { opacity: 0, y: 8,  duration: 0.5 }, '-=0.2')

      gsap.to('[data-hero-letters]', {
        yPercent: -10, ease: 'none',
        scrollTrigger: { trigger: sectionRef.current, start: 'top top', end: 'bottom top', scrub: true },
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative flex min-h-[100svh] flex-col items-center justify-center overflow-hidden px-4 pb-8 pt-8 sm:px-6"
      style={{ background: 'var(--color-bg)' }}
    >
      {/* Ambient gradient */}
      <div className="pointer-events-none absolute inset-0" style={{
        background: 'radial-gradient(ellipse 70% 50% at 50% 60%, var(--color-glow-hero) 0%, transparent 60%)',
      }} />

      {/* 4 corner glitches */}
      <div className="corner-glitch corner-tl" />
      <div className="corner-glitch corner-tr" />
      <div className="corner-glitch corner-bl" />
      <div className="corner-glitch corner-br" />

      {/* Kicker */}
      <p data-hero-kicker className="relative z-10 mb-5 text-center font-mono text-[11px] uppercase tracking-[0.28em] md:mb-8 md:text-sm md:tracking-[0.32em]"
        style={{ color: 'var(--color-text-muted)' }}>
        Senior Frontend Engineer · GIS &amp; AI Specialist
      </p>

      {/* Main letters */}
      <ul data-hero-letters className="relative z-10 flex list-none items-center justify-center text-center">
        {LETTERS.map((letter, i) => (
          <li key={i} className="overflow-hidden px-[1px] leading-[0.88] tracking-[-0.03em]"
            style={{ fontSize: 'clamp(3.8rem, 28vw, 24rem)', color: 'var(--color-yellow)' }}>
            <span data-hero-letter className="block font-display font-normal">{letter}</span>
          </li>
        ))}
      </ul>

      {/* Taglines */}
      <div className="relative z-10 mt-4 text-center" style={{ color: 'var(--color-yellow)' }}>
        <h2 className="font-display uppercase tracking-[0.1em] md:tracking-[0.18em]"
          style={{ fontSize: 'clamp(0.6rem, 2vw, 1.6rem)' }}>
          <span data-hero-tagline className="block overflow-hidden">DESIGNING · BUILDING · SHIPPING</span>
          <span data-hero-tagline className="block overflow-hidden">ANGULAR · REACT · GIS · AI/ML · NODE.JS</span>
        </h2>
      </div>

      {/* CTA row */}
      <div data-hero-cta className="relative z-10 mt-10 flex flex-wrap items-center justify-center gap-5">
        <a
          href="#work"
          onClick={(e) => { e.preventDefault(); document.getElementById('work')?.scrollIntoView({ behavior: 'smooth' }) }}
          className="flex items-center gap-3 rounded-lg px-8 py-4 font-sans text-sm font-medium transition-all duration-300"
          style={{ background: 'linear-gradient(135deg, var(--color-accent), #c4a98a)', color: 'var(--color-bg)', boxShadow: '0 4px 24px var(--color-accent-dim)' }}
        >
          View Work
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
            <path d="M3 13L13 3M13 3H5M13 3V11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </a>
        <a
          href="mailto:aletisaichandu0@gmail.com"
          className="font-mono text-[11px] uppercase tracking-[0.14em] pb-px transition-all duration-300"
          style={{ color: 'var(--color-text-muted)', borderBottom: '1px solid var(--color-border)' }}
          onMouseEnter={e => { e.currentTarget.style.color = 'var(--color-text)'; e.currentTarget.style.borderBottomColor = 'var(--color-text-muted)' }}
          onMouseLeave={e => { e.currentTarget.style.color = 'var(--color-text-muted)'; e.currentTarget.style.borderBottomColor = 'var(--color-border)' }}
        >
          Get in touch
        </a>
      </div>

      {/* Scroll hint */}
      <div data-scroll-hint className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3">
        <span className="font-mono text-[10px] uppercase tracking-[0.2em]" style={{ color: 'var(--color-text-ultra)' }}>scroll</span>
        <div className="w-px h-10 overflow-hidden" style={{ background: 'var(--color-border)' }}>
          <div className="w-full h-full animate-slide-down" style={{ background: 'linear-gradient(to bottom, var(--color-accent), transparent)' }} />
        </div>
      </div>
    </section>
  )
}
