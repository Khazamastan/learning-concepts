import { add } from './chainableAdd.js';

const result = add(5)(10)(3);
console.log(Number(result)); // 18
