import { useEffect, useRef } from 'react'
import { gsap } from '../animations/gsap'
import BusinessmanScene from '../components/BusinessmanScene'

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
        .from('[data-hero-scene]',     { opacity: 0, x: -28, scale: 0.96, duration: 1 }, '-=1.2')
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
      className="relative min-h-[100svh] overflow-hidden px-4 pb-12 pt-24 sm:px-6"
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

      {/* ── Two-column grid on lg+, stacked on mobile ── */}
      <div className="relative z-10 mx-auto flex min-h-[calc(100svh-96px)] max-w-[1200px] flex-col items-center justify-center lg:grid lg:grid-cols-[420px_1fr] lg:gap-12 lg:items-center">

        {/* ── Left: 3D Businessman ── */}
        <div data-hero-scene className="hidden lg:flex flex-col items-center justify-center self-stretch">
          {/* Glow backdrop */}
          <div className="pointer-events-none absolute" style={{
            width: 460, height: 560,
            borderRadius: '50%',
            background: 'radial-gradient(ellipse at 40% 60%, var(--color-accent) 0%, transparent 68%)',
            opacity: 0.07, left: -20,
          }} />
          <div
            className="group relative overflow-hidden rounded-[28px] border transition-[border-color,box-shadow] duration-500"
            style={{
              borderColor: 'var(--color-border)',
              background: 'radial-gradient(circle at 50% 58%, var(--color-accent-glow), transparent 62%)',
              boxShadow: 'inset 0 0 70px rgba(0,0,0,0.28), var(--shadow-glow)',
            }}
          >
            <div className="pointer-events-none absolute inset-x-6 top-5 z-10 flex items-center justify-between">
              <span className="font-mono text-[8px] uppercase tracking-[0.22em]"
                style={{ color: 'var(--color-text-ultra)' }}>
                Interactive profile
              </span>
              <span className="flex items-center gap-1.5 font-mono text-[8px] uppercase tracking-[0.18em]"
                style={{ color: 'var(--color-text-dim)' }}>
                <span className="h-1 w-1 rounded-full animate-pulse" style={{ background: 'var(--color-accent)' }} />
                Live
              </span>
            </div>
            <BusinessmanScene
              className="transition-transform duration-700 group-hover:scale-[1.015]"
              style={{
                width: 380,
                height: 520,
                borderRadius: 24,
              }}
            />
            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24"
              style={{ background: 'linear-gradient(to top, var(--color-bg), transparent)' }} />
            <span className="pointer-events-none absolute bottom-5 left-1/2 -translate-x-1/2 whitespace-nowrap font-mono text-[8px] uppercase tracking-[0.2em] opacity-45 transition-opacity duration-300 group-hover:opacity-80"
              style={{ color: 'var(--color-text-muted)' }}>
              Move cursor to interact
            </span>
          </div>
          {/* Floating label under figure */}
          <div className="mt-4 flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: 'var(--color-success)' }} />
            <span className="font-mono text-[9.5px] uppercase tracking-[0.24em]"
              style={{ color: 'var(--color-text-dim)' }}>
              Available for hire
            </span>
          </div>
        </div>

        {/* ── Right: Text content ── */}
        <div className="flex flex-col items-center lg:items-start text-center lg:text-left">

          {/* Available badge (mobile only) */}
          <div data-hero-kicker className="mb-7 lg:hidden">
            <span className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 font-mono text-[10.5px] uppercase tracking-[0.22em]"
              style={{ background: 'var(--color-surface)', border: '1px solid var(--color-border-strong)', color: 'var(--color-text-dim)' }}>
              <span className="h-1.5 w-1.5 rounded-full animate-pulse" style={{ background: 'var(--color-success)' }} />
              Available · Hyderabad, India
            </span>
          </div>

          {/* Location kicker — desktop */}
          <div data-hero-kicker className="mb-5 hidden lg:flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full animate-pulse" style={{ background: 'var(--color-success)' }} />
            <span className="font-mono text-[10px] uppercase tracking-[0.22em]"
              style={{ color: 'var(--color-text-dim)' }}>
              Hyderabad, India
            </span>
          </div>

          {/* Name — two rows */}
          <div data-hero-letters className="select-none flex flex-col items-center lg:items-start">
            <ul className="flex list-none items-center leading-[0.88] tracking-[-0.025em]"
              style={{ fontSize: 'clamp(2.8rem, 11vw, 7.5rem)' }}>
              {ROW1.map((letter, i) => (
                <li key={i} className="overflow-hidden" style={{ color: 'var(--color-yellow)', paddingInline: '1px' }}>
                  <span data-hero-letter className="block font-display">{letter}</span>
                </li>
              ))}
            </ul>
            <ul className="flex list-none items-center leading-[0.88] tracking-[-0.015em]"
              style={{ fontSize: 'clamp(1.4rem, 5.5vw, 3.8rem)' }}>
              {ROW2.map((letter, i) => (
                <li key={i} className="overflow-hidden"
                  style={{
                    color: letter === ' ' ? 'transparent' : 'var(--color-accent)',
                    paddingInline: letter === ' ' ? 'clamp(3px, 1vw, 8px)' : '1px',
                  }}>
                  <span data-hero-letter className="block font-display">{letter === ' ' ? '·' : letter}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Taglines */}
          <div className="mt-4" style={{ color: 'var(--color-accent)' }}>
            <h2 className="font-display uppercase" style={{ fontSize: 'clamp(0.55rem, 1.5vw, 1.1rem)', letterSpacing: '0.12em' }}>
              <span data-hero-tagline className="block overflow-hidden">Senior Frontend Engineer · Full Stack Developer</span>
              <span data-hero-tagline className="block overflow-hidden mt-0.5" style={{ color: 'var(--color-text-dim)', fontSize: '0.85em' }}>
                GIS & AI Integration Specialist · Angular · React · TypeScript
              </span>
            </h2>
          </div>

          {/* Bio */}
          <p data-hero-bio className="mt-6 max-w-[52ch] leading-relaxed"
            style={{ fontSize: 'clamp(13px, 1.2vw, 15px)', color: 'var(--color-text-muted)' }}>
            4+ years designing, building, and deploying scalable enterprise-grade web applications
            across government, agriculture, and climate-tech domains at Vassar Labs.
          </p>

          {/* CTAs */}
          <div data-hero-cta className="mt-8 flex flex-wrap items-center gap-4">
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
          <div data-hero-stats className="mt-10 flex flex-wrap items-center gap-7">
            {QUICK_STATS.map(({ n, label }, i) => (
              <div key={i} className="flex flex-col gap-0.5">
                <span className="font-display leading-none" style={{ fontSize: 'clamp(1.3rem, 2.2vw, 1.85rem)', color: 'var(--color-accent)' }}>{n}</span>
                <span className="font-mono text-[9px] uppercase tracking-[0.20em]" style={{ color: 'var(--color-text-ultra)' }}>{label}</span>
              </div>
            ))}
          </div>
        </div>
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
