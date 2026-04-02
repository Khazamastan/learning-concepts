import { somePolyfill } from './somePolyfill.js';

Array.prototype.mySome = somePolyfill;

console.log(
  'Contains an even number:',
  [1, 3, 6].mySome((value) => value % 2 === 0),
);

console.log(
  'Numbers all odd?',
  [1, 3, 5].mySome((value) => value % 2 === 0),
);
