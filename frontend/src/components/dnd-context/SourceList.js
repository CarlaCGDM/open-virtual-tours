import React from 'react'
import Card from './../dnd-context/Card.js'

const SourceList = ({ cards }) => {
  return (
    <div>
      {cards.map((card) => (
        <Card key={card.id} id={card.id} text={card.text} />
      ))}
    </div>
  )
}

export default SourceList
