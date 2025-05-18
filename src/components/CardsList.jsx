import React, { useEffect, useState, useRef } from "react";
import Card from "./Card.jsx";
import shortid from "shortid";
import { useSelectedCardContext } from "../contexts/SelectedCardContext.jsx";
import { useSearchContext } from "../contexts/SearchContext.jsx";
import { useDecksContext } from "../contexts/DecksContext.jsx";

import { API_RESULTS_LIMIT, EXTRA_DECK_FULL_MESSAGE, extraDeckMonsterTypes, MAIN_DECK_FULL_MESSAGE } from "../lib/constants.js";

import { toast } from "react-toastify";
import { useSearchParams } from "react-router-dom";

export default function CardsList() {
    const { decks, setDecks } = useDecksContext();
    const { setSelectedCard } = useSelectedCardContext();
    const { search } = useSearchContext();
    const [searchParams, setSearchParams] = useSearchParams({});
    const cardsListRef = useRef(null);
    const [isAtBottom, setIsAtBottom] = useState(false);
    const triggerRef = useRef(null);

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

    // Check if we should show the load more trigger
    const shouldShowLoadMoreTrigger = () => {
        return (
            search.searchResults.length >= API_RESULTS_LIMIT &&
            !search.loadingSearch &&
            search.searchResultsMetaData.next_page_offset
        );
    };

    // Setup intersection observer for infinite scrolling
    useEffect(() => {
        if (search.loadingSearch || !shouldShowLoadMoreTrigger() || !triggerRef.current) {
            return;
        }

        const intersectionObserver = new IntersectionObserver((entries) => {
            if (entries.some((entry) => entry.isIntersecting)) {
                setTimeout(() => {
                    if (!search.searchResultsMetaData.next_page_offset) {
                        return;
                    }

                    setSearchParams((prev) => {
                        prev.set('offset', search.searchResultsMetaData.next_page_offset);
                        return prev;
                    });
                }, 5000);
            }
        });

        intersectionObserver.observe(triggerRef.current);
        return () => intersectionObserver.disconnect();
    }, [search.searchResults, search.loadingSearch, triggerRef.current]);

    // Filter cards that match the search query
    const filteredCards = search.searchError ? [] : search.searchResults.filter((card) => {
        return card.name.toLowerCase().includes(search.searchQuery.toLowerCase());
    });

    return (
        <div className="CardsList">
            <div
                ref={cardsListRef}
                className="grid grid-cols-4 gap-x-1 gap-y-2 overflow-y-auto"
            >
                {search.searchError ? (
                    <strong>Fetch error!</strong>
                ) : (
                    <>
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

                        {shouldShowLoadMoreTrigger() && (
                            <div
                                ref={triggerRef}
                                id="loadMoreCardsTrigger"
                                onClick={() => {
                                    if (!search.searchResultsMetaData.next_page_offset) {
                                        return;
                                    }
                                    setSearchParams((prev) => {
                                        prev.set('offset', search.searchResultsMetaData.next_page_offset);
                                        return prev;
                                    });
                                }}
                                className="bg-red-500 h-4 w-full col-span-4"
                            />
                        )}
                    </>
                )}
            </div>
        </div>
    );
}