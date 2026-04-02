# JavaScript inheritance output

## Code

```js
function Animal() {
  this.type = "animal";
}

Animal.prototype.sound = "generic";

function Dog() {}
Dog.prototype = new Animal();
Dog.prototype.constructor = Dog;

const fido = new Dog();
Dog.prototype.sound = "bark";
Animal.prototype.sound = "growl";

console.log(fido.type);
console.log(fido.sound);
```

## Output

```
animal
bark
```

## Explanation

- `Dog.prototype = new Animal()` creates a prototype object that already has the `type` own property set to "animal" (because the `Animal` constructor ran). Instances such as `fido` therefore inherit `type` without owning it.
- Overriding `Dog.prototype.sound` after instantiation updates the prototype that `fido` sees, so `fido.sound` resolves to "bark".
- Reassigning `Animal.prototype.sound` later does not affect the copy on `Dog.prototype`. The resolution chain stops at `Dog.prototype`, so "growl" is ignored.
