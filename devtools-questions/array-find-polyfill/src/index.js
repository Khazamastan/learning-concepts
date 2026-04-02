import { findPolyfill } from './findPolyfill.js';

Array.prototype.myFind = findPolyfill;

const users = [
  { id: 1, name: 'Ada' },
  { id: 2, name: 'Grace' },
];

const found = users.myFind((user) => user.id === 2);
console.log('Found user:', found);
