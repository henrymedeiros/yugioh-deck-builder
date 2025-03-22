import React from 'react'
import CardsList from './CardsList'
import Search from './Search'

function CardsSearch() {
  return (
    <div className='cardsSearch area'>
      <Search></Search>
      <CardsList></CardsList>
    </div>
  )
}

export default CardsSearch