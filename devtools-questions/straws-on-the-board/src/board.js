export function createBoard(size = 4) {
  const edges = [];
  const squares = [];

  for (let row = 0; row < size; row += 1) {
    for (let col = 0; col < size - 1; col += 1) {
      edges.push({
        id: `h-${row}-${col}`,
        type: "horizontal",
        row,
        col,
      });
    }
  }

  for (let row = 0; row < size - 1; row += 1) {
    for (let col = 0; col < size; col += 1) {
      edges.push({
        id: `v-${row}-${col}`,
        type: "vertical",
        row,
        col,
      });
    }
  }

  for (let row = 0; row < size - 1; row += 1) {
    for (let col = 0; col < size - 1; col += 1) {
      squares.push({
        id: `s-${row}-${col}`,
        edges: [
          `h-${row}-${col}`,
          `h-${row + 1}-${col}`,
          `v-${row}-${col}`,
          `v-${row}-${col + 1}`,
        ],
      });
    }
  }

  return { edges, squares, size };
}
