"use strict";

function Foo() {
  this.x = 1;
}

Foo.prototype.x = 10;
Foo.prototype.getX = function getX() {
  return this.x;
};

const foo = new Foo();
const standalone = foo.getX;

console.log(foo.getX());
console.log(standalone());
