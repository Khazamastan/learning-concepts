# Promise output puzzle (Part One)

## Code

```js
function init() {
  throw new Error("I am an error");
  return Promise.resolve(1);
}

init()
  .then((v) => console.log(v + 1))
  .catch((err) => console.log("Error caught --", err.message));
```

## Output

```
Uncaught Error: I am an error
```

## Explanation

- The exception is thrown **before** `init` returns a promise. The `.then(...)` / `.catch(...)` chain is never attached because the call to `init()` fails synchronously.
- As a result the runtime sees an uncaught exception rather than invoking the `catch` handler. To catch it, wrap the `init()` invocation in a `try/catch` or move the `throw` into the promise chain.
