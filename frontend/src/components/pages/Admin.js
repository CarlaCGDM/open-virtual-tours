import { useEffect, useState } from "react"
import { useNavigate } from 'react-router-dom'
import CreateModelResourceForm from "../forms/CreateModelResourceForm.js"
import CreateEnvironmentResourceForm from "../forms/CreateEnvironmentResourceForm.js"


export default function Admin(props) {

  const {loggedIn, email} = props
  const navigate = useNavigate()

  const onButtonClick = () => {
    // You'll update this function later
  }

  return <>
    <div> Admin page </div>
    <div className={'buttonContainer'}>
        <input
          className={'inputButton'}
          type="button"
          onClick={onButtonClick}
          value={loggedIn ? 'Log out' : 'Log in'}
        />
        {loggedIn ? <div>This is the admin page hidden content. Logged in as {email}</div> : <div />}
    </div>

    {/* < CreateModelResourceForm /> */}
    < CreateEnvironmentResourceForm />

  </>
}