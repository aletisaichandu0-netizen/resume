import { useEffect, useRef } from 'react'
import { gsap } from '../animations/gsap'

const PHRASE = 'Loading'

function springStep(s, target, k = 0.05, d = 0.82) {
  s.vel += (target - s.pos) * k
  s.vel *= d
  s.pos += s.vel
}

export default function Loader() {
  const wrapRef = useRef()
  const textRef = useRef()
  const barRef  = useRef()
  const numRef  = useRef()
  const rafRef  = useRef()

  useEffect(() => {
    const el = textRef.current
    if (!el) return

    el.textContent = ''
    const spans = PHRASE.split('').map(ch => {
      const s = document.createElement('span')
      s.textContent = ch
      s.style.display = 'inline-block'
      s.style.whiteSpace = 'pre'
      el.appendChild(s)
      return s
    })

    const state = spans.map(() => ({ pos: 400, vel: 0 }))
    let t = 0
    const tick = () => {
      t++
      spans.forEach((ch, i) => {
        springStep(state[i], 400 + Math.sin(t * 0.055 - i * 0.5) * 290)
        ch.style.fontVariationSettings = `'wght' ${state[i].pos.toFixed(0)}`
      })
      rafRef.current = requestAnimationFrame(tick)
    }
    rafRef.current = requestAnimationFrame(tick)

    const ctx = gsap.context(() => {
      const counter = { val: 0 }
      gsap.timeline()
        .to(counter, {
          val: 100, duration: 1.8, ease: 'power1.inOut',
          onUpdate() { if (numRef.current) numRef.current.textContent = `${Math.round(counter.val)}%` },
        })
        .to(barRef.current, { scaleX: 1, duration: 1.8, ease: 'power1.inOut' }, '<')
        .to(wrapRef.current, {
          yPercent: -100, duration: 0.9, ease: 'expo.inOut',
          onComplete: () => {
            cancelAnimationFrame(rafRef.current)
            if (wrapRef.current) wrapRef.current.style.display = 'none'
          },
        }, '+=0.15')
    })

    return () => {
      cancelAnimationFrame(rafRef.current)
      ctx.revert()
    }
  }, [])

  return (
    <div
      ref={wrapRef}
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center gap-8"
      style={{ background: 'var(--color-bg)' }}
    >
      <div ref={textRef}
        style={{
          display: 'flex',
          fontSize: 'clamp(28px, 4vw, 56px)',
          fontFamily: 'Helvena, sans-serif',
          letterSpacing: '-0.03em',
          color: 'var(--color-text-80)',
        }}
      />
      <div className="flex flex-col items-center gap-3">
        <div className="w-48 h-px overflow-hidden" style={{ background: 'var(--color-border)' }}>
          <div ref={barRef} className="w-full h-full" style={{
            background: 'linear-gradient(90deg, var(--color-accent), var(--color-yellow))',
            transformOrigin: 'left', transform: 'scaleX(0)',
          }} />
        </div>
        <span ref={numRef} className="font-mono text-xs" style={{ color: 'var(--color-text-dim)' }}>0%</span>
      </div>
    </div>
  )
}
