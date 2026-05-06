# CLAUDE.md — my-react-app

## Project Overview
React 18 application using Tailwind CSS v4 and GSAP for animations.

## Tech Stack
| Tool | Version | Notes |
|------|---------|-------|
| React | 18.x | Functional components + hooks only |
| Tailwind CSS | v4 | CSS-based config via `@import "tailwindcss"` in index.css |
| GSAP | 3.x | Import as `import gsap from 'gsap'` |
| react-scripts | 5.x | CRA build tooling |

## Project Structure
```
src/
  App.js          # Root component
  App.css         # App-level styles
  index.js        # Entry point
  index.css       # Global styles + Tailwind import
```

## Development
```bash
npm start    # dev server on http://localhost:3000
npm run build  # production build
npm test     # run tests
```

## Code Standards
- Functional components and hooks only — no class components
- Use Tailwind utility classes for all styling; avoid inline styles
- Use `useRef` + `useEffect` for GSAP animations; clean up in the effect return
- No comments unless the WHY is non-obvious
- No unused imports or variables

## GSAP Pattern
```jsx
import { useEffect, useRef } from 'react'
import gsap from 'gsap'

function MyComponent() {
  const el = useRef()
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(el.current, { opacity: 0, y: 40, duration: 0.8 })
    })
    return () => ctx.revert()
  }, [])
  return <div ref={el}>...</div>
}
```

## Tailwind Pattern
```jsx
// Use utility classes directly — no custom CSS unless unavoidable
<div className="flex items-center justify-between gap-4 p-6 rounded-2xl bg-white shadow-lg">
```

## Rules & Skills
- See `.claude/rules/` for enforced restrictions
- See `.claude/skills/` for reusable task guides

## Restrictions
See `.claude/settings.json` for blocked commands. Key restrictions:
- No `git push --force` (use `--force-with-lease` if truly needed, with confirmation)
- No `git reset --hard` without explicit user confirmation
- No `rm -rf` on project directories
- No `--no-verify` to skip hooks
- No destructive DB or system commands
