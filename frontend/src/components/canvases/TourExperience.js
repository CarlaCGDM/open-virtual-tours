import * as THREE from 'three'
import { Canvas } from '@react-three/fiber'
import { useState, useEffect } from 'react'
import { Clone, useGLTF, ScrollControls, OrbitControls } from '@react-three/drei'
import DisplayPath from '../models/DisplayPath.js'
import DisplayPanel from '../models/DisplayPanel.js'
import DisplayModel from '../models/DisplayModel.js'


/**
 * Main component of the 3D tour application.
 * @returns 
 */

export default function TourExperience(props) {

    // console.log("Rendering tour experience")
    const tourModel = useGLTF(props.tourEnvironment ? `${process.env.REACT_APP_UPLOADS_ROOT + props.tourEnvironment.modelURL}` : `${process.env.REACT_APP_UPLOADS_ROOT}/uploads/models/CubePreset01.glb`)

    // Info popup
    const [popup, setPopup] = useState(false);
    const [popupContent, setPopupContent] = useState("")
    
    // Info from DisplayPath child component:
    const [scrollPages, setScrollPages] = useState(10)

    // Place 
    const [displayPanels, setDisplayPanels] = useState([])
    const [displayModels, setDisplayModels] = useState([])

    useEffect(() => {
      let panelIndex = 0
      let modelIndex = 0
      const newDisplayPanels = []
      const newDisplayModels = []
  
      tourModel.scene.traverse((object) => {
        // console.log('Looking for WallMarker objects.')
        if (object.name.includes('WallMarker')) {
          // console.log('Found WallMarker object.')
          object.visible=false
          newDisplayPanels.push(
            <DisplayPanel
            key={panelIndex} 
            setPopup={(bool) => setPopup(bool)} 
            setPopupContent={(content) => setPopupContent(content)}
            rotation={[object.rotation.x,object.rotation.y,object.rotation.z]}
            position={[object.position.x,object.position.y,object.position.z]} 
            id={props.tourEnvironment.panelSlots[panelIndex]} />
          )
          panelIndex++
        } else if (object.name.includes('FloorMarker')) {
          //console.log('Found FloorMarker object.')
          object.visible=false
          newDisplayModels.push(
            <DisplayModel
            key={modelIndex} 
            setPopup={(bool) => setPopup(bool)} 
            setPopupContent={(content) => setPopupContent(content)}
            rotation={[object.rotation.x,object.rotation.y,object.rotation.z]}
            position={[object.position.x,object.position.y,object.position.z]} 
            id={props.tourEnvironment.modelSlots[modelIndex]}/>
          )
          modelIndex++
        } else if (object.name.includes('Path')) {
            object.visible=false
        }
      })
  
      setDisplayPanels(newDisplayPanels)
      setDisplayModels(newDisplayModels)
    }, [tourModel])

    return <>

      { popup && popupContent }
            
      <Canvas className='tour-experience'>

        {/* Staging */}

        <directionalLight position={[1,2,3]} intensity={2.5}/>
        <directionalLight position={[-2,2,-2]} intensity={2.5}/>
        <ambientLight intensity={4.5} />

        {/* Navigation */}

        <ScrollControls pages={scrollPages} damping={0.3}>

          <DisplayPath tourModel={tourModel} setScrollPages={(n) => {setScrollPages(n)}} setModalOpacity={(p) => {props.setModalOpacity(p)}}/>
    
        </ScrollControls>

        {/* Environment */}

        {props.tourEnvironment && <Clone object={ tourModel.scene } />}

        {/* Content */}
        
        {displayPanels}
        {displayModels}

      </Canvas>
    </>
}