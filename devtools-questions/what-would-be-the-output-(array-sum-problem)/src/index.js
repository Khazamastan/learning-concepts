const numbers = [10, 20, 30];
numbers.bonus = 100;

let forInTotal = 0;
for (const key in numbers) {
  forInTotal += numbers[key];
}
console.log(forInTotal);

let forOfTotal = 0;
for (const value of numbers) {
  forOfTotal += value;
}
console.log(forOfTotal);

const reduceTotal = numbers.reduce((acc, value) => acc + value, 0);
console.log(reduceTotal === forOfTotal);
