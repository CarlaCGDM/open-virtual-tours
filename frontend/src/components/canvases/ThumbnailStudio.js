import { useState, useRef } from 'react'
import { useGLTF } from '@react-three/drei'
import dataURLtoFile from '../../utils/fileUtils.js'
import { PopoverPicker } from '../buttons/PopoverPicker.js'
import ModelPreview from './ModelPreview.js'



/**
 * Display 3D model with user-picked background and allow user to take snapshot.
 * @returns 
 */

export default function ThumbnailStudio(props) {

    // Color picker default color:

    const [customBackgroundColor, setCustomBackgroundColor] = useState("#292929")

    // Preview image:

    const [previewIMG, setPreviewIMG] = useState("")

    // Data for the 3D model preview:

    const displayModel = useGLTF(props.modelURL ? `${process.env.REACT_APP_UPLOADS_ROOT + props.modelURL}` : `${process.env.REACT_APP_UPLOADS_ROOT}/uploads/extracted/CubePreset01/LOD_03.glb`)
    const canvasRef = useRef("")

    // Generate thumbnail image and upload it to backend:

    const takeSnapshot = () => {

        // Take snapshot of canvas component as data URL:
        const imageDataURL = canvasRef.current.toDataURL('image/png')

        // Convert data URL to file:
        const newIMGFile = dataURLtoFile(imageDataURL, `${props.fileName}_thumbnailIMG`)

        // Send the new image to the parent component:
        setPreviewIMG(imageDataURL)
        props.handleSnapshot(newIMGFile)
    }

    return <>
        <div className="snapshot-container">
            <div className="square-canvas-container">
                <ModelPreview
                    modelURL={props.modelURL ? props.modelURL : "/uploads/extracted/CubePreset01/LOD_03.glb"}
                    bgColor={customBackgroundColor}
                    canvasRef={canvasRef}
                />
            </div>
            <img 
                className="preview-img" 
                src={previewIMG ? previewIMG : `${process.env.REACT_APP_UPLOADS_ROOT}/uploads/images/ImageNotFound.jpg`} 
                alt="Snapshot result"/>
        </div>
        <div className="snapshot-container">

            <button onClick={() => {
                takeSnapshot();
            }}>Take snapshot!
            </button>

            <PopoverPicker color={customBackgroundColor} onChange={setCustomBackgroundColor} />

        </div>
    </>
}