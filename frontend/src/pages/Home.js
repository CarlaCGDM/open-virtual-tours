import { useEffect, useState } from "react"
import { ConfigAPI } from '../apis/ConfigAPI.js'
import { EnvironmentAPI } from '../apis/EnvironmentAPI.js'
import { PlacedModelAPI } from '../apis/PlacedModelAPI.js'
import TourExperience from '../components/canvases/TourExperience.js'
import WelcomeModal from '../components/modals/WelcomeModal.js'
import Footer from '../components/navigation/Footer.js';
import './Home.css';

export default function Home() {

  // Show welcome modal

  const [modalOpacity, setModalOpacity] = useState(1)

  // Get config object and console.log()

  const [tourConfig, setTourConfig] = useState("")
  const [tourEnvironment, setTourEnvironment] = useState("")
  const [placedModels, setPlacedModels] = useState("")
  // TODO: [placedPanels, setPlacedPanels] = useState("")

  useEffect(() => {
    ConfigAPI.getAll()
      .then((data) => {

        // Newest model uploaded
        // console.log("New updated tour config: ")
        // console.log(data)
        setTourConfig(data)
      })

  }, []);

  useEffect(() => {

    if (tourConfig) {
      EnvironmentAPI.getOne(tourConfig.tourEnvironment)
        .then((data) => {

          // Update environment on display
          // console.log("New updated tour environment: ")
          // console.log(data)
          setTourEnvironment(data)
        })
    }

  }, [tourConfig]);

  useEffect(() => {

    if (tourEnvironment) {
      PlacedModelAPI.getMultipleByIds(tourEnvironment.modelSlots)
        .then((data) => {

          // Update list of placed models
          // console.log("New updated placed models: ")
          // console.log(data)
          setPlacedModels(data)
        })
    }

  }, [tourEnvironment]);

  return <>
    <div className="home-container">

      {/* <WelcomeModal
        modalOpacity={modalOpacity}
        tourTitle={tourConfig.tourTitle}
        tourDescription={tourConfig.tourDescription} /> */}


      {tourEnvironment &&

        <div className="virtual-tour">
          <TourExperience
            tourEnvironment={tourEnvironment}
            placedModels={placedModels}
            //placedPanels={placedPanels}
            setModalOpacity={(p) => setModalOpacity(p)}
          />
        </div>
        
      }


      <Footer contactEmail={tourConfig.contactEmail} />
    </div>
  </>
}