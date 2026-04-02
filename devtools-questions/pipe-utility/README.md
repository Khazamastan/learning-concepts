# Pipe Utility

## Problem
Compose multiple unary functions so the output of one becomes the input of the
next, enabling `pipe(fn1, fn2, fn3)(value)` style pipelines.

## Solution
The `pipe` function captures the provided functions and returns a new function
that reduces over them. Each step feeds the accumulated value into the next
function, delivering left-to-right composition with minimal overhead.

## Running locally
```
npm install
npm start
```
