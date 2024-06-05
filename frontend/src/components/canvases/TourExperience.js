import * as THREE from 'three'
import { Canvas, useFrame } from '@react-three/fiber'
import { useState, useRef, useMemo, useEffect } from 'react'
import { Clone, useGLTF, ScrollControls, OrbitControls, useScroll, PerspectiveCamera } from '@react-three/drei'
import DisplayPath from '../models/DisplayPath.js'
import DisplayPanel from '../models/DisplayPanel.js'


/**
 * Main component of the 3D tour application.
 * @returns 
 */

export default function TourExperience(props) {

    console.log("Rendering tour experience")
    const tourModel = useGLTF(props.tourEnvironment.modelURL ? props.tourEnvironment.modelURL : `${process.env.REACT_APP_UPLOADS_ROOT}/uploads/models/CubePreset01.glb`)

    // Info popup

    const [popup, setPopup] = useState(false);
    
    // Info from DisplayPath child component:
    const [scrollPages, setScrollPages] = useState(10)

    // Swap placeholders with the actual models

    const [displayPanels, setDisplayPanels] = useState([])

    useEffect(() => {
      let index = 0;
      const newDisplayPanels = []
  
      tourModel.scene.traverse((object) => {
        console.log('Looking for WallMarker objects.')
        if (object.name.includes('WallMarker')) {
          console.log('Found WallMarker object.')
          console.log(object.position)
          newDisplayPanels.push(
            <DisplayPanel setPopup={(bool) => setPopup(bool)} position={[object.position.x,object.position.y,object.position.z]} label="Astronaut picture" imageUrl="https://as2.ftcdn.net/v2/jpg/05/02/64/75/1000_F_502647583_VargVwrnWUamVRmTwtBAyC0JIp1kDrqq.jpg" />
          )
          index++
        }
      })
  
      setDisplayPanels(newDisplayPanels)
    }, [tourModel])

    console.log(displayPanels)

    return <>

{       popup && <div className='panel-popup'>Hello<button onClick={() => {setPopup(false)}}>close me</button></div>}        <Canvas className='tour-experience'>

            <directionalLight position={[1,2,3]} intensity={4.5}/>
            <ambientLight intensity={4.5} />

            <ScrollControls pages={scrollPages} damping={0.3}>

                <DisplayPath tourModel={tourModel} setScrollPages={(n) => {setScrollPages(n)}} setModalOpacity={(p) => {props.setModalOpacity(p)}}/>
    
            </ScrollControls>

            {/* <OrbitControls /> */}


            {props.tourEnvironment && <Clone object={ tourModel.scene } />}

            {displayPanels}
        </Canvas>
    </>
}