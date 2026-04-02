/**
 * Title: Longest Substring Without Repeating
 * Difficulty: Medium
 * Companies: Amazon, Google, Meta, Microsoft
 *
 * Problem Summary:
 * Given a string `s`, return the length of the longest substring without repeating characters.
 *
 * Solution Explanation:
 * A sliding window grows with the right pointer and shrinks from the left when a duplicate character is encountered.
 *
 * Approach Outline:
 * Use a `Set` to store characters in the current window. When a duplicate appears, remove characters from the left until it is gone, tracking the maximum length.
 *
 * Complexity:
 *   Time: O(n)
 *   Space: O(min(n, alphabet size))
 *
 * Tests:
 *   - assert.strictEqual(lengthOfLongestSubstring('abcabcbb'), 3);
 *   - assert.strictEqual(lengthOfLongestSubstring('bbbbb'), 1);
 *   - assert.strictEqual(lengthOfLongestSubstring('pwwkew'), 3);
 */

function lengthOfLongestSubstring(s) {
  const seen = new Set();
  let left = 0;
  let best = 0;
  for (let right = 0; right < s.length; right += 1) {
    while (seen.has(s[right])) {
      seen.delete(s[left]);
      left += 1;
    }
    seen.add(s[right]);
    best = Math.max(best, right - left + 1);
  }
  return best;
}

module.exports = { lengthOfLongestSubstring };

if (require.main === module) {
  const assert = require('node:assert/strict');
  assert.strictEqual(lengthOfLongestSubstring('abcabcbb'), 3);
  assert.strictEqual(lengthOfLongestSubstring('bbbbb'), 1);
  assert.strictEqual(lengthOfLongestSubstring('pwwkew'), 3);
  console.log('All tests passed for Longest Substring Without Repeating.');
}
