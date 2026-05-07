import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export { gsap, ScrollTrigger }

export const ease = {
  out:   'power3.out',
  inOut: 'power3.inOut',
  expo:  'expo.out',
}

export function revealLines(targets, vars = {}) {
  return gsap.from(targets, { yPercent: 105, duration: 0.9, ease: ease.expo, stagger: 0.08, ...vars })
}

export function scrollFadeUp(trigger, targets, start = 'top 82%') {
  return gsap.from(targets, {
    opacity: 0, y: 32, duration: 0.8, ease: ease.out, stagger: 0.1,
    scrollTrigger: { trigger, start },
  })
}
