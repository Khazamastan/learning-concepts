# Array Sort Polyfill

## Problem
Provide a predictable implementation of `Array.prototype.sort` that accepts an
optional comparator. The function should leave the original array untouched and
fall back to a sensible string comparison when no comparator is supplied.

## Solution
The polyfill clones the source array and performs an insertion sort, which keeps
the implementation concise while preserving stability for equal elements. A
default comparator normalises values to strings and uses `localeCompare`, so
string sorting matches browser behaviour. Because the original array remains
unchanged, callers can safely reuse the input.

## Running locally
```
npm install
npm start
```
