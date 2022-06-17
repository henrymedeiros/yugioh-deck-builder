import React from 'react'

export default function CardInfo({cardHovered}) {
  return (
    <div className='CardData'>
    {cardHovered ? ( <img src={cardHovered.imgUrlBig}></img> ) : <span></span>}
    </div>
  )
}
