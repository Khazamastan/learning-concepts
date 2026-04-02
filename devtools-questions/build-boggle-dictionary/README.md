# Build Boggle Dictionary

Interactive solver that finds every dictionary word present on a Boggle board. Uses a trie to prune impossible prefixes and depth-first search to explore character paths, highlighting solutions on demand.

## Features

- Editable 4×4 board with instant validation (single-letter cells).
- Paste any dictionary (one word per line) and set minimum word length.
- Word list sorted by length; clicking a result highlights the path on the board.
- Clean separation between solver (`findWords`) and React UI.

## Project structure

```
build-boggle-dictionary/
├── index.html
├── package.json
├── src/
│   ├── BoggleDictionary.jsx
│   ├── boggle.js
│   ├── index.jsx
│   └── styles.css
└── vite.config.js
```

## Running locally

```bash
cd build-boggle-dictionary
npm install
npm run dev
```

Point your browser to `http://localhost:5173` and start experimenting.

## Solver overview

1. `buildTrie` converts the dictionary into a prefix tree for O(1) prefix checks.
2. DFS runs from every cell, walking to the eight surrounding neighbors while keeping a `visited` matrix.
3. When a trie node marks `isWord` and the length threshold is met, the word + coordinate path is recorded.
4. Results are deduplicated via a `Set` storing JSON-serialised entries (word + path), then transformed back to objects.

Feel free to extend the solver by adding support for “Qu” tiles, different board sizes, or scoring metrics.
