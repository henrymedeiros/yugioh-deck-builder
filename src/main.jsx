import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { SelectedCardProvider } from './contexts/SelectedCardContext'


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <SelectedCardProvider>
      <App />
    </SelectedCardProvider>
    
  </React.StrictMode>
)
