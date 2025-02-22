import './InfoCardPopup.css'
import CloseButton from '../buttons/CloseButton.js';
import ModelPreview from '../canvases/ModelPreview.js';

const InfoCardPopup = (props) => {
  return (
    <div className="info-popup-container">
      <div className='info-popup'>

        {props.isModel &&

          <div className="model-preview">
            <ModelPreview
              modelURL={props.content.modelURL}
            /> {/* tell it to be transparent */}
          </div>

        }

        {!props.isModel && <img
          className='content-image'
          src={process.env.REACT_APP_UPLOADS_ROOT + props.content.imgURL}
          alt={props.content.name} />}

        <div className='content-description'>


        <h1>{props.content.name}</h1>

          <div>
            <p>{props.content.description}</p>
            <small>Author: {props.content.author} | License: {props.content.license}</small>
          </div>

        </div>

        <CloseButton setPopup={(bool) => props.setPopup(bool)} />
      </div>
    </div>
  );
}

export default InfoCardPopup