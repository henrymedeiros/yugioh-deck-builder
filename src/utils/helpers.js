export function averageWithoutOutliers(prices) {
  // Convert prices to floats
  const numericPrices = prices.map(price => parseFloat(price));
  const sorted = [...numericPrices].sort((a, b) => a - b);
  const n = sorted.length;

  // Calculate quartiles using simple indexing
  const q1 = sorted[Math.floor(n / 4)];
  const q3 = sorted[Math.floor(n * 0.75)];
  const iqr = q3 - q1;
  
  // Calculate bounds for outliers
  const lowerBound = q1 - 1.5 * iqr;
  const upperBound = q3 + 1.5 * iqr;
  
  // Filter out outliers
  const filtered = sorted.filter(price => price >= lowerBound && price <= upperBound);

  // Calculate and return the average of filtered prices
  const avg = filtered.reduce((sum, price) => sum + price, 0) / filtered.length;
  return avg;
}

export function getYear() {
  return new Date().getFullYear();
}

export function removeCard(cardIndex, deckType, decks, setDecks) {
  let deck = []
  if (deckType === 'Main Deck') {
    deck = [...decks.mainDeck]; 
  } else if (deckType === 'Extra Deck') {
    deck = [...decks.extraDeck]; 
  }
  if (cardIndex !== -1) {
      deck.splice(cardIndex, 1);
      if (deckType === 'Main Deck') {
        setDecks({ ...decks, mainDeck: deck });
      } else if (deckType === 'Extra Deck') {
        setDecks({ ...decks, extraDeck: deck });
      }
  }
}


export function apiCardDataToCardComponentData(apiCard){
    return {
      id: apiCard.id,
      name: apiCard.name,
      desc: apiCard.desc,
      type: apiCard.type,
      race: apiCard.race,
      attribute: apiCard.attribute,
      level: apiCard.level,
      atk: apiCard.atk,
      def: apiCard.def,
      imgUrl: apiCard.card_images[0].image_url_small,
      imgUrlBig: apiCard.card_images[0].image_url,
      typeline: apiCard.typeline,
      prices: apiCard.card_prices,
  };

}