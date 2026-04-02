# Create a Progress Bar (DevKode DOM Challenge)

## Problem
Build an interactive progress bar widget that resembles the DevKode challenge:

- Visualise completion from 0–100%.
- Provide controls to start, pause, reset, and restart the animation.
- Allow users to adjust the animation speed and increment step while the bar is running.
- Keep the component accessible with proper `role`/`aria` attributes.

## Solution
This React + Vite implementation keeps the current percentage, play state,
animation speed, and increment size in component state. An effect spins up an
interval whenever the bar is running, applying the chosen increment until the
value reaches 100%—at which point it automatically pauses. Speed presets are
exposed as “chips” and a range input edits the increment size. Buttons cover
start/restart, pause, and reset flows. Styling focuses on a clean neon theme and
ensures the progress bar remains readable across breakpoints.

## Running locally
```
npm install
npm run dev
```
