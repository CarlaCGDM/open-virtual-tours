import { useState} from 'react'
import { ModelAPI } from '../../apis/ModelAPI.js'
import UploadModelFileForm from './UploadModelFileForm.js'

/**
 * Upload 3D model data and files.
 * @returns 
 */

export default function CreateModelResource() {

    // Data from the main input form:

    const [name,setName] = useState("")
    const [description,setDescription] = useState("")
    const [author,setAuthor] = useState("")
    const [license,setLicense] = useState("")

    // Data from the child component:

    const [modelURL, setModelURL] = useState("")
    const [imageURL, setImageURL] = useState("")

    // Upload data to backend:

    const uploadForm = () => {

        // Create form data:

        const formData = new FormData()
        formData.append("name", name)
        formData.append("description",description)
        formData.append("author", author)
        formData.append("license", license)
        formData.append("modelURL", modelURL)
        formData.append("imgURL", imageURL)

        console.log(formData)

        // Send form data:

        ModelAPI.createOne(formData).then((response) => {
            console.log(response)
        })
    }
    
    return <div className="popup-form">
        <p>Upload new 3D model:</p>

        <label>Name:<input type="text" onChange={(e) => {setName(e.target.value)}} /></label>< br />
        <label>Description:<input type="text" onChange={(e) => {setDescription(e.target.value)}} /></label>< br />
        <label>Author:<input type="text" onChange={(e) => {setAuthor(e.target.value)}} /></label>< br />
        <label>License:<input type="text" onChange={(e) => {setLicense(e.target.value)}} /></label>< br />
        
        <UploadModelFileForm 
            updateModelURL={(modelURL) => setModelURL(modelURL)}
            updateImageURL={(imageURL) => setImageURL(imageURL)}
            environment={false}
        />

        <button onClick={uploadForm}>Confirm</button>
        {/* <button className="closeButton" onClick={() => {props.showThisModal(false)}} >Cancel/Close</button> */}
    </div>
}