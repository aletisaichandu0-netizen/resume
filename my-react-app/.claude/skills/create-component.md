# Skill: Create a React Component

## When to Use
Creating a new UI component that may include Tailwind styling and/or GSAP animation.

## Steps

1. Create `src/components/<ComponentName>.js`
2. Use this base template:

```jsx
import { useEffect, useRef } from 'react'
import gsap from 'gsap'

function ComponentName() {
  const el = useRef()

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(el.current, { opacity: 0, y: 30, duration: 0.6, ease: 'power2.out' })
    })
    return () => ctx.revert()
  }, [])

  return (
    <div ref={el} className="...tailwind classes...">
      {/* content */}
    </div>
  )
}

export default ComponentName
```

3. If no animation is needed, omit `useRef`, `useEffect`, and GSAP imports
4. Export as default
5. Import and use in parent component

## Rules
- PascalCase filename matching the function name
- One component per file
- No inline styles — Tailwind only
