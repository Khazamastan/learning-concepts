import { deepEqual } from './deepEqual.js';

const first = { foo: { bar: [1, 2, 3] }, baz: true };
const second = { foo: { bar: [1, 2, 3] }, baz: true };
console.log(deepEqual(first, second));
