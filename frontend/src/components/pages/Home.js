import { useEffect, useState } from "react"
import { ConfigAPI } from '../../apis/ConfigAPI.js'
import { EnvironmentAPI } from '../../apis/EnvironmentAPI.js'
import TourExperience from '../canvases/TourExperience.js'
import WelcomeModal from './../modals/WelcomeModal.js';
import Footer from '../navigation/Footer.js';
import './Home.css';

export default function Home() {

  // Show welcome modal

  const [modalOpacity,setModalOpacity] = useState(1)
  
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
    <div className="home-container">
      <WelcomeModal modalOpacity={modalOpacity} tourTitle={tourConfig.tourTitle} tourDescription={tourConfig.tourDescription}/>
      {tourEnvironment && <TourExperience tourEnvironment={tourEnvironment} setModalOpacity={(p) => setModalOpacity(p)}/>}
      <Footer contactEmail={tourConfig.contactEmail}/>
    </div>
  </>
}