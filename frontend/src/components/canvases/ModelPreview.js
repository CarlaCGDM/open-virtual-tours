import * as THREE from 'three'
import {
    React,
    useState,
    useEffect,
    useMemo,
    Suspense
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

import { ModelAPI } from '../../apis/ModelAPI.js'

const Content = (props) => {

    const computeBoundingBox = (model) => {
        const box = new THREE.Box3().setFromObject(model)
        const size = box.getSize(new THREE.Vector3())
        return { width: size.x, height: size.y, depth: size.z }
    }

    function LazyLoadModel({ url }) {


        const { size } = useThree();

        console.log("rendering lazyloadmodel " + props.modelURL)

        const deferred = useMemo(() => props.modelURL, [props.modelURL]); // Ensure URL only updates when it changes
        const { scene } = useGLTF(deferred)
        const { width, height, depth } = computeBoundingBox(scene)


        return (
            <>
                <OrthographicCamera
                    makeDefault
                    position={[0, 0, Math.max(width, depth)]}
                    zoom={size.height / height * 0.6} />

                <Clone 
                object={scene} 
                position={[0, - height * 0.5, 0]}/>
            </>

        );
    }

    return (
        <>
            <directionalLight position={[1, 2, 3]} intensity={2.5} />
            <ambientLight intensity={3.5} />

            <OrbitControls />

            {props.bgColor && <color attach="background" args={[props.bgColor ? props.bgColor : "black"]} />}

            <Suspense fallback={null}>
                <LazyLoadModel url={props.modelURL} />
            </Suspense>
        </>
    )
}


const ModelPreview = (props) => {

    return (
        <>
            <Canvas
                ref={props.canvasRef}
                gl={{ preserveDrawingBuffer: true }}
            >

                <Content {...props} />

            </Canvas>
        </>
    )
}

export default ModelPreview

