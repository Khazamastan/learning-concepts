import { everyPolyfill } from './everyPolyfill.js';

Array.prototype.myEvery = everyPolyfill;

console.log(
  'All numbers positive:',
  [1, 2, 3].myEvery((value) => value > 0),
);

console.log(
  'Contains a negative:',
  [1, 2, -3].myEvery((value) => value > 0),
);
