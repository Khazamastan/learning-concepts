# Vertical Menu React

## Problem
Create a beginner-friendly vertical navigation component that highlights the currently selected section and remains usable on smaller screens.

## Solution
The app renders a sidebar listing workspace sections (Dashboard, Projects, Team, Calendar, Settings). State tracks the active item, and buttons update it while applying `aria-current` for accessibility. The main pane updates content and icon based on the chosen section. Responsive CSS swaps the layout to a single-column stack below 860px so the menu remains reachable on mobile.

## Running locally
```
npm install
npm run dev
```
