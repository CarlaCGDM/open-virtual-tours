import * as THREE from 'three'
import { Canvas, useFrame } from '@react-three/fiber'
import { useState, useRef, useMemo, useEffect } from 'react'
import { Clone, useGLTF, ScrollControls, OrbitControls, useScroll, PerspectiveCamera } from '@react-three/drei'
import DisplayPath from '../models/DisplayPath.js'


/**
 * Main component of the 3D tour application.
 * @returns 
 */

export default function TourExperience(props) {

    console.log("Rendering tour experience")
    const tourModel = useGLTF(props.tourEnvironment.modelURL ? props.tourEnvironment.modelURL : `${process.env.REACT_APP_UPLOADS_ROOT}/uploads/models/CubePreset01.glb`)

    // Info from child component:
    const [scrollPages, setScrollPages] = useState(10)

    // Infor for child component:
    const [scrollMode, setScrollMode] = useState(false); // Initially in scrolling mode


    return <>
        <div>
            <Canvas>

                <directionalLight position={[1,2,3]} intensity={4.5}/>
                <ambientLight intensity={4.5} />

                <ScrollControls pages={scrollPages} damping={0.3}>

                    <DisplayPath tourModel={tourModel} setScrollPages={(n) => {setScrollPages(n)}} />
    
                </ScrollControls>

                {props.tourEnvironment && <Clone object={ tourModel.scene } />}
                    
            </Canvas>
        </div>
    </>
}