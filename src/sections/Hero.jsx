import { useRef, useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const HERO_VIDEO_SRC = '/wwwtf.mp4'

const Hero = ({ onHeroProgress }) => {
  const heroRef = useRef(null)
  const fgVideoRef = useRef(null)
  const textRef = useRef(null)
  const progressCallbackRef = useRef(onHeroProgress)

  useEffect(() => {
    progressCallbackRef.current = onHeroProgress
  }, [onHeroProgress])

  useEffect(() => {
    const hero = heroRef.current
    const video = fgVideoRef.current
    const text = textRef.current
    if (!hero || !video || !text) return
    video.muted = true
    video.playsInline = true
    video.play().catch(() => {})
    progressCallbackRef.current?.(0)
    const mm = gsap.matchMedia()
    mm.add('(max-width: 767px)', () => {
      gsap.set(video, { scale: 1, rotation: 0, x: 0, y: 0, force3D: true, transformOrigin: 'center center' })
      gsap.set(text, { opacity: 1, y: 0 })
      const tl = gsap.timeline({ scrollTrigger: { trigger: hero, start: 'top top', end: '+=120%', pin: true, pinSpacing: true, scrub: 1, invalidateOnRefresh: true, onUpdate: (self) => { progressCallbackRef.current?.(self.progress) } } })
      tl.to(video, { scale: 1.04, duration: 1, ease: 'none' }, 0)
      return () => tl.kill()
    })
    mm.add('(min-width: 768px) and (max-width: 1023px)', () => {
      gsap.set(video, { scale: 1.1, rotation: 0, x: 0, y: 0, force3D: true, transformOrigin: 'center center' })
      gsap.set(text, { opacity: 0, y: 28 })
      const tl = gsap.timeline({ scrollTrigger: { trigger: hero, start: 'top top', end: '+=170%', pin: true, pinSpacing: true, scrub: 1, anticipatePin: 1, invalidateOnRefresh: true, onUpdate: (self) => { progressCallbackRef.current?.(self.progress) } } })
      tl.to(video, { scale: 1, duration: 1, ease: 'none' }, 0)
      tl.to(text, { opacity: 1, y: 0, duration: 0.2, ease: 'power2.out' }, 0.75)
      return () => tl.kill()
    })
    mm.add('(min-width: 1024px)', () => {
      gsap.set(video, { scale: 1.04, rotation: 0, x: 0, y: 0, force3D: true, transformOrigin: 'center center' })
      gsap.set(text, { opacity: 0, y: 28 })
      const tl = gsap.timeline({ scrollTrigger: { trigger: hero, start: 'top top', end: '+=230%', pin: true, pinSpacing: true, scrub: 1, anticipatePin: 1, invalidateOnRefresh: true, onUpdate: (self) => { progressCallbackRef.current?.(self.progress) } } })
      tl.to(video, { scale: 1, duration: 1, ease: 'none' }, 0)
      tl.to(text, { opacity: 1, y: 0, duration: 0.2, ease: 'power2.out' }, 0.8)
      return () => tl.kill()
    })
    return () => { video.pause(); mm.revert() }
  }, [])

  return (
    <section
      ref={heroRef}
      className="relative h-[100svh] min-h-[500px] w-full overflow-hidden bg-[#0a0a0a]"
    >
      {/* VIDEO */}
      <video
        ref={fgVideoRef}
        src={HERO_VIDEO_SRC}
        autoPlay
        loop
        playsInline
        muted
        preload="auto"
        disablePictureInPicture
        disableRemotePlayback
        className="absolute inset-0 z-10 h-full w-full pointer-events-none select-none object-cover object-center"
        style={{
          backfaceVisibility: 'hidden',
          WebkitBackfaceVisibility: 'hidden',
          willChange: 'transform',
          transform: 'translateZ(0)',
          imageRendering: '-webkit-optimize-contrast',
        }}
      />

      {/* VIGNETTE — lighter so video stays crystal clear */}
      <div
        className="absolute inset-0 z-[15] pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at center, transparent 38%, rgba(0,0,0,0.16) 66%, rgba(0,0,0,0.52) 100%)',
        }}
      />

      {/* TEXT */}
      <div
        className="
          absolute inset-x-0 bottom-0 z-20 w-full
          px-4 pb-[clamp(1.5rem,6vw,3rem)]
          sm:px-6 sm:pb-10
          md:bottom-auto md:top-0 md:px-10 md:pt-32
          lg:px-12 lg:pt-40
        "
      >
        <div
          ref={textRef}
          className="
            mx-auto w-full max-w-xl text-center
            md:mx-0 md:text-left
            drop-shadow-[0_4px_16px_rgba(0,0,0,0.9)]
          "
        >
          <h1
            className="
              text-[clamp(1.5rem,7vw,2.5rem)] font-light uppercase leading-none
              tracking-[0.10em] text-white
              sm:text-4xl sm:tracking-[0.14em]
              md:text-5xl md:tracking-[0.17em]
              lg:text-6xl lg:tracking-[0.18em]
            "
            style={{ fontFamily: "'Cormorant Garamond', serif" }}
          >
            LUCKY TENDER
          </h1>
          <p
            className="
              mt-2 text-[7px] font-medium uppercase leading-relaxed
              tracking-[0.10em] text-[#F0D49A]
              sm:text-[9px] sm:tracking-[0.18em]
              md:text-xs md:tracking-[0.22em]
              lg:text-sm lg:tracking-[0.25em]
            "
          >
            EAU DE PARFUM
            <span className="mx-1 sm:mx-2">•</span>
            RARE BOTANICAL EXTRACTS
          </p>
        </div>
      </div>
    </section>
  )
}

export default Hero
