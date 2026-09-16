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

    // Force video settings
    fgVideo.muted = true
    fgVideo.playsInline = true
    progressCallbackRef.current?.(0)
    const isMobile = window.matchMedia('(max-width: 767px)').matches
    gsap.set(textRef.current, { opacity: isMobile ? 1 : 0, y: isMobile ? 0 : 24 })
    gsap.set(fgVideo, {
      // A subtle starting perspective makes the scroll sequence feel dimensional
      // without cropping the image too aggressively on narrow screens.
      scale: isMobile ? 1.08 : 1.18,
      rotationY: isMobile ? -3 : -9,
      rotationZ: isMobile ? -0.4 : -1.5,
      yPercent: isMobile ? 1 : 3,
      transformPerspective: 1800,
      transformOrigin: 'center center',
      force3D: true,
    })

    const seekState = { target: 0, seeking: false, frameId: 0, lastSeekAt: 0, disposed: false }
    const syncVideoFrame = () => {
      seekState.frameId = 0
      if (seekState.disposed || seekState.seeking || fgVideo.readyState < 2 || !Number.isFinite(fgVideo.duration) || fgVideo.duration <= 0) return

      const now = performance.now()
      if (now - seekState.lastSeekAt < 40) {
        seekState.frameId = requestAnimationFrame(syncVideoFrame)
        return
      }

      const maxTime = Math.max(fgVideo.duration - 0.05, 0)
      const nextTime = Math.min(Math.max(seekState.target, 0), maxTime)
      // Ignore tiny time deltas: on mobile they cause more decoder work than
      // visible motion, resulting in a less smooth scroll.
      if (Math.abs(nextTime - fgVideo.currentTime) <= 0.033) return

      seekState.seeking = true
      seekState.lastSeekAt = now
      try {
        fgVideo.currentTime = nextTime
      } catch {
        seekState.seeking = false
      }
    }
    const queueVideoFrame = () => {
      if (!seekState.frameId && !seekState.disposed) {
        seekState.frameId = requestAnimationFrame(syncVideoFrame)
      }
    }
    const handleSeeked = () => {
      seekState.seeking = false
      queueVideoFrame()
    }
    fgVideo.addEventListener('seeked', handleSeeked)

    let gsapCtx
    const initScroll = () => {
      gsapCtx = gsap.context(() => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: hero,
            start: 'top top',
            end: isMobile ? '+=280%' : '+=450%',
            pin: true,
            pinSpacing: true,
            scrub: isMobile ? 0.35 : 0.6,
            anticipatePin: isMobile ? 0 : 1,
            invalidateOnRefresh: true,
            onUpdate: (self) => {
              seekState.target = self.progress * Math.max(fgVideo.duration - 0.05, 0)
              queueVideoFrame()
              progressCallbackRef.current?.(self.progress)
            }
          }
        })

        tl.to(
          fgVideo,
          {
            scale: 1,
            rotationY: 0,
            rotationZ: 0,
            xPercent: 0,
            yPercent: 0,
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

    // Initialize once metadata is loaded
    const metadataHandler = () => initScroll()

    if (fgVideo.readyState >= 1) {
      initScroll()
    } else {
      fgVideo.addEventListener('loadedmetadata', metadataHandler, { once: true })
    }

    return () => {
      fgVideo.removeEventListener('loadedmetadata', metadataHandler)
      fgVideo.removeEventListener('seeked', handleSeeked)
      seekState.disposed = true
      if (seekState.frameId) cancelAnimationFrame(seekState.frameId)
      fgVideo.pause()
      if (gsapCtx) gsapCtx.revert()
    }
  }, [])

  return (
    <section
      ref={heroRef}
      className="relative flex h-[100svh] min-h-[500px] w-full items-center justify-center overflow-hidden bg-[#0a0a0a] [contain:paint]"
      style={{ perspective: '1800px' }}
    >
      <video
        ref={fgVideoRef}
        src={HERO_VIDEO_SRC}
        playsInline
        muted
        preload="auto"
        disablePictureInPicture
        disableRemotePlayback
        className="absolute inset-0 z-10 h-full w-full select-none object-cover pointer-events-none [backface-visibility:hidden] [will-change:transform]"
      />

      {/* BRAND TITLE */}
      <div className="absolute inset-x-0 bottom-[max(2rem,env(safe-area-inset-bottom))] z-20 w-full max-w-7xl mx-auto px-4 pointer-events-none text-center sm:inset-0 sm:top-auto sm:bottom-auto sm:translate-y-0 sm:px-12 sm:pt-40 md:pt-48 sm:text-left sm:self-start">
        <div
          ref={textRef}
          className="space-y-2 pointer-events-auto w-full max-w-lg mx-auto sm:mx-0 drop-shadow-[0_3px_14px_rgba(0,0,0,0.9)]"
        >
          <h1
            className="text-[clamp(1.9rem,9vw,3rem)] sm:text-5xl md:text-6xl font-light tracking-[0.12em] sm:tracking-[0.18em] text-white uppercase leading-[1.1] break-words"
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
