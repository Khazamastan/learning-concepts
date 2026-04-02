# OTP Input Component

## Problem
Build a six-digit one-time-password input that behaves like the widgets seen in verification flows. The widget must restrict input to numbers, allow keyboard navigation (arrows, backspace, delete, tab/shift+tab), accept a full OTP via paste, and only enable submission when all fields are filled.

## Solution
This React + Vite implementation keeps the OTP digits in a fixed-length array. Each input shares a ref array so focus can be programmatically advanced or rewound based on user actions. `handleChange`, `handleKeyDown`, and `handlePaste` normalise all input paths, ensuring only digits populate the array. The `Verify` button is disabled until every slot contains a digit, at which point submitting reveals the joined code. Styling highlights active and filled states for a polished UX.

## Running locally
```
npm install
npm run dev
```
