import React from 'react'

function Options({setDeck, setExtraDeck, }) {
  return (
    <div>
        <button onClick={() => {setDeck([]);setExtraDeck([])} }>Clear</button>
        
    </div>
  )
}

export default Options