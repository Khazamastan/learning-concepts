# Prototypes & scopes output

## Code

```js
"use strict";

function Foo() {
  this.x = 1;
}

Foo.prototype.x = 10;
Foo.prototype.getX = function () {
  return this.x;
};

const foo = new Foo();
const standalone = foo.getX;

console.log(foo.getX());
console.log(standalone());
```

## Output

```
1
undefined
```

## Explanation

- Invoking `foo.getX()` uses `foo` as the receiver, so `this` is the instance and `this.x` resolves to `1`.
- When the method is extracted and called as `standalone()`, `this` becomes `undefined` in strict mode. Accessing `this.x` therefore yields `undefined`.
- The prototype value (`Foo.prototype.x = 10`) is never reached because the instance already has its own `x` property.
