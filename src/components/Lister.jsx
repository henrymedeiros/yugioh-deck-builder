import React from "react";
import Card from "./Card.jsx";
import shortid from "shortid";

export default function Lister({
  searchData,
  searchTerm,
  deck,
  setDeck,
  extraDeck,
  setExtraDeck,
  setCardHovered,
}) {
  const belongsToExtraDeck = (type) => {
    if (
      type === "XYZ Monster" ||
      type === "Pendulum Effect Fusion Monster" ||
      type === "Synchro Monster" ||
      type === "Synchro Pendulum Effect Monster" ||
      type === "Synchro Tuner Monster" ||
      type === "XYZ Pendulum Effect Monster" ||
      type === "Fusion Monster" ||
      type === "Link Monster"
    ) {
      return true;
    } else {
      return false;
    }
  };

  const isCardAtMaxCount = (cardsArray, id) => {
    let cardCount = cardsArray.filter(card => card.id === id).length
    console.log(cardCount)
    if (cardCount === 3) {
      return true
    }
    return false
  };

  return (
    <div className="Lister">
      {searchData ? (
        searchData
          .filter((card) => {
            if (searchTerm == "") {
              return card;
            } else if (
              card.name.toLowerCase().includes(searchTerm.toLowerCase())
            ) {
              return card;
            }
          })
          .map((card) => {
            let cardData = {
              id: card.id,
              name: card.name,
              type: card.type,
              race: card.race,
              attribute: card.attribute,
              level: card.level,
              atk: card.atk,
              def: card.def,
              imgUrl: card.card_images[0].image_url_small,
              imgUrlBig: card.card_images[0].image_url,
            };
            return (
              <div
                onClick={() => {
                  
                  if (isCardAtMaxCount(deck, card.id) || isCardAtMaxCount(extraDeck, card.id)) {
                    return
                  }
                  belongsToExtraDeck(cardData.type) ? setExtraDeck([...extraDeck, cardData]) : setDeck([...deck, cardData]) 
                  
                }}
                onMouseOver={() => {
                  setCardHovered(cardData);
                }}
              >
                <Card cardData={cardData} index={shortid.generate()} />
              </div>
            );
          })
      ) : (
        <strong> Fetch error! </strong>
      )}
    </div>
  );
}
