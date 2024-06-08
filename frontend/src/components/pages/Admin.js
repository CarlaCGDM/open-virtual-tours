import { useEffect, useState } from "react"
import { useNavigate } from 'react-router-dom'
import SourceList from '../dnd-context/SourceList.js'
import TargetBucket from './../dnd-context/TargetBucket.js'
import DndContext from './../dnd-context/DndContext.js'
import CreateModelResourceForm from "../forms/CreateModelResourceForm.js"
import CreateEnvironmentResourceForm from "../forms/CreateEnvironmentResourceForm.js"
import TourExperienceDev from '../canvases/TourExperienceDev.js'
import { ConfigAPI } from '../../apis/ConfigAPI.js'
import { EnvironmentAPI } from '../../apis/EnvironmentAPI.js'
import Footer from '../navigation/Footer.js'
import SelectResource from "../admin-panels/SelectResource.js"

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

    {tourEnvironment &&
      <DndContext>
        <div style={{ display: 'flex', justifyContent: 'space-around', padding: '20px' }}>
          <div>
            <h2>Source List</h2>
            <SourceList />
          </div>

          <TourExperienceDev
            tourEnvironment={tourEnvironment} />

          <div style={{ display: 'flex', flexDirection: 'column' }}>
            {targetBuckets.map((id) => (
              <TargetBucket
                key={id}
                id={id}
                tourId={tourEnvironment._id}
                modelSlots={tourEnvironment.modelSlots}
                onUpdate={() => { handleUpdate() }} />)
            )}
          </div>
        </div>
      </DndContext>}

    {/* <SelectResource /> */}

    <Footer contactEmail={tourConfig.contactEmail} />

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