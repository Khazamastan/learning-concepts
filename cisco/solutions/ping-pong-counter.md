# Ping-Pong Counter

## Requirements

- Start/stop/reset controls.
- Increment from 0 to 10, then decrement to 0, repeating while running.

## Solution Overview

- Use `useState` to store the counter value and whether the timer is active.
- Maintain the current direction (`1` for up, `-1` for down) in a `useRef` so flipping the direction does not cause extra renders.
- Start a `setInterval` when `isRunning` becomes `true`, updating the counter every second and flipping direction at the bounds.
- Clean up the interval whenever the component unmounts or the counter is paused.

## Key Benefits

1. **No drift** — A single interval drives the loop, keeping timing consistent.
2. **Minimal renders** — The direction lives in `useRef`, avoiding state churn.
3. **Clear controls** — Play/pause/reset buttons each map to a concise handler.
