# `this` binding quirks in the browser

## Code

```js
const windowLike = { length: 10 };

function callback() {
  console.log(this.length);
}

const obj = {
  length: 5,
  method(fn) {
    fn.call(windowLike);
    arguments[0].call(arguments);
  },
};

obj.method(callback, 1);
```

## Output

```
10
2
```

## Explanation

- In a non-strict browser function call (`fn()`), `this` defaults to the global object. The well-known puzzle uses `var length = 10;` so `window.length` becomes `10`. In our Node-friendly reproduction we explicitly call with a `windowLike` object to mirror that behaviour.
- Calling the function through `arguments[0]()` sets `this` to the `arguments` object. The `arguments` object is array-like with its own `length` (the number of parameters passed), so the second line prints `2`.
- This illustrates why relying on implicit globals for context is brittle—`this` can change depending on how a function is invoked.
