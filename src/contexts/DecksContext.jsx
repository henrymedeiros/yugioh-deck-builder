// DecksContext.jsx
import React, { createContext, useContext, useState } from 'react'

const DecksContext = createContext()

export function DecksProvider({ children }) {
  const [decks, setDecks] = useState({
    mainDeck: [],
    extraDeck: [],
    sideDeck: [] // not implemented
  })
  return (
    <DecksContext.Provider value={{ decks, setDecks }}>
      {children}
    </DecksContext.Provider>
  )
}

export function useDecksContext() {
  const context = useContext(DecksContext)
  if (!context) {
    throw new Error('DecksContext must be used within a DecksProvider')
  }
  return context
}
