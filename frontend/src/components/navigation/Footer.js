import React from 'react'
import './Footer.css'

const Footer = (props) => {
  return (
    <footer className="footer">
        <div className="footer-text">
          <p><span className="envelope-icon"></span> {props.contactEmail}</p>
          <p>©️ 2024 Open Virtual Tours</p>
        </div>
    </footer>
  );
}

export default Footer
