# Autocomplete Search (Vanilla JS)

## What It Does
- Queries the public PokéAPI to retrieve matching Pokémon names as the user types.
- Renders a keyboard-friendly suggestion list using WAI-ARIA roles for accessibility.
- Supports mouse selection, escape-to-dismiss, arrow navigation, and abortable fetches.

## Key Implementation Details
1. **Input Handling** – `input` event debounces user typing and trims whitespace before triggering `fetchNames`.
2. **AbortController** – Cancels in-flight network requests when the user continues typing to avoid race conditions.
3. **Suggestion Rendering** – Dynamically creates `<li>` elements with `role="option"` and `aria-selected` states to communicate focus to assistive tech.
4. **Keyboard Support** – Maintains an `activeIndex`, updates `aria-activedescendant`, and uses `scrollIntoView` for visibility.
5. **Dismiss Logic** – Clicking outside or pressing escape clears the list to keep the UI tidy.

## How to Run
Open `index.html` in a browser. The JavaScript is loaded via a static `<script>` tag, so no build tooling is required.
