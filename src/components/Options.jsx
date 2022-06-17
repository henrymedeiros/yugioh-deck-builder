import React from 'react'

function Options({setDeck}) {
  return (
    <div>
        <button onClick={() => setDeck([]) }>Clear</button>
    </div>
  )
}

export default Options