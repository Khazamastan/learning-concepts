# Shuffle an array (Fisher–Yates)

## Problem

Return a new array with items in random order without mutating the original.

## Solution

Implements the Fisher–Yates shuffle by iterating from the end of a copy and swapping each element with a random earlier index. Accepts an optional RNG function for deterministic tests.

## Running locally

```bash
cd can-you-shuffle-an-array-javascript-interview-question
node src/index.js
```
