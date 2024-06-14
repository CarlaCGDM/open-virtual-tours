import React, { useState, useEffect } from 'react'
import { useDrop } from 'react-dnd'
import { PanelAPI } from '../../apis/PanelAPI.js';
import { EnvironmentAPI } from '../../apis/EnvironmentAPI.js';
import Card from './Card.js'
import './TargetBucket.css'

const PanelTargetBucket = (props) => {

  const [cards, setCards] = useState([])

  // Get the current card to display

  const updateCard = () => {
    const panelId = props.panelSlots[props.id]
    PanelAPI.getOne(panelId)
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

      const panelSlotsCopy = props.panelSlots
      panelSlotsCopy[props.id] = item.id

      EnvironmentAPI.editOne(props.tourId, { "panelSlots": panelSlotsCopy })
        .then((data) => {
          props.onUpdate()
          updateCard()
        })

    },
  })

  return (
    <div ref={drop} className="target-buckets">
      <p className="bucket-title"> &lt;{props.id}&gt;</p>
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

export default PanelTargetBucket