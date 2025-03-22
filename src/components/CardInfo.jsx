import React from "react";
import { useSelectedCardContext } from "../contexts/SelectedCardContext";

export default function CardInfo() {
    const { selectedCard } = useSelectedCardContext();

    function parseCardDesc(cardDesc) {
        let descArray = cardDesc.split("\n");
        return descArray.map((cardDesc, index) => {
            return <p key={index}>{cardDesc}</p>;
        });
    }

    function parseTypeline(typeline) {
        return typeline.map((typelineItem, index) => {
            if (index === typeline.length - 1) {
                return typelineItem;
            }
            return typelineItem + "/";
        });
    }

    return (
        <div id="card-info" className="cardInfo area p-2">
            {selectedCard ? (
                <>
                    <div
                        className={`text-center w-[90%] mx-[5%] my-[10px] py-1.5 rounded`}
                    >
                        {selectedCard.name}
                    </div>

                    <div className="max-w-[420px] w-[65%] min-w-[180px] mx-auto my-5">
                        <img
                            src={selectedCard.imgUrlBig}
                            alt={selectedCard.name}
                        />
                    </div>

                    <div className="flex justify-center items-center gap-2 text-center w-[90%] mx-[5%] my-[10px]">
                        {selectedCard.typeline ? (
                            <span>
                                [{parseTypeline(selectedCard.typeline)}]
                            </span>
                        ) : (
                            <span>
                                [{selectedCard.race}/{selectedCard.type}]
                            </span>
                        )}
                    </div>

                    <div className="text-center w-[90%] mx-[5%] my-[10px]">
                        {selectedCard.type !== "Spell Card" &&
                            selectedCard.type !== "Trap Card" && (
                                <span>
                                    ATK: {selectedCard.atk} / DEF:{" "}
                                    {selectedCard.def}
                                </span>
                            )}
                    </div>

                    <div className="w-[90%] mx-auto p-4">
                        <div className="text-center text-xs mb-4">
                            ID: {selectedCard.id}
                        </div>
                        <div className="text-sm text-justify">
                            {parseCardDesc(selectedCard.desc)}
                        </div>
                    </div>
                </>
            ) : (
                <>
                    <div
                        className={`text-center w-[90%] mx-[5%] my-[10px] py-1.5 rounded bg-black`}
                    >
                        Welcome!
                    </div>

                    <div className="max-w-[420px] w-[65%] min-w-[180px] mx-auto my-5">
                        <img src="card_back.jpg" alt="Card Back" />
                    </div>
                    <div className="text-center w-[90%] mx-[5%] my-[50px]"></div>
                    <div className="w-[90%] mx-auto p-4">
                        <div className="text-sm text-center">
                            <p> No card selected.</p>
                            <p>Start typing on the search bar to begin building your deck.</p>
                            </div>
                    </div>
                </>
            )}
        </div>
    );
}
