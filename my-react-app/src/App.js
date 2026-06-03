import { useEffect, useRef } from 'react'
import { gsap, ScrollTrigger } from './animations/gsap'
import { ThemeProvider }  from './context/ThemeContext'
import { useLenis }       from './hooks/useLenis'
import Loader             from './components/Loader'
import Navbar             from './components/Navbar'
import Hero               from './sections/Hero'
import About              from './sections/About'
import Work               from './sections/Work'
import Stack              from './sections/Stack'
import Experience         from './sections/Experience'
import Contact            from './sections/Contact'

const MARQUEE_TEXT = 'ANGULAR · REACT · TYPESCRIPT · GIS · AI/ML · NODE.JS · POSTGRESQL · AZURE · GSAP · '

function Marquee({ reverse }) {
  const trackRef = useRef()

  useEffect(() => {
    const track = trackRef.current
    if (!track) return
    const tween = reverse
      ? gsap.fromTo(track, { xPercent: -33.333 }, { xPercent: 0, duration: 28, ease: 'none', repeat: -1 })
      : gsap.to(track, { xPercent: -33.333, duration: 28, ease: 'none', repeat: -1 })
    return () => tween.kill()
  }, [reverse])

  const triple = `${MARQUEE_TEXT}${MARQUEE_TEXT}${MARQUEE_TEXT}`

  return (
    <div className="overflow-hidden py-10 md:py-14" style={{ background: 'var(--color-bg)', borderTop: '1px solid var(--color-border)', borderBottom: '1px solid var(--color-border)' }}>
      <div
        ref={trackRef}
        className="marquee-track font-archivo uppercase"
        style={{ fontSize: 'clamp(3.5rem, 9vw, 8rem)', lineHeight: 1, letterSpacing: '-0.04em', color: 'var(--color-text)', whiteSpace: 'nowrap' }}
      >
        {triple}
      </div>
    </div>
  )
}

function AppInner() {
  const root = useRef()
  useLenis()

  useEffect(() => {
    const ctx = gsap.context(() => { ScrollTrigger.refresh() }, root)
    return () => ctx.revert()
  }, [])

  return (
    <div ref={root} className="min-h-screen overflow-x-hidden" style={{ background: 'var(--color-bg)' }}>
      <Loader />
      <Navbar />
      <main className="relative z-10">
        <Hero />
        <Marquee reverse={false} />
        <About />
        <Work />
        <Marquee reverse={true} />
        <Stack />
        <Experience />
      </main>
      <Contact />
    </div>
  )
}

export default function App() {
  return (
    <ThemeProvider>
      <AppInner />
    </ThemeProvider>
  )
}
