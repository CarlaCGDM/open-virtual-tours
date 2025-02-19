import * as THREE from 'three'
import { gsap } from "gsap";
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { DRACOLoader } from 'three/addons/loaders/DRACOLoader.js'
import { Canvas } from '@react-three/fiber'
import { useState, useEffect, Suspense } from 'react'
import { Clone, useGLTF, ScrollControls, OrbitControls, useProgress } from '@react-three/drei'
import './TourExperience.css'
import { useGSAP } from '@gsap/react'
import DisplayPath from '../models/DisplayPath.js'
import DisplayPanel from '../models/DisplayPanel.js'
import DisplayModel from '../models/DisplayModel.js'


/**
 * Main component of the 3D tour application.
 * @returns 
 */

export default function TourExperience(props) {

  console.log(gsap)

  // Loading bar

  function LoadingScreen() {
    const {progress} = useProgress();
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

  // Tour model

  let modelURL = props.tourEnvironment
    ? `${process.env.REACT_APP_UPLOADS_ROOT + props.tourEnvironment.modelURL}`
    : `${process.env.REACT_APP_UPLOADS_ROOT}/uploads/models/CubePreset01.glb`


  const [loaded, setLoaded] = useState(false);
  
  function LazyLoadModel({ url, onLoaded }) {
    const { scene } = useGLTF(url);
  
    useEffect(() => {
      onLoaded(); // Tell parent that model is loaded
    }, []);
  
    return <primitive object={scene} />;
  }

  //const tourModel = useGLTF('/uploads/environments/SAG_02_join1texture.glb')

  if (loaded) {
    console.log("model seems to have loaded")
    gsap.to(overlayMaterial.uniforms.uAlpha, { duration: 5, value: 0 })
  }

  console.log("got the 3D model!")

  // Info popup
  const [popup, setPopup] = useState(false);
  const [popupContent, setPopupContent] = useState("")

  // Info from DisplayPath child component:
  const [scrollPages, setScrollPages] = useState(10)

  // Place markers in scene
  const [displayPanels, setDisplayPanels] = useState([])
  const [displayModels, setDisplayModels] = useState([])

  /* useEffect(() => {
    let panelIndex = 0
    let modelIndex = 0
    const newDisplayPanels = []
    const newDisplayModels = []
 
    tourModel.scene.traverse((object) => {
      // console.log('Looking for WallMarker objects.')
      if (object.name.includes('WallMarker')) {
        // console.log('Found WallMarker object.')
        object.visible=false
        newDisplayPanels.push(
          <DisplayPanel
          key={panelIndex} 
          setPopup={(bool) => setPopup(bool)} 
          setPopupContent={(content) => setPopupContent(content)}
          rotation={[object.rotation.x,object.rotation.y,object.rotation.z]}
          position={[object.position.x,object.position.y,object.position.z]} 
          id={props.tourEnvironment.panelSlots[panelIndex]} />
        )
        panelIndex++
      } else if (object.name.includes('FloorMarker')) {
        //console.log('Found FloorMarker object.')
        object.visible=false
        newDisplayModels.push(
          <DisplayModel
          key={modelIndex} 
          setPopup={(bool) => setPopup(bool)} 
          setPopupContent={(content) => setPopupContent(content)}
          rotation={[object.rotation.x,object.rotation.y,object.rotation.z]}
          position={[object.position.x,object.position.y,object.position.z]} 
          id={props.tourEnvironment.modelSlots[modelIndex]}/>
        )
        modelIndex++
      } else if (object.name.includes('Path')) {
          object.visible=false
      }
    })
 
    setDisplayPanels(newDisplayPanels)
    setDisplayModels(newDisplayModels)
  }, [tourModel]) */




  return <>

    {/* { popup && popupContent } */}

    {!loaded && <LoadingScreen />}

    <Canvas className='tour-experience'>

      {/* Loading bar */}

      <Clone object={overlay} />
      {/* <Clone object={scene} /> */}

      {/* Staging */}

      <directionalLight position={[1, 2, 3]} intensity={2.5} />
      <directionalLight position={[-2, 2, -2]} intensity={2.5} />
      <ambientLight intensity={4.5} />

      {/* Navigation */}

      <OrbitControls />

      {/* <ScrollControls pages={scrollPages} damping={0.3}>

          <DisplayPath tourModel={tourModel} setScrollPages={(n) => {setScrollPages(n)}} setModalOpacity={(p) => {props.setModalOpacity(p)}}/>
    
        </ScrollControls> */}

      {/* Environment */}

      <Suspense fallback={null}>
        <LazyLoadModel url={modelURL} onLoaded={() => setLoaded(true)} />
      </Suspense>

      {/* Content */}

      {/* {displayPanels}
      {displayModels} */}

    </Canvas>
  </>
}