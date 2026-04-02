'use strict';

/**
 * Computes the Nim sum (bitwise XOR across all pile sizes) and determines the winner.
 * @param {number[]} piles
 * @returns {{ nimSum: number, winningPosition: boolean }}
 */
function analyzeNim(piles) {
  const nimSum = piles.reduce((accumulator, pile) => accumulator ^ pile, 0);
  return {
    nimSum,
    winningPosition: nimSum !== 0,
  };
}

const piles = [3, 4, 5];
const result = analyzeNim(piles);

console.log('Piles:', piles);
console.log('Nim sum:', result.nimSum);
console.log(result.winningPosition ? 'First player has a winning strategy.' : 'Second player can force a win.');

module.exports = { analyzeNim };
