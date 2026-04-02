import { detectOverlappingCircles } from './detectOverlaps.js';

const circles = [
  { id: 'A', x: 0, y: 0, radius: 10 },
  { id: 'B', x: 15, y: 0, radius: 5 },
  { id: 'C', x: 8, y: 0, radius: 4 },
];

const result = detectOverlappingCircles(circles);
console.log(result);
