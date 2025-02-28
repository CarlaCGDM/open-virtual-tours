import * as THREE from 'three'
import {
    React,
    useState,
    useMemo,
    Suspense
} from 'react'
import {
    Canvas,
} from "@react-three/fiber"
import {
    Clone,
    useGLTF,
    Html,
    OrbitControls,
    PerspectiveCamera,
    Detailed
} from '@react-three/drei'


const Content = (props) => {

    const computeBoundingBox = (model) => {
        const box = new THREE.Box3().setFromObject(model)
        const size = box.getSize(new THREE.Vector3())
        return { width: size.x, height: size.y, depth: size.z }
    }

    function LazyLoadHighresModel({ url }) {
        const deferred = useMemo(() => url, [url]); // Ensure URL only updates when it changes
        const { scene } = useGLTF(deferred + "/LOD_00.glb")
        const { width, height, depth } = computeBoundingBox(scene || new THREE.Object3D())

        // Ensure models are loaded
        if (!scene) {
            console.warn("Highest resolution model failed to load:", { scene });
            return null;  // Prevent rendering until models are available
        }

        return (
            <>
                {scene && <Clone object={scene} position={[0, - height * 0.5, 0]} />}
            </>

        );
    }

    function LazyLoadModel({ url }) {

        const deferred = useMemo(() => url, [url]); // Ensure URL only updates when it changes

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
        const { width, height, depth } = computeBoundingBox(scene_low || new THREE.Object3D())

        return (
            <>
                <Detailed distances={[0, 10, 20]}>
                    {scene_low && <Clone object={scene_high} position={[0, - height * 0.5, 0]} />}
                    {scene_mid && <Clone object={scene_mid} position={[0, - height * 0.5, 0]} />}
                    {scene_high && <Clone object={scene_low} position={[0, - height * 0.5, 0]} />}
                </Detailed>
            </>

        );
    }

    return (
        <>
            <directionalLight position={[1, 2, 3]} intensity={2.5} />
            <ambientLight intensity={3.5} />

            <OrbitControls />

            <PerspectiveCamera makeDefault position={[0, 0, 5]} />

            {props.bgColor && <color attach="background" args={[props.bgColor ? props.bgColor : "black"]} />}

            {!props.toggleHighDetail && <Suspense fallback={null}>
                <LazyLoadModel url={`${process.env.REACT_APP_UPLOADS_ROOT + props.modelURL}`} />
            </Suspense>}

            {props.toggleHighDetail && <Suspense fallback={<Html style={{ backgroundColor: "black", width: '100px', color: 'white' }}>Loading...</Html>}>
                <LazyLoadHighresModel url={`${process.env.REACT_APP_UPLOADS_ROOT + props.modelURL}`} />
            </Suspense>}
        </>
    )
}


const ModelPreview = (props) => {
    const [toggleHighDetail, setToggleHighDetail] = useState(false);

    let toggleKey = 0

    const handleToggle = () => {
        setToggleHighDetail(prevState => !prevState); // Toggle the visibility of the highest LOD
        toggleKey++
    };

    return (
        <>
            <Canvas
                ref={props.canvasRef}
                gl={{ preserveDrawingBuffer: true }}
            >
                <Html>
                    <button className="toggle-lod-button" onClick={handleToggle}>
                        {toggleHighDetail ? "Hide Highest LOD" : "Show Highest LOD"}
                    </button>
                </Html>
                <Content {...props} toggleHighDetail={toggleHighDetail} key={toggleKey} />
            </Canvas>
        </>
    );
};
export default ModelPreview

