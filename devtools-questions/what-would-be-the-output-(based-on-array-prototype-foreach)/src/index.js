const values = [1, 2, 3];
let total = 0;

const result = values.forEach((value) => {
  total += value;
  if (value === 2) {
    return "skipped";
  }
});

console.log(result);
console.log(total);

const doubled = values.map((value) => value * 2);
console.log(doubled);
