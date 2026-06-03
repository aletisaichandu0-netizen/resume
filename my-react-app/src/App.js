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

const MARQUEE_A = '◈ ANGULAR · REACT · TYPESCRIPT · GIS · AI/ML · NODE.JS · POSTGRESQL · AZURE '
const MARQUEE_B = '◉ LEAFLET · OPENAI · GSAP · KEYCLOAK · GEOSPATIAL · MICROSERVICES · DOCKER '

function Marquee({ text, reverse, dim }) {
  const trackRef = useRef()

  useEffect(() => {
    const track = trackRef.current
    if (!track) return
    const tween = reverse
      ? gsap.fromTo(track, { xPercent: -33.333 }, { xPercent: 0, duration: 32, ease: 'none', repeat: -1 })
      : gsap.to(track, { xPercent: -33.333, duration: 32, ease: 'none', repeat: -1 })
    return () => tween.kill()
  }, [reverse])

  const triple = `${text}${text}${text}`

  return (
    <div className="overflow-hidden py-5 md:py-6"
      style={{
        background: dim ? 'var(--color-bg-raised)' : 'var(--color-bg)',
        borderTop: '1px solid var(--color-border)',
        borderBottom: '1px solid var(--color-border)',
      }}>
      <div ref={trackRef} className="marquee-track font-archivo uppercase select-none"
        style={{
          fontSize: 'clamp(0.85rem, 2.5vw, 1.5rem)',
          lineHeight: 1,
          letterSpacing: '-0.01em',
          color: dim ? 'var(--color-text-ultra)' : 'var(--color-text-dim)',
          whiteSpace: 'nowrap',
        }}>
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
        <Marquee text={MARQUEE_A} reverse={false} dim={false} />
        <About />
        <Work />
        <Marquee text={MARQUEE_B} reverse={true} dim={true} />
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
