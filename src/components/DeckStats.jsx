import React from "react";
import { useMemo } from "react";
import { averageWithoutOutliers } from "../utils/helpers";
import CardIcon from "./CardIcon";
import { mainDeckTypes, extraDeckMonsterTypes } from "../lib/constants";

function DeckStats({ deck }) {
    const equivalentTypes = {
        [mainDeckTypes.EFFECT_MONSTER]: [
            mainDeckTypes.EFFECT_MONSTER,
            mainDeckTypes.FLIP_EFFECT_MONSTER,
            mainDeckTypes.FLIP_TUNER_EFFECT_MONSTER,
            mainDeckTypes.GEMINI_MONSTER,
            mainDeckTypes.PENDULUM_EFFECT_MONSTER,
            mainDeckTypes.PENDULUM_FLIP_EFFECT_MONSTER,
            mainDeckTypes.PENDULUM_TUNER_EFFECT_MONSTER,
            mainDeckTypes.UNION_EFFECT_MONSTER,
            mainDeckTypes.TUNER_MONSTER,
            mainDeckTypes.SPIRIT_MONSTER,
        ],
        [mainDeckTypes.NORMAL_MONSTER]: [
            mainDeckTypes.NORMAL_MONSTER,
            mainDeckTypes.NORMAL_TUNER_MONSTER,
            mainDeckTypes.PENDULUM_NORMAL_MONSTER
        ],
        [mainDeckTypes.RITUAL_MONSTER]: [
            mainDeckTypes.RITUAL_MONSTER,
            mainDeckTypes.RITUAL_EFFECT_MONSTER,
        ],
        [extraDeckMonsterTypes.XYZ_MONSTER]: [
            extraDeckMonsterTypes.XYZ_MONSTER,
            extraDeckMonsterTypes.XYZ_PENDULUM_EFFECT_MONSTER,
        ],
        [extraDeckMonsterTypes.SYNCHRO_MONSTER]: [
            extraDeckMonsterTypes.SYNCHRO_MONSTER,
            extraDeckMonsterTypes.SYNCHRO_PENDULUM_EFFECT_MONSTER,
            extraDeckMonsterTypes.SYNCHRO_TUNER_MONSTER,
        ],
        [extraDeckMonsterTypes.FUSION_MONSTER]: [
            extraDeckMonsterTypes.FUSION_MONSTER,
            extraDeckMonsterTypes.PENDULUM_EFFECT_FUSION_MONSTER,
        ],
    };

    const calculateAvgPrice = (cards) => {
        return cards.reduce((sum, card) => {
            return sum + averageWithoutOutliers(Object.values(card.prices[0]));
        }, 0);
    };

    const countCardsByType = (deck) => {
        const counts = {};
    
        // Count types with equivalents
        Object.entries(equivalentTypes).forEach(([baseType, equivalentSubtypes]) => {
            counts[baseType] = deck.filter((card) => equivalentSubtypes.includes(card.type)).length;
        });
    
        // Count types without equivalents
        deck.forEach((card) => {
            // Check if the card's type is not part of any equivalent group
            const isNotInEquivalentGroup = !Object.values(equivalentTypes).flat().includes(card.type);
            if (isNotInEquivalentGroup) {
                // Initialize the count if it doesn't exist
                if (!counts[card.type]) {
                    counts[card.type] = 0;
                }
                counts[card.type]++;
            }
        });
    
        return counts;
    };

    const renderCardCounts = (counts, types) => {
        return Object.entries(counts).map(([type, count]) => {
            if (count > 0) {
                return (
                    <div key={type} className="flex items-center gap-2">
                        <CardIcon cardType={type} />
                        <span>[{count}]</span>
                    </div>
                );
            }
            return null;
        });
    };

    const mainDeckCounts = useMemo(
        () => countCardsByType(deck, Object.values(mainDeckTypes)),
        [deck]
    );
    const extraDeckCounts = useMemo(
        () => countCardsByType(deck, Object.values(extraDeckMonsterTypes)),
        [deck]
    );
    const avgDeckPrice = useMemo(
        () => calculateAvgPrice(deck).toFixed(2),
        [deck]
    );

    return (
        <div className="flex items-center gap-4">
            <span>Avg. Deck Price: ${calculateAvgPrice(deck).toFixed(2)} </span>
            {renderCardCounts(mainDeckCounts, mainDeckTypes)}
        </div>
    );
}

export default DeckStats;
