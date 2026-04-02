const DIRECTIONS = [
  [1, 0],
  [0, 1],
  [1, 1],
  [1, -1],
];

export function calculateWinner(board) {
  const size = board.length;
  for (let row = 0; row < size; row += 1) {
    for (let col = 0; col < size; col += 1) {
      const player = board[row][col];
      if (!player) continue;
      for (const [dx, dy] of DIRECTIONS) {
        if (hasFive(board, row, col, dx, dy, player)) {
          return { player, path: Array.from({ length: 5 }, (_, k) => [row + dx * k, col + dy * k]) };
        }
      }
    }
  }
  return null;
}

function hasFive(board, row, col, dx, dy, player) {
  const size = board.length;
  for (let step = 1; step < 5; step += 1) {
    const nx = row + dx * step;
    const ny = col + dy * step;
    if (nx < 0 || ny < 0 || nx >= size || ny >= size || board[nx][ny] !== player) {
      return false;
    }
  }
  return true;
}
