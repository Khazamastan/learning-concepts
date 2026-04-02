# Array `at` Polyfill

## Problem
Provide a polyfill for `Array.prototype.at`, which supports negative indices for
convenient access to elements relative to the end of the array.

## Solution
`atPolyfill` converts the receiver to an object, normalises the argument, and
converts negative indices into their positive counterparts relative to the array
length. Values outside the valid range yield `undefined`. The sample registers
`myAt` and logs lookups with positive, negative, and out-of-range indices.

## Running locally
```
npm install
npm start
```
