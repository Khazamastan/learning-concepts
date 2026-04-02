# Prototype method invocation

## Code

```js
"use strict";

function Counter(start) {
  this.value = start;
}

Counter.prototype.increment = function increment() {
  return ++this.value;
};

const counter = new Counter(1);
const increment = counter.increment;

console.log(counter.increment());
console.log(increment.call({ value: 10 }));

try {
  console.log(increment());
} catch (error) {
  console.log(error.name);
}
```

## Output

```
2
11
TypeError
```

## Explanation

- When we invoke `counter.increment()` through the instance, `this` is the `counter` object whose `value` climbs from `1` to `2`.
- Pulling the method off the prototype and calling it with `.call` lets us substitute any receiver; passing `{ value: 10 }` yields `11`.
- In strict mode an unbound function call (`increment()`) uses `undefined` as `this`, so the method cannot look up `this.value` and throws a `TypeError`, which we catch and print.
