/**
 * Title: Minimum Window Substring
 * Difficulty: Hard
 * Companies: Google, Meta, Amazon, Microsoft
 *
 * Problem Summary:
 * Given strings `s` and `t`, return the minimum window in `s` that contains all characters of `t`. If no such window exists, return an empty string.
 *
 * Solution Explanation:
 * A variable-length sliding window expands until all required characters are present and then contracts to find the minimum length window that preserves the requirement.
 *
 * Approach Outline:
 * Maintain a frequency map of required characters. Expand the right pointer updating counts, and once all requirements are met, move the left pointer while maintaining validity to minimize the window.
 *
 * Complexity:
 *   Time: O(n + m)
 *   Space: O(m)
 *
 * Tests:
 *   - assert.strictEqual(minWindow('ADOBECODEBANC', 'ABC'), 'BANC');
 *   - assert.strictEqual(minWindow('a', 'a'), 'a');
 *   - assert.strictEqual(minWindow('a', 'aa'), '');
 */

function minWindow(s, t) {
  if (t.length === 0 || s.length < t.length) return '';
  const need = new Map();
  for (const ch of t) need.set(ch, (need.get(ch) || 0) + 1);
  let have = 0;
  const required = need.size;
  let left = 0;
  let bestStart = 0;
  let bestLen = Infinity;
  for (let right = 0; right < s.length; right += 1) {
    const char = s[right];
    if (need.has(char)) {
      need.set(char, need.get(char) - 1);
      if (need.get(char) === 0) have += 1;
    }
    while (have === required) {
      if (right - left + 1 < bestLen) {
        bestStart = left;
        bestLen = right - left + 1;
      }
      const leftChar = s[left];
      if (need.has(leftChar)) {
        need.set(leftChar, need.get(leftChar) + 1);
        if (need.get(leftChar) > 0) have -= 1;
      }
      left += 1;
    }
  }
  return bestLen === Infinity ? '' : s.slice(bestStart, bestStart + bestLen);
}

module.exports = { minWindow };

if (require.main === module) {
  const assert = require('node:assert/strict');
  assert.strictEqual(minWindow('ADOBECODEBANC', 'ABC'), 'BANC');
  assert.strictEqual(minWindow('a', 'a'), 'a');
  assert.strictEqual(minWindow('a', 'aa'), '');
  console.log('All tests passed for Minimum Window Substring.');
}
