# Generate CSS selector for an element

## Problem

Given any DOM element, compute a unique CSS selector that can be used with `document.querySelector` to retrieve the same element. Prefer IDs when present, otherwise fall back to class names and `:nth-of-type`.

## Solution

The `cssSelector(node)` function walks up the ancestor chain building selector parts:

1. If an element has an `id`, it becomes the anchor (e.g., `button#cta`). Because IDs are unique, the climb stops.
2. Otherwise, class names are appended (e.g., `li.product.featured`).
3. When multiple siblings share the same tag, the function adds `:nth-of-type(n)` to disambiguate.
4. Parts are joined with the child combinator (`>`), producing a path from the root.

The included demo builds a tiny in-memory DOM (no browser APIs required) to showcase selectors for two different nodes.

## Running locally

```bash
cd how-to-generate-css-selector-for-the-target-element-frontend-interview-question-advanced-javascript
node src/index.js
```

Sample output:

```
main#content > section.feature > ul.product-list > li.product.featured > button.buy
main#content > section.feature > ul.product-list > li.product:nth-of-type(1)
```
