import React, { useState, useEffect, useDeferredValue, useMemo, Suspense } from 'react';
import * as THREE from 'three'
import { Clone, useGLTF } from '@react-three/drei'
import './DisplayModel.css'
import Annotation from './Annotation.js'
import InfoCardPopup from '../modals/InfoCardPopup.js'
import { ModelAPI } from '../../apis/ModelAPI.js'
import { Select } from '@react-three/postprocessing'

const DisplayModel = (props) => {

    const [hovered, setHovered] = useState(false);

    const computeBoundingBox = (model) => {
        const box = new THREE.Box3().setFromObject(model)
        const size = box.getSize(new THREE.Vector3())
        return { width: size.x, height: size.y, depth: size.z }
    }

    // Model content

    const [model, setModel] = useState("")
    const [dimensions, setDimensions] = useState("")

    let modelURL = model.modelURL
        ? `${process.env.REACT_APP_UPLOADS_ROOT + model.modelURL}`
        : `${process.env.REACT_APP_UPLOADS_ROOT}/uploads/models/CubePreset02.glb`

    useEffect(() => {
        ModelAPI.getOne(props.id)
            .then((data) => {
                setModel(data)
            })
    }, [props.id]);

    // Load model

    function LazyLoadModel({ url }) {

        const deferred = useMemo(() => url, [url]); // Ensure URL only updates when it changes
        const { scene } = useGLTF(deferred)
        const { width, height, depth } = computeBoundingBox(scene)


        return (
            <>
                {props.devMode && <Annotation position={[0, height + 2, 0]}>
                    <p className='index-annotation'
                    >{`<${props.slot}>` || "< 0 >"}</p>
                </Annotation>}
                {/* hovered && */ <Annotation position={[0, height + 0.75, 0]}>
                    <p className='annotation'
                    >{model.name}</p>
                </Annotation>}
                <Select enabled={hovered}>
                    <Clone object={scene} position={[0, 0.3, 0]} />
                </Select>
                <mesh position={[0, 0.05, 0]}>
                    <cylinderGeometry
                        args={[width * 0.3, width * 0.3, 0.1, 20]} />
                    <meshBasicMaterial
                        color={"black"} />
                </mesh>
            </>

        );
    }

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
                onPointerOver={() => setHovered(true)}
                onPointerOut={() => setHovered(false)}
                onClick={() => handleClick()}
            >

                <Suspense fallback={null}> {/* provide wireframe box as fallback */}
                    <LazyLoadModel key={props.id} url={modelURL} />
                </Suspense>

            </group>
        </>
    )
}

export default DisplayModel

