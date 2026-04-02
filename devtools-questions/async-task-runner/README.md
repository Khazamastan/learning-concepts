# Async Task Runner

## Problem
Execute asynchronous tasks with a fixed concurrency limit so only a handful run
at once while the rest queue. The API should expose an `enqueue` function that
returns a promise resolving with each task's result.

## Solution
`createTaskRunner` validates the desired concurrency, maintains a FIFO queue,
and tracks the number of active tasks. Each enqueue wraps the original task in a
promise, starting new work whenever a slot frees up. Completion handlers decrement
`activeCount` and trigger the next queue item, giving a reliable backpressure
mechanism.

## Running locally
```
npm install
npm start
```
