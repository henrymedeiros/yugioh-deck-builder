import React from 'react';
import { useSelectedCardContext } from '../contexts/SelectedCardContext';

export default function CardInfo() {
  const { selectedCard } = useSelectedCardContext();

  function parseCardDesc(cardDesc) {
    let descArray = cardDesc.split('\n');
    return descArray.map((cardDesc, index) => {
      return (
        <p key={index}>{cardDesc}</p>
      );
    });
  }


  return (
    <div className="CardData border border-black p-2">
      {selectedCard &&
        <div className="text-center w-[90%] mx-[5%] my-[10px]">
          {selectedCard.name}
        </div>
      }
      {selectedCard ? (
        <div className='max-w-[420px] w-[70%] min-w-[180px] mx-auto'>
          <img
            src={selectedCard.imgUrlBig}
            alt={selectedCard.name}
          />
        </div>

      ) : (
        <span></span>
      )}
      {selectedCard &&
        <div className="text-center w-[90%] mx-[5%] my-[10px]">
          [{selectedCard.race}/{selectedCard.type}]
        </div>
      }
      {selectedCard &&
        <div className="text-center w-[90%] mx-[5%] my-[10px]">

          {selectedCard.type !== "Spell Card" && selectedCard.type !== "Trap Card" && (
            <span>ATK: {selectedCard.atk} / DEF: {selectedCard.def}</span>
          )}
        </div>
      }
      {selectedCard &&
        <div className='bg-black bg-opacity-5 text-white p-4'>{parseCardDesc(selectedCard.desc)}</div>
      }
    </div>
  );
}
