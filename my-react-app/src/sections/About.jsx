import { useEffect, useRef } from 'react'
import { gsap } from '../animations/gsap'

const STATS = [
  { n: '4+',  label: 'Years experience' },
  { n: '5+',  label: 'Products shipped' },
  { n: '5',   label: 'Engineers led' },
  { n: '30%', label: 'Load-time gains' },
]

const TAGS = ['Angular v2–18', 'React', 'TypeScript', 'Leaflet', 'OpenLayers', 'GSAP', 'Node.js']

export default function About() {
  const sectionRef = useRef()

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.about-label', { opacity: 0, y: 16, duration: 0.6, ease: 'power2.out', scrollTrigger: { trigger: '.about-label', start: 'top 88%' } })
      gsap.from('.about-line',  { yPercent: 105, duration: 0.9, stagger: 0.09, ease: 'expo.out', scrollTrigger: { trigger: '.about-lines', start: 'top 84%' } })
      gsap.from('.about-body',  { opacity: 0, y: 24, duration: 0.7, stagger: 0.1, ease: 'power3.out', scrollTrigger: { trigger: '.about-body', start: 'top 86%' } })
      gsap.from('.stat-item',   { opacity: 0, y: 20, duration: 0.6, stagger: 0.1, ease: 'power2.out', scrollTrigger: { trigger: '.stat-item', start: 'top 88%' } })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} id="about" className="px-8 md:px-16 py-30">
      <div className="max-w-[1400px] mx-auto">
        <p className="about-label label mb-12">/ About me</p>

        <div className="grid md:grid-cols-2 gap-16 md:gap-24 items-start">
          <div>
            <div className="about-lines mb-10">
              {['Building', 'interfaces that', 'perform & delight.'].map((line, i) => (
                <div key={i} className="overflow-hidden">
                  <h2
                    className={`about-line font-serif leading-[1.1] tracking-[-0.02em] ${i === 1 ? 'text-sand-500 italic' : 'text-sand-100'}`}
                    style={{ fontSize: 'clamp(32px, 4.5vw, 64px)' }}
                  >
                    {line}
                  </h2>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-2 gap-x-8 gap-y-6">
              {STATS.map(({ n, label }) => (
                <div key={label} className="stat-item border-t border-ink-600 pt-4">
                  <div className="font-serif text-sand-300 mb-1" style={{ fontSize: 'clamp(26px,3vw,42px)' }}>{n}</div>
                  <div className="label">{label}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="md:pt-16">
            <p className="about-body text-sand-500 leading-relaxed mb-6" style={{ fontSize: 'clamp(15px,1.4vw,18px)', maxWidth: '52ch' }}>
              I'm a Senior Frontend Engineer at Vassar Labs (Climate/AgriTech), architecting
              scalable Angular and React applications across multiple product lines — from
              GIS-powered mapping platforms to enterprise data dashboards.
            </p>
            <p className="about-body text-sand-500 leading-relaxed mb-10" style={{ fontSize: 'clamp(15px,1.4vw,18px)', maxWidth: '52ch' }}>
              I specialise in bridging complex geospatial data with intuitive UI — translating
              satellite imagery, spatial datasets, and agricultural records into fast, accessible
              interfaces. Currently exploring 3D web, Micro Frontend architecture, and Azure.
            </p>
            <div className="about-body flex flex-wrap gap-2">
              {TAGS.map(t => (
                <span key={t} className="font-mono text-xs px-3 py-2 rounded-lg border border-ink-600 text-sand-500 hover:border-ink-500 hover:text-sand-300 transition-all duration-200">
                  {t}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
