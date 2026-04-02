# Promise output puzzle (Part Two)

## Code

```js
Promise.resolve()
  .then(() => {
    console.log("A");
    return "B";
  })
  .then((value) => {
    console.log(value);
    throw "C";
  })
  .then(() => {
    console.log("should not run");
  })
  .catch((error) => {
    console.log(error);
  });
```

## Output

```
A
B
C
```

## Explanation

- The first `then` runs as a microtask and resolves to the string `"B"`, so the next handler logs `B`.
- Throwing inside that handler converts the returned value into a rejected promise whose reason is `"C"`.
- Rejections skip subsequent `then` callbacks until a matching `catch` is found; the `catch` executes, logs `C`, and the chain ends.
