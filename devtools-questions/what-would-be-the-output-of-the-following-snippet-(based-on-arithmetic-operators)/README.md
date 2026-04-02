# Pre/post increment puzzle

## Code

```js
let x = 1;

do {
  let y = --x;
  console.log(x++ + --y);
} while (x++ < 5);
```

## Output

```
-1
1
3
5
7
```

## Explanation

- Each loop iteration creates a fresh `y`.
- `--x` happens before the assignment to `y`, so `y` is initially `x - 1`.
- `x++` returns the current `x` and increments afterwards; `--y` decrements `y` before the addition.
- Walking through the five iterations yields the arithmetic sequence `-1, 1, 3, 5, 7` as shown.
