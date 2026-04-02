# Temporal Dead Zone behaviour

## Code

```js
function demo() {
  try {
    console.log(count);
  } catch (error) {
    console.log(error.name);
  }

  let count = 1;
  console.log(count);
}

demo();

try {
  console.log(outside);
} catch (error) {
  console.log(error.name);
}

const outside = 5;
```

## Output

```
ReferenceError
1
ReferenceError
```

## Explanation

- The `let count` declaration is hoisted but remains in the temporal dead zone until execution reaches the declaration line. Accessing `count` earlier throws a `ReferenceError`, which we catch and log.
- Once we hit the declaration, `count` is initialised to `1`, so the second log succeeds.
- The same rules apply to `const outside` in the outer scope. Attempting to read it before its declaration also triggers a `ReferenceError`.
