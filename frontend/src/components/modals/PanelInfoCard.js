const PanelInfoCard = (props) => {
    return (
      <div className='panel-popup'>
        <h1>I'm an image panel!</h1>
        <button onClick={() => {props.setPopup(false)}}>Close me!</button>
      </div>
    );
  }
  
  export default PanelInfoCard