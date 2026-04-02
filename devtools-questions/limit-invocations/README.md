# Limit Invocations

## Problem
Wrap a function so it can only run a fixed number of times. After the quota is
exhausted, further calls should no-op.

## Solution
The `limit` helper captures a `remaining` counter. Each invocation decrements
the counter and, when it is still positive, delegates to the original function.
Once the limit hits zero, the wrapper returns `undefined`, preventing additional
executions.

## Running locally
```
npm install
npm start
```
