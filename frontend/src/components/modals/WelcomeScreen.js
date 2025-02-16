import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faComputerMouse } from '@fortawesome/free-solid-svg-icons'
import { defaultTheme } from '../../themes/themes.js'
import './WelcomeScreen.css';


const WelcomeScreen = ({ config, theme, modalOpacity }) => {

  // Theme variants

  const TourBackground = styled.div`
    opacity: ${modalOpacity};
    background: linear-gradient(
      180deg, 
      ${theme.lightColor}ff 58%, 
      ${theme.lightColor}bf 90%, 
      ${theme.lightColor}00 100%);
  `

  const TourTitle = styled.h1`
    color: ${theme.darkColor};
    background-color: ${theme.mediumColor};

    border: ${theme.borderThickness}rem solid ${theme.darkColor};
    border-radius: ${theme.borderRadius}rem;
    `

  const TourDescription = styled.p`
    color: ${theme.darkColor};
  `

  const NavigationInstructions = styled.div`
    color: ${theme.mediumColor};
  `

  return (
    <TourBackground className="welcome-modal">

      <div className="modal-content">

        <TourTitle>{config.tourTitle}</TourTitle>
        <TourDescription>{config.tourDescription}</TourDescription>

        <NavigationInstructions className="navigation-instructions">
          
          <FontAwesomeIcon
            icon={faComputerMouse}
            size="2xl" />
          <p>Scroll to start the experience.</p>

        </NavigationInstructions>

      </div>

    </TourBackground>
  );
}

export default WelcomeScreen

