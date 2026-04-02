import { unshiftPolyfill } from './unshiftPolyfill.js';

Array.prototype.myUnshift = unshiftPolyfill;

const numbers = [3, 4];
const resultLength = numbers.myUnshift(1, 2);
console.log('New length:', resultLength);
console.log('Mutated array:', numbers);

const arr = [];
arr.myUnshift('first');
console.log('Single insert:', arr);
