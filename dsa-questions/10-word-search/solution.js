// Word Search using DFS with backtracking.
function exist(board, word) {
  const rows = board.length;
  const cols = board[0].length;
  const visited = Array.from({ length: rows }, () => new Array(cols).fill(false));

  function dfs(r, c, index) {
    if (index === word.length) {
      return true;
    }
    if (
      r < 0 ||
      c < 0 ||
      r >= rows ||
      c >= cols ||
      visited[r][c] ||
      board[r][c] !== word[index]
    ) {
      return false;
    }

    visited[r][c] = true;
    const found =
      dfs(r + 1, c, index + 1) ||
      dfs(r - 1, c, index + 1) ||
      dfs(r, c + 1, index + 1) ||
      dfs(r, c - 1, index + 1);
    visited[r][c] = false;
    return found;
  }

  for (let r = 0; r < rows; r += 1) {
    for (let c = 0; c < cols; c += 1) {
      if (dfs(r, c, 0)) {
        return true;
      }
    }
  }

  return false;
}

module.exports = { exist };

if (require.main === module) {
  const board = [
    ['A', 'B', 'C', 'E'],
    ['S', 'F', 'C', 'S'],
    ['A', 'D', 'E', 'E'],
  ];
  console.log(exist(board, 'ABCCED'));
}
