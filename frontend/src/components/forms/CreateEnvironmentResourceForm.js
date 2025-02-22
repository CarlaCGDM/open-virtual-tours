import { useState, useEffect } from 'react'
import { EnvironmentAPI } from '../../apis/EnvironmentAPI.js'
import UploadModelFileForm from './UploadModelFileForm.js'
import ModelParser from '../canvases/ModelParser.js'
import './Forms.css'
import { GLTFLoader } from 'three-stdlib'

/**
 * Upload 3D model data and files.
 * @returns 
 */

export default function CreateEnvironmentResourceForm({ onClose, onCardCreated }) {

    // Data from the main input form:
    const [name, setName] = useState("")
    const [description, setDescription] = useState("")
    const [author, setAuthor] = useState("")
    const [license, setLicense] = useState("")

    // Data from the child component:

    const [modelURL, setModelURL] = useState("")
    const [imageURL, setImageURL] = useState("")
    const [markerData, setMarkerData] = useState("")
    // Upload data to backend:

    const uploadForm = () => {
        console.log("Attempting to upload...");
        console.log("markerData:", markerData);  // 🔥 Debug markerData
        console.log("markerData.floorMarkers:", markerData?.floorMarkers);  
        console.log("markerData.wallMarkers:", markerData?.wallMarkers);
        console.log("markerData.path:", markerData?.path);
    
        if (!markerData || !markerData.floorMarkers || !Array.isArray(markerData.floorMarkers)) {
            console.error("markerData is missing or incorrect!");
            return;
        }
    
        const formData = new FormData();
        formData.append("name", name);
        formData.append("description", description);
        formData.append("author", author);
        formData.append("license", license);
        formData.append("modelURL", modelURL);
        formData.append("imgURL", imageURL);
    
        markerData.floorMarkers.forEach((id, index) => {
            formData.append(`modelSlots[${index}]`, id);
        });
    
        formData.append("panelCount", markerData.wallMarkers);
        formData.append("stringifiedPath", JSON.stringify(markerData.path));
    
        console.log("Final FormData:", [...formData]); // 🔥 Debug entire formData
    
        EnvironmentAPI.createOne(formData).then((response) => {
            console.log("Upload success:", response);
            onCardCreated();
        }).catch(error => {
            console.error("Upload failed:", error);
        });
    };
    

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
            // return marker data here !!!! 
            />

            {modelURL && (
                <ModelParser
                    modelURL={modelURL}
                    updateMarkerData={(markerData) => setMarkerData(markerData)}
                />
            )}

            <div className="confirm-cancel-buttons">
                <button onClick={() => { uploadForm() }} disabled={!modelURL || !imageURL}>Confirm</button>
                <button className="cancel-button" onClick={() => { onClose() }}>Cancel</button>
            </div>
        </div>

    )
}