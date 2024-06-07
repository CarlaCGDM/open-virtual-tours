import React, {useState, useEffect} from 'react'
import Card from './../dnd-context/Card.js'
import { ModelAPI } from '../../apis/ModelAPI.js';

const SourceList = ({ }) => {

  // Get the cards from the API
  const [cards, setCards] = useState([])
  useEffect(() => {
    ModelAPI.getAll()
      .then((data) => {

        // Newest model uploaded
        console.log("List of models: ")
        console.log(data)
        setCards(data)
      })

  }, []);


  return (
    <div>
      {cards.map((card) => (
        <Card key={card._id} id={card._id} text={card.name} imgURL={card.imgURL} />
      ))}
    </div>
  )
}

export default SourceList
