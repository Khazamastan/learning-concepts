# UI Card with Tabs

## Problem

Design a product summary card that keeps related content in a compact footprint. The card should expose Overview, Features, and Pricing content. Users must be able to switch between tabs with both mouse and keyboard controls, while the selected tab remains obvious.

## Solution

This React implementation keeps the tab model data-driven (`TAB_CONFIG`). Each entry describes the tab label, assistive copy, and JSX content. The `TabbedCard` component:

- Stores the active tab id in local state.
- Renders `role="tablist"` and `role="tabpanel"` semantics so screen readers understand the structure.
- Moves keyboard focus as you arrow between tabs, making the control accessible.
- Uses CSS to highlight the active tab and show / hide the associated panel.

Styling leans on glassmorphism so the card reads well on dark backgrounds. The layout stays responsive by letting tabs wrap on small screens.

## Running locally

```bash
cd how-to-build-a-ui-card-with-tabs-frontend-coding-challenge-javascript-interview-question-react
npm install
npm run dev
```

Open the Vite dev server URL (defaults to http://localhost:5173) to interact with the tabbed card.
