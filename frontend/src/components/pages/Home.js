import { useEffect, useState } from "react"
import TourExperience from '../canvases/TourExperience.js'
import { ConfigAPI } from '../../apis/ConfigAPI.js'
import { EnvironmentAPI } from '../../apis/EnvironmentAPI.js'
import CreateEnvironmentResourceForm from "../forms/CreateEnvironmentResourceForm.js"

export default function Home() {
  
  // Get config object and console.log()

  const [tourConfig, setTourConfig] = useState("")
  const [tourEnvironment, setTourEnvironment] = useState("")

  useEffect(() => {
    ConfigAPI.getAll()
      .then((data) => {

        // Newest model uploaded
        console.log("New updated tour config: ")
        console.log(data)
        setTourConfig(data)
      })

  }, []);

  useEffect(() => {

    if (tourConfig) {
      EnvironmentAPI.getOne(tourConfig.tourEnvironment)
      .then((data) => {

        // Update environment on display
        console.log("New updated tour environment: ")
        console.log(data)
        setTourEnvironment(data)
      })
    }

  }, [tourConfig]);

  return <>
    
    {tourEnvironment && <TourExperience tourEnvironment={tourEnvironment}/>}

    {/* < CreateEnvironmentResourceForm /> */}

    {/* <div> Home page </div>
    <div> Testing build sync again</div> */}
    {/* <TestAPICall /> */}
    {/* <Canvas>
        <mesh>
          <torusKnotGeometry />
          <meshNormalMaterial />
        </mesh>
    </Canvas> */}
  </>
}