# Chainable Add

## Problem
Create an adder function that supports fluent chaining, e.g. `add(1)(2)(3)`,
and returns the running total when coerced to a primitive.

## Solution
The `add` factory builds a closure that captures the accumulated sum. Each call
normalises the incoming value, adds it to the total, and returns the same
function. Overriding `valueOf`/`toString` lets JavaScript unwrap the result
inside math expressions or template strings, delivering the expected numeric
value.

## Running locally
```
npm install
npm start
```
