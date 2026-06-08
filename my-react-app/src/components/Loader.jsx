import { useEffect, useRef } from 'react'
import { gsap } from '../animations/gsap'
import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'

const BASE = process.env.PUBLIC_URL || ''

export default function Loader() {
  const wrapRef   = useRef()
  const canvasRef = useRef()
  const barRef    = useRef()
  const numRef    = useRef()

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const W = 280, H = 280
    let renderer = null
    let animId   = null
    let model    = null
    let wireGroup = null
    let t = 0

    try {
      renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true })
      renderer.setSize(W, H)
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
      renderer.toneMapping = THREE.ACESFilmicToneMapping
      renderer.toneMappingExposure = 1.4

      const scene  = new THREE.Scene()
      const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 100)
      camera.position.set(0, 0, 5)

      scene.add(new THREE.AmbientLight(0xffffff, 0.4))
      const key = new THREE.DirectionalLight(0xf0b54a, 3.5)
      key.position.set(2.5, 3, 3)
      scene.add(key)
      const rim = new THREE.DirectionalLight(0x60a5fa, 1.2)
      rim.position.set(-3, -1, -3)
      scene.add(rim)
      const fill = new THREE.DirectionalLight(0xd4a96c, 1.0)
      fill.position.set(-1, 2, 1)
      scene.add(fill)

      const fallbackGeo = new THREE.TorusKnotGeometry(1, 0.32, 128, 16)
      const fallbackMat = new THREE.MeshStandardMaterial({
        color: 0xd4a96c, roughness: 0.25, metalness: 0.7,
        emissive: 0xd4a96c, emissiveIntensity: 0.12,
      })
      const fallback = new THREE.Mesh(fallbackGeo, fallbackMat)
      scene.add(fallback)

      const gltfLoader = new GLTFLoader()
      gltfLoader.load(
        `${BASE}/models/abstract.glb`,
        (gltf) => {
          scene.remove(fallback)
          model = gltf.scene
          model.scale.setScalar(1.1)
          model.traverse((child) => {
            if (!child.isMesh) return
            child.material = new THREE.MeshStandardMaterial({
              color: 0xd4a96c, roughness: 0.2, metalness: 0.75,
              emissive: 0xd4a96c, emissiveIntensity: 0.06,
            })
            const wire = child.clone()
            wire.material = new THREE.MeshBasicMaterial({
              color: 0xf0b54a, wireframe: true, transparent: true, opacity: 0.12,
            })
            if (!wireGroup) { wireGroup = new THREE.Group(); scene.add(wireGroup) }
            wireGroup.add(wire)
          })
          scene.add(model)
        },
        undefined,
        () => {}
      )

      const tick = () => {
        animId = requestAnimationFrame(tick)
        t += 0.012
        const target = model || fallback
        target.rotation.y = t * 0.55
        target.rotation.x = Math.sin(t * 0.28) * 0.18
        target.position.y = Math.sin(t * 0.6) * 0.06
        if (wireGroup) {
          wireGroup.rotation.y = t * 0.55
          wireGroup.rotation.x = Math.sin(t * 0.28) * 0.18
          wireGroup.position.y = Math.sin(t * 0.6) * 0.06
        }
        renderer.render(scene, camera)
      }
      tick()
    } catch { /* WebGL unavailable — loader still dismisses via GSAP below */ }

    const ctx = gsap.context(() => {
      const counter = { val: 0 }
      gsap.timeline()
        .to(counter, {
          val: 100, duration: 2.0, ease: 'power1.inOut',
          onUpdate() { if (numRef.current) numRef.current.textContent = `${Math.round(counter.val)}%` },
        })
        .to(barRef.current, { scaleX: 1, duration: 2.0, ease: 'power1.inOut' }, '<')
        .to(wrapRef.current, {
          yPercent: -100, duration: 0.9, ease: 'expo.inOut',
          onComplete: () => {
            cancelAnimationFrame(animId)
            renderer?.dispose()
            if (wrapRef.current) wrapRef.current.style.display = 'none'
          },
        }, '+=0.2')
    })

    return () => {
      cancelAnimationFrame(animId)
      renderer?.dispose()
      ctx.revert()
    }
  }, [])

  return (
    <div ref={wrapRef}
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center"
      style={{ background: 'var(--color-bg)' }}>

      {/* Corner glitches */}
      <div className="corner-glitch corner-tl" />
      <div className="corner-glitch corner-tr" />
      <div className="corner-glitch corner-bl" />
      <div className="corner-glitch corner-br" />

      {/* Glow ring behind canvas */}
      <div className="pointer-events-none absolute" style={{
        width: 340, height: 340,
        borderRadius: '50%',
        background: 'radial-gradient(ellipse at center, var(--color-accent) 0%, transparent 65%)',
        opacity: 0.12,
      }} />

      <canvas
        ref={canvasRef}
        style={{ width: W_CSS, height: W_CSS, display: 'block' }}
      />

      {/* Label + bar */}
      <div className="flex flex-col items-center gap-3 mt-2">
        <p className="font-mono text-[10px] uppercase tracking-[0.28em]"
          style={{ color: 'var(--color-text-dim)' }}>
          Initialising
        </p>
        <div className="w-52 h-px overflow-hidden" style={{ background: 'var(--color-border)' }}>
          <div ref={barRef} className="w-full h-full" style={{
            background: 'linear-gradient(90deg, var(--color-accent), var(--color-yellow))',
            transformOrigin: 'left', transform: 'scaleX(0)',
          }} />
        </div>
        <span ref={numRef} className="font-mono text-[11px]"
          style={{ color: 'var(--color-text-dim)' }}>0%</span>
      </div>
    </div>
  )
}

const W_CSS = 280
