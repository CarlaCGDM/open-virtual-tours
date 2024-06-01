import { Canvas } from '@react-three/fiber'
import { useState, useRef, useEffect } from "react"
import { Clone, useGLTF, OrbitControls } from '@react-three/drei'
import { HexColorPicker } from "react-colorful";
import { FileUploadAPI } from "../../apis/FileUploadAPI.js"


/**
 * Upload 3D model alongside a generated thumbnail image and send storage URI to parent component.
 * @returns 
 */

export default function UploadFileForm(props) {

    // Color picker default color:

    const [customBackgroundColor, setCustomBackgroundColor] = useState("#292929")

    // Data sent to the parent component:

    const [modelURL, setModelURL] = useState("")
    const [imageURL, setImageURL] = useState("")

    useEffect(() => { props.updateModelURL(modelURL) },[modelURL]);
    useEffect(() => { props.updateImageURL(imageURL) },[imageURL]);

    // Data for the 3D model preview:

    const [modelPosition,setModelPosition] = useState([0,0,0])
    const [modelScale,setModelScale] = useState([1,1,1])
    const displayModel = useGLTF(modelURL ? modelURL : "https://res.cloudinary.com/dahr27egc/image/upload/v1706573387/hamburger_dlwxib.glb")
    const modelRef = useRef("")
    const canvasRef = useRef("")

    // Upload 3D model to backend:

    const [modelToUpload, setModelToUpload] = useState("")

    const uploadModel = () => {

        // When we hit upload:
        console.log("File to upload: ")
        console.log(modelToUpload)

        // Create form data:
        const formData = new FormData()
        formData.append("model", modelToUpload)

        // Send data to server and get modelURL:
        FileUploadAPI.uploadModel(formData).then((response) => {
            console.log(response)
            setModelURL(`/static/uploads/models/${response}`)
        })

    }

    // Take snapshot of 3D model and upload image to Cloudinary

    const uploadImage = () => {

        // Take snapshot of canvas component as data URL:
        const imageToUpload = canvasRef.current.toDataURL('image/png')

        // Create form data:
        const formData = new FormData()
        formData.append("image", imageToUpload)

        // Send data to server and get imageURL:
        FileUploadAPI.uploadImage(formData).then((data) => {
            console.log(data)
            setModelURL(`/static/uploads/images/${data}`)
        })

    }

    return <>
        <input type="file" name="model" onChange={(e) => {setModelToUpload(e.target.files[0])}} />
        <button onClick={uploadModel}>Upload 3D model</button>
        <div>
        <div>
            <Canvas ref={canvasRef} gl={{ preserveDrawingBuffer: true }}>
                
        
                <directionalLight position={[1,2,3]} intensity={4.5}/>
                <ambientLight intensity={4.5} />
                <OrbitControls enablePan={true}/>

                <color attach="background" args={[customBackgroundColor]} />
                
               
                <Clone ref={modelRef} object={ displayModel.scene } position={modelPosition} scale={modelScale}/>
                
                
            </Canvas>
        </div>
        <HexColorPicker color={customBackgroundColor} onChange={setCustomBackgroundColor} />
        </div>
        <button onClick={() => {
            uploadImage()
            }}>Upload thumbnail image</button>
        <img src={imageURL}></img>
    </>
}