import { useDrag } from 'react-dnd'

const Card = ({ id, text }) => {
  const [{ isDragging }, drag] = useDrag({
    type: 'CARD',
    item: { id },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  })

  return (
    <div ref={drag} style={{ opacity: isDragging ? 0.5 : 1, border: '1px solid gray', padding: '8px', margin: '4px', backgroundColor: 'white' }}>
      {text}
    </div>
  )
}

export default Card
