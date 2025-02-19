import React from 'react'

export default function CardInfo({cardHovered}) {
  return (
    <div className='CardData area'>
      {cardHovered ? ( <span>{cardHovered.name}</span> ) : <span></span>}
      {cardHovered ? ( <img style={{ maxWidth: 420, minWidth: 180}} src={cardHovered.imgUrlBig}></img> ) : <span></span>}
    </div>
  )
}
