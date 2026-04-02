# Array Difference

## Problem
Produce the symmetric difference between two arrays: items that appear in the
first array but not the second, followed by items unique to the second. The
utility should handle duplicates naturally and avoid mutating the inputs.

## Solution
The `arrayDifference` helper builds two `Set` objects to check membership in
constant time. It filters each array against the other set and concatenates the
results, returning a new array that lists elements exclusive to each side. This
keeps the implementation clear, order preserving, and free of side effects.

## Running locally
```
npm install
npm start
```
