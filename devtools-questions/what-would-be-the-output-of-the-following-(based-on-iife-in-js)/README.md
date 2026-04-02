# IIFE assignment quirk

## Code

```js
(function () {
  var first = (second = 5);
})();

console.log(second);
```

## Output

```
5
```

## Explanation

- The assignment `var first = (second = 5);` evaluates the right-hand side first. Because `second` is not declared inside the function, the assignment creates (or mutates) a property on the global object.
- `first` remains scoped to the IIFE, but `second` leaks to the outer scope, so logging `second` after the IIFE prints `5`.
