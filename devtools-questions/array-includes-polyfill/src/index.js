import { includesPolyfill } from './includesPolyfill.js';

Array.prototype.myIncludes = includesPolyfill;

console.log('Contains "JS"?', ['JS', 'TS'].myIncludes('JS'));
console.log('Contains NaN?', [1, NaN, 3].myIncludes(NaN));
console.log('From index skip:', ['a', 'b', 'c'].myIncludes('a', 1));
