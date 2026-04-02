# useAsync Hook

## Problem
Handling asynchronous operations in React often leads to repetitive boilerplate: tracking status, storing results, catching errors, and avoiding state updates on unmounted components.

## Solution
`useAsync` accepts an async function and returns `status`, `value`, `error`, plus a memoised `run` function. It sets a `pending` state before invoking the promise, stores the resolved value or error, and checks a `mountedRef` before mutating state to avoid leaks. The included demo fetches a fake user and displays loading/error states.

## Usage
```js
const { status, value, error, run } = useAsync(fetchUser);
```
