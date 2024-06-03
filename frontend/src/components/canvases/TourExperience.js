import { Canvas } from '@react-three/fiber'
import { useState, useRef, useEffect } from 'react'
import { Clone, useGLTF, OrbitControls } from '@react-three/drei'


/**
 * Main component of the 3D tour application.
 * @returns 
 */

export default function TourExperience(props) {

    console.log("Rendering tour experience")
    const tourModel = useGLTF(props.tourEnvironment.modelURL ? props.tourEnvironment.modelURL : "uploads/models/CubePreset01.glb")


    return <>
        <div>
            <Canvas>

                <directionalLight position={[1,2,3]} intensity={4.5}/>
                <ambientLight intensity={4.5} />
                <OrbitControls />

                {props.tourEnvironment && <Clone object={ tourModel.scene } />}
                    
            </Canvas>
        </div>
    </>
}