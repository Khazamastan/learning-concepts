# Flatten nested arrays

## Problem

Write a function that takes an arbitrarily nested array and returns a flat array containing the same elements in order.

## Solution

`flatten` uses an explicit stack instead of recursion. Each item popped from the stack is either appended to the result or expanded (pushing its children back on the stack in reverse order). Reversing the result at the end restores left-to-right order.

## Running locally

```bash
cd how-to-create-a-flat-version-of-a-deeply-nested-array-programming-interview-question
node src/index.js
```

The demo logs `[1, 2, 3, 4, 5, 6, 7]` for the nested sample.
