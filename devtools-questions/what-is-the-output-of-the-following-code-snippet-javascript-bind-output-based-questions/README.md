# Arrow functions and `bind`

## Code

```js
var foo = 1;
var change = () => {
  this.foo = 2;
  console.log(this.foo);
};
var obj = {
  foo: 3,
};
var bounded = change.bind(obj);

console.log(foo);
console.log(change());
console.log(foo);
console.log(obj.foo);
console.log(bounded());
```

## Output (browser script context)

```
1
2
undefined
2
3
undefined
```

## Explanation

- Arrow functions capture the lexical `this` at definition time. At the top level of a browser script, that is `window`, so `this.foo = 2` updates the global binding and logs `2`.
- `change()` returns `undefined`, so the second `console.log` prints `undefined` after the inner log.
- Because the global `foo` was overwritten, the next `console.log(foo)` emits `2`.
- `obj` is untouched (`3`) because `.bind` has no effect on arrow functions—their `this` is fixed lexically.
- Calling `bounded()` repeats the same behaviour as `change()`: it logs `2` and returns `undefined`.

> In Node’s ES module scope, the lexical `this` is `undefined`, so attempting to set `this.foo` throws. The repository demo keeps the original snippet intact so it can be run in a browser; wrap the call in a `try/catch` if you want to execute it under Node.
