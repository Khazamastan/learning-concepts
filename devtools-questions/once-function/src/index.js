import { once } from './once.js';

let seed = 0;
const initialize = once(() => ++seed);
console.log(initialize());
console.log(initialize());
