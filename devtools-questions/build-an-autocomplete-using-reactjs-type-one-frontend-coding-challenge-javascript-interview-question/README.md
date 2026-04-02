# React Autocomplete (Type One)

## Problem

Implement a searchable input that suggests matching entries as the user types. Requirements:

- Filter the provided dataset as the query changes.
- Limit the number of visible suggestions.
- Allow mouse and keyboard navigation (`ArrowUp`, `ArrowDown`, `Enter`, `Escape`).
- Keep everything accessible for assistive tech via ARIA roles and focus management.

## Solution

`Autocomplete.jsx` encapsulates the combobox behaviour:

- Results are memoised on `query` changes and truncated to 8 items.
- `aria-autocomplete="list"`, `role="combobox"`, and `role="option"` wire up the expected semantics.
- Keyboard navigation updates `activeIndex`, while `Enter` commits the highlighted suggestion and `Escape` clears the field.
- Clicking a suggestion uses `onMouseDown` so the input retains focus after selection.
- `highlightMatch` wraps the matching substring with `<mark>` for visual feedback.

Styling keeps the widget compact with a glassmorphism aesthetic so it mirrors modern interview expectations.

## Running locally

```bash
cd build-an-autocomplete-using-reactjs-type-one-frontend-coding-challenge-javascript-interview-question
npm install
npm run dev
```

Open the URL printed by Vite (default `http://localhost:5173`) and type to search for cities.
