import { useDrop } from 'react-dnd'

const TargetList = ({ cards, setCards }) => {
  const [, drop] = useDrop({
    accept: 'CARD',
    drop: (item) => {
      // For simplicity, overwriting the target list with the dragged card's id
      setCards([{ id: item.id, text: `Card ${item.id}` }])
    },
  })

  return (
    <div ref={drop} style={{ minHeight: '200px', border: '1px solid black', padding: '16px' }}>
      {cards.map((card) => (
        <div key={card.id} style={{ border: '1px solid gray', padding: '8px', margin: '4px', backgroundColor: 'white' }}>
          {card.text}
        </div>
      ))}
    </div>
  )
}

export default TargetList
