import { useState, useEffect } from 'react'
import { FileUploadAPI } from '../../apis/FileUploadAPI.js'
import ThumbnailStudio from '../canvases/ThumbnailStudio.js'


/**
 * Upload 3D environment alongside a generated thumbnail image and send storage URI to parent component.
 * @returns 
 */

export default function UploadModelFileForm({ updateModelURL, updateImageURL }) {

    // Data sent to the parent component:

    const [modelURL, setModelURL] = useState("")
    const [imageURL, setImageURL] = useState("")

    useEffect(() => { updateModelURL(modelURL) }, [modelURL]);
    useEffect(() => { updateImageURL(imageURL) }, [imageURL]);

    // Data sent to and obtained from the child component:

    const [newIMGFile, setNewIMGFile] = useState("")
    const handleSnapshot = (snapshot) => {
        setNewIMGFile(snapshot)
    }

    useEffect(() => { if (newIMGFile) uploadImage() }, [newIMGFile]);

    // Upload 3D model to backend:

    const [modelFile, setModelFile] = useState("")

    const [uploadProgress, setUploadProgress] = useState(0);

    const uploadModel = async (e) => {
        try {
            e.preventDefault(); // Ensure no default action
    
            console.log("File to upload:", modelFile);
    
            if (!modelFile) {
                alert("Please select a file.");
                return;
            }
    
            if (modelFile.name.endsWith(".zip")) {
                console.log("Uploading .zip file in chunks...");
    
                const response = await FileUploadAPI.uploadFileInChunks(modelFile, setUploadProgress);
                console.log("Upload Success Response:", response);
                setModelURL(`${response}`);
            } else {
                console.log("You need to provide a .zip file");
            }
        } catch (error) {
            console.error("Error in uploadModel:", error);
        }
    };
    


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
                <input type="file" name="model" onChange={(e) => setModelFile(e.target.files[0])} />
                <button type="button" onClick={(e) => uploadModel(e)}>Upload 3D model</button>

                {uploadProgress > 0 && <progress value={uploadProgress} max="100">{uploadProgress}%</progress>}
            </div>

            <div>{modelURL}</div>

            <ThumbnailStudio
                modelURL={modelURL}
                imageURL={imageURL}
                fileName={modelFile.name}
                handleSnapshot={(snapshot) => handleSnapshot(snapshot)}
            />
        </div>
    </>
}