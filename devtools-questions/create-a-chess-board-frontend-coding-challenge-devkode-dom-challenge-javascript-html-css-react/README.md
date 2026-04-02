# Create a Chess Board (DevKode DOM Challenge)

## Problem
Implement a responsive chess-board interface for the DevKode challenge:

- Render an 8×8 grid with alternating light/dark squares.
- Display alphanumeric annotations (files and ranks).
- Highlight squares on hover/focus and surface their algebraic notation.
- Keep the solution accessible and visually polished.

## Solution
Using React + Vite, the component precomputes the 64 squares and their
algebraic IDs (e.g., `e4`) and stores the currently hovered square in state.
Buttons are used for tiles to ensure good keyboard behaviour; focus/hover both
update the annotation banner. The board is responsive, includes coordinate
labels around the edges, and applies subtle motion/lighting for a modern feel.

## Running locally
```
npm install
npm run dev
```
