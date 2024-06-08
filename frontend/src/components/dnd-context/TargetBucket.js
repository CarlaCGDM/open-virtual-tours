import React, { useState, useEffect } from 'react'
import { useDrop } from 'react-dnd'
import { ModelAPI } from '../../apis/ModelAPI.js';
import { EnvironmentAPI } from '../../apis/EnvironmentAPI.js';
import Card from './Card.js'


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
    <div ref={drop} style={{ minHeight: '200px', border: '1px solid black', padding: '16px', margin: '10px' }}>
      <h2>Target Bucket {props.id}</h2>
      {cards.map((card) => (
        <Card key={card._id} id={card._id} text={card.name} imgURL={card.imgURL} />
      ))}
    </div>
  )
}

export default TargetBucket

// // Redirect to /login if not logged in
// const { loggedIn, email } = props
// const navigate = useNavigate()

// const onButtonClick = () => {
//   // You'll update this function later
// }

// // If user is logged in:

// // Get config object and console.log()