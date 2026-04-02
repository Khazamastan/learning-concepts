# Function calculator

## Problem

Build a calculator that supports chained operations (`add`, `subtract`, `multiply`, `divide`) and returns the final result when requested.

## Solution

`calculator(initial)` closes over the current value and returns an API object. Each operation mutates the captured `current` value and returns the same API to allow chaining. `value()` reveals the accumulated total, and `reset()` lets you continue from a new baseline.

## Running locally

```bash
cd how-to-create-a-function-calculator-programming-interview-question
node src/index.js
```

The demo prints `Result: 6` for the chain `(((10 + 5 - 3) * 2) / 4)`.
