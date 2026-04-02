# Array `find` Polyfill

## Problem
Implement `Array.prototype.find`, returning the first element that satisfies a
predicate or `undefined` when nothing matches.

## Solution
`findPolyfill` takes care of coercing the receiver, checking the callback, and
iterating across existing indices. It returns the first value for which the
predicate returns truthy; otherwise it yields `undefined`. The demo exposes the
helper as `myFind` and locates a user by id.

## Running locally
```
npm install
npm start
```
