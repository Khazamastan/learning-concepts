# Promise chaining output

## Code

```js
Promise.resolve(1)
  .then((value) => {
    console.log("A", value);
    return value + 1;
  })
  .finally(() => {
    console.log("B");
  })
  .then((value) => {
    console.log("C", value);
    return Promise.reject("boom");
  })
  .catch((error) => {
    console.log("D", error);
    return 42;
  })
  .then((value) => {
    console.log("E", value);
  });
```

## Output

```
A 1
B
C 2
D boom
E 42
```

## Explanation

- The first `then` handles the resolved value `1`.
- `finally` runs regardless of the chain outcome, but it does not swallow the resolved value (the next `then` still receives `2`).
- Returning a rejected promise inside the second `then` sends control to the `catch` block.
- The `catch` converts the failure into a resolved value (`42`), so the final `then` runs.
