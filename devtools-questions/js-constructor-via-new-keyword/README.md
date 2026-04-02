# Constructor return behaviour

## Code

```js
function Person() {
  this.name = "Yomesh";
  return this;
}

var person = new Person();
console.log(person.name);

function Car() {
  this.name = "BMW";
  return this.name;
}

var car = new Car();
console.log(car.name);

function Animal() {
  var animals = [];
  animals.push("tiger");
  animals.alive = true;
  return animals;
}

var animals = new Animal();
console.log(animals.alive, Array.isArray(animals), animals[0] === "tiger");

function Rocket() {
  var rocket = () => {
    console.log("I am a rocket");
  };
  this.engines = 4;
  return rocket;
}

var rocket = new Rocket();
rocket();
console.log(rocket.engines);

function Company() {
  this.name = "OLX";
  return {};
}

var company = new Company();
console.log(company.name);
```

## Output

```
Yomesh
undefined
true true true
I am a rocket
undefined
undefined
```

## Explanation

- Constructors that return a **primitive** ignore that return value; the freshly created object is used instead. `Person` behaves normally and we read the `name` property.
- Returning a primitive (`"BMW"`) from `Car` causes `car` to be that string, so `car.name` is `undefined`.
- Returning an object (including arrays or functions) replaces the instance entirely. `Animal` returns an array with additional properties; `Rocket` returns a function, so the `engines` property stored on `this` is lost.
- `Company` explicitly returns `{}`; the brand-new object has no `name` property, so the final log prints `undefined`.
