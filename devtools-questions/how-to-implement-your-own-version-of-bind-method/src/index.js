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

function greet(greeting, punctuation) {
  return greeting + ", " + this.name + punctuation;
}

const person = { name: "Ada" };
const bound = customBind(greet, person, "Hello");

console.log(bound("!"));

function Person(name) {
  this.name = name;
}

Person.prototype.describe = function describe() {
  return "Person(" + this.name + ")";
};

const BoundPerson = customBind(Person, null, "Grace");
const instance = new BoundPerson();
console.log(instance.describe());
console.log(instance instanceof Person);
