# Array `findIndex` Polyfill

## Problem
Mirror `Array.prototype.findIndex`, returning the index of the first element for
which a predicate returns truthy or `-1` when no element qualifies.

## Solution
`findIndexPolyfill` validates inputs, walks the array left-to-right, skips holes,
and calls the predicate with the optional `thisArg`. It returns the index of the
first truthy result or `-1` if none match. The sample registers `myFindIndex`
and searches for the first book with more than 400 pages.

## Running locally
```
npm install
npm start
```
