# Exotic array-like objects

## Code

```js
const arrayLike = { length: 0 };
Object.setPrototypeOf(arrayLike, Array.prototype);

arrayLike.push("alpha");
arrayLike.push("beta");

console.log(Array.isArray(arrayLike));
console.log(arrayLike.length);

arrayLike.length = 0;
console.log(arrayLike[0], arrayLike[1]);
console.log(Object.keys(arrayLike));

const realArray = ["alpha", "beta"];
realArray.length = 0;
console.log(realArray[0]);
console.log(realArray.length);
```

## Output

```
false
2
alpha beta
[ '0', '1', 'length' ]
undefined
0
```

## Explanation

- Setting an ordinary object’s prototype to `Array.prototype` gives it array methods, but `Array.isArray` still returns `false` because the internal `[[Class]]` slot is untouched.
- `Array.prototype.push` happily works on array-likes; it writes numeric keys and updates the explicit `length` property, so we see `length === 2` after two pushes.
- When we reset `length` to `0`, the numeric keys remain because an ordinary object does not implement the exotic array index behaviour that deletes elements automatically. The properties stay enumerable and appear in `Object.keys`.
- A real array does implement that exotic behaviour: shrinking `length` clears indexed elements, so reading index `0` returns `undefined` and the length truly becomes `0`.
