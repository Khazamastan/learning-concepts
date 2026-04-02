# Memoize utility

## Problem

Implement a memoization helper that caches results of expensive function calls and reuses them when the same arguments are provided again.

## Solution

`memoize(fn, keyResolver)` returns a wrapper that stores results in a `Map`. The default `keyResolver` serialises arguments via `JSON.stringify`, but callers can supply custom logic for complex inputs. The demo compares Fibonacci computation with and without memoization to illustrate the performance gain.

## Running locally

```bash
cd how-to-implement-memoize-function-javascript-interview-question-problem-solving
node src/index.js
```
