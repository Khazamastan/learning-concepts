# Memoized List Optimization

## Problem

Memoizing JSX directly with `useMemo` provides little benefit because React still needs to reconcile the full tree, and repeated renders re-run the mapping logic.

## Solution Overview

- Use `useMemo` to normalize the item data (trim names) and produce a stable array that only changes when the `items` prop changes.
- Extract list items into a memoized `ListItem` component so individual `<li>` elements avoid re-rendering when their inputs are unchanged.
- Wrap the parent component with `React.memo` to block re-renders when the `items` prop is referentially stable.

## Key Benefits

1. **Efficient reconciliation** — React compares fewer nodes when the list and its items stay referentially equal.
2. **Targeted updates** — Only list entries whose data changes will re-render.
3. **Maintainable pattern** — Derived data is isolated in `useMemo`, making the component easier to extend (sorting, filtering, etc.).
