import * as THREE from 'three'
import {
    React,
    useState, 
    useEffect,
} from 'react'
import { 
    Canvas, 
    useThree,
    useFrame
} from "@react-three/fiber"
import { 
    Clone, 
    useGLTF, 
    OrbitControls,
    PerspectiveCamera, 
    OrthographicCamera
} from '@react-three/drei'
import { gapSize } from 'three/examples/jsm/nodes/Nodes.js'

const Content = (props) => {

    // Get the 3D model
    const model = useGLTF(props.modelURL ? props.modelURL : `${process.env.REACT_APP_UPLOADS_ROOT}/uploads/models/CubePreset01.glb`)

    // Canvas dimensions
    const { size } = useThree();

    // Model dimensions
    const [dimensions, setDimensions] = useState({ width: 0, height: 0, depth: 0 })
    const [zoomFactor, setZoomFactor] = useState("")

    useEffect(() => {
        if (model) {
          // Compute the bounding box of the model
          const box = new THREE.Box3().setFromObject(model.scene)
          const modelSize = box.getSize(new THREE.Vector3())
          setDimensions({ width: modelSize.x, height: modelSize.y, depth: modelSize.z })

        //If the object is wider than its taller
        // if (size.width > size.height) {
        //     //Then divide it by the width
        //     setZoomFactor(size.height/dimensions.height)
        // } else {
        //     setZoomFactor(size.width/dimensions.width)
        // }
        }
      }, [model])

    return (
        <>
                
                <directionalLight position={[1,2,3]} intensity={4.5}/>
                <ambientLight intensity={1.5} />

                <OrthographicCamera 
                    makeDefault 
                    position={[0,0,Math.max(dimensions.width,dimensions.depth)]} 
                    zoom={size.height/dimensions.height * 0.75}/>

                <OrbitControls />
               
                <Clone 
                object={ model.scene } 
                position={[0,-(dimensions.height/2),0] }
                />
        </>
    )
  }


const ModelPreview = (props) => {

    return (
        <>
            <Canvas className="model-preview-canvas">
                
                <Content {...props}/>

            </Canvas>
        </>
    )
  }

export default ModelPreview