import React, { createContext, useContext, useState } from 'react';
import { Navigate } from "react-router-dom"

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [authToken, setAuthToken] = useState(null);
  const [userEmail, setUserEmail] = useState(null);

  const login = (token, email) => {
    setAuthToken(token);
    setUserEmail(email);
  };

  const logout = () => {
    setAuthToken(null);
    setUserEmail(null);
    Navigate('/login'); // Redirect to login page after logging out
  };

  return (
    <AuthContext.Provider value={{ authToken, userEmail, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};

