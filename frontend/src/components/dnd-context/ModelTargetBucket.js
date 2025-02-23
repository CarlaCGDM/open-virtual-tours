import React, { useState, useEffect } from 'react'
import { useDrop } from 'react-dnd'
import { ModelAPI } from '../../apis/ModelAPI.js';
import { PlacedModelAPI } from '../../apis/PlacedModelAPI.js';
import { EnvironmentAPI } from '../../apis/EnvironmentAPI.js';
import Card from './Card.js'
import './TargetBucket.css'

const ModelTargetBucket = ({ id, tourId, modelSlots, onUpdate }) => {

  const [cards, setCards] = useState([])

  // Get the current card to display

  const updateCard = () => {
    const modelId = modelSlots[id];

    // First, get the PlacedModel
    PlacedModelAPI.getOne(modelId)
      .then((placedModelData) => {
        // Use the baseModel field from the PlacedModel response to fetch the actual Model
        return ModelAPI.getOne(placedModelData.baseModel);
      })
      .then((modelData) => {
        // Set the state with the retrieved Model data
        setCards([{ ...modelData }]);
      })
      .catch((error) => {
        console.error("Error fetching model data:", error);
      });
  };

  useEffect(() => {
    updateCard()
  }, []);


  const [, drop] = useDrop({
    accept: 'CARD',
    drop: (item) => {
      
      // Update the baseModel of the corresponding PlacedModel
      PlacedModelAPI.editOne({ "baseModel": item.id }, modelSlots[id])
        .then(() => {
          // Once both API calls complete, refresh state
          onUpdate();
          updateCard();
        })
        .catch((error) => {
          console.error("Error updating model:", error);
        });
    },
  });


  return (
    <div ref={drop} className="target-buckets">
      <p className="bucket-title"> &lt;{id}&gt;</p>
      {cards.map((card) => (
        <Card
          key={card._id}
          id={card._id}
          text={card.name}
          imgURL={card.imgURL}
          isSelected={false}
          onSelect={() => { }} />
      ))}
    </div>
  )
}

export default ModelTargetBucket