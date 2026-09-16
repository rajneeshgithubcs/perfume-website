import { useRef, useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const HERO_VIDEO_SRC = '/rrpsa.mp4'

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

    /* =========================
       MOBILE
    ========================= */

    mm.add('(max-width: 767px)', () => {
      gsap.set(video, {
        scale: 1,
        rotationX: 0,
        rotationY: 0,
        rotationZ: 0,
        xPercent: 0,
        yPercent: 0,
        z: 0,
        transformPerspective: 0,
        force3D: true,
      })

      gsap.set(text, {
        opacity: 1,
        y: 0,
      })

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: hero,
          start: 'top top',
          end: '+=120%',
          pin: true,
          pinSpacing: true,
          scrub: 1,
          invalidateOnRefresh: true,

          onUpdate: (self) => {
            progressCallbackRef.current?.(self.progress)
          },
        },
      })

      tl.to(
        video,
        {
          scale: 1.03,
          duration: 1,
          ease: 'none',
        },
        0
      )

      return () => tl.kill()
    })

    /* =========================
       TABLET
    ========================= */

    mm.add('(min-width: 768px) and (max-width: 1023px)', () => {
      gsap.set(video, {
        scale: 1.08,
        rotationX: 1,
        rotationY: -1.5,
        rotationZ: -0.2,
        z: -30,
        transformPerspective: 1600,
        transformOrigin: 'center center',
        force3D: true,
      })

      gsap.set(text, {
        opacity: 0,
        y: 24,
      })

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: hero,
          start: 'top top',
          end: '+=170%',
          pin: true,
          pinSpacing: true,
          scrub: 1,
          anticipatePin: 1,
          invalidateOnRefresh: true,

          onUpdate: (self) => {
            progressCallbackRef.current?.(self.progress)
          },
        },
      })

      tl.to(
        video,
        {
          scale: 1,
          rotationX: 0,
          rotationY: 0,
          rotationZ: 0,
          z: 0,
          duration: 1,
          ease: 'none',
        },
        0
      )

      tl.to(
        text,
        {
          opacity: 1,
          y: 0,
          duration: 0.2,
          ease: 'power2.out',
        },
        0.75
      )

      return () => tl.kill()
    })

    /* =========================
       DESKTOP
    ========================= */

    mm.add('(min-width: 1024px)', () => {
      gsap.set(video, {
        scale: 1.22,
        rotationX: 1.5,
        rotationY: -2.5,
        rotationZ: -0.35,
        xPercent: 0,
        yPercent: 0,
        z: -50,
        transformPerspective: 1800,
        transformOrigin: 'center center',
        force3D: true,
      })

      gsap.set(text, {
        opacity: 0,
        y: 24,
      })

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: hero,
          start: 'top top',
          end: '+=230%',
          pin: true,
          pinSpacing: true,
          scrub: 1,
          anticipatePin: 1,
          invalidateOnRefresh: true,

          onUpdate: (self) => {
            progressCallbackRef.current?.(self.progress)
          },
        },
      })

      tl.to(
        video,
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
        text,
        {
          opacity: 1,
          y: 0,
          duration: 0.2,
          ease: 'power2.out',
        },
        0.8
      )

      return () => tl.kill()
    })

    return () => {
      video.pause()
      mm.revert()
    }
  }, [])

  return (
    <section
      ref={heroRef}
      className="
        relative
        h-[100svh]
        min-h-[500px]
        w-full
        overflow-hidden
        bg-[#0a0a0a]
      "
      style={{
        perspective: '1800px',
      }}
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
        className="
          absolute
          inset-0
          z-10
          h-full
          w-full
          pointer-events-none
          select-none

          object-cover
          object-center

          [backface-visibility:hidden]
          [will-change:transform]
        "
      />

      {/* VIGNETTE */}
      <div
        className="
          absolute
          inset-0
          z-[15]
          pointer-events-none

          bg-[radial-gradient(
            ellipse_at_center,
            transparent_45%,
            rgba(0,0,0,0.25)_70%,
            rgba(0,0,0,0.70)_100%
          )]
        "
      />

      {/* TEXT */}
      <div
        className="
          absolute
          inset-x-0
          bottom-0
          z-20
          w-full
          px-4
          pb-[clamp(1.5rem,6vw,3rem)]

          sm:px-6
          sm:pb-10

          md:bottom-auto
          md:top-0
          md:px-10
          md:pt-32

          lg:px-12
          lg:pt-40
        "
      >
        <div
          ref={textRef}
          className="
            mx-auto
            w-full
            max-w-xl
            text-center

            md:mx-0
            md:text-left

            drop-shadow-[0_4px_16px_rgba(0,0,0,0.9)]
          "
        >
          <h1
            className="
              text-[clamp(1.5rem,7vw,2.5rem)]
              font-light
              uppercase
              leading-none
              tracking-[0.10em]
              text-white

              sm:text-4xl
              sm:tracking-[0.14em]

              md:text-5xl
              md:tracking-[0.17em]

              lg:text-6xl
              lg:tracking-[0.18em]
            "
            style={{
              fontFamily: "'Cormorant Garamond', serif",
            }}
          >
            LUCKY TENDER
          </h1>

          <p
            className="
              mt-2
              text-[7px]
              font-medium
              uppercase
              leading-relaxed
              tracking-[0.10em]
              text-[#F0D49A]

              sm:text-[9px]
              sm:tracking-[0.18em]

              md:text-xs
              md:tracking-[0.22em]

              lg:text-sm
              lg:tracking-[0.25em]
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