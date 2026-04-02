"use strict";

function Counter(start) {
  this.value = start;
}

Counter.prototype.increment = function increment() {
  return ++this.value;
};

const counter = new Counter(1);
const increment = counter.increment;

console.log(counter.increment());
console.log(increment.call({ value: 10 }));

try {
  console.log(increment());
} catch (error) {
  console.log(error.name);
}
