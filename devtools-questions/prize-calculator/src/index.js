import { calculatePrizeDistribution } from './prizeCalculator.js';

const prizePool = 1000;
const participants = [
  { id: 'A', weight: 5 },
  { id: 'B', weight: 3 },
  { id: 'C', weight: 2 },
];

const distribution = calculatePrizeDistribution(prizePool, participants);

console.log('Prize distribution:', distribution);
