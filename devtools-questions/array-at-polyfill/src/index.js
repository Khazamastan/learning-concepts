import { atPolyfill } from './atPolyfill.js';

Array.prototype.myAt = atPolyfill;

const letters = ['a', 'b', 'c', 'd'];
console.log('Index 1:', letters.myAt(1));
console.log('Index -1:', letters.myAt(-1));
console.log('Index 10 (out of range):', letters.myAt(10));
