import React from 'react';

export default function CardInfo({ cardHovered }) {
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
      {cardHovered &&
        <div className="text-center w-[90%] mx-[5%] my-[10px]">
          {cardHovered.name}
        </div>
      }
      {cardHovered ? (
        <div className='max-w-[420px] w-[70%] min-w-[180px] mx-auto'>
          <img
            src={cardHovered.imgUrlBig}
            alt={cardHovered.name}
          />
        </div>

      ) : (
        <span></span>
      )}
      {cardHovered &&
        <div className="text-center w-[90%] mx-[5%] my-[10px]">
          [{cardHovered.race}/{cardHovered.type}]
        </div>
      }
      {cardHovered &&
        <div className="text-center w-[90%] mx-[5%] my-[10px]">

          {cardHovered.type !== "Spell Card" && cardHovered.type !== "Trap Card" && (
            <span>ATK: {cardHovered.atk} / DEF: {cardHovered.def}</span>
          )}
        </div>
      }
      {cardHovered &&
        <div className='bg-black bg-opacity-5 text-white p-4'>{parseCardDesc(cardHovered.desc)}</div>
      }
    </div>
  );
}
