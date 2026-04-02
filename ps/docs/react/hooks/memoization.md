# React Memoization Hooks

## `useMemo`
- Caches expensive computations between renders.
- Pass dependencies array; recompute only when dependencies change.
- Example: filter list, format large data sets.

```jsx
const filtered = useMemo(() => items.filter((item) => item.type === filter), [items, filter]);
```

## `useCallback`
- Returns the same function reference until dependencies change.
- Prevents unnecessary re-renders of memoized children relying on stable callbacks.

```jsx
const handleSelect = useCallback((id) => {
  setSelectedId(id);
}, []);
```

## `React.memo`
- Higher-order component wrapping functional components.
- Skips render when props are shallowly equal.

```jsx
const ListItem = React.memo(function ListItem({ item, onSelect }) {
  return <button onClick={() => onSelect(item.id)}>{item.name}</button>;
});
```

## Practical Tips
1. Profile before optimizing; memoization adds overhead.
2. Avoid empty dependency arrays unless value truly static.
3. Combine `useCallback` with `React.memo` to keep child props stable.
