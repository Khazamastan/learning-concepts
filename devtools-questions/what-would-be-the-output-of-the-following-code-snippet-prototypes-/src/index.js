function Foo() {}

Foo.prototype.value = 1;

const foo = new Foo();
Foo.prototype = { value: 2 };
const bar = new Foo();

console.log(foo.value);
console.log(bar.value);
console.log(Object.getPrototypeOf(foo) === Foo.prototype);
console.log(Object.getPrototypeOf(bar) === Foo.prototype);
