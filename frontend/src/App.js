import React from 'react';
import { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Home from './components/pages/Home.js';
import Admin from './components/pages/Admin.js';
import Login from './components/pages/Login.js';

function App() {

  const [loggedIn, setLoggedIn] = useState(false)
  const [email, setEmail] = useState('')

  return (
    <>
      <Router>
        <Routes>
            <Route path="/" element={<Home />}></Route>
            <Route path="/admin" element={<Admin email={email} loggedIn={loggedIn} setLoggedIn={setLoggedIn}/>}></Route>
            <Route path="/login" element={<Login setLoggedIn={setLoggedIn} setEmail={setEmail} />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
