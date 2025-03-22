import Card from "./Card.jsx";
import { useState, useEffect } from "react";
import AreaTitle from "./AreaTitle.jsx";
import { useSelectedCardContext } from "../contexts/SelectedCardContext.jsx";
import { useDecksContext } from "../contexts/DecksContext.jsx";
import DeckStats from "./DeckStats.jsx";



function ExtraDeck() {
    const { setSelectedCard } = useSelectedCardContext();
    const [shouldOverlap, setShouldOverlap] = useState(false);

    const { decks, setDecks } = useDecksContext();

    function removeCardFromExtraDeck(index) {
        var array = [...decks.extraDeck]; // make a separate copy of the array
        if (index !== -1) {
            array.splice(index, 1);
            setDecks({ ...decks, extraDeck: array });
        }
    }

    useEffect(() => {
        if (decks.extraDeck.length > 10) {
            setShouldOverlap(true);
        } else if (decks.extraDeck.length <= 10) {
            setShouldOverlap(false);
        }
    }, [decks.extraDeck]);

    return (
      <div id="extra-deck" className="area">
          <AreaTitle
              id={"decks.extraDeckAreaTitle"}
              title={"Extra Deck"}
              areaCardCount={decks.extraDeck.length}
          >
              <DeckStats deck={decks.extraDeck} />
          </AreaTitle>
          <div
              className={`p-2 h-[calc(100%-35px)] ${
                    shouldOverlap ? "flex-mode" : "grid-mode"
                }`}
          >
              {decks.extraDeck && (
                  decks.extraDeck.map((card, index) => (
                      <div
                          className="card"
                          onClick={() => removeCard(index)}
                          onMouseOver={() => setSelectedCard(card)}
                          key={index} // Use card.id or index as the key
                      >
                          <Card
                              cardData={card}
                              index={index}
                              onClick={removeCardFromExtraDeck}
                          />
                      </div>
                  ))
              )}
          </div>
      </div>
  );
}

export default ExtraDeck;
