// SelectedCardContext.jsx
import React, { createContext, useContext, useState } from 'react'

const SelectedCardContext = createContext()

export function SelectedCardProvider({ children }) {
  const [selectedCard, setSelectedCard] = useState(null)
  return (
    <SelectedCardContext.Provider value={{ selectedCard, setSelectedCard }}>
      {children}
    </SelectedCardContext.Provider>
  )
}

export function useSelectedCardContext() {
  const context = useContext(SelectedCardContext)
  if (!context) {
    throw new Error('useSelectedCardContext must be used within a SelectedCardProvider')
  }
  return context
}
