import { useState, useEffect } from "react";
import "../src/styles/globals.scss";
import axios from "axios";


import CardContentColumn from "./components/CardContentColumn.jsx";
import DeckEditorColumn from "./components/DeckEditorColumn.jsx";
import SearchCardColumn from "./components/SearchCardColumn.jsx";

function App() {
  const [data, setData] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [isHovering, setIsHovering] = useState(false);
  const [cardHovered, setCardHovered] = useState(null);

  const getData = (url) => {
    axios
      .get(url)
      .then((response) => {
        console.log(response.data);
        setData(response.data.data);
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
      <h1> Yu-Gi-Oh! Deck Editor </h1>
      <div className="container">
        <CardContentColumn
          className="cardContentColumn"
          cardHovered={cardHovered}
        ></CardContentColumn>

        <DeckEditorColumn></DeckEditorColumn>

        <SearchCardColumn className='searchCardColumn' setCardHovered={setCardHovered}>
        </SearchCardColumn>

        
      </div>
    </div>
  );
}
export default App;

/*{
      data.map((card) => {
        return <CardItem name={card.name} race={card.race} imgUrl={card.card_images[0].image_url} />
      })}
      
      
      <div className="searchArea">
          <input
            type="text"
            placeholder="Search"
            onChange={(e) => setSearchTerm(e.target.value)}
          ></input>
          <div className="cardsGrid">
            {data ? (
              data
                .filter((card) => {
                  if (searchTerm == "") {
                    return card;
                  } else if (
                    card.name.toLowerCase().includes(searchTerm.toLowerCase())
                  ) {
                    return card;
                  }
                })
                .map((card) => {
                  return (
                    <div
                      onMouseEnter={() => {
                        setCardHovered({
                          name: card.name,
                          imgUrl: card.card_images[0].image_url,
                        });
                      }}
                    >
                      <CardItem
                        key={card.id}
                        name={card.name}
                        type={card.type}
                        race={card.race}
                        attribute={card.attribute}
                        level={card.level}
                        atk={card.atk}
                        def={card.def}
                        imgUrl={card.card_images[0].image_url_small}
                      />
                    </div>
                  );
                })
            ) : (
              <strong> Fetch error! </strong>
            )}
          </div>
        </div>
      */
