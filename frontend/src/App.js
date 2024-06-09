import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ProtectedRoute  from "./routes/ProtectedRoute.js"

import Home from "./pages/Home.js"
import Admin from "./pages/Admin.js"
import Login from "./pages/Login.js"
import Logout from "./pages/Logout.js"

function App() {

  return (
    <>
        <Router>
        <Routes>
        <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/admin"
            element={
              <ProtectedRoute>
                <Admin />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Router>
    </>
  );
}

export default App;
