import React from 'react';
import {useAuth} from '../../provider/authProvider.js'
import Header from './Header.js';

const HeaderContainer = () => {
  const { userEmail, logout } = useAuth();
  console.log(userEmail)

  return <Header userEmail={userEmail} onLogout={logout} />;
};

export default HeaderContainer;

