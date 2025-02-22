import * as THREE from 'three'
import { gsap } from "gsap";
import { useState, useEffect, Suspense } from 'react'
import { Clone, useGLTF, ScrollControls, OrbitControls, useProgress } from '@react-three/drei'
import './TourExperience.css'
import MemoizedCanvas from './MemoizedCanvas.js'
import DisplayPath from '../models/DisplayPath.js'
import DisplayPanel from '../models/DisplayPanel.js'
import DisplayModel from '../models/DisplayModel.js'
import { EnvironmentAPI } from '../../apis/EnvironmentAPI.js'; 

/**
 * Main component of the 3D tour application.
 * @returns 
 */

export default function TourExperience(props) {

  // Loading bar

  function LoadingScreen() {
    const { progress } = useProgress();
    return <div className="loading-screen"><p>Loading tour experience... {Math.round(progress)}%</p></div>
  }

  const overlayGeometry = new THREE.PlaneGeometry(2, 2, 1, 1)
  const overlayMaterial = new THREE.ShaderMaterial({
    //wireframe: true,
    transparent: true,
    uniforms:
    {
      uAlpha: { value: 1 }
    },
    vertexShader: `
        void main()
        {
          gl_Position = vec4(position, 1.0);
        }
      `,
    fragmentShader: `
        uniform float uAlpha;
        void main()
        {
          gl_FragColor = vec4(0.3,0.3,0.3, uAlpha);
        }
      `
  })

  const overlay = new THREE.Mesh(overlayGeometry, overlayMaterial)

  let modelURL = props.tourEnvironment
    ? `${process.env.REACT_APP_UPLOADS_ROOT + props.tourEnvironment.modelURL}`
    : `${process.env.REACT_APP_UPLOADS_ROOT}/uploads/models/CubePreset01.glb`

  const [loaded, setLoaded] = useState(false);

  if (loaded) {
    gsap.to(overlayMaterial.uniforms.uAlpha, { duration: 3, value: 0 })
  }

  // Display models and panels

  const [displayModels, setDisplayModels] = useState([])
  // TODO: const [displayPanels, setDisplayPanels] = useState([])

  useEffect(() => {
    // Check if placedModels is an array before using forEach
    if (Array.isArray(props.placedModels) && props.placedModels.length > 0) {
      let newDisplayModels = []

      // Loop through the array and generate DisplayModel components
      props.placedModels.forEach((placedModel, index) => {
        newDisplayModels.push(
          <DisplayModel
            key={index}
            slot={index} // Trying to use the "key" property comes up as "undefined"
            id={placedModel.baseModel}
            position={placedModel.position}
            rotation={placedModel.rotation}
            setPopup={(bool) => setPopup(bool)}
            setPopupContent={(content) => setPopupContent(content)}
            devMode={props.devMode}
          />
        )
      })

      // Update state with the new DisplayModel components
      setDisplayModels(newDisplayModels)
    }
  }, [props.placedModels]) // Re-run when props.placedModels changes

  // Info popup
  const [popup, setPopup] = useState(false);
  const [popupContent, setPopupContent] = useState("")

  return <>

    {popup && popupContent}

    {!loaded && <LoadingScreen />}

    {<MemoizedCanvas
      modelURL={modelURL}
      setLoaded={setLoaded}
      displayModels={displayModels}
      overlay={overlay}
    />}
  </>
}