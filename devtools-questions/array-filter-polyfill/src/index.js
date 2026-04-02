import { filter } from './filterPolyfill.js';

const numbers = [1, 2, 3, 4, 5];
const evens = filter(numbers, (value) => value % 2 === 0);

console.log(evens);
