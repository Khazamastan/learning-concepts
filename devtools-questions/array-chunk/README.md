# Array Chunk

## Problem
Split an array into sub-arrays of a fixed size so downstream logic can iterate
over manageable batches. The helper should reject zero or negative chunk sizes
and leave the original array untouched.

## Solution
The `arrayChunk` function walks the input in `size` steps and copies slices
produced by `Array.prototype.slice`. The loop collects each window in a result
array, producing the familiar `[[1,2],[3,4]]` structure while throwing when the
caller passes an invalid chunk size. Because it works on shallow copies, the
source array stays unchanged.

## Running locally
```
npm install
npm start
```
