import React from "react";
import Card from "./Card.jsx";

export default function MainDeck({ deck, setDeck, setCardHovered}) {
  function removeCard(cardIndex) {
    var array = [...deck]; // make a separate copy of the array
    if (cardIndex !== -1) {
      array.splice(cardIndex, 1);
      console.log(array)
      setDeck(array);
    }
  }

  return (
    <div className="MainDeck">
      <div className="Deck">
        <div>
        {deck ? (
        deck.map((card, index) => {
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
        <div></div>
      )}
        </div>
      
      </div>
    </div>
  );
}
