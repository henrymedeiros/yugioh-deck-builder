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

  function parseTypeline(typeline) {
    return typeline.map((typelineItem, index) => {
      if (index === typeline.length - 1) {
        return typelineItem;
      }
      return typelineItem + "/";
    });
  }


  return (
    <div className="CardData border border-black p-2 ">
      {selectedCard &&
        <div className={`text-center w-[90%] mx-[5%] my-[10px] py-1.5 rounded bg-black`}>
          {selectedCard.name}
        </div>
      }
      {selectedCard ? (
        <div className='max-w-[420px] w-[65%] min-w-[180px] mx-auto'>
          <img
            src={selectedCard.imgUrlBig}
            alt={selectedCard.name}
          />
        </div>

      ) : (
        <span></span>
      )}
      {selectedCard &&
        <div className="flex justify-center items-center gap-2 text-center w-[90%] mx-[5%] my-[10px]">
          {selectedCard.typeline ? <span>[{parseTypeline(selectedCard.typeline)}]</span> : <span>[{selectedCard.race}/{selectedCard.type}]</span>}
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
        <div className='bg-black w-[90%] mx-auto bg-opacity-5 text-white p-4'>
          <div className='text-center text-xs mb-4'>ID: {selectedCard.id }</div>
          <div className='text-sm'>{parseCardDesc(selectedCard.desc)}</div>
        </div>
      }
    </div>
  );
}
