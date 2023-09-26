import { useRef, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Center, AccumulativeShadows, RandomizedLight, OrbitControls, Environment, Lightformer, MeshReflectorMaterial, Sparkles } from '@react-three/drei'
import { easing } from 'maath'
import CustomEffects from './Effects'
import ChocolateModel from './Chocolate'

export default function App() {

  return (
    <Canvas shadows camera={{ position: [3, 0.8, 5], fov: 35 }}>
      <color attach="background" args={['#efb459']} />
      <directionalLight position={[4, 7, 2]} intensity={1} />
      <Sparkles 
        scale={ [ 15, 5, 1 ] }
        position={ [ 0, 0, -0.75 ] }
        size={ 1 }
        count={ 250 }
        color={ "#efb459" }
        opacity={ 1 }

      />
      <CameraRig>
        <group position={[0, -0.6, 0]}>
          <Center top>
            <ChocolateModel rotation-y={Math.PI / 7} />
          </Center>

          <AccumulativeShadows temporal frames={100} color="red" colorBlend={0.5} toneMapped={true} alphaTest={0.75} opacity={2} scale={12}>
            <RandomizedLight intensity={Math.PI} amount={8} radius={7} ambient={0.5} position={[-5, 8, 10]} bias={0.001} />
          </AccumulativeShadows>
        </group>
        </CameraRig>
      <OrbitControls target={[0, 0.3, 0]} minPolarAngle={0} maxPolarAngle={Math.PI / 2} enableZoom={ false } enableRotate={ false } />
      <Environment>
        <Lightformer intensity={40} color={'orange'} rotation-y={Math.PI / 2} position={[-5, 1, 1]} scale={[20, 1, 1]} />
        <Lightformer intensity={20} rotation-y={Math.PI / 2} position={[-5, 4, -1]} scale={[20, 0.9, 1]} />
        <Lightformer intensity={60} rotation-y={Math.PI / 2} position={[10, 10, 10]} scale={[20, 1, 1]} />
      </Environment>

      <CustomEffects />
    </Canvas>
  )
}

function CameraRig({ children }) {
  const group = useRef()
  useFrame((state, delta) => {
    easing.dampE(group.current.rotation, [0, -state.pointer.x / 1.75, 0], 0.5, delta)
  })
  return <group ref={group}>{children}</group>
}

