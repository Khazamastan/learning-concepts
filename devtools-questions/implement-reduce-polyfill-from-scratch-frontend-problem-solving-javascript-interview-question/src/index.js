import { reducePolyfill } from './reducePolyfill.js';

Array.prototype.myReduce = reducePolyfill;

const sum = [1, 2, 3].myReduce((acc, value) => acc + value, 0);
console.log('Sum:', sum);

const concatenated = ['JS', 'TS'].myReduce((acc, value) => `${acc}-${value}`);
console.log('Concatenated:', concatenated);
