# Memoized List Optimization (React 19)

## React 19 Enhancements

- Uses `useDeferredValue` to let React render a lightweight fallback while large lists update, keeping interactions (typing, clicking) responsive.
- Combines `memo` and `useMemo` so the deferred list is normalized only when the deferred value changes.
- `ListItem` stays memoized, preventing re-renders for entries whose `name` text did not change.

## Usage Notes

1. `useDeferredValue` makes the component resilient when the parent rapidly streams new `items`—React keeps showing the previous list until the deferred update is ready.
2. Pair the pattern with a visual progress indicator (e.g., spinner) if the deferred update might take noticeable time.
3. The component degrades gracefully in earlier React versions: remove the `useDeferredValue` wrapper and it behaves like the original implementation.
