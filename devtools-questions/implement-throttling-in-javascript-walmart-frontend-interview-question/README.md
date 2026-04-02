# Throttle helper

## Problem

Implement a throttle utility that limits how often a function runs. Requirements:

- Only execute the wrapped function at most once every `wait` milliseconds.
- Support `leading`/`trailing` options to control if the first or last invocation fires.
- Preserve `this` and arguments across calls.

## Solution

The exported `throttle` captures the last execution time, the pending timeout, and the latest arguments/context. Each call measures the remaining window. If the window elapsed we invoke immediately; otherwise we schedule a trailing execution. Passing `{ leading: false }` skips the immediate call by seeding `lastCallTime`.

The demo simulates a scroll feed emitting values every 40ms while the throttled callback prints at most once every 200ms.

## Running locally

```bash
cd implement-throttling-in-javascript-walmart-frontend-interview-question
node src/index.js
```

Watch the console to see how successive inputs are collapsed to throttled updates.
