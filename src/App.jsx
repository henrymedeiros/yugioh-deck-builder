import "../src/styles/globals.scss";

import CardInfo from "./components/CardInfo.jsx";
import MainDeck from "./components/MainDeck.jsx";
import Search from "./components/Search.jsx";
import Options from "./components/Options.jsx";
import Lister from "./components/Lister.jsx";
import ExtraDeck from "./components/ExtraDeck.jsx";

import { useState, useEffect } from "react";

import axios from "axios";

function App() {
  const [searchData, setSearchData] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [deck, setDeck] = useState([]);
  const [extraDeck, setExtraDeck] =  useState([]);
  const [isOverlapped, setIsOverlapped] = useState(false);

  const getData = (url) => {
    axios
      .get(url)
      .then((response) => {
        console.log(response.data.meta);
        console.log(response.data);
        setSearchData(response.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    if (searchTerm.length >= 3) {
      getData(
        `https://db.ygoprodeck.com/api/v7/cardinfo.php?fname=${searchTerm}`
      );
    } else {
      return;
    }
  }, [searchTerm]); 

  return (
    <div className="App bg-[#001b35] text-white">
      <div className="Container">
        <CardInfo></CardInfo>
        <MainDeck deck={deck} setDeck={setDeck}></MainDeck>
        <ExtraDeck extraDeck={extraDeck} setExtraDeck={setExtraDeck} isOverlapped={isOverlapped}></ExtraDeck>
        <Search setSearchTerm={setSearchTerm}></Search>
        <Options setDeck={setDeck} setExtraDeck={setExtraDeck} ></Options>
        <Lister
          searchData={searchData}
          searchTerm={searchTerm}
          deck={deck}
          setDeck={setDeck}
          extraDeck={extraDeck}
          setExtraDeck={setExtraDeck}
          setIsOverlapped={setIsOverlapped} //
        ></Lister>
      </div>
    </div>
  );
}
export default App;
