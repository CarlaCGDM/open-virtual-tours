import { useState} from 'react'
import { useGLTF } from '@react-three/drei'
import { EnvironmentAPI } from '../../apis/EnvironmentAPI.js'
import UploadFileForm from './UploadModelFileForm.js'
import extractMarkerData from '../../utils/modelUtils.js'

/**
 * Upload 3D model data and files.
 * @returns 
 */

export default function CreateNewEnvironmentResource() {

    // Data from the main input form:

    const [name,setName] = useState("")
    const [description,setDescription] = useState("")
    const [author,setAuthor] = useState("")
    const [license,setLicense] = useState("")

    // Data from the child component:

    const [modelURL, setModelURL] = useState("")
    const [imageURL, setImageURL] = useState("")
    const [model, setModel] = useState({})

    useEffect(() => { setModel(useGLTF(modelURL)) }, [modelURL]);

    // Data extracted from the 3D model:

    const [markerData, setMarkerData] = useState({})

    // Upload data to backend:

    const uploadForm = () => {

        // Extract marker data:

        setMarkerData(extractMarkerData(model))

        console.log("Environment model to be processed: ")
        console.log(model)
        console.log("Extracted marker data:")
        console.log(markerData)

        // Create form data:

        const formData = new FormData()
        formData.append("name", name)
        formData.append("description",description)
        formData.append("author", author)
        formData.append("license", license)
        formData.append("modelURL", modelURL)
        formData.append("imgURL", imageURL)
        formData.append("modelSlots", markerData.modelSlots)
        formData.append("panelSlots", markerData.panelSlots)
        formData.append("path", markerData.path)

        console.log(formData)

        // Send form data:

        EnvironmentAPI.createOne(formData).then((response) => {
            console.log(response)
        })
    }
    
    return <div className="popup-form">
        <p>Upload new 3D environment:</p>

        <label>Name:<input type="text" onChange={(e) => {setName(e.target.value)}} /></label>< br />
        <label>Description:<input type="text" onChange={(e) => {setDescription(e.target.value)}} /></label>< br />
        <label>Author:<input type="text" onChange={(e) => {setAuthor(e.target.value)}} /></label>< br />
        <label>License:<input type="text" onChange={(e) => {setLicense(e.target.value)}} /></label>< br />
        
        <UploadFileForm 
            updateModelURL={(modelURL) => setModelURL(modelURL)}
            updateImageURL={(imageURL) => setImageURL(imageURL)}
        />

        <button onClick={uploadForm}>Confirm</button>
        {/* <button className="closeButton" onClick={() => {props.showThisModal(false)}} >Cancel/Close</button> */}
    </div>
}