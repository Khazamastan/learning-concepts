# Array Fill Polyfill

## Problem
Recreate the behaviour of `Array.prototype.fill`, letting consumers overwrite a
range of indices with a single value. The function should respect negative
start/end positions, clamp to array bounds, and return the mutated array per the
spec.

## Solution
The polyfill computes the effective start and end offsets by normalising
negative values relative to the array length. It then walks the span and assigns
the requested value into each slot on `this`, returning the same array to match
native semantics. The logic mirrors the ECMAScript algorithm without relying on
the runtime implementation.

## Running locally
```
npm install
npm start
```
