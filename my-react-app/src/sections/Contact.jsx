import { useEffect, useRef } from 'react'
import { gsap } from '../animations/gsap'

const EMAIL   = 'aletisaichandu0@gmail.com'
const SOCIALS = [
  { label: 'LinkedIn', href: 'https://linkedin.com/in/aleti-saichandu-103b1622a', meta: 'Connect' },
  { label: 'Email',    href: 'mailto:aletisaichandu0@gmail.com', meta: 'Direct' },
  { label: 'Phone',    href: 'tel:+919494506038', meta: '+91 949 450 6038' },
]
const NAV = [
  { label: 'Hero',       id: 'hero' },
  { label: 'About',      id: 'about' },
  { label: 'Work',       id: 'work' },
  { label: 'Stack',      id: 'stack' },
  { label: 'Experience', id: 'experience' },
]
const OPEN_TO = ['Senior Frontend Roles', 'Full-stack Contracts', 'GIS/AgriTech Projects', 'AI Integration Work']

export default function Contact() {
  const sectionRef = useRef()

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('[data-ct-label]',  { opacity: 0, y: 12, duration: 0.6, ease: 'power2.out', scrollTrigger: { trigger: '[data-ct-label]', start: 'top 88%' } })
      gsap.from('[data-ct-line]',   { yPercent: 110, duration: 1.0, stagger: 0.09, ease: 'expo.out', scrollTrigger: { trigger: '[data-ct-head]', start: 'top 82%' } })
      gsap.from('[data-ct-sub]',    { opacity: 0, y: 18, duration: 0.7, ease: 'power3.out', scrollTrigger: { trigger: '[data-ct-sub]', start: 'top 88%' } })
      gsap.from('[data-ct-cta]',    { opacity: 0, y: 18, duration: 0.65, ease: 'power3.out', scrollTrigger: { trigger: '[data-ct-cta]', start: 'top 90%' } })
      gsap.from('[data-ct-cols]',   { opacity: 0, y: 18, duration: 0.65, ease: 'power3.out', scrollTrigger: { trigger: '[data-ct-cols]', start: 'top 90%' } })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  const scroll = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })

  return (
    <footer ref={sectionRef} id="contact" className="footer-glass relative w-full"
      style={{ borderTop: '1px solid var(--color-border)' }}>

      <div className="mx-auto flex min-h-[80svh] w-full max-w-[1300px] flex-col justify-between px-6 py-16 md:px-12 md:py-20">

        <div className="flex items-center gap-4 mb-4">
          <div className="accent-line" />
          <p data-ct-label className="label">05 — Contact</p>
        </div>

        {/* Big heading */}
        <div data-ct-head className="my-10 md:my-14">
          {[
            { text: "Let's build", color: 'var(--color-text)', italic: false },
            { text: 'something', color: 'var(--color-accent)', italic: true },
            { text: 'remarkable.', color: 'var(--color-text-muted)', italic: false },
          ].map(({ text, color, italic }, i) => (
            <div key={i} className="overflow-hidden">
              <h2 data-ct-line className="font-display leading-[0.98] tracking-[-0.03em]"
                style={{ fontSize: 'clamp(2.6rem, 7.5vw, 7.5rem)', color, fontStyle: italic ? 'italic' : 'normal' }}>
                {text}
              </h2>
            </div>
          ))}
        </div>

        <p data-ct-sub className="mb-10 max-w-[48ch] leading-[1.78]"
          style={{ fontSize: 'clamp(15px,1.25vw,17px)', color: 'var(--color-text-muted)' }}>
          4+ years building enterprise government platforms at the intersection of GIS, AI, and performance engineering.
          Based in Hyderabad, India. Open and available now.
        </p>

        {/* CTA + open-to */}
        <div data-ct-cta className="mb-14 flex flex-col gap-5">
          <div className="flex flex-wrap items-center gap-4">
            <a href="mailto:aletisaichandu0@gmail.com"
              className="inline-flex items-center gap-2.5 rounded-xl px-8 py-4 font-sans text-sm font-medium text-[#0d0b08] transition-all duration-300 hover:opacity-90 hover:scale-[1.02]"
              style={{ background: 'linear-gradient(135deg, var(--color-accent) 0%, var(--color-yellow) 100%)', boxShadow: '0 4px 28px var(--color-accent-glow), 0 2px 8px rgba(0,0,0,0.25)' }}>
              Send a message
              <svg width="13" height="13" viewBox="0 0 16 16" fill="none">
                <path d="M3 13L13 3M13 3H5M13 3V11" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
              </svg>
            </a>
            <span className="inline-flex items-center gap-2 rounded-full px-4 py-2 font-mono text-[10.5px] uppercase tracking-[0.18em]"
              style={{ background: 'var(--color-surface)', border: '1px solid var(--color-border-strong)', color: 'var(--color-success)' }}>
              <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: 'var(--color-success)' }} />
              Available now
            </span>
          </div>

          {/* Open-to chips */}
          <div className="flex flex-wrap gap-2">
            {OPEN_TO.map(t => (
              <span key={t} className="rounded-full px-3.5 py-1.5 font-mono text-[11px] font-medium uppercase tracking-[0.1em]"
                style={{ background: 'var(--color-bg-raised)', border: '1px solid var(--color-border)', color: 'var(--color-text-dim)' }}>
                {t}
              </span>
            ))}
          </div>
        </div>

        {/* Four columns */}
        <div data-ct-cols className="flex w-full flex-col gap-10 border-t pt-10 md:flex-row md:justify-between"
          style={{ borderColor: 'var(--color-border)' }}>

          <div className="flex flex-col gap-3">
            <h4 className="footer-label">Connect</h4>
            {SOCIALS.map(({ label, href, meta }) => (
              <a key={label} href={href}
                target={href.startsWith('http') ? '_blank' : undefined}
                rel="noopener noreferrer"
                className="flex items-center justify-between gap-6 footer-link group/link">
                <span>{label}</span>
                <span className="font-mono text-[9.5px] uppercase tracking-[0.14em] opacity-0 group-hover/link:opacity-100 transition-opacity"
                  style={{ color: 'var(--color-accent)' }}>{meta}</span>
              </a>
            ))}
          </div>

          <div className="flex flex-col gap-3">
            <h4 className="footer-label">Navigate</h4>
            {NAV.map(({ label, id }) => (
              <button key={id} onClick={() => scroll(id)} className="footer-link text-left">{label}</button>
            ))}
          </div>

          <div className="flex flex-col gap-3">
            <h4 className="footer-label">Location</h4>
            <p className="footer-link" style={{ cursor: 'default' }}>Hyderabad, India</p>
            <p className="footer-muted">IST (UTC +5:30)</p>
            <p className="footer-muted mt-1">Open to remote + hybrid</p>
          </div>

          <div className="flex flex-col gap-3">
            <h4 className="footer-label">Education</h4>
            <p className="footer-link" style={{ cursor: 'default' }}>B.Tech Computer Science</p>
            <p className="footer-muted">JNTU Hyderabad, 2022</p>
            <p className="footer-muted mt-4 text-[12px]">© 2025 Aleti Sai Chandu</p>
            <p className="footer-muted text-[11px]">Built with React · GSAP · Tailwind</p>
          </div>
        </div>
      </div>

      {/* Full-width email */}
      <a href={`mailto:${EMAIL}`} className="footer-email group block w-full pt-8 pb-6 md:pt-10 md:pb-8"
        aria-label={`Email ${EMAIL}`} style={{ borderTop: '1px solid var(--color-border)' }}>

        {/* Desktop: letters spread full width */}
        <h2 className="m-0 hidden w-full items-baseline justify-between font-display md:flex px-6 md:px-12"
          style={{ fontSize: 'clamp(1.5rem, 4.9vw, 7rem)', fontWeight: 400, letterSpacing: 0, lineHeight: 1, color: 'var(--color-text-80)' }}>
          {EMAIL.split('').map((char, i) => (
            <span key={i} className="footer-letter"
              style={{ '--i': i, color: (char === '@' || char === '.') ? 'var(--color-accent)' : undefined }}>
              {char}
            </span>
          ))}
        </h2>

        {/* Mobile: block text */}
        <p className="block px-6 font-display md:hidden"
          style={{ fontSize: 'clamp(1.2rem, 6.5vw, 2.4rem)', fontWeight: 400, letterSpacing: '-0.02em', lineHeight: 1.1, color: 'var(--color-text-80)', wordBreak: 'break-all' }}>
          {EMAIL}
        </p>
      </a>
    </footer>
  )
}
