# Currying helper

## Problem

Implement a generic `curry(fn)` utility that lets you invoke a function with one or more arguments at a time until its arity is satisfied. The helper should:

- Respect the original function arity (unless an override is provided).
- Preserve `this` binding.
- Support partial application with mixed grouping, e.g. `curried(1)(2, 3)`.

## Solution

The exported `curry` function wraps the target in a recursive `curried` closure. It captures arguments into an array and:

1. If the collected arguments satisfy the target arity, invokes the original function via `fn.apply(this, args)`.
2. Otherwise returns another function that appends its arguments and recurses.

Using `apply` keeps the call-site `this` intact so currying methods still works with `.call` / `.bind`. The demo showcases different invocation styles and the preservation of context.

## Running locally

```bash
cd implement-currying-javascript-interview-questions
node src/index.js
```

Check the console output to confirm the summed values and the context-aware call.
