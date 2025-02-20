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
