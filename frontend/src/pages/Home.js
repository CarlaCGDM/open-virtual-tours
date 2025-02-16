import { useEffect, useState } from "react"
import { ConfigAPI } from '../apis/ConfigAPI.js'
import { EnvironmentAPI } from '../apis/EnvironmentAPI.js'
import TourExperience from '../components/canvases/TourExperience.js'
import WelcomeScreen from '../components/modals/WelcomeScreen.js'
import Footer from '../components/navigation/Footer.js';
import './Home.css';
import { defaultTheme } from "../themes/themes.js"

export default function Home() {

  // Show welcome modal

  const [modalOpacity, setModalOpacity] = useState(1)

  // Get config object

  const [tourConfig, setTourConfig] = useState("")
  const [tourEnvironment, setTourEnvironment] = useState("")
  const [tourTheme, setTourTheme] = useState("")

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

      <WelcomeScreen
        modalOpacity={modalOpacity}
        config={tourConfig}
        theme={tourTheme ? tourTheme : defaultTheme} />


      {tourEnvironment &&

        <div className="virtual-tour">
          <TourExperience
            tourEnvironment={tourEnvironment}
            setModalOpacity={(p) => setModalOpacity(p)}
          />
        </div>
        
      }


      <Footer contactEmail={tourConfig.contactEmail} />
    </div>
  </>
}