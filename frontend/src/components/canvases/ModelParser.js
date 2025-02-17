// Component that reads the data of a GLTF/GLB file and returns the JSON file with the data to the parent component

import * as THREE from 'three'
import {
    React,
    useState,
    useEffect,
} from 'react'
import {
    Canvas,
    useThree
} from "@react-three/fiber"
import {
    Clone,
    useGLTF,
    OrbitControls,
    OrthographicCamera
} from '@react-three/drei'

const ModelParser = (props) => {

    // Get the 3D model
    const model = useGLTF(props.modelURL ? `${process.env.REACT_APP_UPLOADS_ROOT + props.modelURL}` : `${process.env.REACT_APP_UPLOADS_ROOT}/uploads/environments/DemoMuseum01.glb`)

    // Send data to parent component
    useEffect(() => { props.updateModelData(model) }, [model]);

    return (
        <Canvas>
            <Clone object={model.scene}/>
        </Canvas>
    )
}


export default ModelParser