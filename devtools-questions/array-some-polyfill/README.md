# Array `some` Polyfill

## Problem
Implement `Array.prototype.some`, returning `true` as soon as at least one
element meets a condition and `false` otherwise.

## Solution
`somePolyfill` mirrors the specification: it coerces the receiver, validates the
callback, iterates over present indices, and invokes the predicate with the
optional `thisArg`. If any call yields truthy it stops and returns `true`.
Otherwise, it returns `false` after examining all items. The demo registers the
polyfill as `mySome` and runs a couple of illustrative checks.

## Running locally
```
npm install
npm start
```
