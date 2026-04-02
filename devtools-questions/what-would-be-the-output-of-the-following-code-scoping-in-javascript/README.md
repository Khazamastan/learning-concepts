# Scoping output question

## Code

```js
for (var i = 0; i < 3; i += 1) {
  setTimeout(() => console.log("var", i), 0);
}

for (let j = 0; j < 3; j += 1) {
  setTimeout(() => console.log("let", j), 0);
}
```

## Output

```
var 3
var 3
var 3
let 0
let 1
let 2
```

## Explanation

- `var` is function-scoped, so the single binding `i` ends up as `3` by the time the callbacks run. Each timeout closes over the same variable.
- `let` is block-scoped; the loop creates a fresh `j` for each iteration, so callbacks see the value from their own block.
