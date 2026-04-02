# Array `unshift` Polyfill

## Problem
Implement `Array.prototype.unshift`, inserting items at the start of an array,
shifting existing entries to the right, and returning the new length.

## Solution
`unshiftPolyfill` copies the original items to higher indexes, then writes the
new values into the first slots and updates `length`. The demo attaches the
polyfill as `myUnshift`, inserts two numbers into an existing array, and shows
the resulting length and order. An additional example highlights that the method
works on empty arrays as well.

## Running locally
```
npm install
npm start
```
