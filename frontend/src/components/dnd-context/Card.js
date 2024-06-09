import { useDrag } from 'react-dnd'
import './Card.css'

const Card = ({ id, text, imgURL,isSelected,onSelect }) => {
  const [{ isDragging }, drag] = useDrag({
    type: 'CARD',
    item: { id },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  })

  return (
    <div
    className={`card ${isSelected ? 'selected' : ''}`}
    onClick={() => {onSelect();console.log("selected " + id)}}
    ref={drag} 
    title={text}
    style={{ opacity: isDragging ? 0.5 : 1}}>
      <img 
        src={imgURL ? imgURL : "/uploads/images/ImageNotFound.png"}
        alt={text}
      />
      <p>{text}</p>
    </div>
  )
}

export default Card
