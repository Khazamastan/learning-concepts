# Word Search

## Problem Overview
Given an `m x n` grid of characters `board` and a word, determine whether the word can be constructed from sequentially adjacent cells (horizontal or vertical). Each cell can be used only once in the path.

## Approach
Perform depth-first search (DFS) starting from every cell that matches the first character. Track visited cells to avoid reusing them within the same search path. Backtrack once all options from a cell are explored.

## Algorithm Steps
1. Prepare a boolean matrix `visited` matching the board dimensions.
2. For every cell `(r, c)`:
   - Launch DFS when `board[r][c]` matches the first character.
3. In DFS:
   - If the index equals the word length, return `true`.
   - If out of bounds, already visited, or the character mismatches, return `false`.
   - Mark the cell as visited and recurse to the four neighbors with the next index.
   - After exploring, unmark the cell (backtrack).
4. If any path succeeds, return `true`; otherwise, return `false`.

## Correctness
The DFS explores every possible path that could spell the word, respecting adjacency and single-use constraints. Backtracking ensures that visiting a cell for one path does not prevent its use in alternative paths.

## Complexity
- Time Complexity: `O(m * n * 4^L)` in the worst case, where `L` is the word length.
- Space Complexity: `O(L)` for the recursion stack plus the `visited` matrix.

## Example
Input `board = [["A","B","C","E"],["S","F","C","S"],["A","D","E","E"]]`, `word = "ABCCED"`
Output: `true`
