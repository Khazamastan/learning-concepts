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
