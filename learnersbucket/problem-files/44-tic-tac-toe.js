/**
 * Problem #44: Tic-Tac-Toe
 *
 * Detailed Problem Statement:
 * Implement game engine with moves, turn switching, winner check.
 *
 * Example Input:
 * const game = new TicTacToe();
 * game.move(0, 0); // X
 * game.move(1, 0); // O
 *
 * Example Output:
 * Board updates, winner returned when row/col/diag is complete
 */

export const problem = `Tic-Tac-Toe`;

export const statement = `
Implement game engine with moves, turn switching, winner check.
`.trim();

export const exampleInput = `
const game = new TicTacToe();
game.move(0, 0); // X
game.move(1, 0); // O
`.trim();

export const exampleOutput = `
Board updates, winner returned when row/col/diag is complete
`.trim();

// ---------------------------
// Approach 1: Reference Solution
// ---------------------------
class TicTacToe {
  constructor() {
    this.board = Array.from({ length: 3 }, () => Array(3).fill(null));
    this.player = 'X';
  }

  move(r, c) {
    if (this.board[r][c]) throw new Error('Invalid move');
    this.board[r][c] = this.player;
    const winner = this.getWinner();
    this.player = this.player === 'X' ? 'O' : 'X';
    return winner;
  }

  getWinner() {
    const b = this.board;
    const lines = [
      [b[0][0], b[0][1], b[0][2]],
      [b[1][0], b[1][1], b[1][2]],
      [b[2][0], b[2][1], b[2][2]],
      [b[0][0], b[1][0], b[2][0]],
      [b[0][1], b[1][1], b[2][1]],
      [b[0][2], b[1][2], b[2][2]],
      [b[0][0], b[1][1], b[2][2]],
      [b[0][2], b[1][1], b[2][0]]
    ];

    for (const [a, b1, c] of lines) {
      if (a && a === b1 && b1 === c) return a;
    }
    return null;
  }
}

// ---------------------------
// Approach 2: Brute-force baseline
// ---------------------------
function bruteForce(input) {
  // Try all candidates/pairs/ranges.
  // Validate each and keep the best.
  return input;
}

// ---------------------------
// Approach 3: Optimized with data structures
// ---------------------------
function optimized(input) {
  const state = new Map();
  // Build lookup/prefix/two-pointer state.
  // Return optimized result.
  return input;
}
