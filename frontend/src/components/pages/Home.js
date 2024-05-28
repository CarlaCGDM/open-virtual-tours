import { Canvas } from '@react-three/fiber'

export default function Home() {
  return <>
    <div> Home page </div>
    <Canvas>
        <mesh>
          <torusKnotGeometry />
          <meshNormalMaterial />
        </mesh>
    </Canvas>
  </>
}