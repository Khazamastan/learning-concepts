function Person() {
  this.name = "Yomesh";
  return this;
}

var person = new Person();
console.log(person.name); // Output 1?

function Car() {
  this.name = "BMW";
  return this.name;
}

var car = new Car();
console.log(car.name); // Output 2?

function Animal() {
  var animals = [];
  animals.push("tiger");
  animals.alive = true;
  return animals;
}

var animals = new Animal();
console.log(animals.alive, Array.isArray(animals), animals[0] === "tiger"); // Output 3?

function Rocket() {
  var rocket = () => {
    console.log("I am a rocket");
  };
  this.engines = 4;
  return rocket;
}

var rocket = new Rocket();
rocket(); // Output 4?
console.log(rocket.engines); // Output 5?

function Company() {
  this.name = "OLX";
  return {};
}

var company = new Company();
console.log(company.name); // Output 6?
