import { Canvas } from '@react-three/fiber'

export default function Home() {
  return <>
    <div> Home page </div>
    <div> Testing build sync again</div>
    <Canvas>
        <mesh>
          <torusKnotGeometry />
          <meshNormalMaterial />
        </mesh>
    </Canvas>
  </>
}