import { useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useFragranceStore } from '../store/fragranceStore'

gsap.registerPlugin(ScrollTrigger)

export const useScentJourneyScroll = (containerRef) => {
  const setPhase = useFragranceStore((state) => state.setJourneyPhase)
  const setProgress = useFragranceStore((state) => state.setJourneyProgress)

  useEffect(() => {
    if (!containerRef.current) return
    const sections = containerRef.current.querySelectorAll('.journey-phase')
    if (!sections.length) return

    const triggers = []

    sections.forEach((section, index) => {
      const phase = section.dataset.phase
      let lastProgress = -1

      const st = ScrollTrigger.create({
        trigger: section,
        start: 'top center',
        end: 'bottom center',
        onEnter: () => setPhase(phase),
        onEnterBack: () => setPhase(phase),
        onUpdate: (self) => {
          const globalProgress = (index + self.progress) / sections.length
          // Only dispatch state update if progress shifted significantly (> 1%)
          if (Math.abs(globalProgress - lastProgress) > 0.01) {
            lastProgress = globalProgress
            setProgress(globalProgress)
          }
        },
      })
      triggers.push(st)
    })

    return () => triggers.forEach((st) => st.kill())
  }, [containerRef, setPhase, setProgress])
}