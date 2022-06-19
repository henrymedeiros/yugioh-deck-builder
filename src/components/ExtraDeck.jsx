import React from 'react'
import Card from "./Card.jsx";

function ExtraDeck({extraDeck, setExtraDeck, setCardHovered}) {
  
  function removeCard(cardIndex) {
    var array = [...extraDeck]; // make a separate copy of the array
    if (cardIndex !== -1) {
      array.splice(cardIndex, 1);
      console.log(array)
      setExtraDeck(array);
    }
  }
  return (
    <div className="ExtraDeck">
      <div className='extraDeck'>
        {extraDeck ? (
        extraDeck.map((card, index) => {
          return (
            <div
              className="card"
              onClick={() => {
                removeCard(index)
              }}
              onMouseOver={() => {setCardHovered(card)}}
            >
              <Card cardData={card} index={index} />
            </div>
          );
        })
      ) : (
        <div>ExtraDeck</div>
      )}
      </div>
      
    </div>
  )
}

export default ExtraDeck