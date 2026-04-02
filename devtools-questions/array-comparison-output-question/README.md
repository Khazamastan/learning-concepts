# Array comparison quirk

## Code

```js
function compare(input) {
  return !!(input == 1 || input == 2 || input == 3);
}

console.log(compare(0));
console.log(compare(1));
console.log(compare(2));
console.log(compare(3));
console.log(compare(4));
console.log(compare([1]));
console.log(compare([2]));
console.log(compare([3]));
```

## Output

```
false
true
true
true
false
true
true
true
```

## Explanation

- The `==` operator performs type coercion. Primitive numbers `1`, `2`, `3` obviously match.
- Arrays are coerced to primitives by calling `toString()` → `[1]` becomes the string `"1"`, which then coerces to the number `1`. The same happens with `[2]` and `[3]`.
- The guard `!!(...)` converts the truthy/falsey values to strict booleans for logging.
