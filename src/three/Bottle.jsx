import React, { forwardRef, Suspense, useMemo } from 'react'
import { useGLTF } from '@react-three/drei'

const BOTTLE_MODEL_URL = '/lucky_tender_bottle.glb'

const Model = forwardRef(function Model({ url, capRef }, ref) {
  const { scene, nodes } = useGLTF(url)
  const clonedScene = useMemo(() => scene.clone(true), [scene])

  const capNode = nodes?.Cap || nodes?.cap || nodes?.BottleCap
  const bodyNode = nodes?.Body || nodes?.body || nodes?.BottleBody

  // Rotation [Math.PI / 2, Math.PI, 0] or [0, 0, 0] ensures label faces upright
  const uprightRotation = [Math.PI / 2, Math.PI, 0]

  if (capNode && bodyNode) {
    return (
      <group rotation={uprightRotation} scale={18} position={[0, -1.2, 0]}>
        <primitive ref={capRef} object={capNode.clone(true)} />
        <primitive object={bodyNode.clone(true)} />
      </group>
    )
  }

  return (
    <primitive
      object={clonedScene}
      scale={18}
      rotation={uprightRotation}
      position={[0, -1.2, 0]}
    />
  )
})

const Bottle = React.memo(
  forwardRef(function Bottle({ capRef, ...props }, ref) {
    return (
      <group position={[0, -0.08, 0]} ref={ref} {...props}>
        <Suspense fallback={null}>
          <Model url={BOTTLE_MODEL_URL} capRef={capRef} />
        </Suspense>
      </group>
    )
  })
)

useGLTF.preload(BOTTLE_MODEL_URL)

export default Bottle