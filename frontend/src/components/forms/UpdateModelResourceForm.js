import { useState } from 'react'
import { ModelAPI } from '../../apis/ModelAPI.js'
import UploadModelFileForm from './UploadModelFileForm.js'

/**
 * Upload 3D model data and files.
 * @returns 
 */

export default function UpdateModelResourceForm({ onClose, onCardUpdated, selectedCard }) {

    // Data from the main input form:

    const [name, setName] = useState(selectedCard.name)
    const [description, setDescription] = useState(selectedCard.description)
    const [author, setAuthor] = useState(selectedCard.author)
    const [license, setLicense] = useState(selectedCard.license)

    // Upload data to backend:

    const uploadForm = () => {

        // Create form data:

        const formData = new FormData()
        formData.append("name", name)
        formData.append("description", description)
        formData.append("author", author)
        formData.append("license", license)

        console.log(formData)

        // Send form data:

        ModelAPI.editOne(formData, selectedCard._id).then((response) => {
            console.log(response)
            onCardUpdated()
        })
    }

    return <div className="popup-form">
        <img src={selectedCard.imgURL} alt={selectedCard.name} />
        <h2>Edit {selectedCard.name}</h2>

        <label>Name:<input
            type="text"
            defaultValue={selectedCard.name}
            onChange={(e) => { setName(e.target.value) }}
        /></label>< br />

        <label>Description:<input
            type="text"
            defaultValue={selectedCard.description}
            onChange={(e) => { setDescription(e.target.value) }} /></label>< br />

        <label>Author:<input
            type="text"
            defaultValue={selectedCard.author}
            onChange={(e) => { setAuthor(e.target.value) }} /></label>< br />

        <label>License:<input
            type="text"
            defaultValue={selectedCard.license}
            onChange={(e) => { setLicense(e.target.value) }} /></label>< br />

        <div className="confirm-cancel-buttons">
            <button
                onClick={() => { uploadForm() }}>
                Confirm
            </button>
            <button
                className="cancel-button"
                onClick={() => { onClose() }}>
                Cancel
            </button>
        </div>
    </div>
}