import { useRef, useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const HERO_VIDEO_SRC = '/ttps.mp4'

const Hero = ({ onHeroProgress }) => {
  const heroRef = useRef(null)
  const fgVideoRef = useRef(null)
  const textRef = useRef(null)
  const progressCallbackRef = useRef(onHeroProgress)

  useEffect(() => {
    progressCallbackRef.current = onHeroProgress
  }, [onHeroProgress])

  useEffect(() => {
    const fgVideo = fgVideoRef.current
    const hero = heroRef.current
    
    if (!fgVideo || !hero) return

    // Let the browser's video decoder play continuously. Seeking a compressed
    // video for every scroll event forces keyframe decoding and is the source
    // of the visible stutter, especially on touch devices.
    fgVideo.muted = true
    fgVideo.playsInline = true
    fgVideo.play().catch(() => {})
    progressCallbackRef.current?.(0)
    const isMobile = window.matchMedia('(max-width: 767px)').matches
    gsap.set(textRef.current, { opacity: isMobile ? 1 : 0, y: isMobile ? 0 : 24 })
    gsap.set(fgVideo, {
      // Keep the complete composition visible on phones, then use depth and
      // rotation—not a heavily cropped zoom—for the 3D entrance.
      // The desktop scale compensates for the perspective rotation so its
      // edges never reveal the black hero background.
      scale: isMobile ? 1.04 : 1.22,
      rotationX: isMobile ? 1 : 1.5,
      rotationY: isMobile ? -1.5 : -2.5,
      rotationZ: isMobile ? -0.15 : -0.35,
      yPercent: isMobile ? 0.5 : 2,
      z: isMobile ? -20 : -50,
      transformPerspective: 1800,
      transformOrigin: 'center center',
      force3D: true,
    })

    let gsapCtx
    const initScroll = () => {
      gsapCtx = gsap.context(() => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: hero,
            start: 'top top',
            end: isMobile ? '+=160%' : '+=230%',
            pin: true,
            pinSpacing: true,
            // Direct scrub removes the delayed "catch-up" feeling while the
            // transform itself remains GPU-composited.
            scrub: true,
            anticipatePin: isMobile ? 0 : 1,
            invalidateOnRefresh: true,
            onUpdate: (self) => {
              progressCallbackRef.current?.(self.progress)
            }
          }
        })

        tl.to(
          fgVideo,
          {
            scale: 1,
            rotationX: 0,
            rotationY: 0,
            rotationZ: 0,
            xPercent: 0,
            yPercent: 0,
            z: 0,
            duration: 1,
            ease: 'none',
          },
          0
        )
        tl.to(
          textRef.current,
          { opacity: 1, y: 0, duration: 0.2, ease: 'power2.out' },
          0.8
        )
      }, hero)
    }

    initScroll()

    return () => {
      fgVideo.pause()
      if (gsapCtx) gsapCtx.revert()
    }
  }, [])

  return (
    <section
      ref={heroRef}
      className="relative flex h-[100svh] min-h-[520px] w-full items-center justify-center overflow-hidden bg-[#0a0a0a] [contain:paint] sm:min-h-[500px]"
      style={{ perspective: '1800px' }}
    >
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
        className="absolute inset-0 z-10 h-full w-full select-none object-cover object-center pointer-events-none [backface-visibility:hidden] [will-change:transform]"
      />

      {/* BRAND TITLE */}
      <div className="absolute inset-x-0 bottom-[max(2rem,env(safe-area-inset-bottom))] z-20 w-full max-w-7xl mx-auto px-4 pointer-events-none text-center sm:inset-0 sm:top-auto sm:bottom-auto sm:translate-y-0 sm:px-12 sm:pt-40 md:pt-48 sm:text-left sm:self-start">
        <div
          ref={textRef}
          className="space-y-2 pointer-events-auto w-full max-w-lg mx-auto sm:mx-0 drop-shadow-[0_3px_14px_rgba(0,0,0,0.9)]"
        >
          <h1
            className="text-[clamp(1.55rem,7.5vw,2.35rem)] sm:text-5xl md:text-6xl font-light tracking-[0.1em] sm:tracking-[0.18em] text-white uppercase leading-[1.1] break-words"
            style={{ fontFamily: "'Cormorant Garamond', serif" }}
          >
            LUCKY TENDER
          </h1>
          <p className="text-[9px] sm:text-xs md:text-sm tracking-[0.12em] sm:tracking-[0.25em] text-[#F0D49A] uppercase font-light font-sans font-medium leading-relaxed">
            EAU DE PARFUM &bull; RARE BOTANICAL EXTRACTS
          </p>
        </div>
      </div>

      <div className="absolute inset-0 z-[5] pointer-events-none bg-[radial-gradient(ellipse_at_center,_transparent_60%,_rgba(0,0,0,0.6)_100%)]" />
    </section>
  )
}

export default Hero
