import './InfoCard.css'
import ModelPreview from '../canvases/ModelPreview.js';

const DevInfoCard = (props) => {
  return (
    <div className='dev-info-card'>
      <h1>{props.content.name}</h1>

      <dev className="image-and-description">
        {props.isModel &&
          <div>
            <ModelPreview modelURL={props.content.modelURL} />
          </div>
        }

        {!props.isModel && <img
          className='content-image'
          src={process.env.REACT_APP_UPLOADS_ROOT + props.content.imgURL}
          alt={props.content.name} />}

        <p className='content-description'>{props.content.description}</p>

      </dev>

      <div className="credits">
        <small>Author: {props.content.author}</small>
        <small>License: {props.content.license}</small>
      </div>

    </div>
  );
}

export default DevInfoCard