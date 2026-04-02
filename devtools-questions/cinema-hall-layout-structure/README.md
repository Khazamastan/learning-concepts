# Cinema Hall Layout Structure

Seat map that showcases rows, aisles, reserved seats, and ticket classes. Great for machine-coding rounds where you need to illustrate layout + interactivity.

## Features

- Configurable rows with seat count and pricing tier (VIP, Standard, Economy).
- Reserved seats are locked, selected seats highlighted, and aisles visually separated.
- Screen indicator clarifies orientation.
- Accessible: seats use buttons with `aria-pressed` state; rows labelled.

## Structure

```
cinema-hall-layout-structure/
├── index.html
├── package.json
├── src/
│   ├── CinemaHallLayout.jsx
│   ├── index.jsx
│   └── styles.css
└── vite.config.js
```

## Run locally

```bash
cd cinema-hall-layout-structure
npm install
npm run dev
```

Visit `http://localhost:5173` to interact with the layout.

## Implementation notes

- Seat IDs follow `{row}{number}` (e.g., `B8`), making it easy to map reserved selections with a `Set`.
- `AISLES` array inserts gaps in the grid after certain positions.
- Selection is stored in a `Set`, toggled only for available seats.
- Styling uses gradients and glassmorphism to emulate a modern cinema UI.
