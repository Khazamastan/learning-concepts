/**
 * Title: Find All Anagrams in String
 * Difficulty: Medium
 * Companies: Amazon, Google, Meta
 *
 * Problem Summary:
 * Given strings `s` and `p`, return all start indices of `p`'s anagrams in `s`.
 *
 * Solution Explanation:
 * Maintaining frequency counts for a sliding window of length `|p|` allows direct comparison with the target counts.
 *
 * Approach Outline:
 * Use fixed-size frequency arrays for the pattern and the current window; slide the window across `s` updating counts incrementally and record indices when the arrays match.
 *
 * Complexity:
 *   Time: O(n)
 *   Space: O(1)
 *
 * Tests:
 *   - assert.deepStrictEqual(findAnagrams('cbaebabacd', 'abc'), [0, 6]);
 *   - assert.deepStrictEqual(findAnagrams('abab', 'ab'), [0, 1, 2]);
 */

function findAnagrams(s, p) {
  if (s.length < p.length) return [];
  const aCode = 'a'.charCodeAt(0);
  const need = new Array(26).fill(0);
  const window = new Array(26).fill(0);
  for (const ch of p) need[ch.charCodeAt(0) - aCode] += 1;
  const result = [];
  for (let i = 0; i < s.length; i += 1) {
    window[s.charCodeAt(i) - aCode] += 1;
    if (i >= p.length) {
      window[s.charCodeAt(i - p.length) - aCode] -= 1;
    }
    let matches = true;
    for (let j = 0; j < 26; j += 1) {
      if (window[j] !== need[j]) {
        matches = false;
        break;
      }
    }
    if (matches) result.push(i - p.length + 1);
  }
  return result;
}

module.exports = { findAnagrams };

if (require.main === module) {
  const assert = require('node:assert/strict');
  assert.deepStrictEqual(findAnagrams('cbaebabacd', 'abc'), [0, 6]);
  assert.deepStrictEqual(findAnagrams('abab', 'ab'), [0, 1, 2]);
  console.log('All tests passed for Find All Anagrams in String.');
}
