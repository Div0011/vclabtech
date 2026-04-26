'use client'

import { useRef, useMemo, useEffect, useState } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'

const vertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`

const fragmentShader = `
  uniform float uTime;
  uniform vec2 uResolution;
  uniform vec2 uMouse;
  uniform float uMouseInfluence;
  varying vec2 vUv;

  #define PI 3.14159265359

  // Simplex noise functions
  vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec2 mod289(vec2 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec3 permute(vec3 x) { return mod289(((x*34.0)+1.0)*x); }

  float snoise(vec2 v) {
    const vec4 C = vec4(0.211324865405187, 0.366025403784439,
             -0.577350269189626, 0.024390243902439);
    vec2 i  = floor(v + dot(v, C.yy));
    vec2 x0 = v -   i + dot(i, C.xx);
    vec2 i1;
    i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
    vec4 x12 = x0.xyxy + C.xxzz;
    x12.xy -= i1;
    i = mod289(i);
    vec3 p = permute(permute(i.y + vec3(0.0, i1.y, 1.0))
      + i.x + vec3(0.0, i1.x, 1.0));
    vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy),
      dot(x12.zw,x12.zw)), 0.0);
    m = m*m;
    m = m*m;
    vec3 x = 2.0 * fract(p * C.www) - 1.0;
    vec3 h = abs(x) - 0.5;
    vec3 ox = floor(x + 0.5);
    vec3 a0 = x - ox;
    m *= 1.79284291400159 - 0.85373472095314 * (a0*a0 + h*h);
    vec3 g;
    g.x  = a0.x  * x0.x  + h.x  * x0.y;
    g.yz = a0.yz * x12.xz + h.yz * x12.yw;
    return 130.0 * dot(m, g);
  }

  float fbm(vec2 p) {
    float value = 0.0;
    float amplitude = 0.5;
    float frequency = 1.0;
    for (int i = 0; i < 5; i++) {
      value += amplitude * snoise(p * frequency);
      amplitude *= 0.5;
      frequency *= 2.0;
    }
    return value;
  }

  // Glass drop shape
  float glassDrop(vec2 uv, vec2 center, float radius, float distortion) {
    vec2 d = uv - center;
    float dist = length(d);
    
    // Add some wobble to the drop
    float wobble = snoise(vec2(dist * 3.0 - uTime * 0.5, uTime * 0.3)) * 0.03;
    
    // Main drop shape with soft edge
    float shape = smoothstep(radius + wobble, radius * 0.3 + wobble, dist);
    
    // Inner highlight
    float highlight = smoothstep(radius * 0.5, 0.0, dist) * 0.4;
    
    // Caustic refraction effect
    float caustic = pow(snoise(d * 8.0 + uTime * 0.2), 3.0) * 0.3;
    
    return shape + highlight + caustic * shape;
  }

  // Chromatic aberration for glass effect
  vec3 chromaticGlass(vec2 uv, vec2 center, float radius) {
    vec2 d = uv - center;
    float dist = length(d);
    
    float r = glassDrop(uv + vec2(0.002, 0.0), center, radius, 1.0);
    float g = glassDrop(uv, center, radius, 1.0);
    float b = glassDrop(uv - vec2(0.002, 0.0), center, radius, 1.0);
    
    return vec3(r, g, b) * 0.15;
  }

  void main() {
    vec2 uv = vUv;
    vec2 aspect = vec2(uResolution.x / uResolution.y, 1.0);
    vec2 uvAspect = (uv - 0.5) * aspect + 0.5;
    
    // Mouse parallax influence
    vec2 mouseOffset = (uMouse - 0.5) * 0.05 * uMouseInfluence;
    
    // Background gradient - light elegant tones
    vec3 bgColor1 = vec3(0.969, 0.969, 0.961); // #f7f7f5
    vec3 bgColor2 = vec3(0.937, 0.957, 1.0);   // #eff4ff
    vec3 bgColor3 = vec3(0.973, 0.98, 1.0);    // #f8faff
    
    float bgNoise = fbm(uv * 2.0 + uTime * 0.02);
    vec3 bgColor = mix(bgColor1, bgColor2, uv.y + bgNoise * 0.1);
    bgColor = mix(bgColor, bgColor3, smoothstep(0.3, 0.8, uv.x + bgNoise * 0.05));
    
    // Add subtle radial gradient from center
    float radial = 1.0 - length((uv - 0.5) * 0.8);
    bgColor += vec3(0.02, 0.04, 0.08) * radial * 0.3;
    
    vec3 color = bgColor;
    
    // Glass drops - multiple layers
    // Large background drops
    float drop1 = glassDrop(uvAspect + mouseOffset * 0.5, vec2(0.25, 0.35), 0.18, 1.0);
    float drop2 = glassDrop(uvAspect + mouseOffset * 0.3, vec2(0.72, 0.28), 0.14, 1.0);
    float drop3 = glassDrop(uvAspect + mouseOffset * 0.7, vec2(0.55, 0.65), 0.22, 1.0);
    float drop4 = glassDrop(uvAspect + mouseOffset * 0.4, vec2(0.15, 0.72), 0.12, 1.0);
    float drop5 = glassDrop(uvAspect + mouseOffset * 0.6, vec2(0.85, 0.58), 0.16, 1.0);
    
    // Medium drops
    float drop6 = glassDrop(uvAspect + mouseOffset * 0.8, vec2(0.4, 0.15), 0.1, 1.0);
    float drop7 = glassDrop(uvAspect + mouseOffset * 0.2, vec2(0.68, 0.82), 0.09, 1.0);
    float drop8 = glassDrop(uvAspect + mouseOffset * 0.5, vec2(0.12, 0.48), 0.08, 1.0);
    
    // Small detail drops
    float drop9 = glassDrop(uvAspect + mouseOffset * 0.9, vec2(0.88, 0.38), 0.06, 1.0);
    float drop10 = glassDrop(uvAspect + mouseOffset * 0.4, vec2(0.35, 0.88), 0.05, 1.0);
    float drop11 = glassDrop(uvAspect + mouseOffset * 0.7, vec2(0.58, 0.42), 0.07, 1.0);
    float drop12 = glassDrop(uvAspect + mouseOffset * 0.3, vec2(0.78, 0.72), 0.04, 1.0);
    
    // Animated falling drops
    float fall1 = fract(uTime * 0.08 + 0.0);
    float fall2 = fract(uTime * 0.06 + 0.33);
    float fall3 = fract(uTime * 0.09 + 0.66);
    
    float dropF1 = glassDrop(uvAspect + mouseOffset * 0.5, vec2(0.3 + sin(uTime * 0.2) * 0.05, 1.0 - fall1 * 1.2), 0.08, 1.0);
    float dropF2 = glassDrop(uvAspect + mouseOffset * 0.6, vec2(0.6 + cos(uTime * 0.15) * 0.04, 1.0 - fall2 * 1.2), 0.06, 1.0);
    float dropF3 = glassDrop(uvAspect + mouseOffset * 0.4, vec2(0.8 + sin(uTime * 0.25) * 0.03, 1.0 - fall3 * 1.2), 0.05, 1.0);
    
    // Glass color - subtle blue-tinted transparency
    vec3 glassColor = vec3(0.23, 0.51, 0.96);  // Cobalt blue base
    vec3 glassHighlight = vec3(0.38, 0.65, 0.98); // Lighter blue highlight
    vec3 glassDeep = vec3(0.15, 0.35, 0.85); // Deeper blue
    
    // Combine all drops with depth layering
    float allDrops = drop1 + drop2 + drop3 + drop4 + drop5;
    allDrops += drop6 * 0.8 + drop7 * 0.8 + drop8 * 0.8;
    allDrops += drop9 * 0.6 + drop10 * 0.6 + drop11 * 0.6 + drop12 * 0.6;
    allDrops += dropF1 * 0.7 + dropF2 * 0.7 + dropF3 * 0.7;
    
    // Chromatic aberration for each major drop
    vec3 chromatic = chromaticGlass(uvAspect, vec2(0.25, 0.35), 0.18);
    chromatic += chromaticGlass(uvAspect, vec2(0.72, 0.28), 0.14);
    chromatic += chromaticGlass(uvAspect, vec2(0.55, 0.65), 0.22);
    
    // Apply glass color with transparency
    float glassAlpha = clamp(allDrops, 0.0, 1.0) * 0.35;
    vec3 glassFinal = mix(glassColor, glassHighlight, allDrops * 0.5);
    glassFinal = mix(glassFinal, glassDeep, allDrops * allDrops * 0.3);
    
    // Add specular highlights
    float specular = pow(allDrops, 3.0) * 0.4;
    glassFinal += vec3(1.0, 1.0, 1.0) * specular;
    
    // Combine with background
    color = mix(color, glassFinal, glassAlpha);
    color += chromatic * 0.5;
    
    // Add subtle light rays / caustics on background
    float caustics = pow(snoise(uvAspect * 4.0 + uTime * 0.1), 4.0) * 0.03;
    color += vec3(0.23, 0.51, 0.96) * caustics * (1.0 - glassAlpha);
    
    // Vignette
    float vignette = 1.0 - smoothstep(0.4, 1.2, length(uv - 0.5));
    color *= 0.95 + vignette * 0.05;
    
    // Subtle film grain
    float grain = (fract(sin(dot(uv * uTime, vec2(12.9898, 78.233))) * 43758.5453) - 0.5) * 0.015;
    color += grain;
    
    gl_FragColor = vec4(color, 1.0);
  }
`

function GlassDropScene() {
  const meshRef = useRef<THREE.Mesh>(null)
  const mouseRef = useRef({ x: 0.5, y: 0.5, targetX: 0.5, targetY: 0.5 })
  const { size, viewport } = useThree()

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uResolution: { value: new THREE.Vector2(size.width, size.height) },
      uMouse: { value: new THREE.Vector2(0.5, 0.5) },
      uMouseInfluence: { value: 1.0 },
    }),
    []
  )

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.targetX = e.clientX / window.innerWidth
      mouseRef.current.targetY = 1.0 - e.clientY / window.innerHeight
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  useFrame((state) => {
    if (meshRef.current) {
      const material = meshRef.current.material as THREE.ShaderMaterial
      material.uniforms.uTime.value = state.clock.elapsedTime
      material.uniforms.uResolution.value.set(size.width, size.height)
      
      // Smooth mouse follow
      mouseRef.current.x += (mouseRef.current.targetX - mouseRef.current.x) * 0.05
      mouseRef.current.y += (mouseRef.current.targetY - mouseRef.current.y) * 0.05
      material.uniforms.uMouse.value.set(mouseRef.current.x, mouseRef.current.y)
    }
  })

  return (
    <mesh ref={meshRef} scale={[viewport.width, viewport.height, 1]}>
      <planeGeometry args={[1, 1, 1, 1]} />
      <shaderMaterial
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
      />
    </mesh>
  )
}

export const GlassDropBackground = () => {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) {
    return (
      <div className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_50%_20%,rgba(37,99,235,0.12),transparent_45%),linear-gradient(180deg,#f8fbff_0%,#eef4ff_100%)]" />
    )
  }

  return (
    <div className="absolute inset-0 z-0">
      <Canvas
        camera={{ position: [0, 0, 1], fov: 75 }}
        gl={{ antialias: true, alpha: false }}
        style={{ width: '100%', height: '100%' }}
        dpr={[1, 1.5]}
      >
        <GlassDropScene />
      </Canvas>
    </div>
  )
}

