import { useState } from 'react'
import { ModelAPI } from '../../apis/ModelAPI.js'
import UploadModelFileForm from './UploadModelFileForm.js'

/**
 * Upload 3D model data and files.
 * @returns 
 */

export default function CreateModelResourceForm({onClose, onCardCreated}) {

    // Data from the main input form:

    const [name, setName] = useState("")
    const [description, setDescription] = useState("")
    const [author, setAuthor] = useState("")
    const [license, setLicense] = useState("")

    // Data from the child component:

    const [modelURL, setModelURL] = useState("")
    const [imageURL, setImageURL] = useState("")

    // Upload data to backend:

    const uploadForm = () => {

        // Create form data:

        const formData = new FormData()
        formData.append("name", name)
        formData.append("description", description)
        formData.append("author", author)
        formData.append("license", license)
        formData.append("modelURL", modelURL)
        formData.append("imgURL", imageURL)

        console.log(formData)

        // Send form data:

        ModelAPI.createOne(formData).then((response) => {
            console.log(response)
            onCardCreated()
        })
    }

    return <div className="popup-form">
        <h2>Upload new 3D model</h2>

        <label>Name:<input type="text" onChange={(e) => { setName(e.target.value) }} /></label>< br />
        <label>Description:<input type="text" onChange={(e) => { setDescription(e.target.value) }} /></label>< br />
        <label>Author:<input type="text" onChange={(e) => { setAuthor(e.target.value) }} /></label>< br />
        <label>License:<input type="text" onChange={(e) => { setLicense(e.target.value) }} /></label>< br />

        <UploadModelFileForm
            updateModelURL={(modelURL) => setModelURL(modelURL)}
            updateImageURL={(imageURL) => setImageURL(imageURL)}
            environment={false}
        />

        <div className="confirm-cancel-buttons">
            <button onClick={() => {uploadForm()}} disabled={!modelURL && !imageURL}>Confirm</button>
            <button className="cancel-button" onClick={() => {onClose()}}>Cancel</button>
        </div>
    </div>
}