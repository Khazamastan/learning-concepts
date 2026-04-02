# new operator with object return

## Code

```js
function Widget(label) {
  this.label = label;
  return { label: label.toUpperCase(), version: 1 };
}

const widget = new Widget("alpha");
console.log(widget.label);
console.log(widget instanceof Widget);
console.log(Object.keys(widget));
```

## Output

```
ALPHA
false
[ "label", "version" ]
```

## Explanation

Returning an object from a constructor overrides the default instance. `widget` is the object literal produced in the `return` statement, so it is no longer an instance of `Widget` and the uppercase label comes from the returned object.
