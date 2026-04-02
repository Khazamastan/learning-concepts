import { promiseMerge } from './promiseMerge.js';

promiseMerge({ a: Promise.resolve(1), b: 2 }).then((result) => console.log(result));
