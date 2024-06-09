import './InfoCard.css'
import CloseButton from '../buttons/CloseButton.js';
import ModelPreview from '../canvases/ModelPreview.js';

const InfoCardPopup = (props) => {
    return (
      <div className='info-popup'>
        <h1>{props.content.name}</h1>

        {props.isModel && <ModelPreview modelURL={props.content.modelURL}/>}

        {!props.isModel && <img 
          className='content-image'
          src={props.content.imgURL} 
          alt={props.content.name}/>}

        <p className='content-description'>{props.content.description}</p>
        <small>Author: {props.content.author}</small>
        <small>License: {props.content.license}</small>
        <CloseButton setPopup={(bool) => props.setPopup(bool)}/>
      </div>
    );
  }
  
  export default InfoCardPopup