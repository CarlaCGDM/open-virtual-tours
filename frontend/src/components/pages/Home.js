import { Canvas } from '@react-three/fiber'
import TestAPICall from '../TestAPICall.js'

export default function Home() {
  return <>
    <div> Home page </div>
    <div> Testing build sync again</div>
    <TestAPICall />
    <Canvas>
        <mesh>
          <torusKnotGeometry />
          <meshNormalMaterial />
        </mesh>
    </Canvas>
  </>
}