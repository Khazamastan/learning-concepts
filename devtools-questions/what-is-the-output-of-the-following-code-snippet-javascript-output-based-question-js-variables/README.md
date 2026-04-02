# Block-scoped variables

## Code

```js
function compute() {
  const condition = true;
  if (condition) {
    let a = false;
    let b = false;
  }
  return {
    a: a || null,
    b: b || null,
  };
}

const r = compute();
console.log(r);
```

## Output

```
ReferenceError: a is not defined
```

## Explanation

- `let` creates block-scoped bindings. The identifiers `a` and `b` live only inside the `if` block.
- When `compute` reaches the `return` statement, those bindings are no longer in scope. Attempting to read them triggers a `ReferenceError`.
- Wrap the code in a `try/catch` (as shown in `src/index.js`) or restructure the logic to declare `let a` and `let b` in the outer scope if you need to access them later.
