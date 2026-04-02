# Build a Simple HTML Calculator

## Problem
Create a four-function calculator using vanilla HTML, CSS, and JavaScript:
render a calculator keypad, show the current expression, and support clear, delete,
decimal input, and evaluation.

## Solution
The markup comprises an accessible display and a grid of buttons. Button clicks
buffer the expression string, a small parser (`Function(...)`) evaluates it, and
`AC`/`DEL` controls update the buffer accordingly. The layout uses CSS grid for a
neat keypad and a glowing dark theme reminiscent of the DevKode challenge.

## Running locally
Open `index.html` in any modern browser.
