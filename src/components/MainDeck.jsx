import React from "react";

import CardsGrid from "./CardsGrid.jsx";
import AreaTitle from "./AreaTitle.jsx";

export default function MainDeck({ deck, setDeck }) {
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
                minGridRows={4}
                maxGridRows={5}
                minGridColumns={10}
                maxGridColumns={12}
            ></CardsGrid>
        </div>
    );
}
