import { useEffect, useRef } from 'react'
import { gsap } from '../animations/gsap'
import MagneticButton from '../components/ui/MagneticButton'

const SOCIALS = [
  { label: 'LinkedIn', href: 'https://linkedin.com/in/aleti-saichandu-103b1622a' },
  { label: 'Email',    href: 'mailto:aletisaichandu0@gmail.com' },
  { label: 'Phone',    href: 'tel:+919494506038' },
]

export default function Contact() {
  const sectionRef = useRef()
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.ct-label',   { opacity: 0, y: 12, duration: 0.6, ease: 'power2.out', scrollTrigger: { trigger: '.ct-label', start: 'top 88%' } })
      gsap.from('.ct-line',    { yPercent: 105, duration: 1.0, stagger: 0.1, ease: 'expo.out', scrollTrigger: { trigger: '.ct-head', start: 'top 82%' } })
      gsap.from(['.ct-sub', '.ct-actions', '.ct-footer'], { opacity: 0, y: 20, duration: 0.7, stagger: 0.1, ease: 'power3.out', scrollTrigger: { trigger: '.ct-sub', start: 'top 88%' } })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} id="contact" className="px-8 md:px-16 pt-30 pb-16 border-t border-ink-700">
      <div className="max-w-[1400px] mx-auto">
        <p className="ct-label label mb-12">/ Let's connect</p>

        <div className="ct-head mb-8">
          {["Let's build", 'something', 'remarkable.'].map((w, i) => (
            <div key={i} className="overflow-hidden">
              <h2 className={`ct-line font-serif leading-[1.0] tracking-[-0.03em] ${i === 1 ? 'text-sand-400 italic' : 'text-sand-100'}`} style={{ fontSize: 'clamp(48px,9vw,120px)' }}>{w}</h2>
            </div>
          ))}
        </div>

        <p className="ct-sub text-sand-500 mb-12 max-w-lg" style={{ fontSize: 'clamp(15px,1.4vw,18px)', lineHeight: '1.7' }}>
          Open to senior frontend roles, freelance projects, and GIS / AgriTech collaborations.
          Based in Hyderabad, India. Available now.
        </p>

        <div className="ct-actions flex flex-wrap items-center gap-5 mb-24">
          <MagneticButton
            className="flex items-center gap-3 bg-sand-300 text-ink-900 px-8 py-4 rounded-lg font-sans font-medium text-sm hover:bg-sand-200 transition-colors duration-300"
            onClick={() => { window.location.href = 'mailto:aletisaichandu0@gmail.com' }}
          >
            Send a message
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
              <path d="M3 13L13 3M13 3H5M13 3V11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </MagneticButton>

          <div className="flex items-center gap-6">
            {SOCIALS.map(({ label, href }) => (
              <a key={label} href={href} target={href.startsWith('http') ? '_blank' : undefined} rel="noopener noreferrer"
                className="label text-sand-500 hover:text-sand-200 transition-colors duration-200 border-b border-transparent hover:border-sand-500 pb-px">
                {label}
              </a>
            ))}
          </div>
        </div>

        <div className="ct-footer flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pt-8 border-t border-ink-700">
          <p className="label" style={{ fontSize: '11px' }}>© 2025 Aleti Sai Chandu</p>
          <p className="label" style={{ fontSize: '11px' }}>Built with React · GSAP · Lenis</p>
          <div className="flex items-center gap-2 label" style={{ fontSize: '11px' }}>
            <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse inline-block" />
            Available for opportunities
          </div>
        </div>
      </div>
    </section>
  )
}
