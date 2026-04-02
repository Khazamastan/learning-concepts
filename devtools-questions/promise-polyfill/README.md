# Promise Polyfill

## Problem
Reimplement the core behaviour of JavaScript promises: pending/fulfilled/rejected
states, chaining via `then`, error handling through `catch`, and static
`resolve`/`reject`.

## Solution
`MyPromise` tracks state and queued handlers internally. The executor runs
immediately, transitioning the state only once. Fulfilled promises queue
callbacks with `queueMicrotask` to mirror the microtask semantics. `then`
creates a new promise and wires fulfilment/rejection through try/catch blocks,
while `catch` delegates to `then`. Static helpers return already-settled
instances, yielding a compact yet standards-aligned polyfill.

## Running locally
```
npm install
npm start
```
