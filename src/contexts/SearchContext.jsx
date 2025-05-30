// SearchContext.jsx
import React, { createContext, useContext, useState } from 'react'

const SearchContext = createContext()

export function SearchProvider({ children }) {
  const [search, setSearch] = useState({
    searchResults: [],
    searchQuery: '',
    searchError: '',
    loadingSearch: true,
    loadingMore: true
  })
  return (
    <SearchContext.Provider value={{ search, setSearch }}>
      {children}
    </SearchContext.Provider>
  )
}

export function useSearchContext() {
  const context = useContext(SearchContext)
  if (!context) {
    throw new Error('useSearchContext must be used within a SearchProvider')
  }
  return context
}
