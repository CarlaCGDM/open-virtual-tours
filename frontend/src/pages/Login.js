import React, { useState } from 'react';
import {UserAPI} from '../apis/UserAPI.js'
import { useAuth } from '../provider/authProvider.js';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(null); // Clear previous errors

    try {
      const data = await UserAPI.signIn(email, password);
      login(data.token);
      navigate('/admin');
    } catch (err) {
      console.log(err.message)
      setError("Login failed. Incorrect email or password."); // Display error message
    }
  };

  return (
    <form onSubmit={handleLogin}>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        required
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        required
      />
      <button type="submit">Login</button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </form>
  );
};

export default Login;


// import { useEffect, useState } from "react"
// import { useNavigate } from 'react-router-dom'
// import { UserAPI } from '../../apis/UserAPI.js'

// export default function Login(props) {

//   const [email, setEmail] = useState('')
//   const [password, setPassword] = useState('')
//   const [emailError, setEmailError] = useState('')
//   const [passwordError, setPasswordError] = useState('')

//   const { login } = useAuth()
//   const navigate = useNavigate()


//   const onButtonClick = () => {
//     // Set initial error values to empty
//   setEmailError('')
//   setPasswordError('')

//   // Check if the user has entered both fields correctly
//   if ('' === email) {
//     setEmailError('Please enter your email')
//     return
//   }

//   if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
//     setEmailError('Please enter a valid email')
//     return
//   }

//   if ('' === password) {
//     setPasswordError('Please enter a password')
//     return
//   }

//   if (password.length < 7) {
//     setPasswordError('The password must be 8 characters or longer')
//     return
//   }

//   // Authentication calls will be made here...
//   UserAPI.signIn(email,password)
//       .then((data) => {
//         console.log(data)
//       })
//   }

//   return <>
//     <div> Login page </div>

//     <input
//           value={email}
//           placeholder="Enter your email here"
//           onChange={(ev) => setEmail(ev.target.value)}
//     />
//     <label>{emailError}</label>

//     <input
//           value={password}
//           placeholder="Enter your password here"
//           onChange={(ev) => setPassword(ev.target.value)}
//         />
//     <label>{passwordError}</label>

//     <input type="button" onClick={onButtonClick} value={'Log in'} />
//   </>
// }