# Array `findLast` Polyfill

## Problem
Replicate `Array.prototype.findLast`, returning the final element that satisfies
a predicate or `undefined` if none do.

## Solution
`findLastPolyfill` loops backwards over defined array elements, running the
predicate with the optional `thisArg`. When a truthy result appears it returns
the corresponding value immediately; if the loop completes without a match it
returns `undefined`. The example wires the helper in as `myFindLast` and selects
the last temperature at or above 25°C from a list.

## Running locally
```
npm install
npm start
```
