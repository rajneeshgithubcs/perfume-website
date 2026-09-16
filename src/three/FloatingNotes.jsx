import React, { forwardRef, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Html } from '@react-three/drei'
import * as THREE from 'three'

// Water Splash Ring around bottle
function WaterSplashRing() {
  const ringRef = useRef()
  useFrame((state) => {
    if (!ringRef.current) return
    const t = state.clock.getElapsedTime()
    ringRef.current.rotation.z = t * 0.4
    ringRef.current.rotation.x = Math.sin(t * 0.6) * 0.15 + 1.2
  })

  return (
    <mesh ref={ringRef} position={[0, -0.1, 0]}>
      <torusGeometry args={[1.35, 0.045, 16, 64, Math.PI * 1.8]} />
      <meshPhysicalMaterial
        color="#e3f2fd"
        transmission={0.92}
        opacity={1}
        transparent
        roughness={0.1}
        ior={1.333}
        thickness={0.4}
        specularIntensity={1}
      />
    </mesh>
  )
}

// Lemon & Citrus Slice (Top Note)
function RealisticLemon() {
  return (
    <group scale={0.65} rotation={[0.4, -0.5, 0.3]}>
      <mesh castShadow receiveShadow>
        <sphereGeometry args={[0.34, 32, 32]} />
        <meshStandardMaterial color="#F4D03F" roughness={0.35} metalness={0.1} />
      </mesh>
      {/* Cut Citrus Slice */}
      <group position={[0.42, 0.1, 0]} rotation={[0.2, 0.8, -0.4]} scale={0.85}>
        <mesh castShadow>
          <cylinderGeometry args={[0.28, 0.28, 0.05, 32]} />
          <meshStandardMaterial color="#F9E79F" roughness={0.4} />
        </mesh>
        <mesh position={[0, 0.026, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <circleGeometry args={[0.25, 32]} />
          <meshStandardMaterial color="#FFF9C4" roughness={0.2} />
        </mesh>
      </group>
    </group>
  )
}

// Lotus / Rose Petals (Heart Note)
function RealisticFloral() {
  return (
    <group scale={0.55} rotation={[0.3, 0.4, -0.2]}>
      {[0, 60, 120, 180, 240, 300].map((deg, i) => (
        <mesh
          key={i}
          rotation={[0.6, (deg * Math.PI) / 180, 0.2]}
          position={[
            Math.sin((deg * Math.PI) / 180) * 0.12,
            0,
            Math.cos((deg * Math.PI) / 180) * 0.12,
          ]}
          castShadow
        >
          <sphereGeometry args={[0.26, 16, 16, 0, Math.PI, 0, Math.PI * 0.45]} />
          <meshStandardMaterial color="#FCE4EC" roughness={0.4} />
        </mesh>
      ))}
      <mesh position={[0, 0.08, 0]} castShadow>
        <sphereGeometry args={[0.12, 16, 16]} />
        <meshStandardMaterial color="#F8BBD0" roughness={0.3} />
      </mesh>
    </group>
  )
}

// Tree Wood Cross-Section Disc (Base Note)
function WoodDisc() {
  return (
    <group scale={0.65} rotation={[0.4, 0.8, -0.5]}>
      <mesh castShadow receiveShadow>
        <cylinderGeometry args={[0.32, 0.34, 0.09, 32]} />
        <meshStandardMaterial color="#5D4037" roughness={0.85} metalness={0.05} />
      </mesh>
      <mesh position={[0, 0.046, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[0.3, 32]} />
        <meshStandardMaterial color="#D7CCC8" roughness={0.5} />
      </mesh>
    </group>
  )
}

const FloatingNotes = forwardRef(function FloatingNotes(
  { noteSettleRef, ...props },
  ref
) {
  const topGroupRef = useRef()
  const midGroupRef = useRef()
  const baseGroupRef = useRef()
  const cardPanelRef = useRef()

  useFrame((state) => {
    const time = state.clock.getElapsedTime()
    const p = THREE.MathUtils.clamp(noteSettleRef?.current || 0, 0, 1)
    const ease = THREE.MathUtils.smoothstep(p, 0, 1)

    // 1. Floral (Top Left / Background)
    if (topGroupRef.current) {
      const targetX = THREE.MathUtils.lerp(-0.2, -1.45, ease)
      const targetY = THREE.MathUtils.lerp(0.8, 0.75, ease) + Math.sin(time * 1.5) * 0.03
      topGroupRef.current.position.set(targetX, targetY, -0.4)
      topGroupRef.current.rotation.y += 0.008
      topGroupRef.current.scale.setScalar(THREE.MathUtils.lerp(0.01, 1, ease))
    }

    // 2. Lemon & Citrus (Mid Right)
    if (midGroupRef.current) {
      const targetX = THREE.MathUtils.lerp(0.3, 1.35, ease)
      const targetY = THREE.MathUtils.lerp(0.5, 0.1, ease) + Math.sin(time * 1.6 + 1) * 0.035
      midGroupRef.current.position.set(targetX, targetY, 0.2)
      midGroupRef.current.rotation.y += 0.012
      midGroupRef.current.scale.setScalar(THREE.MathUtils.lerp(0.01, 1, ease))
    }

    // 3. Wood Slice (Bottom Right)
    if (baseGroupRef.current) {
      const targetX = THREE.MathUtils.lerp(0.2, 1.25, ease)
      const targetY = THREE.MathUtils.lerp(-0.6, -0.45, ease) + Math.sin(time * 1.4 + 2) * 0.03
      baseGroupRef.current.position.set(targetX, targetY, 0.4)
      baseGroupRef.current.rotation.z += 0.009
      baseGroupRef.current.scale.setScalar(THREE.MathUtils.lerp(0.01, 1, ease))
    }

    // Olfactory Pyramid Card Animation
    if (cardPanelRef.current) {
      cardPanelRef.current.style.opacity = THREE.MathUtils.clamp((p - 0.2) / 0.8, 0, 1)
      cardPanelRef.current.style.transform = `translateY(${THREE.MathUtils.lerp(25, 0, ease)}px)`
    }
  })

  return (
    <group ref={ref} {...props}>
      <WaterSplashRing />

      <group ref={topGroupRef} scale={0}>
        <RealisticFloral />
      </group>

      <group ref={midGroupRef} scale={0}>
        <RealisticLemon />
      </group>

      <group ref={baseGroupRef} scale={0}>
        <WoodDisc />
      </group>

      <Html fullscreen style={{ pointerEvents: 'none', zIndex: 10 }}>
        <div
          ref={cardPanelRef}
          style={{
            position: 'absolute',
            top: '28%',
            left: '4%',
            width: '320px',
            padding: '24px 22px',
            background: 'rgba(5, 5, 5, 0.92)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            borderRadius: '14px',
            border: '1.5px solid #F4D03F',
            boxShadow: '0 20px 50px rgba(0, 0, 0, 0.95), 0 0 30px rgba(244, 208, 63, 0.25)',
            color: '#ffffff',
            fontFamily: "'Cinzel', 'Playfair Display', Georgia, serif",
            opacity: 0,
            pointerEvents: 'auto',
          }}
        >
          <h2
            style={{
              margin: '0 0 18px 0',
              fontSize: '17px',
              fontWeight: '700',
              letterSpacing: '2.5px',
              color: '#F4D03F',
              textTransform: 'uppercase',
              borderBottom: '1px solid rgba(244, 208, 63, 0.5)',
              paddingBottom: '8px',
            }}
          >
            Olfactory Pyramid
          </h2>

          <div style={{ marginBottom: '18px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
              <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#F4D03F', boxShadow: '0 0 8px #F4D03F' }}></span>
              <span style={{ fontSize: '13px', fontWeight: 'bold', color: '#F4D03F', letterSpacing: '1.2px' }}>TOP NOTES</span>
            </div>
            <p style={{ margin: 0, fontSize: '14px', color: '#FFFFFF', paddingLeft: '16px', fontFamily: 'sans-serif', fontWeight: '600', lineHeight: '1.4' }}>
              Italian Bergamot & Pink Pepper
            </p>
          </div>

          <div style={{ marginBottom: '18px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
              <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#FCE4EC', boxShadow: '0 0 8px #FCE4EC' }}></span>
              <span style={{ fontSize: '13px', fontWeight: 'bold', color: '#F4D03F', letterSpacing: '1.2px' }}>HEART NOTES</span>
            </div>
            <p style={{ margin: 0, fontSize: '14px', color: '#FFFFFF', paddingLeft: '16px', fontFamily: 'sans-serif', fontWeight: '600', lineHeight: '1.4' }}>
              Damascus Rose & Jasmine Sambac
            </p>
          </div>

          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
              <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#8D6E63', boxShadow: '0 0 8px #8D6E63' }}></span>
              <span style={{ fontSize: '13px', fontWeight: 'bold', color: '#F4D03F', letterSpacing: '1.2px' }}>BASE NOTES</span>
            </div>
            <p style={{ margin: 0, fontSize: '14px', color: '#FFFFFF', paddingLeft: '16px', fontFamily: 'sans-serif', fontWeight: '600', lineHeight: '1.4' }}>
              Amberwood, Vetiver & Vanilla
            </p>
          </div>
        </div>
      </Html>
    </group>
  )
})

export default FloatingNotes