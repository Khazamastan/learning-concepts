# Straws on the Board

An interactive version of the “straws on the board” / dots-and-boxes puzzle. Toggle straws (edges) between pegs to complete squares; once every side of a square is present, it lights up.

## Features

- 4×4 grid of pegs with horizontal and vertical edges to toggle.
- Tracks active straws and highlights completed squares.
- Reset button clears the board for another attempt.
- Built entirely with React + CSS positioning—no canvas required.

## Structure

```
straws-on-the-board/
├── index.html
├── package.json
├── src/
│   ├── StrawsGame.jsx
│   ├── board.js
│   ├── index.jsx
│   └── styles.css
└── vite.config.js
```

## Run locally

```bash
cd straws-on-the-board
npm install
npm run dev
```

Head to `http://localhost:5173` and click edges to drop straws. Completed boxes glow to show success.

## Implementation notes

- Board generation creates both edges and square definitions so we can check completion quickly.
- Active edges stored in a `Set`; state updates trigger recalculation of completed squares.
- Styling uses absolute positioning to overlay buttons on top of the peg grid.
