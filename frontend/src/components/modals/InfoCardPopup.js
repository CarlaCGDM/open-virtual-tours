import './InfoCardPopup.css'
import CloseButton from '../buttons/CloseButton.js';
import ModelPreview from '../canvases/ModelPreview.js';

const InfoCardPopup = (props) => {
  return (
    <div className="info-popup-container">
      <div className='info-popup'>
        <h1>{props.content.name}</h1>

        {props.isModel &&

          <div className="model-preview">
            <ModelPreview modelURL={props.content.modelURL} />
          </div>

        }

        {!props.isModel && <img
          className='content-image'
          src={process.env.REACT_APP_UPLOADS_ROOT + props.content.imgURL}
          alt={props.content.name} />}

        <p className='content-description'>{props.content.description}</p>
        <small>Author: {props.content.author}</small>
        <small>License: {props.content.license}</small>
        <CloseButton setPopup={(bool) => props.setPopup(bool)} />
      </div>
    </div>
  );
}

export default InfoCardPopup