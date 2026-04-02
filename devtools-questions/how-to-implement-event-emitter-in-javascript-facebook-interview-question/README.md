# EventEmitter implementation

## Problem

Implement an event emitter with `on`, `once`, `off`, and `emit` methods plus a `clear` helper. `once` should automatically unsubscribe after firing.

## Solution

Internally a `Map` holds event names mapped to `Set`s of handlers. `on` inserts handlers and returns an unsubscribe function. `once` wraps the handler so it removes itself after execution. `emit` clones the handler set before iterating to avoid issues when handlers unsubscribe while running.

## Running locally

```bash
cd how-to-implement-event-emitter-in-javascript-facebook-interview-question
node src/index.js
```

The sample logs a regular listener, a `once` listener, and demonstrates unsubscribing.
