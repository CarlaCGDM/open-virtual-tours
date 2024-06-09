import React from 'react';
import './Header.css';

const Header = (props) => {
  return (
    <header className="header">
      <div className="header-content">
        <div className="header-title">
          <h1>Open Virtual Tours</h1>
        </div>
        <div className="header-right">
          <p><span className="envelope-icon"></span>loggedUserEmail</p>
          <button className="logout-button" onClick={props.onLogout}>Logout</button>
        </div>
      </div>
    </header>
  );
}

export default Header;

