/**
 * Title: Group Anagrams
 * Difficulty: Medium
 * Companies: Amazon, Google, Meta, Atlassian
 *
 * Problem Summary:
 * Given an array of strings, group the anagrams together.
 *
 * Solution Explanation:
 * Sorting the characters of each string yields a canonical representation that all its anagrams share.
 *
 * Approach Outline:
 * Iterate through the strings, sorting each to form a key and appending the original string to a map keyed by that sorted string. Return the map values.
 *
 * Complexity:
 *   Time: O(n·k log k)
 *   Space: O(n·k)
 *
 * Tests:
 *   - const sorted = groupAnagrams(['eat','tea','tan','ate','nat','bat']).map((group) => group.slice().sort()).sort(); const expected = [['ate','eat','tea'],['bat'],['nat','tan']].map((group) => group.slice().sort()).sort(); assert.deepStrictEqual(sorted, expected);
 *   - assert.deepStrictEqual(groupAnagrams(['']), [['']]);
 */

function groupAnagrams(strs) {
  const map = new Map();
  for (const word of strs) {
    const key = word.split('').sort().join('');
    if (!map.has(key)) map.set(key, []);
    map.get(key).push(word);
  }
  return [...map.values()];
}

module.exports = { groupAnagrams };

if (require.main === module) {
  const assert = require('node:assert/strict');
  const sorted = groupAnagrams(['eat','tea','tan','ate','nat','bat']).map((group) => group.slice().sort()).sort(); const expected = [['ate','eat','tea'],['bat'],['nat','tan']].map((group) => group.slice().sort()).sort(); assert.deepStrictEqual(sorted, expected);
  assert.deepStrictEqual(groupAnagrams(['']), [['']]);
  console.log('All tests passed for Group Anagrams.');
}
