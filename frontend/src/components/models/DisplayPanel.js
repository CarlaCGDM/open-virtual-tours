import React from 'react'
import { useState, useRef, useMemo, useEffect } from 'react'
import { TextureLoader } from 'three'
import './DisplayPanel.css'
import Annotation from './Annotation.js'
import InfoCard from '../modals/InfoCardPopup.js'
import { PanelAPI } from '../../apis/PanelAPI.js'

const DisplayPanel = (props) => {

  // Panel content

    const [panel, setPanel] = useState("")
    const [dimensions, setDimensions] = useState("")
    const [frame, setFrame] = useState(
        {depth: 0.1,
        offset:0.1}
    )

    useEffect(() => {
        PanelAPI.getOne(props.id)
        .then((data) => {
            setPanel(data)
        })
    }, []);



  // Hover effect

  const [shiny, setShiny] = useState(false)

  // Handle click

  const handleClick = () => {
    props.setPopup(true)
    props.setPopupContent(<InfoCard 
        setPopup={(bool) => props.setPopup(bool)}
        content={panel}
        isModel={false}/>)
  }

  // console.log("Panel: ")
  // console.log(panel)

  const texture = new TextureLoader().load(process.env.REACT_APP_UPLOADS_ROOT + panel.imgURL, function ( tex ) {

    if (!dimensions) {
        const ratio = tex.image.width/tex.image.height
        if (ratio > 1) {
            setDimensions({
                width: ratio,
                height: 1
            })
        } else {
            setDimensions({
                width: 1,
                height: tex.image.height/tex.image.width
            })
        }
        
        // console.log("ratio: ", ratio)
    }
    
} )

// console.log(dimensions)

  return (
    <>
    <group position={props.position}
    rotation={props.rotation} 
    onPointerEnter={() => setShiny(true)}
    onPointerLeave={() => setShiny(false)}
    onClick={() => handleClick()}
    >
        
        {props.devMode && <Annotation position={[0, dimensions.height + 1, 0]}>
                    <p className='index-annotation-panel'
                    >{`<${props.slot}>` || "< 0 >"}</p>
                </Annotation>}
        <Annotation position={[0,dimensions.height/2 + 0.5,0]}>
                <p className='annotation'
                >{panel.name}</p> 
            </Annotation>
            <mesh position={[0,0,frame.depth/2 - 0.001]}>
                <boxGeometry args={[
                    dimensions.width + frame.depth, 
                    dimensions.height + frame.depth,
                    frame.depth]
                    } />
                <meshBasicMaterial  color={shiny ? 0xff00ff : "black"}/>
            </mesh>
            { shiny && <mesh position={[0,0,frame.depth + 0.001]}>
                <planeGeometry args={[dimensions.width + 0.1, dimensions.height + 0.1]} />
                <meshBasicMaterial color={0xff00ff} opacity={0.5} transparent/>
            </mesh>}
            <mesh position={[0,0,frame.depth]}>
                <planeGeometry args={[dimensions.width, dimensions.height]} />
                <meshBasicMaterial map={texture} />
            </mesh>
    </group>
    </>
  )
}

export default DisplayPanel


