const directions = [
  [-1, -1],
  [-1, 0],
  [-1, 1],
  [0, -1],
  [0, 1],
  [1, -1],
  [1, 0],
  [1, 1],
];

export function findWords(board, dictionary, { minLength = 3 } = {}) {
  const results = new Set();
  if (!Array.isArray(board) || !board.length) return [];

  const rows = board.length;
  const cols = board[0].length;
  const trie = buildTrie(dictionary);

  const visited = Array.from({ length: rows }, () => Array(cols).fill(false));

  const dfs = (row, col, node, path, letters) => {
    if (
      row < 0 ||
      row >= rows ||
      col < 0 ||
      col >= cols ||
      visited[row][col] ||
      !node.children.has(board[row][col])
    ) {
      return;
    }

    visited[row][col] = true;
    const char = board[row][col];
    const nextNode = node.children.get(char);
    const nextLetters = letters + char;
    const nextPath = [...path, [row, col]];

    if (nextNode.isWord && nextLetters.length >= minLength) {
      results.add(JSON.stringify({ word: nextLetters, path: nextPath }));
    }

    for (const [dx, dy] of directions) {
      dfs(row + dx, col + dy, nextNode, nextPath, nextLetters);
    }

    visited[row][col] = false;
  };

  for (let r = 0; r < rows; r += 1) {
    for (let c = 0; c < cols; c += 1) {
      dfs(r, c, trie, [], "");
    }
  }

  return Array.from(results).map((entry) => JSON.parse(entry));
}

function buildTrie(words) {
  const root = { children: new Map(), isWord: false };
  for (const word of words) {
    if (!word) continue;
    const cleaned = word.toLowerCase().replace(/[^a-z]/g, "");
    if (!cleaned) continue;
    let node = root;
    for (const char of cleaned) {
      if (!node.children.has(char)) {
        node.children.set(char, { children: new Map(), isWord: false });
      }
      node = node.children.get(char);
    }
    node.isWord = true;
  }
  return root;
}
