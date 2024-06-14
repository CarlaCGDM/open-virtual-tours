import { useState, useEffect } from 'react'
import { FileUploadAPI } from '../../apis/FileUploadAPI.js'

/**
 * Upload 3D environment alongside a generated thumbnail image and send storage URI to parent component.
 * @returns 
 */

export default function UploadImageFileForm(props) {

    // Data sent to the parent component:

    const [imageURL, setImageURL] = useState("")

    useEffect(() => { props.updateImageURL(imageURL) }, [imageURL]);

    // Upload 3D model to backend:

    const [imageFile, setImageFile] = useState("")

    const uploadImage = () => {

        // When we hit upload:
        console.log("File to upload: ")
        console.log(imageFile)

        // Create formData:
        const formData = new FormData()
        formData.append("image", imageFile)

        // Send fotmData to server and get imageURL:
        FileUploadAPI.uploadImage(formData).then((response) => {
            console.log(response)
            setImageURL(`/uploads/images/${response.data}`)
        })


    }

    return <>
        <div className="model-upload-form">
            <div>
                <input type="file" name="model" onChange={(e) => { setImageFile(e.target.files[0]) }} />
                <button onClick={uploadImage}>Upload image</button>
            </div>

            <img src={imageURL ? `${process.env.REACT_APP_UPLOADS_ROOT + imageURL}` : `${process.env.REACT_APP_UPLOADS_ROOT}/uploads/images/ImageNotFound.jpg`} />
        </div>
    </>
}