# Sort By Property

## Problem
Sort an array of objects by a given property, optionally reversing the order
with a `"desc"` flag, while leaving the original array unmodified.

## Solution
`sortByProperty` clones the array and uses `Array.prototype.sort` with a
comparator that inspects the property on each item. It returns zero for equal
values and multiplies the comparison by `-1` when descending order is requested,
keeping the implementation simple and predictable.

## Running locally
```
npm install
npm start
```
