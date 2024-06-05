import './PanelInfoCard.css'
import CloseButton from '../buttons/CloseButton.js';

const PanelInfoCard = (props) => {
    return (
      <div className='info-popup'>
        <h1>{props.panel.name}</h1>
        <img 
          className='panel-image'
          src={props.panel.imgURL} 
          alt={props.panel.name}/>
        <p className='panel-description'>{props.panel.description}</p>
        <small>Author: {props.panel.author}</small>
        <small>License: {props.panel.license}</small>
        <CloseButton setPopup={(bool) => props.setPopup(bool)}/>
      </div>
    );
  }
  
  export default PanelInfoCard