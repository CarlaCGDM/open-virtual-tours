import React, { useState } from 'react'
import { useDrop } from 'react-dnd'
import Card from './Card.js'

const TargetBucket = ({ id }) => {
  const [cards, setCards] = useState([])

  const [, drop] = useDrop({
    accept: 'CARD',
    drop: (item) => {
      setCards([{ id: item.id, text: `Card ${item.id}` }])
    },
  })

  return (
    <div ref={drop} style={{ minHeight: '200px', border: '1px solid black', padding: '16px', margin: '10px' }}>
      <h2>Target Bucket {id}</h2>
      {cards.map((card) => (
        // <div key={card.id} style={{ border: '1px solid gray', padding: '8px', margin: '4px', backgroundColor: 'white' }}>
        //   {card.text}
        // </div>

        <Card id={card.id} text={card.text}/>
      ))}
    </div>
  )
}

export default TargetBucket

