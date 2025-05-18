import React from "react";
import { apiCardDataToCardComponentData, getYear } from "../utils/helpers";
import { useDecksContext } from "../contexts/DecksContext";
import { useState, useRef, useEffect } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { DECKS_CLEARED } from "../lib/constants";


function NavBar() {
    const { decks, setDecks } = useDecksContext();
    const fileInputRef = useRef(null);
    const [fileContent, setFileContent] = useState(null);

    // Fetch cards by IDs
    const fetchCardsByIds = async (ids) => {
        try {
            const response = await axios.get(
                `https://db.ygoprodeck.com/api/v7/cardinfo.php?id=${ids.join(
                    ","
                )}`
            );
            return response.data.data; // Return the fetched card data
        } catch (error) {
            console.error("ERROR", error);
            toast.error("Failed to fetch card data.");
            return [];
        }
    };

    // Parse .ydk file content
    const parseYdkFile = (fileContent) => {
        let mainDeck = [];
        let extraDeck = [];

        if (!fileContent.includes("#main") || !fileContent.includes("#extra")) {
            toast.error("Invalid .ydk file format.");
            return { mainDeck, extraDeck };
        }

        const lines = fileContent.split("\n").map((line) => line.trim());
        console.log(lines);

        lines.forEach((line) => {
            if (line[0] === "#" && line !== "#main" && line !== "#extra") {
                console.log("skip comment line", line);
            }
        });

        lines.find((line, index) => {
            if (line === "#main") {
                mainDeck = lines.slice(index + 1, lines.indexOf("#extra"));
            }
            if (line === "#extra") {
                extraDeck = lines.slice(index + 1, lines.indexOf("!side"));
            }
        });
        console.log(mainDeck, extraDeck);
        return {
            parsedMainDeck: mainDeck,
            parsedExtraDeck: extraDeck,
        };
    };

    function mapCardIdsToIndexes(deck) {
        // this will get a card id and store it's original indexes (if more than one copy). Will do this for the whole ydk file
        let cardIdsToIndexes = new Map();

        deck.forEach((card, index) => {
            if (!cardIdsToIndexes.has(card)) {
                cardIdsToIndexes.set(card, []);
            }
            cardIdsToIndexes.get(card).push(index);
        });

        return cardIdsToIndexes;
    }

    function buildDeckFromCardMap(cardsMap, deckCardsFromApi) {
        let deckBuilt = [];
        cardsMap.entries().forEach(([key, value]) => {
            let copiesCount = value.length;
            let foundCard = deckCardsFromApi.find(
                (card) => card.id == key.trim()
            );
            if (foundCard == undefined) {
                return;
            }
            deckBuilt.push(...Array(copiesCount).fill(foundCard));
        });
        return deckBuilt;
    }

    // Handle file input change
    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                const content = e.target.result;
                setFileContent(content); // Set the file content to state
            };
            reader.readAsText(file); // Read the file as text
        }
    };

    // Trigger file input click
    const loadDeck = () => {
        fileInputRef.current.click();
    };

    function saveDeck() {
        let mainDeckString = "#main\n";
        let extraDeckString = "#extra\n";
        decks.mainDeck.forEach((card) => {
            mainDeckString = mainDeckString.concat(`${card.id}\n`);
        });
        decks.extraDeck.forEach((card) => {
            extraDeckString = extraDeckString.concat(`${card.id}\n`);
        });

        const ydkFileContent = mainDeckString + extraDeckString + "!side";

        console.log(ydkFileContent);

        const blob = new Blob([ydkFileContent], { type: "text/plain" });

        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = "deck.ydk"; // Name of the downloaded file
        document.body.appendChild(link);

        // Trigger the download
        link.click();

        // Clean up
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
    }

    // Effect to handle file content changes
    useEffect(() => {
        const processFileContent = async () => {
            if (fileContent) {
                // Parse the .ydk file
                const { parsedMainDeck, parsedExtraDeck } =
                    parseYdkFile(fileContent);

                if (
                    parsedMainDeck.length === 0 &&
                    parsedExtraDeck.length === 0
                ) {
                    return;
                }

                // Fetch all unique card IDs
                const allCardIds = [
                    ...new Set([...parsedMainDeck, ...parsedExtraDeck]),
                ];
                const allCards = await fetchCardsByIds(allCardIds);

                // map the index of the ids to get order and card copies
                const mainDeckCardIdsToIndexesMap =
                    mapCardIdsToIndexes(parsedMainDeck);
                const extraDeckCardIdsToIndexesMap =
                    mapCardIdsToIndexes(parsedExtraDeck);

                let finalMainDeck,
                    finalExtraDeck = [];

                finalMainDeck = buildDeckFromCardMap(
                    mainDeckCardIdsToIndexesMap,
                    allCards
                );

                finalExtraDeck = buildDeckFromCardMap(
                    extraDeckCardIdsToIndexesMap,
                    allCards
                );

                // Update the decks context
                setDecks((prev) => ({
                    ...prev,
                    mainDeck: finalMainDeck.map((card) => {
                        //console.log("Card:", card.name + " - " + card.id);
                        return apiCardDataToCardComponentData(card);
                    }),
                    extraDeck: finalExtraDeck.map((card) => {
                        return apiCardDataToCardComponentData(card);
                    }),
                }));
            }
        };

        processFileContent(); // Call the async function
    }, [fileContent]);

    return (
        <>
            <div
                id="appNavbar"
                className="flex w-full items-center justify-between mx-auto"
            >
                <div className="flex items-center gap-2">
                    <img className="w-30" src="/yu-gi-oh_logo.png" alt="" />
                    <span> Deck Builder </span>
                </div>

                <div className="flex items-center gap-4">
                    <button
                        className="bg-white text-black py-1 px-2"
                        onClick={() => saveDeck()}
                    >
                        Save Deck
                    </button>
                    <button
                        className="bg-white text-black py-1 px-2"
                        onClick={() => loadDeck()}
                    >
                        <input
                            type="file"
                            ref={fileInputRef}
                            onChange={handleFileChange}
                            style={{ display: "none" }} // Hide the default file input
                            accept=".ydk"
                        />
                        Load Deck
                    </button>

                    <button
                        className="bg-white text-black py-1 px-2"
                        onClick={() => {
                            setDecks({ mainDeck: [], extraDeck: [] });
                            toast(DECKS_CLEARED);
                        }}
                    >
                        Clear
                    </button>
                </div>
            </div>
        </>
    );
}

export default NavBar;
