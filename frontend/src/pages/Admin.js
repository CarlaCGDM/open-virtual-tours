import { useEffect, useState } from "react"
import ModelsSourceList from '../components/dnd-context/ModelsSourceList.js'
import TargetBucket from '../components/dnd-context/TargetBucket.js'
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

  const [targetBuckets, setTargetBuckets] = useState([])

  useEffect(() => {

    if (tourEnvironment) {

      const keys = tourEnvironment.modelSlots.map((modelId, index) => (index))
      setTargetBuckets(keys)

    }
  }, [tourEnvironment]);


  return <>

    <div className="admin-page">

      <HeaderContainer />

      <div className="admin-content">

        <DndContext>

          <div className="resource-area">
            <SelectResource 
              tourEnvironment={tourEnvironment}/>
          </div>

          <div className="preview-area">
            <div className="virtual-tour-dev">
              <TourExperienceDev
                tourEnvironment={tourEnvironment} />
            </div>
            <ModelsBucketsList
              targetBuckets={targetBuckets}
              tourEnvironment={tourEnvironment}
              handleUpdate={() => { handleUpdate() }}
            />
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
        targetBuckets={targetBuckets}
        tourEnvironment={tourEnvironment}
        handleUpdate={() => { handleUpdate() }}
      />
    </div> */}


// </DndContext>}
