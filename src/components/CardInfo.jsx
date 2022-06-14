import React from 'react'

export default function CardInfo({cardHovered}) {
  return (
    <div className='CardData'>
    {cardHovered ? ( <img src={cardHovered.imgUrl}></img> ) : <span></span>}
    </div>
  )
}
