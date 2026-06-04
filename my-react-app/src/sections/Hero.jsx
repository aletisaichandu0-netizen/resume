import { useEffect, useRef } from 'react'
import { gsap } from '../animations/gsap'

const ROW1 = ['A', 'L', 'E', 'T', 'I']
const ROW2 = ['S', 'A', 'I', ' ', 'C', 'H', 'A', 'N', 'D', 'U']

const QUICK_STATS = [
  { n: '4+',   label: 'Years' },
  { n: '6+',   label: 'Products shipped' },
  { n: '5',    label: 'Engineers led' },
  { n: '40%',  label: 'Faster delivery' },
]

export default function Hero() {
  const sectionRef = useRef()

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.8, defaults: { ease: 'power4.out' } })
      tl.from('[data-hero-letter]',    { duration: 1.2, opacity: 0, yPercent: 110, stagger: 0.07 })
        .from('[data-hero-tagline]',   { duration: 0.9, yPercent: 120, stagger: 0.1 }, '-=0.7')
        .from('[data-hero-kicker]',    { opacity: 0, y: 18, duration: 0.7 }, '-=0.5')
        .from('[data-hero-bio]',       { opacity: 0, y: 16, duration: 0.6 }, '-=0.35')
        .from('[data-hero-cta]',       { opacity: 0, y: 14, duration: 0.55 }, '-=0.25')
        .from('[data-hero-stats] > *', { opacity: 0, y: 12, duration: 0.5, stagger: 0.08 }, '-=0.2')
        .from('[data-scroll-hint]',    { opacity: 0, y: 8,  duration: 0.4 }, '-=0.1')

      gsap.to('[data-hero-letters]', {
        yPercent: -8, ease: 'none',
        scrollTrigger: { trigger: sectionRef.current, start: 'top top', end: 'bottom top', scrub: true },
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} id="hero"
      className="relative flex min-h-[100svh] flex-col items-center justify-center overflow-hidden px-4 pb-12 pt-24 sm:px-6"
      style={{ background: 'var(--color-bg)' }}>

      {/* Radial glow */}
      <div className="pointer-events-none absolute inset-0" style={{
        background: 'radial-gradient(ellipse 80% 55% at 50% 55%, var(--color-glow-hero) 0%, transparent 65%)',
      }} />

      {/* 4 corner glitches */}
      <div className="corner-glitch corner-tl" />
      <div className="corner-glitch corner-tr" />
      <div className="corner-glitch corner-bl" />
      <div className="corner-glitch corner-br" />

      {/* Available badge */}
      <div data-hero-kicker className="relative z-10 mb-8">
        <span className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 font-mono text-[10.5px] uppercase tracking-[0.22em]"
          style={{ background: 'var(--color-surface)', border: '1px solid var(--color-border-strong)', color: 'var(--color-text-dim)' }}>
          <span className="h-1.5 w-1.5 rounded-full animate-pulse" style={{ background: 'var(--color-success)' }} />
          Available · Hyderabad, India
        </span>
      </div>

      {/* Name — two rows */}
      <div data-hero-letters className="relative z-10 flex flex-col items-center text-center select-none">
        {/* Row 1: ALETI */}
        <ul className="flex list-none items-center justify-center leading-[0.88] tracking-[-0.02em]"
          style={{ fontSize: 'clamp(3.2rem, 22vw, 18rem)' }}>
          {ROW1.map((letter, i) => (
            <li key={i} className="overflow-hidden" style={{ color: 'var(--color-yellow)', paddingInline: '1px' }}>
              <span data-hero-letter className="block font-display">{letter}</span>
            </li>
          ))}
        </ul>
        {/* Row 2: SAI CHANDU */}
        <ul className="flex list-none items-center justify-center leading-[0.88] tracking-[-0.01em]"
          style={{ fontSize: 'clamp(1.6rem, 11vw, 9rem)' }}>
          {ROW2.map((letter, i) => (
            <li key={i} className="overflow-hidden"
              style={{
                color: letter === ' ' ? 'transparent' : 'var(--color-accent)',
                paddingInline: letter === ' ' ? 'clamp(4px, 1.5vw, 12px)' : '1px',
              }}>
              <span data-hero-letter className="block font-display">{letter === ' ' ? '·' : letter}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Taglines */}
      <div className="relative z-10 mt-3 text-center" style={{ color: 'var(--color-accent)' }}>
        <h2 className="font-display uppercase" style={{ fontSize: 'clamp(0.6rem, 1.9vw, 1.55rem)', letterSpacing: '0.12em' }}>
          <span data-hero-tagline className="block overflow-hidden">Senior Frontend Engineer · Full Stack Developer</span>
          <span data-hero-tagline className="block overflow-hidden" style={{ color: 'var(--color-text-dim)', fontSize: '0.78em' }}>
            GIS & AI Integration Specialist · Angular · React · TypeScript
          </span>
        </h2>
      </div>

      {/* Bio */}
      <p data-hero-bio className="relative z-10 mt-6 max-w-[54ch] text-center leading-relaxed"
        style={{ fontSize: 'clamp(13.5px, 1.3vw, 15.5px)', color: 'var(--color-text-muted)' }}>
        4+ years designing, building, and deploying scalable enterprise-grade web applications
        across government, agriculture, and climate-tech domains at Vassar Labs.
      </p>

      {/* CTAs */}
      <div data-hero-cta className="relative z-10 mt-8 flex flex-wrap items-center justify-center gap-4">
        <a href="#work"
          onClick={(e) => { e.preventDefault(); document.getElementById('work')?.scrollIntoView({ behavior: 'smooth' }) }}
          className="flex items-center gap-2.5 rounded-xl px-7 py-3.5 font-sans text-sm font-medium transition-all duration-300 hover:opacity-90 hover:scale-[1.02]"
          style={{ background: 'linear-gradient(135deg, var(--color-accent) 0%, var(--color-yellow) 100%)', color: '#0d0b08', boxShadow: '0 4px 28px var(--color-accent-glow), 0 2px 8px rgba(0,0,0,0.3)' }}>
          View Work
          <svg width="13" height="13" viewBox="0 0 16 16" fill="none">
            <path d="M3 13L13 3M13 3H5M13 3V11" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
          </svg>
        </a>
        <a href="#contact"
          onClick={(e) => { e.preventDefault(); document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }) }}
          className="flex items-center gap-2.5 rounded-xl px-7 py-3.5 font-sans text-sm font-medium transition-all duration-300"
          style={{ background: 'var(--color-surface)', border: '1px solid var(--color-border)', color: 'var(--color-text-80)' }}>
          Get in touch
        </a>
      </div>

      {/* Quick stats */}
      <div data-hero-stats className="relative z-10 mt-12 flex flex-wrap items-center justify-center gap-8">
        {QUICK_STATS.map(({ n, label }, i) => (
          <div key={i} className="flex flex-col items-center gap-0.5">
            <span className="font-display leading-none" style={{ fontSize: 'clamp(1.4rem, 2.5vw, 2rem)', color: 'var(--color-accent)' }}>{n}</span>
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
