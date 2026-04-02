'use strict';

if (!Array.prototype.myFilter) {
  Object.defineProperty(Array.prototype, 'myFilter', {
    value: function myFilter(callback, thisArg) {
      if (typeof callback !== 'function') {
        throw new TypeError('callback must be a function');
      }
      const result = [];
      for (let index = 0; index < this.length; index += 1) {
        if (!Object.prototype.hasOwnProperty.call(this, index)) {
          continue;
        }
        const value = this[index];
        if (callback.call(thisArg, value, index, this)) {
          result.push(value);
        }
      }
      return result;
    },
    writable: true,
    configurable: true,
    enumerable: false,
  });
}

const numbers = [1, 2, 3, 4, 5];
const evenNumbers = numbers.myFilter((value) => value % 2 === 0);
console.log('Even numbers:', evenNumbers);
