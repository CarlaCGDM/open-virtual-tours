const ModelInfoCard = (props) => {
  return (
    <div className='panel-popup'>
      <h1>I'm a 3D model!</h1>
      <button onClick={() => {props.setPopup(false)}}>Close me!</button>
    </div>
  );
}

export default ModelInfoCard