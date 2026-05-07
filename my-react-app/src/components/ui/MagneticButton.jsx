import { useRef } from 'react'

export default function MagneticButton({ children, className = '', strength = 0.35, as: Tag = 'button', ...props }) {
  const ref = useRef()

  const onMove = (e) => {
    const rect = ref.current.getBoundingClientRect()
    const dx = (e.clientX - (rect.left + rect.width  / 2)) * strength
    const dy = (e.clientY - (rect.top  + rect.height / 2)) * strength
    ref.current.style.transform = `translate(${dx}px, ${dy}px)`
  }

  const onLeave = () => {
    ref.current.style.transition = 'transform 0.5s cubic-bezier(0.25,0.46,0.45,0.94)'
    ref.current.style.transform  = 'translate(0,0)'
  }

  const onEnter = () => {
    ref.current.style.transition = 'transform 0.15s linear'
  }

  return (
    <Tag ref={ref} className={`magnetic ${className}`}
      onMouseMove={onMove} onMouseLeave={onLeave} onMouseEnter={onEnter}
      {...props}
    >
      {children}
    </Tag>
  )
}
