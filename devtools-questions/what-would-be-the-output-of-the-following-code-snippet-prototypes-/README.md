# Reassigning `Function.prototype`

## Code

```js
function Foo() {}

Foo.prototype.value = 1;

const foo = new Foo();
Foo.prototype = { value: 2 };
const bar = new Foo();

console.log(foo.value);
console.log(bar.value);
console.log(Object.getPrototypeOf(foo) === Foo.prototype);
console.log(Object.getPrototypeOf(bar) === Foo.prototype);
```

## Output

```
1
2
false
true
```

## Explanation

- Instances keep a reference to the prototype object that existed **at the time they were created**. Reassigning `Foo.prototype` later does not retroactively update earlier instances.
- `foo` was created before the reassignment, so it still points to the original prototype where `value` equals `1`.
- `bar` uses the new prototype object (`{ value: 2 }`), so `bar.value` is `2`, and its prototype identity check returns `true`.
- Comparing `Object.getPrototypeOf(foo)` to the new `Foo.prototype` evaluates to `false` because `foo` still references the original prototype object.
