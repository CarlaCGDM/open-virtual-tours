import { useEffect, useState } from "react"
import { useNavigate } from 'react-router-dom'
import { UserAPI } from '../../apis/UserAPI.js'

export default function Login(props) {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [emailError, setEmailError] = useState('')
  const [passwordError, setPasswordError] = useState('')

  const navigate = useNavigate()

  const onButtonClick = () => {
    // Set initial error values to empty
  setEmailError('')
  setPasswordError('')

  // Check if the user has entered both fields correctly
  if ('' === email) {
    setEmailError('Please enter your email')
    return
  }

  if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
    setEmailError('Please enter a valid email')
    return
  }

  if ('' === password) {
    setPasswordError('Please enter a password')
    return
  }

  if (password.length < 7) {
    setPasswordError('The password must be 8 characters or longer')
    return
  }

  // Authentication calls will be made here...
  UserAPI.signIn(email,password)
      .then((data) => {
        console.log(data)
      })
  }

  return <>
    <div> Login page </div>

    <input
          value={email}
          placeholder="Enter your email here"
          onChange={(ev) => setEmail(ev.target.value)}
    />
    <label>{emailError}</label>

    <input
          value={password}
          placeholder="Enter your password here"
          onChange={(ev) => setPassword(ev.target.value)}
        />
    <label>{passwordError}</label>

    <input type="button" onClick={onButtonClick} value={'Log in'} />
  </>
}