import React from "react";

import AreaTitle from "./AreaTitle.jsx";
import Card from "./Card.jsx";

import { useDecksContext } from "../contexts/DecksContext.jsx";
import { useSelectedCardContext } from "../contexts/SelectedCardContext.jsx";
import DeckStats from "./DeckStats.jsx";


export default function MainDeck() {
    const { decks, setDecks } = useDecksContext();
    const { setSelectedCard } = useSelectedCardContext();

    let cardsCount = decks.mainDeck.length;
    let shouldChangeGrid = cardsCount > 40;
    let gridColumns = 10;
    let gridRows = 4;

    function changeGrid() {
        gridColumns = 12;
        gridRows = 5;
    }

    if (shouldChangeGrid) {
        changeGrid();
    }

    const gridColsClasses = {
        10: "grid-cols-10",
        12: "grid-cols-12",
        // add more as needed
    };

    const gridRowsClasses = {
        4: "grid-rows-4",
        5: "grid-rows-5",
        // add more as needed
    };


    function removeMainDeckCard(index) {
        var array = [...decks.mainDeck]; // make a separate copy of the array
        if (index !== -1) {
            array.splice(index, 1);
            setDecks({ ...decks, mainDeck: array });
        }
    }

    return (
        <div id="main-deck" className="area">
            <AreaTitle
                id="mainDeckAreaTitle"
                title="Main Deck"
                areaCardCount={decks.mainDeck.length}
            >
                <DeckStats deck={decks.mainDeck} />

            </AreaTitle>
            <div
                className={`w-full grid gap-2 p-2 h-[calc(100%-35px)] ${gridColsClasses[gridColumns]} ${gridRowsClasses[gridRows]}`}
            >
                {decks.mainDeck.length > 0
                    ? decks.mainDeck.map((card, index) => {
                        return (
                            <div
                                className="card"
                                onMouseOver={() => {
                                    setSelectedCard(card);
                                }}
                                key={index}
                            >
                                <Card cardData={card} index={index} onClick={removeMainDeckCard} />
                            </div>
                        );
                    })
                    : <div></div>}
            </div>
        </div>
    );
}
