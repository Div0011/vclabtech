'use client'

import React, { useRef, useMemo } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Points, PointMaterial } from '@react-three/drei'
import * as THREE from 'three'

const vertexShader = `
  varying float vZ;
  varying vec2 vUv;
  uniform float uTime;
  uniform vec2 uMouse;
  uniform float uBaseTurbulence;

  // GLSL Simplex Noise 2D
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
    
    // Base waves using noise
    float noise = snoise(pos.xy * 0.15 + uTime * 0.2);
    pos.z += noise * 0.5 * uBaseTurbulence;

    // Mouse displacement (Force Field)
    float dist = distance(pos.xy, uMouse * 10.0);
    float force = 1.5 / (dist + 0.5);
    pos.z += force * 2.0;
    
    vZ = pos.z;

    vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
    gl_PointSize = 2.0 * (1.0 / -mvPosition.z);
    gl_Position = projectionMatrix * mvPosition;
  }
`

const fragmentShader = `
  varying float vZ;
  varying vec2 vUv;
  
  void main() {
    // Electric Cyan (#00F0FF) to Neon Indigo (#6B44FF) glow
    vec3 colorA = vec3(0.0, 0.94, 1.0); // Cyan
    vec3 colorB = vec3(0.42, 0.27, 1.0); // Indigo
    
    float mixFactor = clamp(vZ * 0.5 + 0.5, 0.0, 1.0);
    vec3 finalColor = mix(colorB, colorA, mixFactor);
    
    // Add sub-layer glow based on height
    float glow = smoothstep(-1.0, 2.0, vZ);
    finalColor += colorA * glow * 0.3;

    gl_FragColor = vec4(finalColor, 1.0);
  }
`

function WaveMesh() {
  const meshRef = useRef<THREE.Points>(null!)
  const { viewport } = useThree()
  
  const mouse = useRef(new THREE.Vector2(0, 0))
  const targetMouse = useRef(new THREE.Vector2(0, 0))

  // Geometry setup: large horizontal plane
  const count = 150
  const positions = useMemo(() => {
    const pos = new Float32Array(count * count * 3)
    for (let i = 0; i < count; i++) {
      for (let j = 0; j < count; j++) {
        const x = (i / count - 0.5) * 40
        const y = (j / count - 0.5) * 40
        const idx = (i * count + j) * 3
        pos[idx] = x
        pos[idx + 1] = y
        pos[idx + 2] = 0
      }
    }
    return pos
  }, [count])

  const uniforms = useMemo(() => ({
    uTime: { value: 0 },
    uMouse: { value: new THREE.Vector2(0, 0) },
    uBaseTurbulence: { value: 1.0 }
  }), [])

  useFrame((state) => {
    const { clock, mouse: stateMouse } = state
    
    // Smooth mouse tracking (lerp)
    targetMouse.current.set(stateMouse.x * (viewport.width / 2), stateMouse.y * (viewport.height / 2))
    mouse.current.lerp(targetMouse.current, 0.05)
    
    if (meshRef.current) {
      const material = meshRef.current.material as THREE.ShaderMaterial
      material.uniforms.uTime.value = clock.getElapsedTime()
      material.uniforms.uMouse.value.copy(mouse.current)
    }
  })

  return (
    <points ref={meshRef} rotation={[-Math.PI / 2.5, 0, 0]} position={[0, -2, 0]}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <shaderMaterial
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  )
}

export const CyberWavesBackground = () => {
  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: -1, pointerEvents: 'none', background: '#0A0A0A' }}>
      <Canvas camera={{ position: [0, 5, 15], fov: 45 }}>
        <WaveMesh />
      </Canvas>
    </div>
  )
}
