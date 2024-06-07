import { useEffect, useState } from "react"
import { useNavigate } from 'react-router-dom'
import SourceList from './../dnd-context/SourceList.js'
import TargetList from './../dnd-context/TargetList.js'
import DndContext from './../dnd-context/DndContext.js'
import CreateModelResourceForm from "../forms/CreateModelResourceForm.js"
import CreateEnvironmentResourceForm from "../forms/CreateEnvironmentResourceForm.js"

import { ConfigAPI } from '../../apis/ConfigAPI.js'
import Footer from '../navigation/Footer.js'

export default function Admin(props) {

  // Redirect to /login if not logged in
  const {loggedIn, email} = props
  const navigate = useNavigate()

  const onButtonClick = () => {
    // You'll update this function later
  }

  // If user is logged in:

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

  // Drag and drop

  const [sourceCards] = useState([
    { id: 1, text: 'Card 1' },
    { id: 2, text: 'Card 2' },
    { id: 3, text: 'Card 3' },
  ])

  const [targetCards, setTargetCards] = useState([])


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

    <DndContext>
      <div style={{ display: 'flex', justifyContent: 'space-around', padding: '20px' }}>
        <div>
          <h2>Source List</h2>
          <SourceList cards={sourceCards} />
        </div>
        <div>
          <h2>Target List</h2>
          <TargetList cards={targetCards} setCards={setTargetCards} />
        </div>
      </div>
    </DndContext>
    
    <Footer contactEmail={tourConfig.contactEmail}/>

  </>
}