# Array Reverse Polyfill

## Problem
Implement the logic of `Array.prototype.reverse`, swapping elements in place so
that the last item becomes the first. The helper should mutate the array and
return the same reference, matching the built-in contract.

## Solution
The polyfill computes the midway point of the array and performs symmetric swaps
between opposing indices. By iterating only to `length / 2`, it avoids redundant
work while delivering an in-place reversal with a minimal temporary variable.

## Running locally
```
npm install
npm start
```
