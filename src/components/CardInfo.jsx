import React from 'react'

export default function CardInfo({cardHovered}) {
  return (
    <div className='CardData area'>
    {cardHovered ? ( <img src={cardHovered.imgUrlBig}></img> ) : <span></span>}
    </div>
  )
}
