# Destructuring with property aliases

## Code

```js
var person = {};

({
  name: person["username"],
} = {
  username: "yomeshgupta",
  email: "team@devtools.tech",
  name: "yomesh",
});

console.log(person.username, person.name);
```

## Output

```
yomesh undefined
```

## Explanation

- The pattern `name: person["username"]` pulls the `name` property from the right-hand object and assigns it to the `username` key on `person`.
- No assignment is made to `person.name`, so it remains `undefined`.
- Wrapping the destructuring assignment in parentheses is required because an object literal on the left side of `=` would otherwise start a block.
