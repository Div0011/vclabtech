'use client'

import React, { useRef, useEffect, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { MeshDistortMaterial, Sphere, Float } from '@react-three/drei'
import * as THREE from 'three'
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'

const Blob = () => {
  const mesh = useRef<THREE.Mesh>(null!)

  useFrame((state) => {
    const { clock } = state
    mesh.current.rotation.x = clock.getElapsedTime() * 0.2
    mesh.current.rotation.y = clock.getElapsedTime() * 0.3
  })

  return (
    <Float speed={1.6} rotationIntensity={0.35} floatIntensity={0.8}>
      <Sphere ref={mesh} args={[1, 32, 32]} scale={1.85}>
        <MeshDistortMaterial
          color="#2563EB"
          speed={1.25}
          distort={0.18}
          radius={1}
          emissive="#2563EB"
          emissiveIntensity={0.06}
          roughness={0}
          metalness={0.6}
        />
      </Sphere>
    </Float>
  )
}

const BackgroundScene = () => {
  const shouldReduceMotion = useReducedMotion()
  const { scrollYProgress } = useScroll()
  const [isMobile, setIsMobile] = useState(false)

  // Detect mobile for performance
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768 || 'ontouchstart' in window)
    }
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  // Transform scroll progress into flowing gradient positions
  const yPos = useTransform(scrollYProgress, [0, 1], ['0%', '100%'])
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.3, 0.6, 0.3])

  // Mobile / reduced-motion fallback: static CSS gradient only
  if (shouldReduceMotion || isMobile) {
    return (
      <div className="fixed inset-0 z-[-1] overflow-hidden bg-[radial-gradient(circle_at_50%_20%,rgba(37,99,235,0.10),transparent_40%),linear-gradient(180deg,#f8fbff_0%,#eef4ff_100%)]" />
    )
  }

  return (
    <div className="fixed inset-0 z-[-1] overflow-hidden bg-[#EBF4FF]">
      {/* Scroll-Reactive Flowing Gradient */}
      <motion.div
        style={{
          top: yPos,
          opacity: opacity,
          backgroundImage: 'radial-gradient(circle at 50% 50%, #2563EB 0%, transparent 70%)'
        }}
        className="absolute inset-x-0 h-screen pointer-events-none blur-[150px]"
      />

      {/* Static Fluid Gradient Overlay */}
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_50%_50%,#2563EB_0%,transparent_70%)]" />

      <Canvas
        dpr={[1, 1.5]}
        gl={{ antialias: false, alpha: true, powerPreference: 'low-power' }}
        camera={{ position: [0, 0, 5], fov: 75 }}
      >
        <ambientLight intensity={1.5} />
        <pointLight position={[10, 10, 10]} intensity={2} />
        <spotLight position={[-10, 10, 10]} angle={0.15} penumbra={1} intensity={2} />
        <Blob />
      </Canvas>

      {/* Side Gradients / Vignette */}
      <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-cobalt/10 to-transparent pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-cobalt/10 to-transparent pointer-events-none" />

      {/* Mist Particles or Noise Overlay */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.05] bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
    </div>
  )
}

export default BackgroundScene

