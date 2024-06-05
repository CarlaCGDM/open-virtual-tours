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

    // console.log("Rendering tour experience")
    const tourModel = useGLTF(props.tourEnvironment.modelURL ? props.tourEnvironment.modelURL : `${process.env.REACT_APP_UPLOADS_ROOT}/uploads/models/CubePreset01.glb`)

    // Info popup
    const [popup, setPopup] = useState(false);
    const [popupContent, setPopupContent] = useState("")
    
    // Info from DisplayPath child component:
    const [scrollPages, setScrollPages] = useState(10)

    // Place 
    const [displayPanels, setDisplayPanels] = useState([])
    const [displayModels, setDisplayModels] = useState([])

    useEffect(() => {
      let index = 0;
      const newDisplayPanels = []
  
      tourModel.scene.traverse((object) => {
        // console.log('Looking for WallMarker objects.')
        if (object.name.includes('WallMarker')) {
          // console.log('Found WallMarker object.')
          object.visible=false
          newDisplayPanels.push(
            <DisplayPanel
            key={index} 
            setPopup={(bool) => setPopup(bool)} 
            setPopupContent={(content) => setPopupContent(content)}
            position={[object.position.x,object.position.y,object.position.z]} 
            id={props.tourEnvironment.panelSlots[index]} />
          )
          index++
        }
      })
  
      setDisplayPanels(newDisplayPanels)
    }, [tourModel])

    return <>

      { popup && popupContent }
            
      <Canvas className='tour-experience'>

        {/* Staging */}

        <directionalLight position={[1,2,3]} intensity={4.5}/>
        <ambientLight intensity={4.5} />

        {/* Navigation */}

        <ScrollControls pages={scrollPages} damping={0.3}>

          <DisplayPath tourModel={tourModel} setScrollPages={(n) => {setScrollPages(n)}} setModalOpacity={(p) => {props.setModalOpacity(p)}}/>
    
        </ScrollControls>

        {/* <OrbitControls /> */}

        {/* Environment */}

        {props.tourEnvironment && <Clone object={ tourModel.scene } />}

        {/* Content */}
        
        {displayPanels}

      </Canvas>
    </>
}