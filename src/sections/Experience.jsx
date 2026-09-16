// Experience.jsx
import { useRef, useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useFragranceStore } from '../store/fragranceStore'

gsap.registerPlugin(ScrollTrigger)

export const Experience = ({ onBeginJourney }) => {
  const sectionRef = useRef(null)
  const headerRef = useRef(null)
  const stepsRef = useRef([])
  const lineRef = useRef(null)
  const { setSelectedFragrance } = useFragranceStore()

  const steps = [
    {
      number: '01',
      title: 'Choose Your Essence',
      subtitle: 'Curated Selection',
      description: 'Explore our haute parfumerie collection and select the bespoke fragrance that matches your identity.',
      icon: '✨',
    },
    {
      number: '02',
      title: 'Personalize Your Bottle',
      subtitle: 'Artisanal Craftsmanship',
      description: 'Engrave custom initials, memorable dates, or custom insignia on hand-crafted glass bottles.',
      icon: '⚜️',
    },
    {
      number: '03',
      title: 'Experience the Scent',
      subtitle: 'Olfactory Signature',
      description: 'Unbox your personalized creation, formulated with rare botanical extracts and enduring longevity.',
      icon: '🔮',
    },
  ]

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header Entrance Animation
      if (headerRef.current) {
        gsap.from(headerRef.current, {
          scrollTrigger: {
            trigger: headerRef.current,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
          y: 30,
          opacity: 0,
          duration: 1,
          ease: 'power3.out',
        })
      }

      // Connecting Line Animation (Scrub Draw on Scroll)
      if (lineRef.current) {
        gsap.fromTo(
          lineRef.current,
          { scaleX: 0 },
          {
            scaleX: 1,
            ease: 'power2.inOut',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 65%',
              end: 'center center',
              scrub: 1,
            },
          }
        )
      }

      // Staggered Step Cards Entrance
      stepsRef.current.forEach((step, i) => {
        if (!step) return
        gsap.from(step, {
          scrollTrigger: {
            trigger: step,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
          y: 45,
          opacity: 0,
          duration: 0.9,
          delay: i * 0.15,
          ease: 'power3.out',
        })
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="experience"
      className="relative w-full py-28 px-6 md:px-12 bg-[#080808] text-stone-200 overflow-hidden font-sans"
    >
      {/* Background Lighting Accents */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-full pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-amber-500/5 rounded-full blur-[130px]" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-rose-500/5 rounded-full blur-[130px]" />
      </div>

      <div className="relative max-w-7xl mx-auto z-10">
        {/* Section Header */}
        <div ref={headerRef} className="text-center mb-24 space-y-3">
          <span className="text-[10px] md:text-xs tracking-[0.35em] text-amber-300/80 uppercase font-mono">
            The Journey
          </span>
          <h2 className="text-4xl md:text-6xl text-stone-100 font-serif font-light tracking-wide">
            The Experience
          </h2>
          <div className="w-16 h-px bg-gradient-to-r from-transparent via-amber-200/40 to-transparent mx-auto mt-4" />
        </div>

        {/* Steps Grid & Timeline */}
        <div className="relative">
          {/* Animated Connecting Line (Desktop) */}
          <div
            ref={lineRef}
            className="hidden lg:block absolute top-1/2 left-16 right-16 h-px bg-gradient-to-r from-amber-500/0 via-amber-200/40 to-amber-500/0 -translate-y-12 origin-left"
          />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-8">
            {steps.map((step, index) => (
              <div
                key={step.number}
                ref={(el) => (stepsRef.current[index] = el)}
                className="relative group"
              >
                <div className="relative h-full p-8 md:p-10 rounded-2xl bg-neutral-900/60 backdrop-blur-md border border-white/10 hover:border-amber-200/30 transition-all duration-500 hover:shadow-[0_0_30px_rgba(251,191,36,0.08)] flex flex-col justify-between text-center">
                  
                  {/* Floating Number Badge */}
                  <div className="mx-auto -mt-14 mb-6 w-14 h-14 rounded-full bg-neutral-950 border border-amber-200/30 flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:border-amber-200 transition-all duration-500">
                    <span className="text-xs font-mono tracking-wider font-semibold text-amber-200">
                      {step.number}
                    </span>
                  </div>

                  <div className="space-y-3">
                    <span className="text-[10px] tracking-[0.25em] text-stone-400 uppercase font-mono block">
                      {step.subtitle}
                    </span>
                    <h3 className="text-2xl text-stone-100 font-serif font-light tracking-wide group-hover:text-amber-200 transition-colors duration-300">
                      {step.title}
                    </h3>
                    <p className="text-xs font-sans text-stone-400 leading-relaxed font-light mt-2">
                      {step.description}
                    </p>
                  </div>

                  {/* Card Footer Line */}
                  <div className="mt-8 pt-4 border-t border-white/5 flex items-center justify-center">
                    <span className="text-stone-500 group-hover:text-amber-300/80 transition-colors duration-300 font-mono text-[11px] tracking-wider uppercase">
                      Step {step.number} • {step.icon}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Action Button */}
        <div className="mt-20 text-center">
          <button
            onClick={onBeginJourney}
            className="group relative px-10 py-4 bg-gradient-to-r from-amber-200 via-rose-100 to-amber-200 text-neutral-950 text-xs tracking-[0.25em] font-bold uppercase rounded-xl shadow-[0_0_25px_rgba(254,243,199,0.15)] hover:shadow-[0_0_35px_rgba(254,243,199,0.3)] transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
          >
            <span>Begin Your Journey</span>
          </button>
        </div>
      </div>
    </section>
  )
}

export default Experience