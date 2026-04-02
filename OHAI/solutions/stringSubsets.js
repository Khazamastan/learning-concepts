'use strict';

function stringSubsets(input) {
  const subsets = [];
  const chars = input.split('');
  const total = 1 << chars.length;

  for (let mask = 0; mask < total; mask += 1) {
    let subset = '';
    for (let index = 0; index < chars.length; index += 1) {
      if (mask & (1 << index)) {
        subset += chars[index];
      }
    }
    subsets.push(subset);
  }

  return subsets;
}

console.log('Subsets for "abc":', stringSubsets('abc'));

module.exports = { stringSubsets };
