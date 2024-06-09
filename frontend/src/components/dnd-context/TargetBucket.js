import React, { useState, useEffect } from 'react'
import { useDrop } from 'react-dnd'
import { ModelAPI } from '../../apis/ModelAPI.js';
import { EnvironmentAPI } from '../../apis/EnvironmentAPI.js';
import Card from './Card.js'
import './TargetBucket.css'

const TargetBucket = (props) => {

  const [cards, setCards] = useState([])

  // Get the current card to display

  const updateCard = () => {
    const modelId = props.modelSlots[props.id]
    ModelAPI.getOne(modelId)
      .then((data) => {
        setCards([{ ...data }])
      })
  }

  useEffect(() => {
    updateCard()
  }, []);


  const [, drop] = useDrop({
    accept: 'CARD',
    drop: (item) => {

      // When we drop an item

      const modelSlotsCopy = props.modelSlots
      modelSlotsCopy[props.id] = item.id

      EnvironmentAPI.editOne(props.tourId, { "modelSlots": modelSlotsCopy })
        .then((data) => {
          props.onUpdate()
          updateCard()
        })

    },
  })

  return (
    <div ref={drop} className="target-buckets">
      <p className="bucket-title">Slot {props.id}</p>
      {cards.map((card) => (
        <Card 
        key={card._id} 
        id={card._id} 
        text={card.name} 
        imgURL={card.imgURL} 
        isSelected={false}
        onSelect={() => {}}/>
      ))}
    </div>
  )
}

export default TargetBucket