# Flipping Card Component

Reusable card that flips between front and back faces using CSS 3D transforms. The component supports both controlled and uncontrolled usage, and the demo shows a gallery of feature cards.

## Features

- **3D flip animation** – Uses `transform-style: preserve-3d` with a smooth cubic-bezier transition.
- **Accessible interaction** – The entire card is a button; it responds to click, Enter, and Space. Focus states are clearly indicated.
- **Composable API** – Pass any React nodes to the `front` and `back` props. Convenience subcomponents (`FlippingCard.Front`, `FlippingCard.Back`) help with consistent styling.
- **Responsive layout** – Grid automatically adapts to the available width.

## Structure

```
flipping-card-component/
├── index.html
├── package.json
├── src/
│   ├── FlippingCard.jsx
│   ├── FlippingCardGallery.jsx
│   ├── index.jsx
│   └── styles.css
└── vite.config.js
```

## Run locally

```bash
cd flipping-card-component
npm install
npm run dev
```

Open `http://localhost:5173` to interact with the cards.

## Implementation notes

- The component exposes a `flipped` prop plus `onFlippedChange` callback for controlled scenarios. Without those props, it manages its own state.
- Cards are rendered as `<button>` to naturally support keyboard interaction and ARIA roles.
- `backface-visibility: hidden` ensures faces don’t bleed through during rotation.
