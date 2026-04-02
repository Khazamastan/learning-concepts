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
