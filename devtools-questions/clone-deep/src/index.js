import { cloneDeep } from './cloneDeep.js';

const original = { foo: { bar: [1, 2] } };
const copy = cloneDeep(original);
copy.foo.bar.push(3);
console.log(original, copy);
