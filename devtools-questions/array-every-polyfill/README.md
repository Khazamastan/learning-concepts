# Array `every` Polyfill

## Problem
Implement `Array.prototype.every`, verifying that all elements satisfy a
predicate. The method must respect array holes, accept an optional `thisArg`,
and short-circuit once the predicate returns false.

## Solution
`everyPolyfill` coerces `this` to an object, iterates over defined indices, and
invokes the callback with the proper signature. If any call returns a falsy
value, the loop exits early and the method returns `false`; otherwise `true` is
returned after the iteration completes. The demo attaches the polyfill as
`myEvery` and showcases both success and failure scenarios.

## Running locally
```
npm install
npm start
```
