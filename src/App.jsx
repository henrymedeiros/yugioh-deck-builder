import { useState, useEffect } from "react";
import "../src/styles/globals.scss";
import axios from "axios";

import CardContentColumn from "./components/CardContentColumn.jsx";
import DeckEditorColumn from "./components/DeckEditorColumn.jsx";
import SearchCardColumn from "./components/SearchCardColumn.jsx";

import { HoverCardContext } from "./contexts/HoverCardContext.js";

function App() {

  const [cardHovered, setCardHovered] = useState(null);
  return (
    
    <div className="App">
      <h1> Yu-Gi-Oh! Deck Editor </h1>
      <div className="container">
        <HoverCardContext.Provider value={{cardHovered, setCardHovered}}>
          <CardContentColumn></CardContentColumn>

          <DeckEditorColumn></DeckEditorColumn>

          <SearchCardColumn></SearchCardColumn>
        </HoverCardContext.Provider>
      </div>
    </div>
  );
}
export default App;

