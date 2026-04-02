# Promise Scheduling Output Quiz

## Problem
Predict the log order produced by a snippet that combines synchronous logs,
`setTimeout`, and microtask queue callbacks via resolved promises.

## Solution
The script is included verbatim; running it prints `1 7 3 5 2 6 4`. Logs `1`
and `7` execute synchronously. Microtasks triggered by the promises run next,
printing `3` and `5` (the second promise enqueues a `setTimeout`, so `4` is
delayed). Finally, the macrotask queue executes timers in registration order,
yielding `2`, `6`, and eventually `4`.

## Running locally
```
npm install
npm start
```
