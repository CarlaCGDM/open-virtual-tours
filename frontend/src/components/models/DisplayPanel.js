import React from 'react'
import { useState, useRef, useMemo, useEffect } from 'react'
import { TextureLoader } from 'three'
import { Html } from '@react-three/drei'
import './DisplayPanel.css'

const DisplayPanel = (props) => {

  const [dimensions, setDimensions] = useState("")
  const [frame, setFrame] = useState({depth: 0.1,offset:0.1})

  // Hover effect

  const [shiny, setShiny] = useState(false);

  const texture = new TextureLoader().load(props.imageUrl, function ( tex ) {

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
    onPointerEnter={() => setShiny(true)}
    onPointerLeave={() => setShiny(false)}
    onClick={() => props.setPopup(true)}
    >
        
        <Annotation position={[0,dimensions.height/2 + 0.5,0]}>
                <p className='annotation'
                >{props.label}</p> 
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
                <meshBasicMaterial color={0xff00ff} />
            </mesh>}
            <mesh position={[0,0,frame.depth]}>
                <planeGeometry args={[dimensions.width, dimensions.height]} />
                <meshBasicMaterial map={texture} />
            </mesh>
    </group>
    </>
  );
};

export default DisplayPanel;

function Annotation({ children, ...props }) {
    return (
        <Html
        {...props}
        as='div' // Wrapping element (default: 'div')
        prepend // Project content behind the canvas (default: false)
        center // Adds a -50%/-50% css transform (default: false) [ignored in transform mode]
        fullscreen // Aligns to the upper-left corner, fills the screen (default:false) [ignored in transform mode]
        distanceFactor={1} // If set (default: undefined), children will be scaled by this factor, and also by distance to a PerspectiveCamera / zoom by a OrthographicCamera.
        zIndexRange={[100, 0]} // Z-order range (default=[16777271, 0])
        transform // If true, applies matrix3d transformations (default=false)
        sprite // Renders as sprite, but only in transform mode (default=false)
        occlude={true} // Can be true or a Ref<Object3D>[], true occludes the entire scene (default: undefined)
        onOcclude={(hidden) => null} // Callback when the visibility changes (default: undefined)
        >
        {children}
        </Html>
    )
  }
