import { sortByProperty } from './sortByProperty.js';

const items = [
  { id: 1, score: 90 },
  { id: 2, score: 75 },
  { id: 3, score: 88 },
];

console.log(sortByProperty(items, 'score', 'desc'));
