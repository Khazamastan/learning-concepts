# Prototype call variations

## Code

```js
const animal = {
  speak() {
    return this && typeof this.sound !== "undefined" ? this.sound : "silence";
  },
};

const dog = Object.create(animal);
dog.sound = "woof";

const speak = dog.speak;

console.log(dog.speak());
console.log(speak.call({ sound: "meow" }));
console.log(speak());
```

## Output

```
woof
meow
silence
```

## Explanation

- `dog.speak()` looks up the method on `animal` via the prototype chain and runs it with `this === dog`, so it picks `dog.sound`.
- `.call` lets us explicitly set `this` to another object; the method acts on that object.
- Calling `speak()` without a receiver passes `undefined` as `this` (ES modules are strict), so the method falls back to returning "silence".
