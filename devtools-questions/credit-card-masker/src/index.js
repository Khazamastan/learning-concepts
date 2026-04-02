import { maskCardNumber } from './maskCardNumber.js';

const samples = [
  '4111111111111111',
  '5500000000000004',
  '378282246310005',
];

samples.forEach((card) => {
  console.log(card, '->', maskCardNumber(card));
});
