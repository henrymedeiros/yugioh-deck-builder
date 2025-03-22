// MainDeckContext.jsx
import React, { createContext, useContext, useState } from 'react'

const MainDeckContext = createContext()

export function MainDeckProvider({ children }) {
  const [mainDeck, setMainDeck] = useState([])
  return (
    <MainDeckContext.Provider value={{ mainDeck, setMainDeck }}>
      {children}
    </MainDeckContext.Provider>
  )
}

export function useMainDeckContext() {
  const context = useContext(MainDeckContext)
  if (!context) {
    throw new Error('useMainDeckContext must be used within a MainDeckProvider')
  }
  return context
}
