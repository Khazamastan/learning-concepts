const values = ["10", "11", "12"];

console.log(values.map(parseInt));
console.log(values.map((value) => parseInt(value, 10)));
