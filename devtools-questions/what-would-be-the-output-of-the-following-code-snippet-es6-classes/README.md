# ES6 classes output

## Code

```js
class Parent {
  constructor() {
    this.name = "parent";
  }

  greet() {
    return `Hello ${this.name}`;
  }

  static identify() {
    return "Parent";
  }
}

class Child extends Parent {
  constructor() {
    super();
    this.name = "child";
  }

  greet() {
    return `${super.greet()}!`;
  }
}

const child = new Child();
const detachedGreet = child.greet;

console.log(child.greet());
console.log(Child.identify());

try {
  console.log(detachedGreet());
} catch (error) {
  console.log("Error:", error.message);
}
```

## Output

```
Hello child!
Parent
Error: Cannot read properties of undefined (reading 'name')
```

## Explanation

- `child.greet()` runs with the proper `this`, so `super.greet()` resolves via `Child`'s prototype chain to `Parent#greet` with `this === child`.
- `Child.identify()` hits the static method defined on the class constructor.
- When the method is detached, it loses its receiver. In strict mode class methods run with `this === undefined`, so the call throws when it tries to read `this.name`.
