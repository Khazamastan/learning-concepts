# Passing `parseInt` to `map`

## Code

```js
const values = ["10", "11", "12"];

console.log(values.map(parseInt));
console.log(values.map((value) => parseInt(value, 10)));
```

## Output

```
[ 10, NaN, 1 ]
[ 10, 11, 12 ]
```

## Explanation

- `Array.prototype.map` calls its callback with three arguments: the element, the index, and the whole array. When we hand `parseInt` directly to `map`, that index becomes the radix argument.
  - `parseInt("10", 0)` auto-detects base 10 → `10`.
  - `parseInt("11", 1)` is invalid because base 1 does not exist → `NaN`.
  - `parseInt("12", 2)` stops after the first valid digit in base 2 → `1`.
- Supplying a wrapper that passes a fixed radix makes the intent explicit; every call parses in base 10 and we get the expected `[10, 11, 12]`.
