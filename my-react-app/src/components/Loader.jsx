import { useEffect, useRef } from 'react'
import { gsap } from '../animations/gsap'

export default function Loader() {
  const topRef  = useRef()
  const botRef  = useRef()
  const numRef  = useRef()
  const barRef  = useRef()
  const wrapRef = useRef()

  useEffect(() => {
    const ctx = gsap.context(() => {
      const counter = { val: 0 }
      const tl = gsap.timeline()

      tl.to(counter, {
        val: 100, duration: 1.6, ease: 'power1.inOut',
        onUpdate() { if (numRef.current) numRef.current.textContent = Math.round(counter.val) },
      })
        .to(barRef.current, { scaleX: 1, duration: 1.6, ease: 'power1.inOut' }, '<')
        .to([topRef.current, botRef.current], {
          yPercent: (i) => (i === 0 ? -100 : 100),
          duration: 0.85, ease: 'expo.inOut',
          onComplete: () => gsap.set(wrapRef.current, { display: 'none' }),
        }, '+=0.1')
    })
    return () => ctx.revert()
  }, [])

  return (
    <div ref={wrapRef} className="fixed inset-0 z-[9999]">
      <div ref={topRef} className="absolute top-0 left-0 w-full h-1/2 bg-ink-900 flex items-end justify-center pb-5">
        <div className="flex items-end gap-1 leading-none font-serif">
          <span ref={numRef} className="text-sand-100" style={{ fontSize: 'clamp(5rem,14vw,9rem)', fontWeight: 400, fontVariantNumeric: 'tabular-nums' }}>0</span>
          <span className="text-sand-300 mb-2" style={{ fontSize: 'clamp(2rem,5vw,3.5rem)' }}>%</span>
        </div>
      </div>
      <div ref={botRef} className="absolute bottom-0 left-0 w-full h-1/2 bg-ink-900 flex items-start justify-center pt-5">
        <div className="w-40 h-px bg-ink-600 overflow-hidden rounded-full">
          <div ref={barRef} className="w-full h-full bg-sand-300" style={{ transformOrigin: 'left', transform: 'scaleX(0)' }} />
        </div>
      </div>
    </div>
  )
}
