import { limit } from './limit.js';

let count = 0;
const limited = limit(() => ++count, 2);
console.log(limited());
console.log(limited());
console.log(limited());
