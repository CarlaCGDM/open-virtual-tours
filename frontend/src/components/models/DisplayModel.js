import React, { useState, useEffect, useDeferredValue, useMemo, Suspense } from 'react';
import * as THREE from 'three'
import { Clone, useGLTF, Detailed } from '@react-three/drei'
import './DisplayModel.css'
import Annotation from './Annotation.js'
import InfoCardPopup from '../modals/InfoCardPopup.js'
import { ModelAPI } from '../../apis/ModelAPI.js'
import { Select } from '@react-three/postprocessing'

const DisplayModel = ({ id, slot, position, rotation, devMode, setPopup, setPopupContent }) => {

    const [hovered, setHovered] = useState(false);

    const computeBoundingBox = (model) => {
        const box = new THREE.Box3().setFromObject(model)
        const size = box.getSize(new THREE.Vector3())
        return { width: size.x, height: size.y, depth: size.z }
    }

    // Model content

    const [model, setModel] = useState("")

    let modelURL = model.modelURL
        ? `${process.env.REACT_APP_UPLOADS_ROOT + model.modelURL}`
        : `${process.env.REACT_APP_UPLOADS_ROOT}/uploads/extracted/CubePreset01`

    useEffect(() => {
        ModelAPI.getOne(id)
            .then((data) => {
                setModel(data)
            })
    }, [id]);

    // Load model

    function LazyLoadLowresModel({ url }) {
        const deferred = useMemo(() => url, [url]); // Ensure URL only updates when it changes
        const { scene } = useGLTF(deferred + "/LOD_03.glb")
        const { width, height, depth } = computeBoundingBox(scene || new THREE.Object3D())

        // Ensure models are loaded
        if (!scene) {
            console.warn("Lowest resolution model failed to load:", { scene });
            return null;  // Prevent rendering until models are available
        }

        return (
            <>
                {devMode && <Annotation position={[0, height + 2, 0]}>
                    <p className='index-annotation'>{`<${slot}>` || "< 0 >"}</p>
                </Annotation>}
                {<Annotation position={[0, height + 0.75, 0]}>
                    <p className='annotation'
                    >{model.name}</p>
                </Annotation>}
                <Select enabled={hovered}>
                    <Clone object={scene} position={[0, 0.3, 0]} />
                </Select>
                <mesh position={[0, 0.05, 0]}>
                    <cylinderGeometry
                        args={[width * 0.3, width * 0.3, 0.1, 40]} />
                    <meshBasicMaterial
                        color={"black"} />
                </mesh>
            </>

        );
    }

        function LazyLoadModel({ url }) {
            const deferred = useMemo(() => url, [url]);

            const [low, mid, high] = useGLTF([
                deferred + "/LOD_03.glb",
                deferred + "/LOD_02.glb",
                deferred + "/LOD_01.glb"
            ]);

            // Ensure models are loaded
            if (!low || !mid || !high) {
                console.warn("One or more LOD models failed to load:", { low, mid, high });
                return null;  // Prevent rendering until models are available
            }

            const { scene: scene_low } = low;
            const { scene: scene_mid } = mid;
            const { scene: scene_high } = high;

            const { width, height, depth } = computeBoundingBox(scene_low || new THREE.Object3D());  // Avoid crashing if scene_low is missing

            return (
                <>
                    {devMode && <Annotation position={[0, height + 2, 0]}>
                        <p className='index-annotation'>{`<${slot}>` || "< 0 >"}</p>
                    </Annotation>}
                    {<Annotation position={[0, height + 0.75, 0]}>
                        <p className='annotation'
                        >{model.name}</p>
                    </Annotation>}
                    <Select enabled={hovered}>
                        <Detailed distances={[0, 10, 20]}>
                            {scene_high && <Clone object={scene_high} position={[0, 0.3, 0]} />}
                            {scene_mid && <Clone object={scene_mid} position={[0, 0.3, 0]} />}
                            {scene_low && <Clone object={scene_low} position={[0, 0.3, 0]} />}
                        </Detailed>
                    </Select>
                    <mesh position={[0, 0.05, 0]}>
                        <cylinderGeometry
                            args={[width * 0.3, width * 0.3, 0.1, 40]} />
                        <meshBasicMaterial
                            color={"black"} />
                    </mesh>
                </>
            );
        }


        // Handle click

        const handleClick = () => {
            setPopup(true)
            setPopupContent(<InfoCardPopup
                setPopup={(bool) => setPopup(bool)}
                content={model}
                isModel={true} />)
        }

        return (
            <>
                <group
                    position={position}
                    rotation={rotation}
                    onPointerOver={() => setHovered(true)}
                    onPointerOut={() => setHovered(false)}
                    onClick={() => handleClick()}
                >

                    <Suspense fallback={<LazyLoadLowresModel url={modelURL}/>}> {/* provide wireframe box as fallback */}
                        <LazyLoadModel key={id} url={modelURL} />
                    </Suspense>

                </group>
            </>
        )
    }

    export default DisplayModel

