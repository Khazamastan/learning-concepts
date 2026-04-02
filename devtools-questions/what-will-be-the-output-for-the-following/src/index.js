let a = { n: 1 };
const b = a;

a.x = a = { n: 2 };

console.log(a.n);
console.log(b.n);
console.log(b.x === a);
