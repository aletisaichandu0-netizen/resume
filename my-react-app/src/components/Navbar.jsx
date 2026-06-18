import { useEffect, useRef, useState } from 'react'
import { gsap } from '../animations/gsap'
import { useTheme } from '../context/ThemeContext'

const LINKS = [
  { label: 'Intro',      id: 'hero' },
  { label: 'About',      id: 'about' },
  { label: 'Work',       id: 'work' },
  { label: 'Experience', id: 'experience' },
  { label: 'Contact',    id: 'contact' },
]

function SunIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
    </svg>
  )
}

function MoonIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
    </svg>
  )
}

/* ── ASC contact card ─────────────────────────────────────── */
function ContactCard({ onClose }) {
  const cardRef = useRef()

  useEffect(() => {
    gsap.fromTo(cardRef.current,
      { opacity: 0, y: -8, scale: 0.96 },
      { opacity: 1, y: 0, scale: 1, duration: 0.28, ease: 'power2.out' }
    )
    const handler = (e) => {
      if (!cardRef.current?.contains(e.target)) onClose()
    }
    setTimeout(() => document.addEventListener('mousedown', handler), 0)
    return () => document.removeEventListener('mousedown', handler)
  }, [onClose])

  return (
    <div ref={cardRef}
      className="absolute left-0 top-[calc(100%+10px)] z-[80] w-64 rounded-2xl p-5 flex flex-col gap-3"
      style={{ background: 'var(--color-bg-elevated)', border: '1px solid var(--color-border-strong)', boxShadow: '0 16px 48px rgba(0,0,0,0.45)' }}>

      <div className="flex items-center gap-2 mb-1">
        <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
        <span className="font-mono text-[11px] font-medium uppercase tracking-[0.16em]" style={{ color: 'var(--color-text-dim)' }}>
          Available for hire
        </span>
      </div>

      <a href="mailto:aletisaichandu0@gmail.com"
        className="flex items-center gap-3 rounded-xl px-3.5 py-2.5 transition-colors duration-200"
        style={{ background: 'var(--color-surface)', border: '1px solid var(--color-border)' }}
        onMouseEnter={e => e.currentTarget.style.background = 'var(--color-surface-hover)'}
        onMouseLeave={e => e.currentTarget.style.background = 'var(--color-surface)'}>
        <span style={{ color: 'var(--color-accent)', fontSize: '14px' }}>✉</span>
        <span className="font-mono text-[11px]" style={{ color: 'var(--color-text-muted)' }}>
          aletisaichandu0@gmail.com
        </span>
      </a>

      <a href="tel:+919494506038"
        className="flex items-center gap-3 rounded-xl px-3.5 py-2.5 transition-colors duration-200"
        style={{ background: 'var(--color-surface)', border: '1px solid var(--color-border)' }}
        onMouseEnter={e => e.currentTarget.style.background = 'var(--color-surface-hover)'}
        onMouseLeave={e => e.currentTarget.style.background = 'var(--color-surface)'}>
        <span style={{ color: 'var(--color-accent)', fontSize: '14px' }}>✆</span>
        <span className="font-mono text-[11px]" style={{ color: 'var(--color-text-muted)' }}>
          +91 94945 06038
        </span>
      </a>

      <a href="https://linkedin.com/in/aleti-saichandu-103b1622a"
        target="_blank" rel="noopener noreferrer"
        className="flex items-center gap-3 rounded-xl px-3.5 py-2.5 transition-colors duration-200"
        style={{ background: 'var(--color-surface)', border: '1px solid var(--color-border)' }}
        onMouseEnter={e => e.currentTarget.style.background = 'var(--color-surface-hover)'}
        onMouseLeave={e => e.currentTarget.style.background = 'var(--color-surface)'}>
        <span style={{ color: 'var(--color-accent)', fontSize: '14px' }}>in</span>
        <span className="font-mono text-[11px]" style={{ color: 'var(--color-text-muted)' }}>
          aleti-saichandu
        </span>
      </a>
    </div>
  )
}

export default function Navbar() {
  const { theme, toggle }             = useTheme()
  const [activeNav,  setActiveNav]    = useState('Intro')
  const [menuOpen,   setMenuOpen]     = useState(false)
  const [contactOpen, setContactOpen] = useState(false)
  const headerRef   = useRef()
  const navMenuRef  = useRef()
  const navPillRef  = useRef()
  const navBtnRefs  = useRef({})
  const pillReady   = useRef(false)
  const mobileRef   = useRef()
  const logoRef     = useRef()

  /* ── Initial reveal ─────────────────────────────────────── */
  useEffect(() => {
    gsap.set('[data-header-item]', { autoAlpha: 0, y: 10 })
    const tl = gsap.timeline({ delay: 2.2 })
    tl.to('[data-header-item]', { autoAlpha: 1, y: 0, duration: 0.9, ease: 'power2.out', stagger: 0.1 })
    tl.call(() => {
      movePillTo('Intro')
      gsap.fromTo(navPillRef.current, { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.4, ease: 'power2.out' })
      pillReady.current = true
    })
    return () => tl.kill()
  }, []) // eslint-disable-line

  /* ── Glare ───────────────────────────────────────────────── */
  useEffect(() => {
    const el = headerRef.current
    if (!el) return
    const onMove = (e) => {
      const r = el.getBoundingClientRect()
      el.style.setProperty('--glare-x', `${((e.clientX - r.left) / r.width)  * 100}%`)
      el.style.setProperty('--glare-y', `${((e.clientY - r.top)  / r.height) * 100}%`)
    }
    el.addEventListener('mousemove', onMove)
    return () => el.removeEventListener('mousemove', onMove)
  }, [])

  /* ── Pill position ───────────────────────────────────────── */
  const movePillTo = (label) => {
    const pill = navPillRef.current
    const btn  = navBtnRefs.current[label ?? activeNav]
    const menu = navMenuRef.current
    if (!pill || !btn || !menu) return
    const mr = menu.getBoundingClientRect()
    const br = btn.getBoundingClientRect()
    pill.style.width     = `${br.width}px`
    pill.style.transform = `translateY(-50%) translateX(${br.left - mr.left}px)`
  }

  useEffect(() => { if (pillReady.current) movePillTo(activeNav) }, [activeNav]) // eslint-disable-line

  useEffect(() => {
    const onResize = () => { if (pillReady.current) movePillTo(activeNav) }
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [activeNav]) // eslint-disable-line

  /* ── Scroll spy ──────────────────────────────────────────── */
  useEffect(() => {
    const sections = LINKS.map(l => document.getElementById(l.id)).filter(Boolean)
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const match = LINKS.find(l => l.id === entry.target.id)
            if (match) setActiveNav(match.label)
          }
        })
      },
      { rootMargin: '-15% 0px -75% 0px', threshold: 0 }
    )
    sections.forEach(s => observer.observe(s))
    return () => observer.disconnect()
  }, [])

  /* ── Mobile menu ─────────────────────────────────────────── */
  useEffect(() => {
    if (!mobileRef.current) return
    gsap.set(mobileRef.current, { autoAlpha: 0, height: 0, pointerEvents: 'none' })
  }, [])

  useEffect(() => {
    if (!mobileRef.current) return
    gsap.killTweensOf(mobileRef.current)
    gsap.to(mobileRef.current, menuOpen
      ? { height: 'auto', autoAlpha: 1, pointerEvents: 'auto', duration: 0.38, ease: 'power2.out' }
      : { height: 0, autoAlpha: 0, pointerEvents: 'none', duration: 0.28, ease: 'power2.inOut' }
    )
  }, [menuOpen])

  const scroll = (link) => {
    document.getElementById(link.id)?.scrollIntoView({ behavior: 'smooth' })
    setMenuOpen(false)
  }

  return (
    <>
      <header
        ref={headerRef}
        className="fixed left-0 right-0 top-0 z-[70] flex items-center justify-between gap-4 px-5 py-4 md:px-8 xl:grid"
        style={{ gridTemplateColumns: '1fr auto 1fr' }}
      >
        {/* ── Logo + contact card ──────────────────────────── */}
        <div data-header-item className="relative flex items-center justify-self-start" style={{ opacity: 0 }} ref={logoRef}>
          <button
            onClick={() => setContactOpen(v => !v)}
            className="font-display text-[15px] tracking-wide transition-all duration-200 hover:opacity-80 select-none"
            style={{ color: 'var(--color-text-80)' }}
          >
            ASC
          </button>
          {contactOpen && <ContactCard onClose={() => setContactOpen(false)} />}
        </div>

        {/* ── Desktop nav pill — truly centred ─────────────── */}
        <nav data-header-item className="hidden xl:flex justify-center" style={{ opacity: 0 }}>
          <ul
            ref={navMenuRef}
            className="liquid-glass relative flex items-center rounded-full p-[5px]"
            style={{ border: '1px solid var(--color-border-strong)' }}
          >
            <div className="nav-glare" />
            <div ref={navPillRef} className="nav-active-pill" style={{ opacity: 0 }} />
            {LINKS.map((link) => (
              <li key={link.label} ref={(el) => { navBtnRefs.current[link.label] = el }}>
                <button
                  onClick={() => { setActiveNav(link.label); scroll(link) }}
                  className="relative z-10 block px-4 py-[9px] font-mono text-[12px] font-medium tracking-[0.1em] uppercase transition-colors duration-300"
                  style={{ color: activeNav === link.label ? 'var(--color-text)' : 'var(--color-text-muted)' }}
                >
                  {link.label}
                </button>
              </li>
            ))}
          </ul>
        </nav>

        {/* ── Right cluster ────────────────────────────────── */}
        <div data-header-item className="flex items-center gap-2 justify-self-end" style={{ opacity: 0 }}>

          {/* Theme toggle */}
          <button onClick={toggle} aria-label="Toggle theme" className="theme-toggle"
            title={theme === 'dark' ? 'Switch to light' : 'Switch to dark'}>
            {theme === 'dark' ? <SunIcon /> : <MoonIcon />}
          </button>

          {/* Available badge — md+ only */}
          <a href="mailto:aletisaichandu0@gmail.com"
            className="hidden md:flex items-center gap-2 rounded-full px-3.5 py-1.5 font-mono text-[12px] font-medium uppercase tracking-[0.08em] transition-all duration-300 whitespace-nowrap"
            style={{ background: 'var(--color-accent-dim)', border: '1px solid var(--color-accent)', color: 'var(--color-accent)' }}>
            <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse flex-shrink-0" />
            Available
          </a>

          {/* Hamburger — hidden on xl */}
          <button type="button" aria-label="Toggle menu"
            onClick={() => setMenuOpen(o => !o)}
            className="flex h-10 w-10 items-center justify-center rounded-xl transition-colors xl:hidden"
            style={{ border: '1px solid var(--color-border-strong)', background: 'var(--color-surface)' }}>
            <span className={`absolute h-px w-[16px] transition-all duration-300 ${menuOpen ? 'rotate-45 translate-y-0' : '-translate-y-[5px]'}`}
              style={{ background: 'var(--color-text)' }} />
            <span className={`absolute h-px w-[16px] transition-all duration-200 ${menuOpen ? 'opacity-0' : 'opacity-100'}`}
              style={{ background: 'var(--color-text)' }} />
            <span className={`absolute h-px w-[16px] transition-all duration-300 ${menuOpen ? '-rotate-45 translate-y-0' : 'translate-y-[5px]'}`}
              style={{ background: 'var(--color-text)' }} />
          </button>
        </div>
      </header>

      {/* Mobile dropdown */}
      <div className="fixed left-4 right-4 top-[68px] z-[65] xl:hidden">
        <nav ref={mobileRef}
          className="overflow-hidden rounded-[20px] px-2 backdrop-blur-xl"
          style={{ border: '1px solid var(--color-border-strong)', background: 'var(--color-glass)', boxShadow: '0 8px 32px rgba(0,0,0,0.28)' }}>
          <ul className="flex flex-col py-2">
            {LINKS.map((link) => (
              <li key={link.label}>
                <button
                  onClick={() => { setActiveNav(link.label); scroll(link) }}
                  className="flex w-full items-center rounded-xl px-4 py-3.5 font-mono text-[12px] uppercase tracking-[0.20em] transition-colors duration-200"
                  style={{ color: activeNav === link.label ? 'var(--color-text)' : 'var(--color-text-muted)' }}
                >
                  {activeNav === link.label && (
                    <span className="mr-2.5 w-1 h-1 rounded-full flex-shrink-0" style={{ background: 'var(--color-accent)' }} />
                  )}
                  {link.label}
                </button>
              </li>
            ))}
            {/* Mobile contact links */}
            <li>
              <div className="mx-4 my-2 h-px" style={{ background: 'var(--color-border)' }} />
            </li>
            <li>
              <a href="mailto:aletisaichandu0@gmail.com"
                className="flex items-center gap-2.5 w-full rounded-xl px-4 py-3 font-mono text-[11px] tracking-[0.08em]"
                style={{ color: 'var(--color-accent)' }}>
                <span>✉</span> aletisaichandu0@gmail.com
              </a>
            </li>
            <li>
              <a href="tel:+919494506038"
                className="flex items-center gap-2.5 w-full rounded-xl px-4 py-3 font-mono text-[11px] tracking-[0.08em]"
                style={{ color: 'var(--color-text-muted)' }}>
                <span style={{ color: 'var(--color-accent)' }}>✆</span> +91 94945 06038
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </>
  )
}
