# `delete` on variables

## Code

```js
var person = "Yomesh";

var deletePerson = () => {
  delete person;
  return person;
};

console.log(deletePerson());
```

## Output

```
Yomesh
```

## Explanation

- Variables declared with `var`, `let`, or `const` are not configurable properties of the global object, so the `delete` operator has no effect on them.
- The arrow function returns the original binding, which still references the string `"Yomesh"`.
- Only properties created directly on objects (including implicitly created globals without declarations) can be removed with `delete`.
