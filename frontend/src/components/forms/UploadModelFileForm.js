import { useState, useEffect } from 'react'
import { FileUploadAPI } from '../../apis/FileUploadAPI.js'
import ThumbnailStudio from '../canvases/ThumbnailStudio.js'


/**
 * Upload 3D environment alongside a generated thumbnail image and send storage URI to parent component.
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

        if (props.environment === true) {

            // Create form data:
            const formData = new FormData()
            formData.append("environment", modelToUpload)

            // Send data to server and get modelURL:
            FileUploadAPI.uploadEnvironment(formData).then((response) => {
                console.log(response)
                setModelURL(`/static/uploads/models/${response.data}`)
            })
        } else {

            // Create form data:
            const formData = new FormData()
            formData.append("model", modelToUpload)

            // Send data to server and get modelURL:
            FileUploadAPI.uploadModel(formData).then((response) => {
                console.log(response)
                setModelURL(`/static/uploads/models/${response.data}`)
            })
        }
        

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
            fileName={modelToUpload.name}
            updateThumbnailIMG={(thumbnailIMG) => setImageToUpload(thumbnailIMG)}
            uploadThumbnailIMG={() => {uploadImage()}}
        />
    </>
}