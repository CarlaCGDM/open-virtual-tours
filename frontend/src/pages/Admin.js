import { useEffect, useState } from "react"
import SourceList from '../components/dnd-context/SourceList.js'
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

export default function Admin(props) {

  // Fetch config and environment data

  const [tourConfig, setTourConfig] = useState("")
  const [tourEnvironment, setTourEnvironment] = useState("")

  useEffect(() => {
    ConfigAPI.getAll()
      .then((data) => {
        setTourConfig({ ...data })
      })

  }, []);

  const fetchEnvironment = () => {
    if (tourConfig) {
      EnvironmentAPI.getOne(tourConfig.tourEnvironment)
        .then((data) => {
          setTourEnvironment({ ...data })
        })
    }
  }

  useEffect(() => {
    fetchEnvironment()
  }, [tourConfig]);

  // Update environment from TargetBucket Card child component

  const handleUpdate = () => {
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

    <div className="admin-container">

      <Header />

      <div className="dnd-context-wrapper">

        {tourEnvironment &&

          <DndContext>
            
            <SourceList />

            <div className="tour-preview">

              <div className="tour-preview-canvas">
                <TourExperienceDev
                  tourEnvironment={tourEnvironment} />
              </div>

              <ModelsBucketsList
                targetBuckets={targetBuckets}
                tourEnvironment={tourEnvironment}
                handleUpdate={() => { handleUpdate() }}
              />
            </div>


          </DndContext>}

      </div>

      <Footer contactEmail={tourConfig.contactEmail} />

    </div>
  </>
}

// Redirect to /login if not logged in
// const { loggedIn, email } = props
// const navigate = useNavigate()

// const onButtonClick = () => {
//   // You'll update this function later
// }

// If user is logged in:

{/* <div> Admin page </div>
    <div className={'buttonContainer'}>
        <input
          className={'inputButton'}
          type="button"
          onClick={onButtonClick}
          value={loggedIn ? 'Log out' : 'Log in'}
        />
        {loggedIn ? <div>This is the admin page hidden content. Logged in as {email}</div> : <div />}
    </div> */}

{/* < CreateModelResourceForm />  */ }
{/* < CreateEnvironmentResourceForm /> */ }