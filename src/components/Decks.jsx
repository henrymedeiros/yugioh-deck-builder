import React from 'react'
import MainDeck from './MainDeck'
import ExtraDeck from './ExtraDeck'

function Decks() {
  return (
    <div className='decks'>
        <MainDeck></MainDeck>
        <ExtraDeck></ExtraDeck>
    </div>
  )
}

export default Decks