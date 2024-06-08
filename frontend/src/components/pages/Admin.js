import { useEffect, useState } from "react"
import { useNavigate } from 'react-router-dom'
import SourceList from './../dnd-context/SourceList.js'
import TargetBucket from './../dnd-context/TargetBucket.js'
import DndContext from './../dnd-context/DndContext.js'
import CreateModelResourceForm from "../forms/CreateModelResourceForm.js"
import CreateEnvironmentResourceForm from "../forms/CreateEnvironmentResourceForm.js"

import { ConfigAPI } from '../../apis/ConfigAPI.js'
import { EnvironmentAPI } from '../../apis/EnvironmentAPI.js'
import Footer from '../navigation/Footer.js'

export default function Admin(props) {

  // Redirect to /login if not logged in
  const { loggedIn, email } = props
  const navigate = useNavigate()

  const onButtonClick = () => {
    // You'll update this function later
  }

  // If user is logged in:

  // Get config object

  const [tourConfig, setTourConfig] = useState("")
  const [tourEnvironment, setTourEnvironment] = useState("")

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
          console.log("New updated tour environment: ")
          console.log(data)
          setTourEnvironment(data)
        })
    }

  }, [tourConfig]);

  // Drag and drop

  const [targetBuckets, setTargetBuckets] = useState([1, 2, 3]) // IDs of target lists
  useEffect(() => {

    if (tourEnvironment) {
      const keys = tourEnvironment.modelSlots.map((model, index) => (index))
      setTargetBuckets(keys)
    }

  }, [tourEnvironment]);


  return <>
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

    {/* < CreateModelResourceForm />  */}
    {/* < CreateEnvironmentResourceForm /> */}

    {tourEnvironment && <DndContext>
      <div style={{ display: 'flex', justifyContent: 'space-around', padding: '20px' }}>
        <div>
          <h2>Source List</h2>
          <SourceList />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          {targetBuckets.map((id) => (
            <TargetBucket 
            key={id} 
            id={id}
            tourEnvironment={tourEnvironment} />
          ))}
        </div>
      </div>
    </DndContext>}

    <Footer contactEmail={tourConfig.contactEmail} />

  </>
}