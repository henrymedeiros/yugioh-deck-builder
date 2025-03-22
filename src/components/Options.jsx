import React from 'react'
import { useMainDeckContext } from '../contexts/MainDeckContext'
import { useExtraDeckContext } from '../contexts/ExtraDeckContext'

import axios from "axios";

function Options({setDeck, setExtraDeck, }) {
  const {mainDeck} = useMainDeckContext();
  const {extraDeck} = useExtraDeckContext();
  console.log(mainDeck)
  return (
    <div className='area'>
        <button onClick={() => {setDeck([]);setExtraDeck([])} }>Clear</button>
        <select name="bruh" id="bruh">
          <option value="oi">oi</option>
        </select>
        <button onClick={() => {
          let cardCountById = {};
          for (let card of mainDeck) {
            cardCountById[card.id] = (cardCountById[card.id] || 0) + 1;
          }
          console.log(cardCountById)



          let mainDeckIds = mainDeck.map(card => card.id)
          let uniqueMainDeckIds = [...new Set(mainDeckIds)]
          console.log(uniqueMainDeckIds)

          axios
            .get(`https://db.ygoprodeck.com/api/v7/cardinfo.php?id=${uniqueMainDeckIds.join(',')}`)
            .then((response) => {
              console.log(response.data.meta);
              console.log(response.data);
            })
            .catch((err) => {
              console.log(err);
            });
        }}>Save Main Deck</button>
    </div>
  )
}

export default Options