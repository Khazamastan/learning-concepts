import { findIndexPolyfill } from './findIndexPolyfill.js';

Array.prototype.myFindIndex = findIndexPolyfill;

const books = [
  { title: 'The Hobbit', pages: 304 },
  { title: 'Clean Code', pages: 464 },
];

const longReadIndex = books.myFindIndex((book) => book.pages > 400);
console.log('First long book index:', longReadIndex);
