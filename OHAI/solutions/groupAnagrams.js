'use strict';

/**
 * Groups an array of strings into anagrams keyed by sorted character signature.
 * @param {string[]} words
 * @returns {string[][]}
 */
function groupAnagrams(words) {
  const lookup = new Map();

  for (const word of words) {
    const signature = word.split('').sort().join('');
    if (!lookup.has(signature)) {
      lookup.set(signature, []);
    }
    lookup.get(signature).push(word);
  }

  return Array.from(lookup.values());
}

const sample = ['eat', 'tea', 'tan', 'ate', 'nat', 'bat'];
console.log('Anagram groups:', groupAnagrams(sample));

module.exports = { groupAnagrams };
