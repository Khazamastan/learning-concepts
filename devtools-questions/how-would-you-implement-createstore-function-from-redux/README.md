# Minimal `createStore` implementation

## Problem

Implement Redux’s `createStore` helper: hold state, dispatch plain-object actions, let subscribers react to changes.

## Solution

`createStore` captures the reducer and returns `{ getState, dispatch, subscribe }`.

- `dispatch` guards against nested dispatches, runs the reducer, and then notifies listeners.
- `subscribe` registers callbacks and returns an unsubscribe function.
- An initial `dispatch({ type: "@@INIT" })` seeds the state with the reducer’s default.

The demo reducer increments/decrements a counter and logs state updates.

## Running locally

```bash
cd how-would-you-implement-createstore-function-from-redux
node src/index.js
```
