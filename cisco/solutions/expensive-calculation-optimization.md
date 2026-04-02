# Expensive Calculation Optimization

## Problem

Re-rendering the expensive child component on every parent update caused the heavy `reduce` computation to rerun even when its inputs were unchanged.

## Solution Overview

- Wrap the child in `React.memo` so React skips re-rendering when `data` or `onProcess` props do not change.
- Memoize the expensive `reduce` operation with `useMemo`, guarded by the `data` dependency, so the calculation is only recomputed when the input array changes.
- Stabilize callback identities (`handleProcessData`, `handleIncrement`) with `useCallback` so they are referentially equal between renders.
- Keep `numbers` in state to avoid recreating the array reference on each render.

## Key Benefits

1. **Fewer renders** — `React.memo` prevents unnecessary updates of the expensive child.
2. **No redundant work** — `useMemo` ensures the heavy calculation only runs when the input changes.
3. **Stable handlers** — `useCallback` maintains prop equality, allowing memoization to be effective.
4. **Clear structure** — Logging and state updates remain predictable, making the component easier to test and maintain.
