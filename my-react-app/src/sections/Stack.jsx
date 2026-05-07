import { useEffect, useRef } from 'react'
import { gsap } from '../animations/gsap'

const GROUPS = [
  { category: 'Frontend',       color: '#D9C5B0', items: ['Angular v2–18','React','TypeScript','JavaScript ES6+','RxJS','Redux','HTML5','CSS3'] },
  { category: 'GIS / Mapping',  color: '#9B9DAB', items: ['Leaflet','OpenLayers','GeoServer','WMS','Spatial Analysis','Basemap Integration'] },
  { category: 'Design Systems', color: '#C4A98A', items: ['PrimeNG','Figma','Design Tokens','Component Libraries','Tailwind CSS','Module Federation'] },
  { category: 'Backend & Cloud',color: '#9C9378', items: ['Node.js','Spring Boot','REST APIs','Python','Azure','Docker','PostgreSQL','Keycloak'] },
  { category: 'Visualisation',  color: '#EDE4DC', items: ['Highcharts','D3.js','GSAP','PrimeNG Charts','WebGL'] },
  { category: 'AI & Tooling',   color: '#7A7260', items: ['Claude Code','GitHub Copilot','Vite','Webpack','ESLint','Git'] },
]

export default function Stack() {
  const sectionRef = useRef()
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.stack-label', { opacity: 0, y: 12, duration: 0.6, ease: 'power2.out', scrollTrigger: { trigger: '.stack-label', start: 'top 88%' } })
      gsap.from('.stack-head-line', { yPercent: 105, duration: 0.9, stagger: 0.09, ease: 'expo.out', scrollTrigger: { trigger: '.stack-head', start: 'top 84%' } })
      GROUPS.forEach((_, i) => {
        gsap.from(`.sg-${i}`, { opacity: 0, y: 24, duration: 0.6, ease: 'power2.out', scrollTrigger: { trigger: `.sg-${i}`, start: 'top 90%' } })
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} id="stack" className="px-8 md:px-16 py-30 border-t border-ink-700">
      <div className="max-w-[1400px] mx-auto">
        <p className="stack-label label mb-6">/ Technical arsenal</p>
        <div className="stack-head mb-16">
          {['Tools &', 'Technologies'].map((w, i) => (
            <div key={i} className="overflow-hidden">
              <h2 className={`stack-head-line font-serif leading-[1.05] tracking-[-0.02em] ${i === 1 ? 'text-sand-500 italic' : 'text-sand-100'}`} style={{ fontSize: 'clamp(40px,6vw,80px)' }}>{w}</h2>
            </div>
          ))}
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-px bg-ink-700">
          {GROUPS.map(({ category, color, items }, gi) => (
            <div key={category} className={`sg-${gi} bg-ink-900 p-8 hover:bg-ink-800 transition-colors duration-300`}>
              <div className="flex items-center gap-3 mb-6">
                <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: color }} />
                <span className="font-mono text-xs font-medium" style={{ color }}>{category}</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {items.map(item => (
                  <span key={item} className="font-mono text-xs px-3 py-1.5 rounded-md border border-ink-600 text-sand-500 hover:border-ink-500 hover:text-sand-300 transition-all duration-200 cursor-default">{item}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
