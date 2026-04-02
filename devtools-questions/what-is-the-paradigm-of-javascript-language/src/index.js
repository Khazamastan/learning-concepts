/**
 * JavaScript is a multi-paradigm language: we can program imperatively,
 * functionally, and using prototypes for object orientation. This script walks
 * through one tiny example of each style for the same data set.
 */

const numbers = [1, 2, 3, 4, 5];

// Imperative: explicit loops and mutation.
let imperativeSum = 0;
for (let i = 0; i < numbers.length; i += 1) {
  imperativeSum += numbers[i];
}
console.log('Imperative sum:', imperativeSum);

// Functional: higher-order functions and immutability.
const functionalSum = numbers
  .map((n) => n * 2)
  .filter((n) => n % 3 !== 0)
  .reduce((acc, n) => acc + n, 0);
console.log('Functional pipeline result:', functionalSum);

// Prototype-based object orientation.
function Counter(initial = 0) {
  this.value = initial;
}
Counter.prototype.increment = function increment() {
  this.value += 1;
  return this.value;
};

const counter = new Counter();
console.log('Prototype-based counter:', counter.increment(), counter.increment());
