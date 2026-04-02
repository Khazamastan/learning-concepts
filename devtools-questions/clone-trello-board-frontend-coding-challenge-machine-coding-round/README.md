# Clone a Trello Board

## Problem
Build a miniature Trello-like board that supports:

- Multiple columns with cards.
- Drag-and-drop between columns.
- Adding new cards and new lists.
- A responsive, polished UI.

## Solution
The board is built with React + Vite and `react-beautiful-dnd` to handle card
reordering. Column and card data live in component state. `DragDropContext`
updates the arrays when a drag ends. Each column includes a textarea to append
new cards, and the final “Add list” panel appends new columns. Styling mimics a
Trello board with soft shadows and horizontal scrolling for overflow.

## Running locally
```
npm install
npm run dev
```
