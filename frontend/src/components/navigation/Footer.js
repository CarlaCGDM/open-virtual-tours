import React from 'react'
import './Footer.css'

const Footer = (props) => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-text">
          <p><i className="envelope-icon"></i> {props.contactEmail}</p>
          <p>&copy; 2024 Open Virtual Tours</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer
