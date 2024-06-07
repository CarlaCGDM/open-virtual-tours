import React, { useState, useEffect } from 'react'
import './WelcomeModal.css';
import CTAButton from '../buttons/CTAButton.js';

const WelcomeModal = (props) => {
  return (
    <div className="welcome-modal" style={{opacity: props.modalOpacity}}>
      <div className="modal-content">
        <h1>{props.tourTitle}</h1>
        <p>{props.tourDescription}</p>
        {/* <CTAButton /> */}
        <p>Scroll to start the experience.</p>
      </div>
    </div>
  );
}

export default WelcomeModal

