# Skill: Tailwind CSS Patterns

## Layout
```jsx
// Centered container
<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

// Flexbox row
<div className="flex items-center justify-between gap-4">

// Grid
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

// Full-screen hero
<section className="min-h-screen flex items-center justify-center">
```

## Typography
```jsx
<h1 className="text-4xl md:text-6xl font-bold tracking-tight text-gray-900">
<p className="text-lg text-gray-600 leading-relaxed">
```

## Cards
```jsx
<div className="rounded-2xl bg-white shadow-md p-6 hover:shadow-xl transition-shadow duration-300">
```

## Buttons
```jsx
// Primary
<button className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition-colors duration-200">

// Outline
<button className="px-6 py-3 border-2 border-blue-600 text-blue-600 font-semibold rounded-xl hover:bg-blue-50 transition-colors duration-200">
```

## Responsive Breakpoints
| Prefix | Min-width |
|--------|-----------|
| `sm:`  | 640px     |
| `md:`  | 768px     |
| `lg:`  | 1024px    |
| `xl:`  | 1280px    |
| `2xl:` | 1536px    |

## Rules
- Mobile-first: write base styles for mobile, use `md:` / `lg:` to scale up
- Do not use `!important` overrides
- No inline `style={{}}` props — if Tailwind can't express it, add a custom property via `@layer`
