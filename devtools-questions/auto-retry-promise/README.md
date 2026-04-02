# Auto Retry Promise

## Problem
Wrap an asynchronous task so it automatically retries on failure, using
configurable retry counts, delays, and backoff. Callers should be able to
short-circuit retries based on the thrown error.

## Solution
The `autoRetry` helper accepts an async `task` and optional `retries`, `delay`,
`factor`, and `shouldRetry` controls. It loops attempts inside a `while`, awaiting
the task and breaking on success. When a failure occurs it consults
`shouldRetry`, performs a `setTimeout` pause, multiplies the delay, and tries
again. Exceeding the retry budget rethrows the most recent error.

## Running locally
```
npm install
npm start
```
