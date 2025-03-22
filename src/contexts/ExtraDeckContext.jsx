import React, { createContext, useContext, useState } from 'react'

const ExtraDeckContext = createContext()

export function ExtraDeckProvider({ children }) {
    const [extraDeck, setExtraDeck] = useState([])
    return (
        <ExtraDeckContext.Provider value={{ extraDeck, setExtraDeck }}>
            {children}
        </ExtraDeckContext.Provider>
    )
}

export function useExtraDeckContext() {
  const context = useContext(ExtraDeckContext)
  if (!context) {
    throw new Error('useExtraDeckContext must be used within a ExtraDeckProvider')
  }
  return context
}