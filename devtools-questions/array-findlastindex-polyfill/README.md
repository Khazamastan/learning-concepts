# Array `findLastIndex` Polyfill

## Problem
Implement `Array.prototype.findLastIndex`, which traverses an array from the end
and returns the index of the last element for which a predicate returns truthy.
If no element matches it should return `-1`.

## Solution
`findLastIndexPolyfill` walks indices from `length - 1` down to zero, skipping
holes, and invokes the predicate with the optional `thisArg`. The first truthy
result prompts an immediate return of the index; otherwise `-1` is returned.
The example attaches the helper as `myFindLastIndex` and locates the last value
greater than ten in a sample array.

## Running locally
```
npm install
npm start
```
