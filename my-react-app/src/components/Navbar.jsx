import { useEffect, useRef } from 'react'
import { gsap, ScrollTrigger } from '../animations/gsap'

const LINKS = ['work', 'about', 'stack', 'experience', 'contact']

export default function Navbar() {
  const navRef = useRef()

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(navRef.current, { y: -24, opacity: 0, duration: 0.9, ease: 'power3.out', delay: 2.4 })

      ScrollTrigger.create({
        start: 'top -48px',
        onEnter:     () => gsap.to(navRef.current, { backgroundColor: 'rgba(15,14,11,0.9)', backdropFilter: 'blur(16px)', duration: 0.4 }),
        onLeaveBack: () => gsap.to(navRef.current, { backgroundColor: 'transparent', backdropFilter: 'blur(0px)', duration: 0.4 }),
      })
    })
    return () => ctx.revert()
  }, [])

  const scroll = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })

  return (
    <nav ref={navRef} className="fixed top-0 left-0 right-0 z-50 px-8 md:px-16 py-6">
      <div className="max-w-[1400px] mx-auto flex items-center justify-between">

        <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="label hover:text-sand-300 transition-colors duration-300">
          ASC<span className="text-sand-300">.</span>
        </button>

        <ul className="hidden md:flex items-center gap-8">
          {LINKS.map(l => (
            <li key={l}>
              <button onClick={() => scroll(l)}
                className="label hover:text-sand-200 transition-colors duration-200">
                {l}
              </button>
            </li>
          ))}
        </ul>

        <a href="mailto:aletisaichandu0@gmail.com"
          className="hidden md:flex items-center gap-2 label border border-ink-600 px-4 py-2 rounded-lg hover:border-sand-500 hover:text-sand-200 transition-all duration-300">
          Available
          <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse inline-block" />
        </a>
      </div>
    </nav>
  )
}
