# Code Quality Rules

## React
- Functional components and hooks only — no class components
- Every `useEffect` that sets up a subscription, animation, or timer must return a cleanup function
- No prop drilling more than 2 levels — use Context or lift state
- Keys in lists must be stable IDs, never array index
- No direct DOM manipulation — use `useRef` + GSAP or React state

## Styling
- Tailwind utility classes only — no inline `style={{}}` props
- No new `.css` files for component-level styles; use Tailwind
- Do not override Tailwind with `!important`

## GSAP
- Always wrap animations in `gsap.context()` and revert in cleanup
- Never animate elements that may have been unmounted
- Use `ScrollTrigger.refresh()` after layout changes if using ScrollTrigger

## General
- No `console.log` left in committed code
- No unused imports, variables, or functions
- No `any` type (if TypeScript is ever added)
- No commented-out code blocks — delete dead code
- No TODOs committed without an associated issue/ticket

## File Naming
- Components: PascalCase (`HeroSection.js`)
- Utilities/hooks: camelCase (`useScrollAnimation.js`)
- Styles: match the component name (`HeroSection.css` if ever needed)
