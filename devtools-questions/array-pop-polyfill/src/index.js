import { popPolyfill } from './popPolyfill.js';

Array.prototype.myPop = popPolyfill;

const numbers = [1, 2, 3];
console.log('Initial array:', numbers);
console.log('Popped value:', numbers.myPop());
console.log('Array after pop:', numbers);
console.log('Empty array pop:', [].myPop());
