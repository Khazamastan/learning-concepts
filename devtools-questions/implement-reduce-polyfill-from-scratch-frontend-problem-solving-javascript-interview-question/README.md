# Implement `reduce` Polyfill from Scratch

## Problem
Replicate `Array.prototype.reduce`, supporting optional initial values, sparse
arrays, and the correct error semantics when the array is empty and no initial
value is supplied.

## Solution
`reducePolyfill` validates inputs, walks forward to find the first defined
element when no initial value is provided, then iterates through the rest of the
array applying the callback. The helper is attached as `myReduce`, and the demo
performs both a summed and concatenated reduction to showcase usage.

## Running locally
```
npm install
npm start
```
