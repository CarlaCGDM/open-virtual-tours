import './PanelInfoCard.css'
import CloseButton from '../buttons/CloseButton.js';

const ModelInfoCard = (props) => {
    return (
      <div className='info-popup'>
        <h1>{props.model.name}</h1>
        {/* Model preview here. same width and height as image class plus transparent background orbitcontrols and wireframe option */}
        <p className='model-description'>{props.model.description}</p>
        <small>Author: {props.model.author}</small>
        <small>License: {props.model.license}</small>
        <CloseButton setPopup={(bool) => props.setPopup(bool)}/>
      </div>
    );
  }
  
  export default ModelInfoCard