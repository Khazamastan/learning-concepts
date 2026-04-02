# Array Cloning Behavior (React 19)

## What Changed

- Demonstrates the platform-level `structuredClone` API, which pairs nicely with React 19’s immutable state expectations by cloning nested data in a single call.
- Keeps the shallow copy example to contrast behavior with the deep clone.

## Usage Notes

1. `structuredClone` is available in modern browsers and Node 18+. For older runtimes provide a polyfill (e.g., `core-js`).
2. Prefer cloning at the edge of your state update logic so React sees a brand-new reference and re-renders only the affected components.
3. When cloning large datasets, consider normalizing them first to avoid unnecessary memory churn.
