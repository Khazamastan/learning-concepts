# Custom `bind` implementation

## Implementation

```js
function customBind(fn, context, ...boundArgs) {
  if (typeof fn !== "function") {
    throw new TypeError("customBind expects a function");
  }

  function boundFunction(...callArgs) {
    if (this instanceof boundFunction) {
      return new fn(...boundArgs, ...callArgs);
    }

    return fn.apply(context, [...boundArgs, ...callArgs]);
  }

  boundFunction.prototype = Object.create(fn.prototype);
  return boundFunction;
}
```

## Usage demo

```js
function greet(greeting, punctuation) {
  return greeting + ", " + this.name + punctuation;
}

const person = { name: "Ada" };
const bound = customBind(greet, person, "Hello");
console.log(bound("!")); // Hello, Ada!

function Person(name) {
  this.name = name;
}

Person.prototype.describe = function describe() {
  return "Person(" + this.name + ")";
};

const BoundPerson = customBind(Person, null, "Grace");
const instance = new BoundPerson();
console.log(instance.describe()); // Person(Grace)
console.log(instance instanceof Person); // true
```

## Explanation

- The polyfill captures the original function, the desired `this` value, and any arguments supplied at bind time.
- When the bound function is called normally, it forwards to the original via `apply`, concatenating bound and call-time arguments.
- When invoked with `new`, the bound function acts as a constructor: `this instanceof boundFunction` detects that path, and we delegate to the original constructor so that prototype inheritance continues to work.
- Copying the prototype chain via `Object.create` preserves methods when the bound function is used with `new`.
