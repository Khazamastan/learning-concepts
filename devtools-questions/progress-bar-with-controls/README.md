# Progress Bar with Controls

An accessible, interactive progress bar that exposes playback-style controls: play/pause, jump forward/back, adjustable speed, looping, and reset. Useful for demonstrating media downloads, timed exercises, or wizard completion.

## Highlights

- **Deterministic progress** – Maintains progress in state; advancing is handled by a shared `useInterval` hook that respects the selected speed multiplier.
- **Playback controls** – Buttons and keyboard-focusable radio buttons modify progress, looping, and speed.
- **Accessible labelling** – Status text is announced with `aria-live` and a labelled group.
- **Responsive UI** – Layout compresses gracefully for smaller screens.

## File layout

```
progress-bar-with-controls/
├── index.html
├── package.json
├── src/
│   ├── ProgressBarWithControls.jsx
│   ├── index.jsx
│   ├── styles.css
│   └── useInterval.js
└── vite.config.js
```

## Running locally

```bash
cd progress-bar-with-controls
npm install
npm run dev
```

Vite spins up `http://localhost:5173`.

## Implementation notes

- `useInterval` encapsulates the setInterval lifecycle to avoid stale closures.
- When the bar reaches 100% and looping is disabled, playback stops automatically.
- Playback speed modifies how many percentage points advance on each tick (scaled from the base interval).
- “Jump” buttons clamp values so the bar never goes below 0% or above 100%.
