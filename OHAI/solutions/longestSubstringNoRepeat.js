'use strict';

function lengthOfLongestSubstring(input) {
  const lastSeenIndex = new Map();
  let windowStart = 0;
  let maxLength = 0;
  let maxSubstring = '';

  for (let index = 0; index < input.length; index += 1) {
    const char = input[index];
    if (lastSeenIndex.has(char) && lastSeenIndex.get(char) >= windowStart) {
      windowStart = lastSeenIndex.get(char) + 1;
    }
    lastSeenIndex.set(char, index);
    const windowLength = index - windowStart + 1;
    if (windowLength > maxLength) {
      maxLength = windowLength;
      maxSubstring = input.slice(windowStart, index + 1);
    }
  }

  return { length: maxLength, substring: maxSubstring };
}

console.log(lengthOfLongestSubstring('abcabcbb'));
console.log(lengthOfLongestSubstring('bbbbb'));
console.log(lengthOfLongestSubstring('pwwkew'));

module.exports = { lengthOfLongestSubstring };
