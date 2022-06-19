import React from 'react'
import Card from "./Card.jsx";
import { useState } from "react";

function ExtraDeck({extraDeck, setExtraDeck, setCardHovered, isOverlapped}) {
  
  
  function removeCard(cardIndex) {
    var array = [...extraDeck]; // make a separate copy of the array
    if (cardIndex !== -1) {
      array.splice(cardIndex, 1);
      console.log(array)
      setExtraDeck(array);
    }
  }
  return (
    <div className="ExtraDeck area">
      <div className='areaTitle'>Extra: {extraDeck.length}</div>
      <div className={`${isOverlapped ? 'extraDeck': 'extraDeckGrid'}` }>
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