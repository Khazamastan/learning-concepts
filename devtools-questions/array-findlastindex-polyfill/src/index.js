import { findLastIndexPolyfill } from './findLastIndexPolyfill.js';

Array.prototype.myFindLastIndex = findLastIndexPolyfill;

const numbers = [5, 12, 18, 12, 7];
const lastIndex = numbers.myFindLastIndex((value) => value > 10);
console.log('Last index with value > 10:', lastIndex);
