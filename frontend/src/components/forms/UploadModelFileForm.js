import { useState, useEffect } from 'react'
import { FileUploadAPI } from '../../apis/FileUploadAPI.js'
import ThumbnailStudio from '../canvases/ThumbnailStudio.js'
import { upload } from '@testing-library/user-event/dist/upload.js'


/**
 * Upload 3D environment alongside a generated thumbnail image and send storage URI to parent component.
 * @returns 
 */

export default function UploadModelFileForm(props) {

    // Data sent to the parent component:

    const [modelURL, setModelURL] = useState("")
    const [imageURL, setImageURL] = useState("")

    useEffect(() => { props.updateModelURL(modelURL) }, [modelURL]);
    useEffect(() => { props.updateImageURL(imageURL) }, [imageURL]);

    // Data sent to and obtained from the child component:

    const [newIMGFile, setNewIMGFile] = useState("")
    const handleSnapshot = (snapshot) => {
        setNewIMGFile(snapshot)
    }

    useEffect(() => { if (newIMGFile) uploadImage() }, [newIMGFile]);

    // Upload 3D model to backend:

    const [modelFile, setModelFile] = useState("")

    const uploadModel = () => {

        // When we hit upload:
        console.log("File to upload: ")
        console.log(modelFile)

        if (props.environment === true) {

            // Create form data:
            const formData = new FormData()
            formData.append("environment", modelFile)

            // Send data to server and get modelURL:
            FileUploadAPI.uploadEnvironment(formData).then((response) => {
                console.log(response)
                setModelURL(`/uploads/models/${response.data}`)
            })
        } else {

            // Create form data:
            const formData = new FormData()
            formData.append("model", modelFile)

            // Send data to server and get modelURL:
            FileUploadAPI.uploadModel(formData).then((response) => {
                console.log(response)
                setModelURL(`/uploads/models/${response.data}`)
            })
        }


    }

    // Upload 3D model thumbnail to backend:

    const uploadImage = () => {

        // Create formData:
        const formData = new FormData()
        formData.append("image", newIMGFile)

        // Send fotmData to server and get imageURL:
        FileUploadAPI.uploadImage(formData).then((response) => {
            console.log(response)
            setImageURL(`/uploads/images/${response.data}`)
        })
    }

    return <>
        <div className="model-upload-form">
            <div>
                <input type="file" name="model" onChange={(e) => { setModelFile(e.target.files[0]) }} />
                <button onClick={uploadModel}>Upload 3D model</button>
            </div>

            <ThumbnailStudio
                modelURL={modelURL}
                imageURL={imageURL}
                fileName={modelFile.name}
                handleSnapshot={(snapshot) => handleSnapshot(snapshot)}
            />
        </div>
    </>
}