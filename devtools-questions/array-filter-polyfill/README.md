# Array Filter Polyfill

## Problem
Provide a drop-in replacement for `Array.prototype.filter` that can operate on
array-like objects. It must call the predicate with the correct signature,
respect sparse arrays, support an optional `thisArg`, and return a new array of
matching values.

## Solution
The `filter` implementation coerces the input with `Object(array)` to support
array-like values and guards against nullish inputs or non-function predicates.
It iterates over valid indices, invoking `predicate.call(thisArg, value, index,
obj)` and collecting truthy results. Because it never mutates the source, the
behaviour aligns with the native method.

## Running locally
```
npm install
npm start
```
