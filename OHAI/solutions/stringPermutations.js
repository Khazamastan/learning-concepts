'use strict';

function stringPermutations(input) {
  const chars = input.split('').sort();
  const used = Array(chars.length).fill(false);
  const result = [];

  function backtrack(path) {
    if (path.length === chars.length) {
      result.push(path.join(''));
      return;
    }

    for (let index = 0; index < chars.length; index += 1) {
      if (used[index]) {
        continue;
      }
      if (index > 0 && chars[index] === chars[index - 1] && !used[index - 1]) {
        continue; // avoid duplicates by only using identical chars in order
      }
      used[index] = true;
      path.push(chars[index]);
      backtrack(path);
      path.pop();
      used[index] = false;
    }
  }

  backtrack([]);
  return result;
}

console.log('Permutations for "abc":', stringPermutations('abc'));
console.log('Permutations for "aab":', stringPermutations('aab'));

module.exports = { stringPermutations };
