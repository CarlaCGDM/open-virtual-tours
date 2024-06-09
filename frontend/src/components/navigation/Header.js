import React from 'react';
import './Header.css';

const Header = ({ userEmail, onLogout }) => {
  
  return (
    <header className="header">
      <div className="header-content">
        <div className="header-title">
          <h1>Open Virtual Tours</h1>
        </div>
        <div className="header-right">
          <p><span className="user-icon"></span>{userEmail}</p>
          <button className="logout-button" onClick={onLogout}>Logout</button>
        </div>
      </div>
    </header>
  );
};

export default Header;


