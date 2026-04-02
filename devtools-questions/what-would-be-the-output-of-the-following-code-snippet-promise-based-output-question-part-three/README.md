# Promise output puzzle (Part Three)

## Code

```js
Promise.resolve()
  .then(() => {
    console.log("A");
    return new Promise((resolve) => {
      resolve("B");
    });
  })
  .then((value) => {
    console.log(value);
    return Promise.reject("C");
  })
  .catch((error) => {
    console.log(error);
    return "D";
  })
  .then((value) => {
    console.log(value);
  });
```

## Output

```
A
B
C
D
```

## Explanation

- The first `then` runs immediately in the microtask queue, printing `A`, and returns a promise that resolves to `"B"`.
- The next handler receives that value, logs `B`, and returns a rejected promise with reason `"C"`.
- Rejections skip any remaining `then` handlers until a `catch` is found; the `catch` logs `C` and recovers by returning the string `"D"`.
- The final `then` receives that recovered value and logs `D`.
