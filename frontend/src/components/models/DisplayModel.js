import React from 'react'
import * as THREE from 'three'
import { ModifierStack, Taper } from "three.modifiers";
import { useState, useEffect } from 'react'
import { Clone, useGLTF } from '@react-three/drei'
import './DisplayModel.css'
import Annotation from './Annotation.js'
import InfoCardPopup from '../modals/InfoCardPopup.js'
import { ModelAPI } from '../../apis/ModelAPI.js'

const DisplayModel = (props) => {

    // Model content

    const [model, setModel] = useState("")
    // Dynamically generate a base adequate to the size of the model (60-75% width and height)

    useEffect(() => {
        ModelAPI.getOne(props.id)
            .then((data) => {
                setModel(data)
            })
    }, []);

    // Load model

    const modelModel = useGLTF( model.modelURL ? `/${process.env.REACT_APP_UPLOADS_ROOT + model.modelURL}` : `${process.env.REACT_APP_UPLOADS_ROOT}/uploads/models/CubePreset01.glb`)

    // Get dimensions

    const [dimensions, setDimensions] = useState({ width: 0, height: 0, depth: 0 })
    useEffect(() => {
        if (modelModel) {
            // Compute the bounding box of the model
            const box = new THREE.Box3().setFromObject(modelModel.scene)
            const size = box.getSize(new THREE.Vector3())
            setDimensions({ width: size.x, height: size.y, depth: size.z })
        }
    }, [modelModel])

    // Hover effect

    const [shiny, setShiny] = useState(false)

    // Handle click

    const handleClick = () => {
        props.setPopup(true)
        props.setPopupContent(<InfoCardPopup
            setPopup={(bool) => props.setPopup(bool)}
            content={model}
            isModel={true} />)
    }

    return (
        <>
            <group
                position={props.position}
                rotation={props.rotation}
                onPointerEnter={() => setShiny(true)}
                onPointerLeave={() => setShiny(false)}
                onClick={() => handleClick()}
            >
                {props.devMode && <Annotation position={[0, dimensions.height + 2, 0]}>
                    <p className='index-annotation'
                    >{ `<${props.slot}>` || "< 0 >"}</p>
                </Annotation>}
                {<Annotation position={[0, dimensions.height + 0.7, 0]}>
                    <p className='annotation'
                    >{model.name}</p>
                </Annotation>}
                <Clone
                 position={[0, 0.3, 0]} object={modelModel.scene} />
                {shiny && <Clone position={[0, 0.3, 0]} object={modelModel.scene} inject={<meshStandardMaterial color="magenta" opacity={0.8} transparent />} />}
                <mesh position={[0, 0.05, 0]}>
                    <cylinderGeometry args={[dimensions.width * 0.3, dimensions.width * 0.3, 0.1, 20]} />
                    <meshBasicMaterial color={shiny ? 0xff00ff : "black"} />
                </mesh>
            </group>
        </>
    )
}

export default DisplayModel

