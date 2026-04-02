# Mini Google Calendar View

## Problem

Recreate a pared-down version of Google Calendar’s month grid:

- Month navigation (previous, next, jump to today).
- 6-week grid with weekday headers and out-of-month days grayed out.
- Dots summarising events per day.
- Selecting a day reveals the agenda for that day in a side panel.
- Visual polish reminiscent of the real product.

## Solution

The React app keeps `referenceDate` (which month to show) and `selectedDate` in state. `date-fns` generates the 6x7 grid by starting from the first week row. Events are pre-seeded (`SAMPLE_EVENTS`) and grouped by date via a `Map`. When a day is clicked, the side panel renders its agenda with coloured accents. Responsive CSS adapts to single-column layouts on narrower screens.

Key touches:

- Buttons use `aria-label` semantics via role attributes on the grid cells.
- Today and selected states receive distinct styling.
- Event overflow displays `+N` when more than three events are present.

## Running locally

```bash
cd build-a-mini-clone-of-google-calendar-view
npm install
npm run dev
```

Open the dev server (default `http://localhost:5173`) to interact with the month view.
