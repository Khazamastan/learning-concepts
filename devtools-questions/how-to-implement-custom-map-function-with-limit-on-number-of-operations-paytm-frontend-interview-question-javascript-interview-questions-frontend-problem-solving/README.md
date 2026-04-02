# mapWithLimit utility

## Problem

Implement a `map`-like helper that respects a maximum number of concurrent operations. Given an array, a concurrency limit, and an async mapper, the helper should:

- Run at most `limit` mappers at the same time.
- Preserve input order in the returned array.
- Surface the first failure immediately while cancelling the rest of the work.

## Solution

`mapWithLimit(iterable, limit, mapper)` keeps two pointers: `index` for the next item to schedule and `inFlight` for the number of currently running jobs. A `queueNext` helper kicks off new work while `inFlight < limit`. Each mapper call is wrapped in a `Promise.resolve()` to normalise sync/async results. When a mapper settles it stores the value in the correct slot, decrements `inFlight`, and schedules more work.

The demo at the bottom of `src/index.js` simulates network requests with different delays. Logging `started` and `finished` arrays makes the throttling behaviour obvious while the final `output` proves that the original order is preserved.

## Running locally

```bash
cd how-to-implement-custom-map-function-with-limit-on-number-of-operations-paytm-frontend-interview-question-javascript-interview-questions-frontend-problem-solving
node src/index.js
```

You will see the simulated tasks start and finish in a throttled order while the mapped results remain sorted by the original index.
