import React from "react";
import Card from "./Card.jsx";
import shortid from "shortid";

export default function Lister({ searchData, searchTerm, deck, setDeck }) {
  
 
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
            return (
              <div
                onClick={() => {
                  setDeck([
                    ...deck,
                    {
                      id: card.id,
                      name: card.name,
                      type: card.type,
                      race: card.race,
                      attribute: card.attribute,
                      level: card.level,
                      atk: card.atk,
                      def: card.def,
                      imgUrl: card.card_images[0].image_url_small,
                    },
                  ]);
                  //console.log(card.name);
                }}
              >
                <Card
                  cardData={{
                    id: card.id,
                    name: card.name,
                    type: card.type,
                    race: card.race,
                    attribute: card.attribute,
                    level: card.level,
                    atk: card.atk,
                    def: card.def,
                    imgUrl: card.card_images[0].image_url_small,
                  }}
                  index={shortid.generate()}
                  
                />
              </div>
            );
          })
      ) : (
        <strong> Fetch error! </strong>
      )}
    </div>
  );
}
