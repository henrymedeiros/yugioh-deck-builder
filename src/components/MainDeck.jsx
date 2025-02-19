import React from "react";

import CardsGrid from "./CardsGrid.jsx";
import AreaTitle from "./AreaTitle.jsx";

export default function MainDeck({ deck, setDeck, setCardHovered }) {
    function removeCard(cardIndex) {
        var array = [...deck]; // make a separate copy of the array
        if (cardIndex !== -1) {
            array.splice(cardIndex, 1);
            console.log(array);
            setDeck(array);
        }
    }

    return (
        <div className="MainDeck">
            <AreaTitle
                id="mainDeckAreaTitle"
                title="Main Deck"
                areaCardCount={deck.length}
            ></AreaTitle>
            <CardsGrid
                cards={deck}
                setCards={setDeck}
                setCardHovered={setCardHovered}
                minGridRows={4}
                maxGridRows={5}
                minGridColumns={10}
                maxGridColumns={12}
            ></CardsGrid>
        </div>
    );
}
