import { MyPromise } from './MyPromise.js';

const promise = new MyPromise((resolve) => resolve(42));
promise.then((value) => console.log('Resolved with', value));
