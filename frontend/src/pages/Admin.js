import { useEffect, useState } from "react"
import ModelsSourceList from '../components/dnd-context/ModelsSourceList.js'
import TargetBucket from '../components/dnd-context/ModelTargetBucket.js'
import DndContext from '../components/dnd-context/DndContext.js'
import CreateModelResourceForm from "../components/forms/CreateModelResourceForm.js"
import CreateEnvironmentResourceForm from "../components/forms/CreateEnvironmentResourceForm.js"
import TourExperienceDev from '../components/canvases/TourExperienceDev.js'
import { ConfigAPI } from '../apis/ConfigAPI.js'
import { EnvironmentAPI } from '../apis/EnvironmentAPI.js'
import Footer from '../components/navigation/Footer.js'
import Header from "../components/navigation/Header.js"
import SelectResource from "../components/admin-panels/SelectResource.js"
import './Admin.css'
import ModelsBucketsList from "../components/dnd-context/ModelsBucketList.js"
import HeaderContainer from "../components/navigation/HeaderContainer.js"
import PanelsBucketsList from "../components/dnd-context/PanelsBucketList.js"

export default function Admin(props) {

  // Fetch config and environment data

  const [tourConfig, setTourConfig] = useState("")
  const [tourEnvironment, setTourEnvironment] = useState("")

  const fetchTourConfig = () => {
    console.log("Fetching tour config.")
    ConfigAPI.getAll()
      .then((data) => {
        setTourConfig({ ...data })
      })
  }

  const fetchEnvironment = () => {
    console.log("Fetching tour environment.")
    if (tourConfig) {
      EnvironmentAPI.getOne(tourConfig.tourEnvironment)
        .then((data) => {
          setTourEnvironment({ ...data })
        })
    }
  }

  useEffect(() => {
    fetchTourConfig()
  }, []);

  useEffect(() => {
    fetchEnvironment()
  }, [tourConfig]);

  // Update environment from TargetBucket Card child component

  const handleUpdate = () => {
    console.log("Refreshing tour config.")
    fetchTourConfig()
    console.log("Refreshing tour environment.")
    fetchEnvironment()
  }

  const [modelTargetBuckets, setModelTargetBuckets] = useState([])
  const [panelTargetBuckets, setPanelTargetBuckets] = useState([])

  useEffect(() => {

    if (tourEnvironment) {

      const modelKeys = tourEnvironment.modelSlots.map((modelId, index) => (index))
      setModelTargetBuckets(modelKeys)

      const panelKeys = tourEnvironment.panelSlots.map((panelId, index) => (index))
      setPanelTargetBuckets(panelKeys)

      console.log(panelKeys)
      console.log(panelTargetBuckets)

    }
  }, [tourEnvironment]);

  // Display models or panels under environment preview

  const [showPanelBuckets,setShowPanelBuckets] = useState(false)


  return <>

    <div className="admin-page">

      <HeaderContainer />

      <div className="admin-content">

        <DndContext>

          <div className="resource-area">
            <SelectResource 
              tourEnvironment={tourEnvironment}
              setShowPanelBuckets={(bool) => {setShowPanelBuckets(bool)}}/>
          </div>

          <div className="preview-area">
            <div className="virtual-tour-dev">
              <TourExperienceDev
                tourEnvironment={tourEnvironment} />
            </div>

            {!showPanelBuckets && <ModelsBucketsList
              targetBuckets={modelTargetBuckets}
              tourEnvironment={tourEnvironment}
              handleUpdate={() => { handleUpdate() }}
            />}

          {showPanelBuckets && <PanelsBucketsList
              targetBuckets={panelTargetBuckets}
              tourEnvironment={tourEnvironment}
              handleUpdate={() => { handleUpdate() }}
            />}

            <div className="error-console">
              <div className="error-console-text">
                <p>error message: &#123;	&#125;</p>
              </div>
            </div>
          </div>

        </ DndContext>

      </div>

      <Footer contactEmail={tourConfig.contactEmail} />

    </div>
  </>
}


{/* {tourEnvironment && */ }

// <DndContext>

//   <SelectResource />

{/* <SourceList /> */ }

{/* <div className="tour-preview">

      <div className="tour-preview-canvas">
        <TourExperienceDev
          tourEnvironment={tourEnvironment} />
      </div>

      <ModelsBucketsList
        modelTargetBuckets={modelTargetBuckets}
        tourEnvironment={tourEnvironment}
        handleUpdate={() => { handleUpdate() }}
      />
    </div> */}


// </DndContext>}
