# Assignment order gotcha

## Code

```js
let a = { n: 1 };
const b = a;

a.x = a = { n: 2 };

console.log(a.n);
console.log(b.n);
console.log(b.x === a);
```

## Output

```
2
1
true
```

## Explanation

- Property access (`a.x`) is evaluated before the assignment happens. At that moment `a` still points at the original object referenced by `b`.
- The right-hand side `a = { n: 2 }` rebinds `a` to a brand-new object whose `n` is `2`.
- Finally the assignment to the previously-computed reference `a.x` stores that new object on the original object (`b`). Consequently `b.n` stays `1`, while `b.x` references the same object that `a` now points to.
