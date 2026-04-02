# Once Function

## Problem
Wrap a function so it only executes the first time it is called, caching the
result for subsequent invocations.

## Solution
The `once` helper stores a `called` flag and the last `result`. When the wrapper
is invoked, it executes the original function only if it has not run before,
memoising the return value. Later calls short-circuit and hand back the cached
result.

## Running locally
```
npm install
npm start
```
