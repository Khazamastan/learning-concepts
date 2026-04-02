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
