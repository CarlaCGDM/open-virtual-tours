import React, { useState, useEffect } from 'react'
import { useDrop } from 'react-dnd'
import Card from './Card.js'
import { ModelAPI } from '../../apis/ModelAPI.js';
import { EnvironmentAPI } from '../../apis/EnvironmentAPI.js';


const TargetBucket = ( props ) => {

  const [cards, setCards] = useState([])

  // Get the current card to display

  useEffect(() => {
    const modelId = props.tourEnvironment.modelSlots[props.id]
    ModelAPI.getOne(modelId)
      .then((data) => {
        
        console.log(data)
        setCards([data])
      })

  }, [cards]);
  

  const [, drop] = useDrop({
    accept: 'CARD',
    drop: (item) => {

      //When we drop an item
      //We call update method on tour

      const modelSlotsCopy = props.tourEnvironment.modelSlots
      modelSlotsCopy[props.id] = item.id

      console.log(modelSlotsCopy)

      EnvironmentAPI.editOne(props.tourEnvironment._id,{"modelSlots":modelSlotsCopy})
      .then((data) => {
        console.log(data)
      })
      //But we will need to refresh the tour

      setCards([{ key: item.id, id: item.id, text: `Card ${item.id}` }])
    },
  })

  return (
    <div ref={drop} style={{ minHeight: '200px', border: '1px solid black', padding: '16px', margin: '10px' }}>
      <h2>Target Bucket {props.id}</h2>
      {cards.map((card) => (
        // <div key={card.id} style={{ border: '1px solid gray', padding: '8px', margin: '4px', backgroundColor: 'white' }}>
        //   {card.text}
        // </div>

        <Card key={card._id} id={card._id} text={card.name} imgURL={card.imgURL} />
      ))}
    </div>
  )
}

export default TargetBucket

