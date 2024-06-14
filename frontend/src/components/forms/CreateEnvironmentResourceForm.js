import { useState, useEffect } from 'react'
import { useGLTF } from '@react-three/drei'
import { EnvironmentAPI } from '../../apis/EnvironmentAPI.js'
import extractMarkerData from '../../utils/modelUtils.js'
import UploadModelFileForm from './UploadModelFileForm.js'
import './Forms.css'

/**
 * Upload 3D model data and files.
 * @returns 
 */

export default function CreateEnvironmentResourceForm({ onClose, onCardCreated }) {

    // Data from the main input form:
    console.log("im in!")
    const [name, setName] = useState("")
    const [description, setDescription] = useState("")
    const [author, setAuthor] = useState("")
    const [license, setLicense] = useState("")

    // Data from the child component:

    const [modelURL, setModelURL] = useState("")
    const [imageURL, setImageURL] = useState("")

    const currentModel = useGLTF(modelURL ? modelURL : `${process.env.REACT_APP_UPLOADS_ROOT}/uploads/environments/DemoMuseum01.glb`)

    // Upload data to backend:

    const uploadForm = () => {

        // Extract marker data:

        const markerData = extractMarkerData(currentModel)

        // Create form data:

        const formData = new FormData()
        formData.append("name", name)
        formData.append("description", description)
        formData.append("author", author)
        formData.append("license", license)
        formData.append("modelURL", modelURL)
        formData.append("imgURL", imageURL)
        formData.append("modelCount", markerData.floorMarkers)
        formData.append("panelCount", markerData.wallMarkers)
        formData.append("stringifiedPath", JSON.stringify(markerData.path))

        console.log(formData)

        // Send form data:

        EnvironmentAPI.createOne(formData).then((response) => {
            console.log(response)
            onCardCreated()
        })
    }

    return (
        <div className="popup-form">
            <h2>Upload new 3D environment</h2>
            <label>Name:<input type="text" onChange={(e) => { setName(e.target.value) }} /></label>< br />
            <label>Description:<input type="text" onChange={(e) => { setDescription(e.target.value) }} /></label>< br />
            <label>Author:<input type="text" onChange={(e) => { setAuthor(e.target.value) }} /></label>< br />
            <label>License:<input type="text" onChange={(e) => { setLicense(e.target.value) }} /></label>< br />

            <UploadModelFileForm
                updateModelURL={(modelURL) => setModelURL(modelURL)}
                updateImageURL={(imageURL) => setImageURL(imageURL)}
                environment={true}
            />

            <div className="confirm-cancel-buttons">
                <button onClick={() => { uploadForm() }} disabled={!modelURL && !imageURL}>Confirm</button>
                <button className="cancel-button" onClick={() => { onClose() }}>Cancel</button>
            </div>
        </div>
    )
}