export const deckType = {
    MAIN_DECK: "Main Deck",
    EXTRA_DECK: "Extra Deck",
    SIDE_DECK: "Side Deck",
};

export const extraDeckMonsterTypes = {
    XYZ_MONSTER: "XYZ Monster",
    PENDULUM_EFFECT_FUSION_MONSTER: "Pendulum Effect Fusion Monster",
    SYNCHRO_MONSTER: "Synchro Monster",
    SYNCHRO_PENDULUM_EFFECT_MONSTER: "Synchro Pendulum Effect Monster",
    SYNCHRO_TUNER_MONSTER: "Synchro Tuner Monster",
    XYZ_PENDULUM_EFFECT_MONSTER: "XYZ Pendulum Effect Monster",
    FUSION_MONSTER: "Fusion Monster",
    LINK_MONSTER: "Link Monster",
};

export const mainDeckTypes = {
    EFFECT_MONSTER: "Effect Monster",
    FLIP_EFFECT_MONSTER: "Flip Effect Monster",
    FLIP_TUNER_EFFECT_MONSTER: "Flip Tuner Effect Monster",
    GEMINI_MONSTER: "Gemini Monster",
    NORMAL_MONSTER: "Normal Monster",
    NORMAL_TUNER_MONSTER: "Normal Tuner Monster",
    PENDULUM_EFFECT_MONSTER: "Pendulum Effect Monster",
    PENDULUM_EFFECT_RITUAL_MONSTER: "Pendulum Effect Ritual Monster",
    PENDULUM_FLIP_EFFECT_MONSTER: "Pendulum Flip Effect Monster",
    PENDULUM_NORMAL_MONSTER: "Pendulum Normal Monster",
    PENDULUM_TUNER_EFFECT_MONSTER: "Pendulum Tuner Effect Monster",
    RITUAL_EFFECT_MONSTER: "Ritual Effect Monster",
    RITUAL_MONSTER: "Ritual Monster",
    SPELL_CARD: "Spell Card",
    SPIRIT_MONSTER: "Spirit Monster",
    TOON_MONSTER: "Toon Monster",
    TRAP_CARD: "Trap Card",
    TUNER_MONSTER: "Tuner Monster",
    UNION_EFFECT_MONSTER: "Union Effect Monster",
};

export const equivalentTypes = {
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
        mainDeckTypes.PENDULUM_NORMAL_MONSTER,
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

export const allCardTypes = {
    ...mainDeckTypes,
    ...extraDeckMonsterTypes,
};

export const LEVELS = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

export const ATTRIBUTES = [
    "DARK",
    "DIVINE",
    "EARTH",
    "FIRE",
    "LIGHT",
    "WATER",
    "WIND",
];

export const API_RESULTS_LIMIT = 48;

export const NO_CARDS_FOUND_MESSAGE = 'No card matching your query was found in the database.'

// toast messages
export const MAIN_DECK_FULL_MESSAGE = "Main Deck is full!";
export const EXTRA_DECK_FULL_MESSAGE = "Extra Deck is full!";
export const MAX_COPIES_MESSAGE =
    "Cannot have more than 3 copies of a card in a deck!";
export const DECKS_CLEARED = "Decks Cleared";
