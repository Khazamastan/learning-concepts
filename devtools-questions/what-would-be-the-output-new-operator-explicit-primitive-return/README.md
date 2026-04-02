# new operator with primitive return

## Code

```js
function Person(name) {
  this.name = name;
  return "overridden";
}

const user = new Person("Leia");
console.log(user.name);
console.log(user instanceof Person);
console.log(typeof user);
```

## Output

```
Leia
true
object
```

## Explanation

When a constructor invoked with `new` returns a primitive, the primitive is ignored and the freshly created object is returned instead. Therefore `user` is still the instance with `name` set to "Leia".
