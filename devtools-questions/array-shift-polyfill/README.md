# Array Shift Polyfill

## Problem
Replicate `Array.prototype.shift` by removing the first element of an array,
compacting the remaining items to the left, and returning the removed value.
Empty arrays should yield `undefined`.

## Solution
The `shiftPolyfill` function captures the head element, shifts all subsequent
entries down one index with a simple loop, and then decrements `length`. This
mutation mirrors how the native method operates while producing the same return
value semantics.

## Running locally
```
npm install
npm start
```
