# Toggle Function

## Problem
Cycle through a predefined list of values on repeated calls. Invoking the helper
returns the next value and wraps around to the start after the final item.

## Solution
`toggle` validates the input array, maintains an internal index, and returns a
closure. Each call returns the current value and advances the index modulo the
array length, providing deterministic cycling without mutating the source list.

## Running locally
```
npm install
npm start
```
