import { findLastPolyfill } from './findLastPolyfill.js';

Array.prototype.myFindLast = findLastPolyfill;

const temperatures = [18, 21, 32, 28, 24];
const result = temperatures.myFindLast((value) => value >= 25);
console.log('Last warm day temperature:', result);
