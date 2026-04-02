# Text Converter

## Problem

Create a beginner-friendly React tool that lets users paste text, apply common transformations (upper/lower/title case, slug, etc.), and copy the result.

## Solution

`TextConverter` stores the current input and active transformation in state. Transformations live in an array (`TRANSFORMS`) with an id, label, and pure transform function. Clicking a pill updates the active transform; the derived output recalculates with `useMemo`. A copy button uses the clipboard API and the layout adapts to smaller viewports. Styling keeps the experience consistent with other dark glassmorphism demos.

## Running locally

```bash
cd how-to-build-a-text-converter-frontend-coding-challenge-reactjs-beginner
npm install
npm run dev
```

Open the Vite URL (usually `http://localhost:5173`) and try the different transformations.
