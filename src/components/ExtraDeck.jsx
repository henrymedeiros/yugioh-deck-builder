import React from 'react'
import Card from "./Card.jsx";
import { useState } from "react";
import AreaTitle from './AreaTitle.jsx';
import { useSelectedCardContext } from '../contexts/SelectedCardContext.jsx';

function ExtraDeck({extraDeck, setExtraDeck, isOverlapped}) {
  const {setSelectedCard} = useSelectedCardContext();

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
      <AreaTitle id={'extraDeckAreaTitle'} title={'Extra Deck'} areaCardCount={extraDeck.length}></AreaTitle>
      <div className={`${isOverlapped ? 'extraDeck': 'extraDeckGrid'}` }>
        {extraDeck ? (
        extraDeck.map((card, index) => {
          return (
            <div
              className="card"
              onClick={() => {
                removeCard(index)
              }}
              onMouseOver={() => {setSelectedCard(card)}}
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