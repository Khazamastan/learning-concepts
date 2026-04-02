# Count Numbers In Array

## Problem
Count how many times each numeric value appears in an array that may contain
numbers or numeric strings. Non-numeric entries should be ignored.

## Solution
`countNumbers` normalises every entry through `Number(value)` and skips results
that become `NaN`. It stringifies the numeric key so both `1` and `'1'` increment
the same bucket, and it maintains counts in a simple object accumulator.

## Running locally
```
npm install
npm start
```
