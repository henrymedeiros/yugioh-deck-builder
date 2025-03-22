import React from "react";
import Card from "./Card.jsx";
import shortid from "shortid";
import { useSelectedCardContext } from "../contexts/SelectedCardContext.jsx";
import { useSearchContext } from "../contexts/SearchContext.jsx";
import { useDecksContext } from "../contexts/DecksContext.jsx";

import { EXTRA_DECK_FULL_MESSAGE, extraDeckMonsterTypes, MAIN_DECK_FULL_MESSAGE } from "../lib/constants.js";

import { toast } from "react-toastify";

export default function CardsList() {
    const { decks, setDecks } = useDecksContext();
    const { setSelectedCard } = useSelectedCardContext();
    const { search } = useSearchContext();

    const belongsToExtraDeck = (type) => {
        if (Object.values(extraDeckMonsterTypes).includes(type)) {
            return true;
        } else {
            return false;
        }
    };

    const handleCardClick = (cardData) => {
        // if extra deck card, add to extra deck. Also, check if extra deck is full
        if (belongsToExtraDeck(cardData.type)) {
            if (decks.extraDeck.length >= 15) {
                toast(EXTRA_DECK_FULL_MESSAGE);
                return;
            }
            setDecks((prev) => {
                return {
                    ...prev,
                    extraDeck: [...prev.extraDeck, cardData],
                };
            });
            return;
        }

        // if main deck card, add to main deck. Also, check if main deck is full
        if (decks.mainDeck.length >= 60) {
          toast(MAIN_DECK_FULL_MESSAGE);
            return;
        }
        setDecks((prev) => {
            return {
                ...prev,
                mainDeck: [...prev.mainDeck, cardData],
            };
        });
    };

    return (
        <div className="CardsList">
            {/* <div className="areaTitle">
                Results: {search.searchResults.length}
            </div> */}
            <div className="grid grid-cols-4 gap-x-1 gap-y-2 overflow-y-auto">
                {search.searchError == false ? (
                    search.searchResults
                        .filter((card) => {
                            if (search.searchQuery == "") {
                                return card;
                            } else if (
                                card.name
                                    .toLowerCase()
                                    .includes(search.searchQuery.toLowerCase())
                            ) {
                                return card;
                            }
                            return card;
                        })
                        .map((card) => {
                            let cardData = {
                                id: card.id,
                                name: card.name,
                                desc: card.desc,
                                type: card.type,
                                race: card.race,
                                attribute: card.attribute,
                                level: card.level,
                                atk: card.atk,
                                def: card.def,
                                imgUrl: card.card_images[0].image_url_small,
                                imgUrlBig: card.card_images[0].image_url,
                                typeline: card.typeline,
                                prices: card.card_prices,
                            };
                            return (
                                <div
                                    onClick={() => {
                                        handleCardClick(cardData);
                                    }}
                                    onMouseOver={() => {
                                        setSelectedCard(cardData);
                                    }}
                                >
                                    <Card
                                        cardData={cardData}
                                        index={shortid.generate()}
                                    />
                                </div>
                            );
                        })
                ) : (
                    <strong> Fetch error! </strong>
                )}
            </div>
        </div>
    );
}
