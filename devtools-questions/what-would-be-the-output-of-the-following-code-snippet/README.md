# Loop mutation puzzle

## Code

```js
var x = 1;

for (; x < 6; x += 2) {
  x = x * x;
}

console.log(x);
```

## Output

```
11
```

## Explanation

- Start with `x = 1`. The loop condition `x < 6` holds, so we enter the body.
- Inside, `x = x * x` squares the current value, but the `for` loop still applies the `x += 2` increment after the iteration ends.
- Tracing each iteration: `1 → (square) 1 → (increment) 3`, `3 → 9 → 11`, `11` fails the loop condition and logs.
