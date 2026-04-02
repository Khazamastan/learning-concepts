# Method vs arrow `this` in the browser

## Code

```js
"use strict";

let foo = {
  barX: function () {
    console.log(this);
  },
  barY: () => {
    console.log(this);
  },
};

let barX = foo.barX;
let barY = foo.barY;

foo.barX();
foo.barY();
barX();
barY();
```

## Output (browser)

```
foo object
Window {...}
undefined
Window {...}
```

## Explanation

- Regular methods receive their caller as `this`. Invoking `foo.barX()` therefore logs the `foo` object.
- Arrow functions capture `this` lexically from their defining scope. Even in strict mode, the top-level script `this` is `window`, so `foo.barY()` (and later `barY()`) log the `Window` object.
- Extracting `barX` and calling it as a plain function happens in strict mode, where unbound calls use `undefined` as `this`.

> The repository version shims the behaviour with a `windowLike` object so you can run `npm start` in Node and observe the same sequence of labels: `foo`, `window`, `undefined`, `window`.
