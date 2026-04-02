# Increment function

## Problem

Return a function that retains an internal counter and increases it whenever it’s invoked. Support custom start values and step sizes.

## Solution

`createIncrement(start)` captures the current value inside a closure. The returned `increment(step = 1)` adds the provided step and returns the updated total. Because the function closes over `value`, subsequent calls keep the running total.

## Running locally

```bash
cd how-to-implement-the-increment-function
node src/index.js
```

The demo prints `6`, `8`, `9` for successive calls starting from 5.
