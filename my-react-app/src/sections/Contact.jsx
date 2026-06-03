import { useEffect, useRef } from 'react'
import { gsap } from '../animations/gsap'

const EMAIL   = 'aletisaichandu0@gmail.com'
const SOCIALS = [
  { label: 'LinkedIn', href: 'https://linkedin.com/in/aleti-saichandu-103b1622a' },
  { label: 'Email',    href: 'mailto:aletisaichandu0@gmail.com' },
  { label: 'Phone',    href: 'tel:+919494506038' },
]
const NAV = [
  { label: 'Home',       id: 'hero' },
  { label: 'Work',       id: 'work' },
  { label: 'About',      id: 'about' },
  { label: 'Stack',      id: 'stack' },
  { label: 'Experience', id: 'experience' },
]

export default function Contact() {
  const sectionRef = useRef()

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('[data-ct-label]', { opacity: 0, y: 12, duration: 0.6, ease: 'power2.out', scrollTrigger: { trigger: '[data-ct-label]', start: 'top 88%' } })
      gsap.from('[data-ct-line]',  { yPercent: 110, duration: 1.0, stagger: 0.1, ease: 'expo.out', scrollTrigger: { trigger: '[data-ct-head]', start: 'top 82%' } })
      gsap.from('[data-ct-sub]',   { opacity: 0, y: 20, duration: 0.7, ease: 'power3.out', scrollTrigger: { trigger: '[data-ct-sub]', start: 'top 88%' } })
      gsap.from('[data-ct-cta]',   { opacity: 0, y: 20, duration: 0.7, ease: 'power3.out', scrollTrigger: { trigger: '[data-ct-cta]', start: 'top 90%' } })
      gsap.from('[data-ct-cols]',  { opacity: 0, y: 20, duration: 0.7, ease: 'power3.out', scrollTrigger: { trigger: '[data-ct-cols]', start: 'top 90%' } })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  const scroll = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })

  return (
    <footer ref={sectionRef} id="contact" className="footer-glass relative w-full"
      style={{ borderTop: '1px solid var(--color-border)' }}>

      <div className="mx-auto flex min-h-[80svh] w-full max-w-[1400px] flex-col justify-between px-6 py-16 md:px-12 md:py-20">

        <p data-ct-label className="label mb-2">05 — Contact</p>

        {/* Heading */}
        <div data-ct-head className="my-8 md:my-12">
          {["Let's build", 'something', 'remarkable.'].map((w, i) => (
            <div key={i} className="overflow-hidden">
              <h2 data-ct-line className="font-display leading-[1.0] tracking-[-0.03em]"
                style={{
                  fontSize: 'clamp(2.8rem, 8vw, 8rem)',
                  color: i === 1 ? 'var(--color-accent)' : i === 2 ? 'var(--color-text-muted)' : 'var(--color-text)',
                  fontStyle: i === 1 ? 'italic' : 'normal',
                }}>
                {w}
              </h2>
            </div>
          ))}
        </div>

        <p data-ct-sub className="mb-10 max-w-lg leading-[1.7]"
          style={{ fontSize: 'clamp(14px,1.3vw,17px)', color: 'var(--color-text-muted)' }}>
          Open to senior frontend roles, freelance projects, and GIS / AgriTech collaborations.
          Based in Hyderabad, India. Available now.
        </p>

        <div data-ct-cta className="mb-16">
          <a href="mailto:aletisaichandu0@gmail.com"
            className="inline-flex items-center gap-3 rounded-lg px-8 py-4 font-sans text-sm font-medium transition-all duration-300"
            style={{ background: 'linear-gradient(135deg, var(--color-accent), #c4a98a)', color: 'var(--color-bg)', boxShadow: '0 4px 24px var(--color-accent-dim)' }}>
            Send a message
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
              <path d="M3 13L13 3M13 3H5M13 3V11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </a>
        </div>

        {/* Four columns */}
        <div data-ct-cols className="flex w-full flex-col gap-8 md:flex-row md:justify-between">
          <div className="flex flex-col gap-3">
            <h4 className="footer-label">Socials</h4>
            {SOCIALS.map(s => (
              <a key={s.label} href={s.href}
                target={s.href.startsWith('http') ? '_blank' : undefined}
                rel="noopener noreferrer"
                className="footer-link">{s.label}</a>
            ))}
          </div>

          <div className="flex flex-col gap-3">
            <h4 className="footer-label">Navigate</h4>
            {NAV.map(n => (
              <button key={n.id} onClick={() => scroll(n.id)} className="footer-link text-left">{n.label}</button>
            ))}
          </div>

          <div className="flex flex-col gap-3">
            <h4 className="footer-label">Availability</h4>
            <p className="footer-muted max-w-[200px]">Open to senior frontend roles and freelance collaborations.</p>
            <span className="mt-2 inline-flex w-fit items-center gap-2 rounded-full border border-green-400/30 bg-green-400/10 px-3 py-1 text-xs text-green-400">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-green-400" />
              Available now
            </span>
          </div>

          <div className="flex flex-col gap-3">
            <h4 className="footer-label">Education</h4>
            <p className="footer-muted">B.Tech Computer Science</p>
            <p className="footer-muted">JNTU Hyderabad, 2022</p>
            <p className="footer-muted mt-3">© 2025 Aleti Sai Chandu</p>
          </div>
        </div>
      </div>

      {/* Full-width email with per-letter hover */}
      <a href={`mailto:${EMAIL}`} className="footer-email group block w-full pt-8 pb-6 md:pt-10 md:pb-8"
        aria-label={`Email ${EMAIL}`}
        style={{ borderTop: '1px solid var(--color-border)' }}>

        {/* Desktop — letters spread full width */}
        <h2
          className="m-0 hidden w-full items-baseline justify-between font-display md:flex px-6 md:px-12"
          style={{ fontSize: 'clamp(1.6rem, 5.2vw, 7.5rem)', fontWeight: 400, letterSpacing: 0, lineHeight: 1, color: 'var(--color-text-80)' }}
        >
          {EMAIL.split('').map((char, i) => (
            <span key={i} className="footer-letter"
              style={{ '--i': i, color: (char === '@' || char === '.') ? 'var(--color-accent)' : undefined }}>
              {char}
            </span>
          ))}
        </h2>

        {/* Mobile — block text */}
        <p className="block px-6 font-display md:hidden"
          style={{ fontSize: 'clamp(1.3rem, 7vw, 2.5rem)', fontWeight: 400, letterSpacing: '-0.02em', lineHeight: 1.1, color: 'var(--color-text-80)', wordBreak: 'break-all' }}>
          {EMAIL}
        </p>
      </a>
    </footer>
  )
}
