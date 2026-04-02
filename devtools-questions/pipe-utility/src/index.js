import { pipe } from './pipe.js';

const add2 = (x) => x + 2;
const square = (x) => x * x;
const halve = (x) => x / 2;

const transform = pipe(add2, square, halve);
console.log(transform(3));
