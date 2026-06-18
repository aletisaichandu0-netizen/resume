import { useEffect, useRef } from 'react'
import * as THREE from 'three'

function buildBusinessman(scene) {
  const figure = new THREE.Group()
  const body = new THREE.Group()
  const head = new THREE.Group()

  const suit = new THREE.MeshPhysicalMaterial({
    color: 0x171722,
    roughness: 0.58,
    metalness: 0.18,
    clearcoat: 0.25,
  })
  const skin = new THREE.MeshStandardMaterial({ color: 0xd6a27d, roughness: 0.78 })
  const shirt = new THREE.MeshStandardMaterial({ color: 0xf0ece4, roughness: 0.82 })
  const accent = new THREE.MeshPhysicalMaterial({
    color: 0xd4a96c,
    roughness: 0.3,
    metalness: 0.65,
    emissive: 0x3a2108,
    emissiveIntensity: 0.28,
  })
  const leather = new THREE.MeshPhysicalMaterial({
    color: 0x2f1b0d,
    roughness: 0.38,
    metalness: 0.22,
    clearcoat: 0.45,
  })
  const dark = new THREE.MeshStandardMaterial({ color: 0x09080a, roughness: 0.42, metalness: 0.3 })
  const hair = new THREE.MeshStandardMaterial({ color: 0x150d08, roughness: 0.9 })

  const add = (parent, geometry, material, position, rotation = [0, 0, 0]) => {
    const mesh = new THREE.Mesh(geometry, material)
    mesh.position.set(...position)
    mesh.rotation.set(...rotation)
    mesh.castShadow = true
    mesh.receiveShadow = true
    parent.add(mesh)
    return mesh
  }

  const makeArm = ({ side, shoulder, upperAngle, elbowAngle, holdingCase = false }) => {
    const arm = new THREE.Group()
    arm.position.set(...shoulder)
    arm.rotation.z = upperAngle
    body.add(arm)

    add(arm, new THREE.SphereGeometry(0.145, 12, 8), suit, [0, -0.04, 0])
    add(arm, new THREE.CapsuleGeometry(0.115, 0.36, 6, 10), suit, [0, -0.28, 0])

    const forearm = new THREE.Group()
    forearm.position.set(0, -0.52, 0)
    forearm.rotation.z = elbowAngle
    arm.add(forearm)
    add(forearm, new THREE.CapsuleGeometry(0.102, 0.32, 6, 10), suit, [0, -0.25, 0])

    const cuff = add(forearm, new THREE.CylinderGeometry(0.105, 0.1, 0.08, 10), shirt, [0, -0.49, 0])
    cuff.rotation.z = 0

    const hand = new THREE.Group()
    hand.position.set(0, -0.57, 0.015)
    forearm.add(hand)
    add(hand, new THREE.CapsuleGeometry(0.075, 0.12, 5, 9), skin, [0, -0.08, 0], [0, 0, side * 0.04])

    let briefcase = null
    if (holdingCase) {
      briefcase = new THREE.Group()
      add(briefcase, new THREE.BoxGeometry(0.52, 0.34, 0.17), leather, [0.07, -0.42, 0])
      add(briefcase, new THREE.BoxGeometry(0.525, 0.026, 0.18), accent, [0.07, -0.38, 0])
      add(briefcase, new THREE.TorusGeometry(0.09, 0.021, 7, 14, Math.PI), accent, [0.07, -0.22, 0], [0, 0, Math.PI])
      add(briefcase, new THREE.BoxGeometry(0.045, 0.055, 0.19), accent, [-0.09, -0.36, 0])
      add(briefcase, new THREE.BoxGeometry(0.045, 0.055, 0.19), accent, [0.23, -0.36, 0])
      hand.add(briefcase)
    }

    return { arm, forearm, hand, briefcase }
  }

  const makeLeg = ({ side, hip }) => {
    const leg = new THREE.Group()
    leg.position.set(...hip)
    leg.rotation.z = side * -0.018
    body.add(leg)

    add(leg, new THREE.CapsuleGeometry(0.16, 0.42, 6, 10), suit, [0, -0.31, 0])

    const lowerLeg = new THREE.Group()
    lowerLeg.position.set(0, -0.62, 0)
    leg.add(lowerLeg)
    add(lowerLeg, new THREE.CapsuleGeometry(0.135, 0.38, 6, 10), suit, [0, -0.28, 0])
    add(lowerLeg, new THREE.BoxGeometry(0.25, 0.14, 0.47), dark, [0, -0.57, 0.1], [0.02, 0, 0])

    return { leg, lowerLeg }
  }

  add(head, new THREE.SphereGeometry(0.255, 16, 12), skin, [0, 0, 0])
  add(head, new THREE.SphereGeometry(0.258, 16, 10, 0, Math.PI * 2, 0, Math.PI * 0.48), hair, [0, 0.11, -0.015])
  add(head, new THREE.SphereGeometry(0.035, 8, 6), skin, [-0.255, -0.005, 0])
  add(head, new THREE.SphereGeometry(0.035, 8, 6), skin, [0.255, -0.005, 0])
  add(head, new THREE.BoxGeometry(0.048, 0.018, 0.015), dark, [-0.085, 0.025, 0.244])
  add(head, new THREE.BoxGeometry(0.048, 0.018, 0.015), dark, [0.085, 0.025, 0.244])
  add(head, new THREE.ConeGeometry(0.035, 0.1, 8), skin, [0, -0.025, 0.275], [Math.PI / 2, 0, 0])
  add(head, new THREE.BoxGeometry(0.09, 0.014, 0.012), dark, [0, -0.115, 0.245])
  head.scale.set(0.92, 1.08, 0.9)
  head.position.set(0, 2.22, 0)
  body.add(head)

  add(body, new THREE.CylinderGeometry(0.12, 0.145, 0.24, 12), skin, [0, 1.88, 0])
  add(body, new THREE.CylinderGeometry(0.43, 0.49, 1.03, 10), suit, [0, 1.31, 0])
  add(body, new THREE.BoxGeometry(0.2, 0.72, 0.035), shirt, [0, 1.36, 0.43])
  add(body, new THREE.BoxGeometry(0.075, 0.48, 0.04), accent, [0, 1.3, 0.455])
  add(body, new THREE.BoxGeometry(0.92, 0.28, 0.4), suit, [0, 0.72, 0])
  add(body, new THREE.BoxGeometry(0.84, 0.045, 0.42), dark, [0, 0.84, 0])

  const leftArm = makeArm({
    side: -1,
    shoulder: [-0.48, 1.62, 0],
    upperAngle: -0.1,
    elbowAngle: 0.035,
  })
  const rightArm = makeArm({
    side: 1,
    shoulder: [0.48, 1.62, 0],
    upperAngle: 0.13,
    elbowAngle: -0.08,
    holdingCase: true,
  })
  const leftLeg = makeLeg({ side: -1, hip: [-0.225, 0.67, 0] })
  const rightLeg = makeLeg({ side: 1, hip: [0.225, 0.67, 0] })

  figure.add(body)
  figure.position.set(0, -0.9, 0)
  scene.add(figure)

  return {
    figure,
    body,
    head,
    briefcase: rightArm.briefcase,
    leftArm: leftArm.arm,
    rightArm: rightArm.arm,
    leftForearm: leftArm.forearm,
    rightForearm: rightArm.forearm,
    leftLeg: leftLeg.leg,
    rightLeg: rightLeg.leg,
  }
}

function buildEnvironment(scene) {
  const platform = new THREE.Mesh(
    new THREE.CylinderGeometry(1.25, 1.42, 0.12, 48),
    new THREE.MeshPhysicalMaterial({
      color: 0x111118,
      roughness: 0.42,
      metalness: 0.55,
      clearcoat: 0.5,
    })
  )
  platform.position.y = -1.54
  platform.receiveShadow = true
  scene.add(platform)

  const ringMaterial = new THREE.MeshBasicMaterial({
    color: 0xd4a96c,
    transparent: true,
    opacity: 0.38,
    toneMapped: false,
  })
  const rings = [0.78, 1.08, 1.38].map((radius, index) => {
    const ring = new THREE.Mesh(new THREE.TorusGeometry(radius, 0.008, 5, 72), ringMaterial.clone())
    ring.rotation.x = Math.PI / 2
    ring.position.y = -1.465 + index * 0.006
    scene.add(ring)
    return ring
  })

  const particleCount = 90
  const positions = new Float32Array(particleCount * 3)
  for (let index = 0; index < particleCount; index += 1) {
    const radius = 1.3 + Math.random() * 2.1
    const angle = Math.random() * Math.PI * 2
    positions[index * 3] = Math.cos(angle) * radius
    positions[index * 3 + 1] = -1.3 + Math.random() * 4.2
    positions[index * 3 + 2] = Math.sin(angle) * radius - 0.5
  }
  const particleGeometry = new THREE.BufferGeometry()
  particleGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
  const particles = new THREE.Points(
    particleGeometry,
    new THREE.PointsMaterial({
      color: 0xd4a96c,
      size: 0.018,
      transparent: true,
      opacity: 0.42,
      sizeAttenuation: true,
    })
  )
  scene.add(particles)

  return { platform, rings, particles }
}

export default function BusinessmanScene({ className = '', style = {} }) {
  const canvasRef = useRef()

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return undefined

    let renderer
    try {
      renderer = new THREE.WebGLRenderer({
        canvas,
        alpha: true,
        antialias: true,
        powerPreference: 'high-performance',
      })
    } catch {
      return undefined
    }

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(38, 1, 0.1, 100)
    camera.position.set(0, 0.5, 6.4)

    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.shadowMap.enabled = true
    renderer.shadowMap.type = THREE.PCFSoftShadowMap
    renderer.outputColorSpace = THREE.SRGBColorSpace
    renderer.toneMapping = THREE.ACESFilmicToneMapping
    renderer.toneMappingExposure = 1.25

    scene.add(new THREE.HemisphereLight(0xf7ead6, 0x111327, 1.65))

    const keyLight = new THREE.SpotLight(0xffe3bd, 48, 12, Math.PI / 5, 0.5, 1.2)
    keyLight.position.set(2.5, 4.8, 4.5)
    keyLight.target.position.set(0, 0.7, 0)
    keyLight.castShadow = true
    keyLight.shadow.mapSize.set(1024, 1024)
    scene.add(keyLight, keyLight.target)

    const rimLight = new THREE.PointLight(0x6d83ff, 8, 8)
    rimLight.position.set(-2.8, 1.4, -2.2)
    scene.add(rimLight)

    const cursorLight = new THREE.PointLight(0xd4a96c, 0, 5)
    cursorLight.position.set(0, 1.2, 2.5)
    scene.add(cursorLight)

    const character = buildBusinessman(scene)
    const environment = buildEnvironment(scene)
    const pointer = new THREE.Vector2()
    const targetPointer = new THREE.Vector2()
    const clock = new THREE.Clock()
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    let isHovering = false
    let isVisible = true
    let animationFrame

    const resize = () => {
      const width = Math.max(canvas.clientWidth, 1)
      const height = Math.max(canvas.clientHeight, 1)
      renderer.setSize(width, height, false)
      camera.aspect = width / height
      camera.updateProjectionMatrix()
    }
    const resizeObserver = new ResizeObserver(resize)
    resizeObserver.observe(canvas)
    resize()

    const visibilityObserver = new IntersectionObserver(([entry]) => {
      isVisible = entry.isIntersecting
    }, { threshold: 0.05 })
    visibilityObserver.observe(canvas)

    const onPointerMove = (event) => {
      const bounds = canvas.getBoundingClientRect()
      targetPointer.x = ((event.clientX - bounds.left) / bounds.width) * 2 - 1
      targetPointer.y = -(((event.clientY - bounds.top) / bounds.height) * 2 - 1)
    }
    const onPointerEnter = () => {
      isHovering = true
      canvas.style.cursor = 'grab'
    }
    const onPointerLeave = () => {
      isHovering = false
      targetPointer.set(0, 0)
      canvas.style.cursor = 'default'
    }
    const onPointerDown = () => {
      canvas.style.cursor = 'grabbing'
    }
    const onPointerUp = () => {
      canvas.style.cursor = isHovering ? 'grab' : 'default'
    }

    canvas.addEventListener('pointermove', onPointerMove)
    canvas.addEventListener('pointerenter', onPointerEnter)
    canvas.addEventListener('pointerleave', onPointerLeave)
    canvas.addEventListener('pointerdown', onPointerDown)
    canvas.addEventListener('pointerup', onPointerUp)

    const render = () => {
      animationFrame = requestAnimationFrame(render)
      if (!isVisible) return

      const elapsed = clock.getElapsedTime()
      pointer.lerp(targetPointer, reducedMotion ? 0.03 : 0.075)
      const hoverStrength = isHovering && !reducedMotion ? 1 : 0

      character.figure.position.y = -0.9 + Math.sin(elapsed * 1.15) * 0.025
      character.figure.rotation.y += ((pointer.x * 0.34 * hoverStrength) + Math.sin(elapsed * 0.35) * 0.07 - character.figure.rotation.y) * 0.065
      character.body.rotation.x += ((-pointer.y * 0.075 * hoverStrength) - character.body.rotation.x) * 0.07
      character.head.rotation.y += ((pointer.x * 0.32 * hoverStrength) - character.head.rotation.y) * 0.1
      character.head.rotation.x += ((-pointer.y * 0.16 * hoverStrength) - character.head.rotation.x) * 0.1
      character.briefcase.rotation.z = Math.sin(elapsed * 1.15) * 0.018 - pointer.x * 0.025 * hoverStrength
      character.leftArm.rotation.z = -0.1 + Math.sin(elapsed * 1.15) * 0.012
      character.rightArm.rotation.z = 0.13 - Math.sin(elapsed * 1.15) * 0.01
      character.leftForearm.rotation.z = 0.035 + Math.sin(elapsed * 1.15 + 0.5) * 0.008
      character.rightForearm.rotation.z = -0.08 - Math.sin(elapsed * 1.15 + 0.5) * 0.006
      character.leftLeg.rotation.z = 0.018 + Math.sin(elapsed * 0.7) * 0.004
      character.rightLeg.rotation.z = -0.018 - Math.sin(elapsed * 0.7) * 0.004

      camera.position.x += ((pointer.x * 0.24 * hoverStrength) - camera.position.x) * 0.045
      camera.position.y += ((0.5 + pointer.y * 0.12 * hoverStrength) - camera.position.y) * 0.045
      camera.lookAt(0, 0.55, 0)

      cursorLight.position.x = pointer.x * 2.2
      cursorLight.position.y = 1.1 + pointer.y * 1.5
      cursorLight.intensity += ((hoverStrength ? 9 : 0) - cursorLight.intensity) * 0.08

      environment.rings.forEach((ring, index) => {
        ring.rotation.z = elapsed * (index % 2 === 0 ? 0.12 : -0.09)
        ring.material.opacity = 0.18 + Math.sin(elapsed * 1.4 + index) * 0.08 + hoverStrength * 0.16
        const scale = 1 + Math.sin(elapsed * 1.1 + index * 0.7) * 0.018 + hoverStrength * 0.025
        ring.scale.setScalar(scale)
      })
      environment.particles.rotation.y = elapsed * 0.035 + pointer.x * 0.04
      environment.particles.position.x = pointer.x * -0.08 * hoverStrength

      renderer.render(scene, camera)
    }
    render()

    return () => {
      cancelAnimationFrame(animationFrame)
      resizeObserver.disconnect()
      visibilityObserver.disconnect()
      canvas.removeEventListener('pointermove', onPointerMove)
      canvas.removeEventListener('pointerenter', onPointerEnter)
      canvas.removeEventListener('pointerleave', onPointerLeave)
      canvas.removeEventListener('pointerdown', onPointerDown)
      canvas.removeEventListener('pointerup', onPointerUp)
      scene.traverse((object) => {
        object.geometry?.dispose()
        if (Array.isArray(object.material)) object.material.forEach((material) => material.dispose())
        else object.material?.dispose()
      })
      renderer.dispose()
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className={className}
      style={{ display: 'block', touchAction: 'pan-y', ...style }}
      aria-label="Interactive 3D professional character. Move the cursor over the scene to explore."
    />
  )
}
