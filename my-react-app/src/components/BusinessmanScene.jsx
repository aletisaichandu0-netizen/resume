import { useEffect, useRef } from 'react'
import * as THREE from 'three'

function buildBusinessman(scene) {
  const group = new THREE.Group()

  const matSuit  = new THREE.MeshStandardMaterial({ color: 0x1c1c2a, roughness: 0.75, metalness: 0.05 })
  const matSkin  = new THREE.MeshStandardMaterial({ color: 0xd4a882, roughness: 0.85, metalness: 0.0  })
  const matShirt = new THREE.MeshStandardMaterial({ color: 0xe8e4dc, roughness: 0.90, metalness: 0.0  })
  const matTie   = new THREE.MeshStandardMaterial({ color: 0xd4a96c, roughness: 0.55, metalness: 0.35 })
  const matShoe  = new THREE.MeshStandardMaterial({ color: 0x0d0b09, roughness: 0.45, metalness: 0.25 })
  const matCase  = new THREE.MeshStandardMaterial({ color: 0x3a2810, roughness: 0.40, metalness: 0.35 })
  const matLatch = new THREE.MeshStandardMaterial({ color: 0xd4a96c, roughness: 0.20, metalness: 0.85 })
  const matHair  = new THREE.MeshStandardMaterial({ color: 0x1a100a, roughness: 0.90, metalness: 0.00 })

  const add = (geo, mat, x, y, z, rx = 0, rz = 0) => {
    const m = new THREE.Mesh(geo, mat)
    m.position.set(x, y, z)
    m.rotation.x = rx
    m.rotation.z = rz
    group.add(m)
    return m
  }

  // Head
  add(new THREE.BoxGeometry(0.52, 0.58, 0.48), matSkin, 0, 2.22, 0)
  // Hair
  add(new THREE.BoxGeometry(0.54, 0.2, 0.50), matHair, 0, 2.57, -0.01)
  // Neck
  add(new THREE.CylinderGeometry(0.14, 0.17, 0.22, 8), matSkin, 0, 1.88, 0)

  // Torso (jacket)
  add(new THREE.BoxGeometry(0.92, 0.94, 0.47), matSuit, 0, 1.24, 0)
  // Shirt front
  add(new THREE.BoxGeometry(0.24, 0.72, 0.03), matShirt, 0, 1.28, 0.236)
  // Tie
  add(new THREE.BoxGeometry(0.10, 0.52, 0.025), matTie, 0, 1.18, 0.245)

  // Hips
  add(new THREE.BoxGeometry(0.88, 0.36, 0.44), matSuit, 0, 0.7, 0)

  // Legs
  add(new THREE.CylinderGeometry(0.19, 0.17, 0.82, 8), matSuit, -0.23, 0.14, 0)
  add(new THREE.CylinderGeometry(0.19, 0.17, 0.82, 8), matSuit,  0.23, 0.14, 0)

  // Shoes
  add(new THREE.BoxGeometry(0.22, 0.14, 0.38), matShoe, -0.23, -0.30, 0.07)
  add(new THREE.BoxGeometry(0.22, 0.14, 0.38), matShoe,  0.23, -0.30, 0.07)

  // Left arm (natural hang)
  add(new THREE.CylinderGeometry(0.155, 0.135, 0.52, 8), matSuit, -0.605, 1.32, 0, 0, 0.20)
  add(new THREE.CylinderGeometry(0.125, 0.105, 0.46, 8), matSkin, -0.74,  0.87, 0, 0, 0.12)

  // Right arm (bent slightly — holding briefcase)
  add(new THREE.CylinderGeometry(0.155, 0.135, 0.52, 8), matSuit,  0.605, 1.32, 0, 0, -0.22)
  add(new THREE.CylinderGeometry(0.125, 0.105, 0.46, 8), matSkin,  0.76,  0.84, 0, 0, -0.44)

  // Briefcase
  add(new THREE.BoxGeometry(0.42, 0.30, 0.12), matCase,  0.94, 0.58, 0)
  // Briefcase clasp/trim
  add(new THREE.BoxGeometry(0.44, 0.02, 0.14), matLatch, 0.94, 0.58, 0)
  // Briefcase handle
  const handleGeo = new THREE.TorusGeometry(0.085, 0.022, 6, 10, Math.PI)
  const handle = new THREE.Mesh(handleGeo, matLatch)
  handle.position.set(0.94, 0.77, 0)
  handle.rotation.z = Math.PI
  group.add(handle)

  group.position.set(0, -1.2, 0)
  scene.add(group)
  return group
}

export default function BusinessmanScene({ className = '', style = {} }) {
  const canvasRef = useRef()

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const W = canvas.clientWidth  || 380
    const H = canvas.clientHeight || 520
    let renderer
    try {
      renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true })
    } catch {
      return
    }
    renderer.setSize(W, H, false)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.shadowMap.enabled = true
    renderer.shadowMap.type = THREE.PCFSoftShadowMap
    renderer.toneMapping = THREE.ACESFilmicToneMapping
    renderer.toneMappingExposure = 1.3

    const scene  = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(40, W / H, 0.1, 100)
    camera.position.set(0, 0.6, 6.5)

    // Lighting
    scene.add(new THREE.AmbientLight(0xffffff, 0.55))

    const keyLight = new THREE.DirectionalLight(0xf0e8d8, 3.5)
    keyLight.position.set(2, 4, 4)
    keyLight.castShadow = true
    scene.add(keyLight)

    const rimLight = new THREE.DirectionalLight(0x60a5fa, 1.4)
    rimLight.position.set(-3, 1, -3)
    scene.add(rimLight)

    const fillLight = new THREE.DirectionalLight(0xd4a96c, 1.0)
    fillLight.position.set(-1, 3, 2)
    scene.add(fillLight)

    // Subtle ground glow disc
    const glowGeo = new THREE.CircleGeometry(1.1, 32)
    const glowMat = new THREE.MeshBasicMaterial({
      color: 0xd4a96c, transparent: true, opacity: 0.08, side: THREE.DoubleSide,
    })
    const glow = new THREE.Mesh(glowGeo, glowMat)
    glow.rotation.x = -Math.PI / 2
    glow.position.y = -1.18
    scene.add(glow)

    const figure = buildBusinessman(scene)

    let animId = null
    let t = 0

    const onResize = () => {
      const w = canvas.clientWidth
      const h = canvas.clientHeight
      renderer.setSize(w, h, false)
      camera.aspect = w / h
      camera.updateProjectionMatrix()
    }
    window.addEventListener('resize', onResize)

    const tick = () => {
      animId = requestAnimationFrame(tick)
      t += 0.014
      // Gentle idle: float + slow y-rotation sway
      figure.position.y  = -1.2 + Math.sin(t * 0.55) * 0.055
      figure.rotation.y  = Math.sin(t * 0.22) * 0.18
      renderer.render(scene, camera)
    }
    tick()

    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('resize', onResize)
      renderer.dispose()
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className={className}
      style={{ display: 'block', ...style }}
    />
  )
}
