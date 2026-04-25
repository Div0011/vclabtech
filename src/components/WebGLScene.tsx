'use client'

import { Canvas, useFrame } from '@react-three/fiber'
import { PerformanceMonitor } from '@react-three/drei'
import { useRef, useState, useMemo, useEffect } from 'react'
import * as THREE from 'three'
import { useGlobalStore } from '@/store/useGlobalStore'
import gsap from 'gsap'

const FluidShaderMaterial = () => {
  const materialRef = useRef<THREE.ShaderMaterial>(null)

  const uniforms = useMemo(() => ({
    uTime: { value: 0 },
    uTurbulence: { value: 0.1 },
    uColor1: { value: new THREE.Color('#00F0FF') },
    uColor2: { value: new THREE.Color('#6B44FF') },
    uBgColor: { value: new THREE.Color('#0A0A0A') },
    uShift: { value: 0 },
  }), [])

  const activeServiceIndex = useGlobalStore((state) => state.activeServiceIndex)
  const visionMode = useGlobalStore((state) => state.visionMode)
  const warpMode = useGlobalStore((state) => state.warpMode)
  const prevIndex = useRef(activeServiceIndex)
  const prevVisionMode = useRef(visionMode)
  const prevWarpMode = useRef(warpMode)

  useEffect(() => {
    if (materialRef.current && activeServiceIndex !== prevIndex.current) {
      gsap.to(materialRef.current.uniforms.uShift, {
        value: 1,
        duration: 0.5,
        ease: "power2.out",
        onComplete: () => {
          gsap.to(materialRef.current!.uniforms.uShift, {
            value: 0,
            duration: 1.5,
            ease: "power2.inOut"
          })
        }
      })
      prevIndex.current = activeServiceIndex
    }
  }, [activeServiceIndex])

  useFrame((state) => {
    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value = state.clock.elapsedTime
      
      const scrollVelocity = useGlobalStore.getState().velocity
      const isVision = useGlobalStore.getState().visionMode
      const isWarp = useGlobalStore.getState().warpMode
      
      // Interpolate turbulence based on scroll velocity and mode
      let targetTurbulence = isVision ? 0.02 : Math.min(0.5, 0.1 + Math.abs(scrollVelocity) * 0.005)
      if (isWarp) targetTurbulence = 2.0 // Warp speed
      
      materialRef.current.uniforms.uTurbulence.value = THREE.MathUtils.lerp(
        materialRef.current.uniforms.uTurbulence.value,
        targetTurbulence,
        isWarp ? 0.02 : 0.05
      )
    }
  })

  return (
    <mesh>
      <planeGeometry args={[2, 2, 128, 128]} />
      <shaderMaterial
        ref={materialRef}
        uniforms={uniforms}
        vertexShader={`
          varying vec2 vUv;
          uniform float uTime;
          uniform float uTurbulence;
          uniform float uShift;
          
          // Basic noise function
          vec3 permute(vec3 x) { return mod(((x*34.0)+1.0)*x, 289.0); }
          float snoise(vec2 v){
            const vec4 C = vec4(0.211324865405187, 0.366025403784439,
                     -0.577350269189626, 0.024390243902439);
            vec2 i  = floor(v + dot(v, C.yy) );
            vec2 x0 = v -   i + dot(i, C.xx);
            vec2 i1;
            i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
            vec4 x12 = x0.xyxy + C.xxzz;
            x12.xy -= i1;
            i = mod(i, 289.0);
            vec3 p = permute( permute( i.y + vec3(0.0, i1.y, 1.0 ))
            + i.x + vec3(0.0, i1.x, 1.0 ));
            vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy),
              dot(x12.zw,x12.zw)), 0.0);
            m = m*m ;
            m = m*m ;
            vec3 x = 2.0 * fract(p * C.www) - 1.0;
            vec3 h = abs(x) - 0.5;
            vec3 ox = floor(x + 0.5);
            vec3 a0 = x - ox;
            m *= 1.79284291400159 - 0.85373472095314 * ( a0*a0 + h*h );
            vec3 g;
            g.x  = a0.x  * x0.x  + h.x  * x0.y;
            g.yz = a0.yz * x12.xz + h.yz * x12.yw;
            return 130.0 * dot(m, g);
          }

          void main() {
            vUv = uv;
            vec3 pos = position;
            float noise = snoise(vec2(pos.x * 2.0 + uTime * 0.2, pos.y * 2.0 - uTime * 0.3)) * (uTurbulence + uShift * 0.2);
            pos.z += noise;
            gl_Position = vec4(pos, 1.0);
          }
        `}
        fragmentShader={`
          varying vec2 vUv;
          uniform float uTime;
          uniform vec3 uColor1;
          uniform vec3 uColor2;
          uniform vec3 uBgColor;
          uniform float uShift;

          void main() {
            // Create a liquid gradient look based on UVs and time
            float mixValue = smoothstep(0.0, 1.0, vUv.y + sin(vUv.x * 10.0 + uTime) * 0.1);
            vec3 baseColor = mix(uBgColor, mix(uColor1, uColor2, vUv.x), mixValue * (0.15 + uShift * 0.1));
            
            gl_FragColor = vec4(baseColor, 1.0);
          }
        `}
        wireframe={false}
      />
    </mesh>
  )
}

export const WebGLScene = () => {
  const [dpr, setDpr] = useState(1.5)

  return (
    <Canvas 
      dpr={dpr} 
      camera={{ position: [0, 0, 1] }} 
      gl={{ antialias: false, powerPreference: "high-performance" }}
    >
      <PerformanceMonitor
        onIncline={() => setDpr(2)}
        onDecline={() => setDpr(1)}
      >
        <FluidShaderMaterial />
      </PerformanceMonitor>
    </Canvas>
  )
}
