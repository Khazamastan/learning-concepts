# Create a Pixel Art Grid (DevKode DOM Challenge)

## Problem
Develop an interactive pixel-art canvas where users can select colours and paint
on an adjustable grid. The experience should support click-and-drag painting,
grid-size changes, palette selection, and clearing the canvas.

## Solution
The React + Vite app stores the grid size, active colour, and pixel data in
state. Drag painting is implemented by tracking a `isPainting` flag toggled by
`onMouseDown`/`onMouseUp` while colouring squares on pointer enter. A compact
palette of swatches lets users swap hues, a range input changes the canvas from
8×8 up to 32×32 (resetting pixels), and a “Clear canvas” button restores a blank
grid. Styling focuses on a dark neon theme with a responsive square board.

## Running locally
```
npm install
npm run dev
```
