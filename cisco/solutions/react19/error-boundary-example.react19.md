# React Error Boundary (React 19)

## React 19 Enhancements

- Demonstrates the new `useActionState` hook to increment the counter inside a form action, aligning with React 19’s Server Actions model.
- The same `ErrorBoundary` class component from React 16+ continues to work, providing fallbacks when the action throws.

## Usage Notes

1. Server Actions run on the server (or edge) in React 19. In client-only setups, replace the `<form action>` handler with a standard `onClick`.
2. Throwing inside the action automatically bubbles to the nearest error boundary, so suspending or error states are handled declaratively.
3. Provide richer fallback UIs (e.g., support links, diagnostics) where appropriate; boundaries are still composable per route or widget.
