// Best Time to Buy and Sell Stock using single pass tracking minimum price.
function maxProfit(prices) {
  let minPrice = Infinity;
  let maxGain = 0;

  for (const price of prices) {
    if (price < minPrice) {
      minPrice = price;
    } else {
      const potential = price - minPrice;
      if (potential > maxGain) {
        maxGain = potential;
      }
    }
  }

  return maxGain;
}

module.exports = { maxProfit };

if (require.main === module) {
  console.log(maxProfit([7, 1, 5, 3, 6, 4]));
}
