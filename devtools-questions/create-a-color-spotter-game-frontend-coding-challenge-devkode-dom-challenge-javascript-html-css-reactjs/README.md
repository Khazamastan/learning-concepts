# Create a Color Spotter Game (DevKode DOM Challenge)

## Problem
Recreate the DevKode Color Spotter challenge where players must identify the
one tile with a slightly different colour amongst a grid. The experience should:

- Start with a small board and ramp up difficulty as the player succeeds.
- Track score, level, and a countdown timer.
- Let players restart easily and provide accessible controls.
- Deliver a polished, responsive UI.

## Solution
This React + Vite solution keeps track of the current level, score, remaining
time, and play state. Each render computes a grid size capped at 7×7, generates
HSL colours with a shrinking lightness delta, and chooses a random index for the
odd tile. A `setInterval` countdown drives the 60‑second timer, automatically
stopping when it reaches zero. Clicking the correct tile increases the score and
level; wrong guesses deduct points. Styled components provide a neon aesthetic
while maintaining good focus states and keyboard accessibility.

## Running locally
```
npm install
npm run dev
```
