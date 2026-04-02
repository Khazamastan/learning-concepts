# Promise.all polyfill

## Problem

Re-create `Promise.all` so it accepts any iterable of values/promises, resolves once every entry resolves (preserving order), and rejects as soon as one entry rejects.

## Solution

`promiseAll(iterables)` checks for an iterable input and returns a new promise. While iterating we keep:

- `index` tracking how many items we have seen so far,
- a `results` array storing each resolved value by index,
- a `resolvedCount` counter to know when everything settled.

Each item is wrapped with `Promise.resolve` to normalise non-thenables. On resolution we write into `results` and compare `resolvedCount` with `index`. A rejection short-circuits the outer promise. Empty iterables resolve immediately with an empty array.

The demo shows success ordering as well as an early rejection scenario.

## Running locally

```bash
cd how-to-implement-promiseall-promise-polyfills-advanced-javascript-interview-question
node src/index.js
```

The script logs the resolved array and demonstrates the rejection path.
