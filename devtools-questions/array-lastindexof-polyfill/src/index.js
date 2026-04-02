import { lastIndexOfPolyfill } from './lastIndexOfPolyfill.js';

Array.prototype.myLastIndexOf = lastIndexOfPolyfill;

const list = ['a', 'b', 'a', 'c'];
console.log('Last index of "a":', list.myLastIndexOf('a'));
console.log('Last index of "a" before index 1:', list.myLastIndexOf('a', 1));
