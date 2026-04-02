import { countBy } from './countBy.js';

const numbers = [1.2, 1.8, 2.1, 2.9, 3.5];
const result = countBy(numbers, (value) => Math.floor(value));

console.log(result);
