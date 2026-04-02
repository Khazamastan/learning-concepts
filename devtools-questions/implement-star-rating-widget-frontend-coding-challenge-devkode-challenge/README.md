# Implement a Star Rating Widget (DevKode Challenge)

## Problem
Construct a star-rating component that supports the usual UI interactions:

- Hover a star to preview the score.
- Click (or press Enter/Space) to commit a rating.
- Display helpful captions and provide a way to clear the selection.
- Keep the control keyboard-accessible and visually appealing.

## Solution
This React + Vite widget renders five stars inside a `radiogroup` to ensure good
screen-reader semantics. Hovering sets a temporary rating while click/keyboard
captures the final value. The caption updates with friendly text, and a reset
button clears the score. Styling delivers a modern glowing aesthetic with large,
interactive stars.

## Running locally
```
npm install
npm run dev
```
