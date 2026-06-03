import { useEffect, useRef, useState } from 'react'
import { gsap } from '../animations/gsap'
import { useTheme } from '../context/ThemeContext'

const LINKS = ['Work', 'About', 'Stack', 'Experience', 'Contact']

function SunIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
    </svg>
  )
}

function MoonIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
    </svg>
  )
}

export default function Navbar() {
  const { theme, toggle } = useTheme()
  const [activeNav, setActiveNav] = useState('Work')
  const [menuOpen,  setMenuOpen]  = useState(false)
  const headerRef  = useRef()
  const navMenuRef = useRef()
  const navPillRef = useRef()
  const navBtnRefs = useRef({})
  const pillReady  = useRef(false)
  const mobileRef  = useRef()

  /* ── Initial reveal ─────────────────────────────────────────── */
  useEffect(() => {
    gsap.set('[data-header-item]', { autoAlpha: 0, y: 10 })
    const tl = gsap.timeline({ delay: 2.2 })
    tl.to('[data-header-item]', { autoAlpha: 1, y: 0, duration: 0.9, ease: 'power2.out', stagger: 0.1 })
    tl.call(() => {
      movePillTo(activeNav)
      gsap.fromTo(navPillRef.current, { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.4, ease: 'power2.out' })
      pillReady.current = true
    })
    return () => tl.kill()
  }, []) // eslint-disable-line

  /* ── Glare mouse tracking ────────────────────────────────────── */
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

  /* ── Active pill position ────────────────────────────────────── */
  const movePillTo = (key) => {
    const pill = navPillRef.current
    const btn  = navBtnRefs.current[key ?? activeNav]
    const menu = navMenuRef.current
    if (!pill || !btn || !menu) return
    const mr = menu.getBoundingClientRect()
    const br = btn.getBoundingClientRect()
    pill.style.width     = `${br.width}px`
    pill.style.transform = `translateY(-50%) translateX(${br.left - mr.left}px)`
  }

  useEffect(() => { if (pillReady.current) movePillTo(activeNav) }, [activeNav]) // eslint-disable-line

  useEffect(() => {
    const onResize = () => { if (pillReady.current) movePillTo() }
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, []) // eslint-disable-line

  /* ── Mobile menu ─────────────────────────────────────────────── */
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

  const scroll = (id) => {
    document.getElementById(id.toLowerCase())?.scrollIntoView({ behavior: 'smooth' })
    setMenuOpen(false)
  }

  return (
    <>
      <header
        ref={headerRef}
        className="fixed left-0 right-0 top-0 z-[70] flex items-center justify-between px-5 pt-5 pb-3 md:px-8 md:pt-6 md:pb-4 xl:grid"
        style={{ gridTemplateColumns: '1fr auto 1fr' }}
      >
        {/* Logo */}
        <a
          data-header-item
          href="#hero"
          onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }) }}
          className="justify-self-start font-display text-base tracking-wide transition-colors"
          style={{ color: 'var(--color-text-80)', opacity: 0 }}
          onMouseEnter={e => { e.currentTarget.style.color = 'var(--color-text)' }}
          onMouseLeave={e => { e.currentTarget.style.color = 'var(--color-text-80)' }}
        >
          ASC
        </a>

        {/* Desktop nav pill — centred */}
        <nav data-header-item className="hidden xl:block" style={{ opacity: 0 }}>
          <ul
            ref={navMenuRef}
            className="liquid-glass relative flex items-center rounded-full p-[5px]"
            style={{ border: '1px solid var(--color-border-strong)' }}
          >
            <div className="nav-glare" />
            <div ref={navPillRef} className="nav-active-pill" style={{ opacity: 0 }} />
            {LINKS.map((item) => (
              <li key={item} ref={(el) => { navBtnRefs.current[item] = el }}>
                <button
                  onClick={() => { setActiveNav(item); scroll(item) }}
                  className="relative z-10 block px-5 py-[10px] font-mono text-[11px] tracking-[0.14em] uppercase transition-colors duration-300"
                  style={{ color: activeNav === item ? 'var(--color-text)' : 'var(--color-text-muted)' }}
                >
                  {item}
                </button>
              </li>
            ))}
          </ul>
        </nav>

        {/* Right: theme toggle + availability + hamburger */}
        <div data-header-item className="flex items-center gap-2 justify-self-end" style={{ opacity: 0 }}>

          {/* Theme toggle */}
          <button
            onClick={toggle}
            aria-label="Toggle theme"
            className="theme-toggle"
            title={theme === 'dark' ? 'Switch to light' : 'Switch to dark'}
          >
            {theme === 'dark' ? <SunIcon /> : <MoonIcon />}
          </button>

          {/* Available badge — desktop */}
          <a
            href="mailto:aletisaichandu0@gmail.com"
            className="hidden md:flex items-center gap-2 rounded-full px-4 py-1.5 font-mono text-[11px] uppercase tracking-[0.12em] transition-all duration-300"
            style={{
              background: 'var(--color-accent-dim)',
              border: '1px solid var(--color-accent)',
              color: 'var(--color-accent)',
            }}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
            Available
          </a>

          {/* Hamburger — mobile */}
          <button
            type="button"
            aria-label="Toggle menu"
            onClick={() => setMenuOpen((o) => !o)}
            className="relative z-[80] flex h-11 w-11 items-center justify-center rounded-xl backdrop-blur-xl transition-colors xl:invisible"
            style={{ border: '1px solid var(--color-border-strong)', background: 'var(--color-surface)' }}
          >
            <span className={`absolute h-px w-[18px] transition-all duration-300 ${menuOpen ? 'rotate-45' : '-translate-y-[6px]'}`}
              style={{ background: 'var(--color-text)' }} />
            <span className={`absolute h-px w-[18px] transition-all duration-200 ${menuOpen ? 'opacity-0' : 'opacity-100'}`}
              style={{ background: 'var(--color-text)' }} />
            <span className={`absolute h-px w-[18px] transition-all duration-300 ${menuOpen ? '-rotate-45' : 'translate-y-[6px]'}`}
              style={{ background: 'var(--color-text)' }} />
          </button>
        </div>
      </header>

      {/* Mobile dropdown */}
      <div className="fixed left-4 right-4 top-[80px] z-[65] xl:hidden">
        <nav
          ref={mobileRef}
          className="overflow-hidden rounded-[24px] px-4 backdrop-blur-xl"
          style={{
            border: '1px solid var(--color-border-strong)',
            background: 'var(--color-glass)',
            boxShadow: '0 8px 32px rgba(0,0,0,0.25)',
          }}
        >
          <ul className="flex flex-col py-3">
            {LINKS.map((item) => (
              <li key={item}>
                <button
                  onClick={() => { setActiveNav(item); scroll(item) }}
                  className="block w-full rounded-xl px-4 py-[14px] text-left font-mono text-[11px] uppercase tracking-[0.28em] transition-colors duration-200"
                  style={{ color: 'var(--color-text-muted)' }}
                  onMouseEnter={e => { e.currentTarget.style.background = 'var(--color-surface)'; e.currentTarget.style.color = 'var(--color-text)' }}
                  onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'var(--color-text-muted)' }}
                >
                  {item}
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </>
  )
}
