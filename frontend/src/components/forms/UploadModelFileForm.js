import { Canvas } from '@react-three/fiber'
import { useState, useRef, useEffect } from 'react'
import { Clone, useGLTF, OrbitControls } from '@react-three/drei'
import { FileUploadAPI } from '../../apis/FileUploadAPI.js'
import ThumbnailStudio from '../canvases/ThumbnailStudio.js'
import { model } from 'mongoose'


/**
 * Upload 3D model alongside a generated thumbnail image and send storage URI to parent component.
 * @returns 
 */

export default function UploadModelFileForm(props) {

    // Data sent to the parent component:

    const [modelURL, setModelURL] = useState("")
    const [imageURL, setImageURL] = useState("")

    useEffect(() => { props.updateModelURL(modelURL) },[modelURL]);
    useEffect(() => { props.updateImageURL(imageURL) },[imageURL]);

    // Data obtained from child component:

    const [imageToUpload, setImageToUpload] = useState("")

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
            setModelURL(`/static/uploads/models/${response.data}`)
        })

    }

    // Upload 3D model thumbnail to backend:

    const uploadImage = () => {

        // Create formData:
        const formData = new FormData()
        formData.append("image", imageToUpload)

        // Send fotmData to server and get imageURL:
        FileUploadAPI.uploadImage(formData).then((response) => {
            console.log(response)
            setImageURL(`/static/uploads/images/${response.data}`)
        })

    }

    return <>
        <input type="file" name="model" onChange={(e) => {setModelToUpload(e.target.files[0])}} />
        <button onClick={uploadModel}>Upload 3D model</button>

        <ThumbnailStudio 
            modelURL={modelURL}
            imageURL={imageURL}
            updateThumbnailIMG={(thumbnailIMG) => setImageToUpload(thumbnailIMG)}
        />

        <button onClick={uploadImage}>Upload thumbnail image</button>
    </>
}