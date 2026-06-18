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
import {
  SiAngular, SiReact, SiTypescript, SiNodedotjs,
  SiPostgresql, SiDocker, SiOpenai,
  SiLeaflet, SiGreensock,
} from 'react-icons/si'
import { LuMap, LuBrain, LuGlobe, LuShield, LuNetwork, LuCloud } from 'react-icons/lu'

const MARQUEE_A = [
  { Icon: SiAngular,         label: 'Angular',      color: '#DD0031' },
  { Icon: SiReact,           label: 'React',         color: '#61DAFB' },
  { Icon: SiTypescript,      label: 'TypeScript',    color: '#3178C6' },
  { Icon: LuMap,             label: 'GIS',           color: '#22C55E' },
  { Icon: LuBrain,           label: 'AI / ML',       color: '#A78BFA' },
  { Icon: SiNodedotjs,       label: 'Node.js',       color: '#5FA04E' },
  { Icon: SiPostgresql,      label: 'PostgreSQL',    color: '#4169E1' },
  { Icon: LuCloud,           label: 'Azure',         color: '#0089D6' },
]

const MARQUEE_B = [
  { Icon: SiLeaflet,   label: 'Leaflet',       color: '#199900' },
  { Icon: SiOpenai,    label: 'OpenAI',        color: '#74AA9C' },
  { Icon: SiGreensock, label: 'GSAP',          color: '#88CE02' },
  { Icon: LuShield,    label: 'Keycloak',      color: '#E44D26' },
  { Icon: LuGlobe,     label: 'Geospatial',    color: '#22C55E' },
  { Icon: LuNetwork,   label: 'Microservices', color: '#94A3B8' },
  { Icon: SiDocker,    label: 'Docker',        color: '#2496ED' },
]

function TechChip({ Icon, label, color }) {
  return (
    <span className="inline-flex items-center gap-2.5 px-5 shrink-0">
      <span className="shrink-0 select-none" style={{ opacity: 0.3, fontSize: 'clamp(0.75rem, 1.8vw, 1.1rem)' }}>◈</span>
      <Icon style={{ color, fontSize: 'clamp(1rem, 2.2vw, 1.4rem)', flexShrink: 0 }} />
      <span className="font-archivo uppercase"
        style={{ letterSpacing: '0.05em', fontSize: 'clamp(0.8rem, 2vw, 1.25rem)', color: 'inherit' }}>
        {label}
      </span>
    </span>
  )
}

function Marquee({ items, reverse, dim }) {
  const trackRef = useRef()

  useEffect(() => {
    const track = trackRef.current
    if (!track) return
    const tween = reverse
      ? gsap.fromTo(track, { xPercent: -33.333 }, { xPercent: 0, duration: 36, ease: 'none', repeat: -1 })
      : gsap.to(track, { xPercent: -33.333, duration: 36, ease: 'none', repeat: -1 })
    return () => tween.kill()
  }, [reverse])

  return (
    <div className="overflow-hidden py-5 md:py-6"
      style={{
        background: dim ? 'var(--color-bg-raised)' : 'var(--color-bg)',
        borderTop: '1px solid var(--color-border)',
        borderBottom: '1px solid var(--color-border)',
      }}>
      <div ref={trackRef} className="marquee-track select-none items-center"
        style={{ color: dim ? 'var(--color-text-dim)' : 'var(--color-text-muted)' }}>
        {[...items, ...items, ...items].map((item, i) => (
          <TechChip key={i} {...item} />
        ))}
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
        <Marquee items={MARQUEE_A} reverse={false} dim={false} />
        <About />
        <Work />
        <Marquee items={MARQUEE_B} reverse={true} dim={true} />
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
