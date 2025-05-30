import React, { useEffect, useState, useRef } from "react";
import Card from "./Card.jsx";
import shortid from "shortid";
import { useSelectedCardContext } from "../contexts/SelectedCardContext.jsx";
import { useSearchContext } from "../contexts/SearchContext.jsx";
import { useDecksContext } from "../contexts/DecksContext.jsx";

import {
    EXTRA_DECK_FULL_MESSAGE,
    extraDeckMonsterTypes,
    MAIN_DECK_FULL_MESSAGE,
} from "../lib/constants.js";

import { toast } from "react-toastify";
import { useSearchParams } from "react-router-dom";
import { MoonLoader } from "react-spinners";

export default function CardsList() {
    const { decks, setDecks } = useDecksContext();
    const { setSelectedCard } = useSelectedCardContext();
    const { search } = useSearchContext();
    const [searchParams, setSearchParams] = useSearchParams({});
    const cardsListRef = useRef(null);
    const triggerRef = useRef(null);
    const [isIntersecting, setIntersecting] = useState(false);

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

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                setIntersecting(entry.isIntersecting);
            },
            { rootMargin: "100px" }
        );

        if (triggerRef.current) {
            observer.observe(triggerRef.current);
        }
        return () => {
            if (triggerRef.current) observer.unobserve(triggerRef.current);
        };
    }, [
        search.searchResults,
        search.loadingSearch,
        search.searchResultsMetaData,
    ]);

    useEffect(() => {
        if (
            isIntersecting &&
            !search.loadingSearch &&
            search.searchResultsMetaData &&
            search.searchResultsMetaData.next_page_offset
        ) {
            setSearchParams((prev) => {
                prev.set(
                    "offset",
                    search.searchResultsMetaData.next_page_offset
                );
                return prev;
            });
        }
    }, [isIntersecting, setSearchParams]);

    // Filter cards that match the search query
    const filteredCards = search.searchError
        ? []
        : search.searchResults.filter((card) => {
              return card.name
                  .toLowerCase()
                  .includes(search.searchQuery.toLowerCase());
          });

    return (
        <div className="CardsList">
            <div ref={cardsListRef} className="h-full overflow-y-auto">
                {search.searchResults.length === 0 ? (
                    <div className="h-full flex items-center justify-center">
                        <span className="text-center col-span-4 place-self-center">
                            No results. Use filters or search bar to search for
                            a card.
                        </span>
                    </div>
                ) : search.searchError ? (
                    <div className="h-full flex items-center justify-center">
                        <span className="text-center">
                            {search.searchError}
                        </span>
                    </div>
                ) : search.loadingSearch ? (
                    <div className="h-full flex flex-col items-center justify-center">
                        <MoonLoader
                            color="#fff"
                            speedMultiplier={0.75}
                        ></MoonLoader>
                        <strong className="pt-5">Loading...</strong>
                    </div>
                ) : (
                    <div className="grid grid-cols-4 gap-x-1 gap-y-2">
                        {filteredCards.map((card, idx) => {
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
                                    key={idx}
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
                        })}
                    </div>
                )}
                {search.loadingMore && search.searchResults.length ? (
                    <div className="flex flex-col items-center justify-center my-3">
                        <MoonLoader
                            size={32}
                            color="#fff"
                            speedMultiplier={0.75}
                        ></MoonLoader>
                        <strong className="pt-3 text-xs">Loading more...</strong>
                    </div>
                ) : (
                    <div ref={triggerRef} className="invisible h-1" />
                )}
            </div>
        </div>
    );
}
