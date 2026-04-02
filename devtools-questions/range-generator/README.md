# Range Generator

## Problem
Generate a sequence of numbers between a start and end using a configurable
step, supporting both ascending and descending ranges, while throwing when the
step is zero.

## Solution
The `range` helper inspects the sign of the step to decide whether to increment
or decrement, using a simple loop to collect each value in an array. By avoiding
mutations on input and copying into a new array, it mirrors Lodash-style range
helpers.

## Running locally
```
npm install
npm start
```
