import "../src/styles/globals.scss";

import CardData from "./components/CardData.jsx";
import MainDeck from "./components/MainDeck.jsx";
import Search from "./components/Search.jsx";
import Lister from "./components/Lister.jsx";

import { useState, useEffect } from "react";

import axios from "axios";

function App() {
  const [searchData, setSearchData] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [deck, setDeck] = useState([]);

  const getData = (url) => {
    axios
      .get(url)
      .then((response) => {
        console.log(response.data);
        setSearchData(response.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    console.log(searchTerm);
    if (searchTerm.length >= 3) {
      getData(
        `https://db.ygoprodeck.com/api/v7/cardinfo.php?fname=${searchTerm}`
      );
    } else {
      return;
    }
  }, [searchTerm]);

  return (
    <div className="App">
      <div className="Container">
        <CardData></CardData>
        <MainDeck deck={deck} setDeck={setDeck}></MainDeck>
        <Search setSearchTerm={setSearchTerm}></Search>
        <Lister
          searchData={searchData}
          searchTerm={searchTerm}
          deck={deck}
          setDeck={setDeck}
        ></Lister>
      </div>
    </div>
  );
}
export default App;
