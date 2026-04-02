# Expensive Calculation Optimization (React 19)

## React 19 Enhancements

- Uses the new `use` hook to unwrap a promise-based resource inside a client component, letting Suspense handle the loading state automatically.
- Suspense boundary (`<Suspense fallback="…">`) isolates the expensive calculation so the parent UI stays responsive while the data resolves.
- `memo`, `useMemo`, and `useCallback` still eliminate redundant renders once the data has loaded.

## Usage Notes

1. Ensure your bundler targets React 19 and enables the `allow use` transform if required.
2. When moving to real data, replace the `Promise.resolve` stub with an actual fetch wrapped in a cache (e.g., `fetch('/api/data')`) so Suspense can show the fallback while the network call resolves.
3. The pattern remains compatible with progressive enhancement—you can keep the original React 18 implementation as a fallback if Suspense + `use` is not available yet in your environment.
