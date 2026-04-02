function Person(name) {
  this.name = name;
  return "overridden";
}

const user = new Person("Leia");
console.log(user.name);
console.log(user instanceof Person);
console.log(typeof user);
