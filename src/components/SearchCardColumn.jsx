import { useState, useEffect } from "react";
import axios from "axios";

import CardItem from "./CardItem.jsx";

const SearchCardColumn = ({setCardHovered}) => {
    const [searchData, setSearchData] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");

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
    
    <div className="searchCardColumn">
         <input
            type="text"
            placeholder="Search"
            onChange={(e) => setSearchTerm(e.target.value)}
          ></input>
          <div className="cardsGrid">
          {searchData ? (
              searchData
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
        
    </div> );
}
 
export default SearchCardColumn;