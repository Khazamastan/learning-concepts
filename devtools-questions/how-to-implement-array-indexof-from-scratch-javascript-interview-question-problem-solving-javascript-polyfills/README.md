# Polyfill for `Array.prototype.indexOf`

## Problem

Recreate the behaviour of `Array.prototype.indexOf` including `fromIndex` handling and sparse array support.

## Solution

The `indexOf` function:

1. Coerces the array-like `length` to a number.
2. Normalises `fromIndex`, supporting negative values (offset from the end).
3. Iterates from the normalised index to `length - 1`, checking for strict equality while avoiding holes with `i in array`.
4. Returns `-1` if the element is not found.

The demo logs several scenarios, including sparse objects with a `length` property.

## Running locally

```bash
cd how-to-implement-array-indexof-from-scratch-javascript-interview-question-problem-solving-javascript-polyfills
node src/index.js
```
