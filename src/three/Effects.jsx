import React, { useMemo } from 'react'
import { EffectComposer, Bloom, Vignette, ChromaticAberration, DepthOfField } from '@react-three/postprocessing'
import { BlendFunction } from 'postprocessing'
import * as THREE from 'three'

const Effects = () => {
  // Memoize Vector2 to prevent new instances on re-renders
  const offsetVector = useMemo(() => new THREE.Vector2(0.0008, 0.0008), [])

  return (
    <EffectComposer disableNormalPass multisampling={0}>
      {/* 1. Cinematic Soft Depth-of-Field */}
      <DepthOfField
        focusDistance={0.015}
        focalLength={0.02}
        bokehScale={2}
        height={480}
      />

      {/* 2. Soft Gold & Glass Bloom */}
      <Bloom
        intensity={0.6}
        luminanceThreshold={0.75}
        luminanceSmoothing={0.85}
        blendFunction={BlendFunction.SCREEN}
      />

      {/* 3. Subtle Optical Dispersion / Chromatic Aberration */}
      <ChromaticAberration
        blendFunction={BlendFunction.NORMAL}
        offset={offsetVector}
        radialModulation={true}
        modulationOffset={0.3}
      />

      {/* 4. Dark Edge Vignette for Focus */}
      <Vignette
        eskil={false}
        offset={0.3}
        darkness={0.75}
      />
    </EffectComposer>
  )
}

export default React.memo(Effects)