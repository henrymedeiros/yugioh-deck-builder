import React from "react";
import Card from "./Card.jsx";
import { useSelectedCardContext } from "../contexts/SelectedCardContext.jsx";

function CardsGrid({
  cards,
  setCards,
  minGridRows,
  maxGridRows,
  minGridColumns,
  maxGridColumns,
}) {
  const { setSelectedCard } = useSelectedCardContext()
  let cardsCount = cards.length;
  let shouldChangeGrid = cardsCount > 40;
  let gridColumns = minGridColumns;
  let gridRows = minGridRows;

  function changeGrid() {
    gridColumns = maxGridColumns;
    gridRows = maxGridRows;
  }

  if (shouldChangeGrid) {
    changeGrid();
  }

  function removeCard(cardIndex) {
    var array = [...cards]; // make a separate copy of the array
    if (cardIndex !== -1) {
      array.splice(cardIndex, 1);
      console.log(array);
      setCards(array);
    }
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

  return (
    <div
      className={`w-full grid gap-1 ${gridColsClasses[gridColumns]} ${gridRowsClasses[gridRows]}`}
    >
      {cards
        ? cards.map((card, index) => {
          return (
            <div
              className="card"
              onClick={() => {
                removeCard(index);
              }}
              onMouseOver={() => {
                setSelectedCard(card);
              }}
              key={index}
            >
              <Card cardData={card} index={index} />
            </div>
          );
        })
        : console.log("oxe")}
    </div>
  );
}

export default CardsGrid;
