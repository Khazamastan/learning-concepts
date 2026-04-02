# usePrevious Hook

## Problem
React components sometimes need to compare the current value of a prop or piece of state to what it was on the previous render, but React does not expose that directly.

## Solution
`usePrevious` persists the last value inside a ref and updates it during a layout cycle with `useEffect`. On the next render, the hook returns the stored value so you can compute diffs or animate transitions. The included demo increments a counter every second and prints both current and previous counts.

## Usage
```js
const prev = usePrevious(value);
```
