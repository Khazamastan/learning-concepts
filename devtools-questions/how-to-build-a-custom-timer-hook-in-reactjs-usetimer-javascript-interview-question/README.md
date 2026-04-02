# useTimer custom hook

## Problem

Implement a reusable React hook that can function as either a stopwatch or a countdown timer. It should expose controls to start, pause, reset, and supply the elapsed time in both raw seconds and a `hh:mm:ss` string.

## Solution

`useTimer.js` holds the hook. Under the hood it:

- Stores the current number of seconds and the run state.
- Uses `setInterval` under a ref so we can clear it on pause/reset.
- Supports two modes: `stopwatch` (incrementing) and `countdown` (decrementing until zero, then emitting `completed`).
- Formats the elapsed time for display.

`TimerDemo.jsx` demonstrates the hook with mode toggles, countdown input, and buttons. Styling keeps the UI portable.

## Running locally

```bash
cd how-to-build-a-custom-timer-hook-in-reactjs-usetimer-javascript-interview-question
npm install
npm run dev
```

Open the Vite dev server (default `http://localhost:5173`) and experiment with both modes.
