# React Error Boundary Example

## Problem

React components can throw during rendering, lifecycle methods, or constructors. Without an error boundary, a single failure unmounts the entire subtree.

## Solution Overview

- Implement an `ErrorBoundary` class component using `getDerivedStateFromError` and `componentDidCatch` to intercept errors from its children.
- Provide a fallback UI with a retry button that resets the internal `hasError` state, letting the user attempt the action again without refreshing the page.
- Demonstrate usage by wrapping a `BuggyCounter` that intentionally throws when the count reaches five.

## Key Benefits

1. **Graceful failure** — Users see a friendly message instead of a blank screen.
2. **Diagnostics** — `componentDidCatch` logs details for debugging or external reporting.
3. **Recovery path** — The fallback UI can offer retry logic, navigation, or support links.
