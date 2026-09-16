import React, { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import { Environment, ContactShadows } from '@react-three/drei'
import { usePerfume } from '../hooks/usePerfume'
import * as THREE from 'three'

const Scene = React.memo(function Scene() {
  const perfume = usePerfume()
  const lightRef = useRef()

  const theme = perfume?.theme || { 
    bg: '#0a0a0a', 
    fog: '#0a0a0a', 
    light: '#ffffff',
    accent: '#C9A96E'
  }

  useFrame((state) => {
    if (!lightRef.current) return
    const t = state.clock.getElapsedTime()
    lightRef.current.position.x = Math.sin(t * 0.2) * 2
    lightRef.current.position.z = 4 + Math.cos(t * 0.2) * 1
  })

  const dustParticles = useMemo(() => {
    const arr = new Float32Array(40 * 3)
    for (let i = 0; i < 40; i++) {
      arr[i * 3] = (Math.random() - 0.5) * 12
      arr[i * 3 + 1] = Math.random() * 8 - 2
      arr[i * 3 + 2] = (Math.random() - 0.5) * 6 - 2
    }
    return arr
  }, [])

  return (
    <>
      <color attach="background" args={[theme.bg]} />
      <fog attach="fog" args={[theme.fog, 6, 25]} />

      <ambientLight intensity={0.4} color="#ffffff" />
      
      <directionalLight
        ref={lightRef}
        position={[3, 5, 4]}
        intensity={0.9}
        color={theme.light}
        castShadow
        shadow-mapSize={[1024, 1024]}
        shadow-bias={-0.0001}
      />
      
      <directionalLight position={[-3, 2, -2]} intensity={0.3} color="#C9A96E" />
      <pointLight position={[0, 1, -2]} intensity={0.4} color={theme.accent || '#C9A96E'} />

      {/* Moved floor down so bottle and notes don't collide visually */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -2.5, 0]} receiveShadow>
        <planeGeometry args={[60, 60]} />
        <meshStandardMaterial 
          color="#050505" 
          roughness={0.4} 
          metalness={0.8} 
          envMapIntensity={0.5} 
        />
      </mesh>

      <ContactShadows 
        position={[0, -2.49, 0]} 
        opacity={0.6} 
        scale={10} 
        blur={2.5} 
        far={4} 
        color="#000000" 
      />

      <points>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" count={40} array={dustParticles} itemSize={3} />
        </bufferGeometry>
        <pointsMaterial 
          size={0.03} 
          color={theme.accent || '#C9A96E'} 
          transparent 
          opacity={0.4} 
          sizeAttenuation 
          blending={THREE.AdditiveBlending} 
          depthWrite={false} 
        />
      </points>

      <Environment preset="city" environmentIntensity={0.5} />
    </>
  )
})

export default Scene