// Component that reads the data of a GLTF/GLB file and returns the JSON file with the data to the parent component

import { React,useEffect } from 'react'
import { Canvas } from "@react-three/fiber"
import { Clone, useGLTF } from '@react-three/drei'
import extractMarkerData from '../../utils/modelUtils.js'

const ModelParser = (props) => {

    // Get the 3D model
    const model = useGLTF(props.modelURL ? `${process.env.REACT_APP_UPLOADS_ROOT + props.modelURL}` : `${process.env.REACT_APP_UPLOADS_ROOT}/uploads/environments/DemoMuseum01.glb`)

    if (model) {

          // Get the markers data
        const markerData = extractMarkerData(model)

        // Send data to parent component
        useEffect(() => { props.updateMarkerData(markerData) }, [model]);

    }
  

    return (
        <Canvas>
            <Clone object={model.scene}/>
        </Canvas>
    )
}


export default ModelParser