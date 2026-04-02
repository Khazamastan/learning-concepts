# Implement classNames()

## Problem

Combine class name inputs (strings, arrays, nested arrays, and objects) into a single space-separated string without duplicates.

## Solution

`classNames` iterates through every argument:

- Strings are split on whitespace and inserted into a `Set` to avoid duplicates.
- Arrays trigger recursion so deeply nested structures are flattened.
- Objects treat truthy values as flags (`{ active: true } -> "active"`).

The function returns the joined set. A small demo call is logged at the end of `src/index.js`.

## Running locally

```bash
cd implement-classnames-javascript-interview-question
node src/index.js
```
