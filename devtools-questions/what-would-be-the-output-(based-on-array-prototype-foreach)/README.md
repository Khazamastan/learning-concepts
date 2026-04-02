# Array `forEach` return value

## Code

```js
const values = [1, 2, 3];
let total = 0;

const result = values.forEach((value) => {
  total += value;
  if (value === 2) {
    return "skipped";
  }
});

console.log(result);
console.log(total);

const doubled = values.map((value) => value * 2);
console.log(doubled);
```

## Output

```
undefined
6
[ 2, 4, 6 ]
```

## Explanation

- `Array.prototype.forEach` always returns `undefined`; any value you `return` from the callback is ignored. We log that directly.
- The callback still runs for every element, so `total` becomes the sum `1 + 2 + 3 = 6` even though we attempted to `return` when encountering `2`.
- In contrast, `map` produces a brand-new array and returns it, which is why `doubled` contains `[2, 4, 6]`.
