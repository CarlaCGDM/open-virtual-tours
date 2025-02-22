import { useDrag } from 'react-dnd'
import './Card.css'

const Card = ({ id, text, imgURL,isSelected,onSelect,delay,isVisible }) => {

  //console.log(isVisible)

  const [{ isDragging }, drag] = useDrag({
    type: 'CARD',
    item: { id },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  })

  return (
    <div
    className={
      `card ${isSelected ? 'selected' : ''}` +
      ` pop-in ${isVisible ? '' : 'hidden'}`
    }
    onClick={() => {onSelect();console.log("selected card id: " + id)}}
    ref={drag} 
    title={text}
    style={{ 
      opacity: isDragging ? 0.5 : 1,
      animationDelay: `${delay}s`
      }}>
      <img 
        src={imgURL ? `${process.env.REACT_APP_UPLOADS_ROOT + imgURL}` : `${process.env.REACT_APP_UPLOADS_ROOT}/uploads/images/ImageNotFound.png`}
        alt={text}
      />
      <p>{text}</p>
    </div>
  )
}

export default Card
