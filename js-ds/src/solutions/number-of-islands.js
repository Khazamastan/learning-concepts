/**
 * Title: Number of Islands
 * Difficulty: Medium
 * Companies: Amazon, Google, Meta, Uber
 *
 * Problem Summary:
 * Given an `m x n` grid of characters `'1'` (land) and `'0'` (water), return the number of islands formed by connected land cells.
 *
 * Solution Explanation:
 * Perform DFS from each unvisited land cell to mark the whole island and count how many times DFS is triggered.
 *
 * Approach Outline:
 * Traverse the grid. When a land cell is found, increment the island count and recursively flood-fill (mark as water) all connected land cells.
 *
 * Complexity:
 *   Time: O(m*n)
 *   Space: O(m*n)
 *
 * Tests:
 *   - const grid1 = [['1','1','0','0','0'],['1','1','0','0','0'],['0','0','1','0','0'],['0','0','0','1','1']]; assert.strictEqual(numIslands(grid1.map((row) => row.slice())), 3);
 *   - const grid2 = [['0']]; assert.strictEqual(numIslands(grid2.map((row) => row.slice())), 0);
 */

function numIslands(grid) {
  const rows = grid.length;
  if (rows === 0) return 0;
  const cols = grid[0].length;
  let count = 0;
  const dfs = (r, c) => {
    if (r < 0 || r >= rows || c < 0 || c >= cols || grid[r][c] !== '1') return;
    grid[r][c] = '0';
    dfs(r + 1, c);
    dfs(r - 1, c);
    dfs(r, c + 1);
    dfs(r, c - 1);
  };
  for (let r = 0; r < rows; r += 1) {
    for (let c = 0; c < cols; c += 1) {
      if (grid[r][c] === '1') {
        count += 1;
        dfs(r, c);
      }
    }
  }
  return count;
}

module.exports = { numIslands };

if (require.main === module) {
  const assert = require('node:assert/strict');
  const grid1 = [['1','1','0','0','0'],['1','1','0','0','0'],['0','0','1','0','0'],['0','0','0','1','1']]; assert.strictEqual(numIslands(grid1.map((row) => row.slice())), 3);
  const grid2 = [['0']]; assert.strictEqual(numIslands(grid2.map((row) => row.slice())), 0);
  console.log('All tests passed for Number of Islands.');
}
