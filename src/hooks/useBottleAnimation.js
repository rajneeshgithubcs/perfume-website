import { useRef, useEffect } from 'react'
import gsap from 'gsap'
import { usePerfume } from './usePerfume'

// Perfume switch transition (Keep this!)
export const useBottleAnimation = (groupRef) => {
  const perfume = usePerfume()
  const prevIdRef = useRef(perfume?.id)

  useEffect(() => {
    if (!groupRef.current || !perfume) return
    if (prevIdRef.current !== perfume.id) {
      const tl = gsap.timeline()
      tl.to(groupRef.current.scale, { x: 0.01, y: 0.01, z: 0.01, duration: 0.4, ease: 'power2.in' })
        .fromTo(groupRef.current.scale, { x: 0.01, y: 0.01, z: 0.01 }, { x: 1, y: 1, z: 1, duration: 0.8, ease: 'elastic.out(1, 0.5)' })
        .fromTo(groupRef.current.rotation, { y: Math.PI * 2 }, { y: 0, duration: 1.2, ease: 'power3.out' }, '<')
      prevIdRef.current = perfume.id
    }
  }, [perfume?.id, groupRef])
}

// REMOVE or DISABLE `useScrollBottleAnimation` if you are using the ScrollTrigger timeline inside Hero.jsx!