import { Canvas } from '@react-three/fiber'
import { useState, useRef, useEffect } from 'react'
import { Clone, useGLTF, OrbitControls } from '@react-three/drei'
import { HexColorPicker } from "react-colorful";


/**
 * Display 3D model with user-picked background and allow user to take snapshot.
 * @returns 
 */

export default function ThumbnailStudio(props) {

    // Color picker default color:

    const [customBackgroundColor, setCustomBackgroundColor] = useState("#292929")

    // Data sent to the parent component:

    const [thumbnailIMG, setThumbnailIMG] = useState("")
    useEffect(() => { props.updateThumbnailIMG(thumbnailIMG) },[thumbnailIMG]);

    // Data for the 3D model preview:
    
    const [modelPosition,setModelPosition] = useState([0,0,0])
    const [modelScale,setModelScale] = useState([1,1,1])
    const displayModel = useGLTF(modelURL ? modelURL : "https://res.cloudinary.com/dahr27egc/image/upload/v1706573387/hamburger_dlwxib.glb")
    const modelRef = useRef("")
    const canvasRef = useRef("")

    // Generate thumbnail image and upload it to backend:

    const saveImage = () => {

        // Take snapshot of canvas component as data URL:
        const imageDataURL = canvasRef.current.toDataURL('image/png')

        // Convert data URL to file:
        const imageToUpload = dataURLtoFile(imageDataURL,`${modelToUpload.name}_thumbnailIMG`)

        // Set resulting image as current image to send to parent:
        setThumbnailIMG(imageToUpload)
    }

    return <>
        <div>Thumbnail Studio</div>
        <div>
            <div>
                <div>Position model</div>
                <Canvas ref={canvasRef} gl={{ preserveDrawingBuffer: true }}>
            
                    <directionalLight position={[1,2,3]} intensity={4.5}/>
                    <ambientLight intensity={4.5} />
                    <OrbitControls enablePan={true}/>

                    <color attach="background" args={[customBackgroundColor]} />
                
                    <Clone ref={modelRef} object={ displayModel.scene } position={modelPosition} scale={modelScale}/>
                    
                </Canvas>
            </div>

            <div>Pick bg color</div>
            <HexColorPicker color={customBackgroundColor} onChange={setCustomBackgroundColor} />
        </div>

        <button onClick={() => {
            saveImage()
            }}>Take picture!
        </button>

        <img src={props.imageURL}></img>
    </>
}