'use strict';

const INT_MIN = -(2 ** 31);
const INT_MAX = 2 ** 31 - 1;

function stringToInteger(input) {
  let index = 0;
  let sign = 1;
  let value = 0;

  while (index < input.length && input[index] === ' ') {
    index += 1;
  }

  if (input[index] === '+' || input[index] === '-') {
    sign = input[index] === '-' ? -1 : 1;
    index += 1;
  }

  while (index < input.length && /[0-9]/.test(input[index])) {
    const digit = input.charCodeAt(index) - 48;
    value = value * 10 + digit;

    if (sign === 1 && value > INT_MAX) {
      return INT_MAX;
    }
    if (sign === -1 && -value < INT_MIN) {
      return INT_MIN;
    }

    index += 1;
  }

  return value * sign;
}

console.log(stringToInteger('42'));
console.log(stringToInteger('   -42'));
console.log(stringToInteger('4193 with words'));
console.log(stringToInteger('-91283472332'));

module.exports = { stringToInteger };
