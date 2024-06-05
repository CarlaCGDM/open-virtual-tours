import './CloseButton.css'

const CloseButton = (props) => {
    return (
        <button 
        className='close-button' 
        onClick={() => {props.setPopup(false)}}>❌
        </button>
    );
  }
  
  export default CloseButton