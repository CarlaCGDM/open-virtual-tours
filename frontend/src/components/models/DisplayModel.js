import React from 'react'
import { useState, useRef, useMemo, useEffect } from 'react'
import { TextureLoader } from 'three'
import { Html } from '@react-three/drei'
import './DisplayModel.css'

const DisplayModel = (props) => {

  // Hover effect

  const [shiny, setShiny] = useState(false);


  
}

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
                <meshBasicMaterial color={0xff00ff} opacity={0.5} transparent/>
            </mesh>}
            <mesh position={[0,0,frame.depth]}>
                <planeGeometry args={[dimensions.width, dimensions.height]} />
                <meshBasicMaterial map={texture} />
            </mesh>
    </group>
    </>
  );
};