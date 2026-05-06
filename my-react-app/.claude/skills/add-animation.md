# Skill: Add GSAP Animation

## Basic Entrance Animation
```jsx
useEffect(() => {
  const ctx = gsap.context(() => {
    gsap.from(el.current, {
      opacity: 0,
      y: 50,
      duration: 0.8,
      ease: 'power3.out'
    })
  })
  return () => ctx.revert()
}, [])
```

## Staggered List Animation
```jsx
useEffect(() => {
  const ctx = gsap.context(() => {
    gsap.from('.item', {
      opacity: 0,
      y: 20,
      duration: 0.5,
      stagger: 0.1,
      ease: 'power2.out'
    })
  }, containerRef)
  return () => ctx.revert()
}, [])
```

## Timeline (sequence multiple animations)
```jsx
useEffect(() => {
  const ctx = gsap.context(() => {
    const tl = gsap.timeline()
    tl.from('.title', { opacity: 0, y: -30, duration: 0.6 })
      .from('.subtitle', { opacity: 0, y: 20, duration: 0.4 }, '-=0.2')
      .from('.cta', { opacity: 0, scale: 0.8, duration: 0.4 }, '-=0.1')
  })
  return () => ctx.revert()
}, [])
```

## ScrollTrigger
```jsx
import { ScrollTrigger } from 'gsap/ScrollTrigger'
gsap.registerPlugin(ScrollTrigger)

useEffect(() => {
  const ctx = gsap.context(() => {
    gsap.from(el.current, {
      opacity: 0,
      y: 60,
      duration: 0.8,
      scrollTrigger: {
        trigger: el.current,
        start: 'top 80%',
        end: 'top 40%',
        scrub: false
      }
    })
  })
  return () => ctx.revert()
}, [])
```

## Rules
- Always use `gsap.context()` and call `ctx.revert()` on cleanup
- Register plugins (ScrollTrigger, etc.) before using them
- Never animate unmounted elements
