# `in` operator output

## Code

```js
const array = [10, 20, , 40];

console.log(0 in array);
console.log(2 in array);
console.log("push" in array);
```

## Output

```
true
false
true
```

## Explanation

- `0 in array` checks whether index 0 exists (it does, value `10`).
- `2 in array` is `false` because the third slot is a hole (sparse array), so index 2 is not set.
- `"push" in array` is `true` because `push` is a property on `Array.prototype`, and the `in` operator walks the prototype chain.
