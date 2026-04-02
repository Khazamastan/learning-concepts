/**
 * Title: Maximum Depth of Binary Tree
 * Difficulty: Easy
 * Companies: Amazon, Meta, Google, Microsoft
 *
 * Problem Summary:
 * Given the root of a binary tree, return its maximum depth (the number of nodes along the longest path from the root down to a leaf).
 *
 * Solution Explanation:
 * The depth of a node equals one plus the maximum depth of its children, with null contributing zero.
 *
 * Approach Outline:
 * Use recursion: return 0 for null, otherwise return `1 + Math.max(maxDepth(left), maxDepth(right))`.
 *
 * Complexity:
 *   Time: O(n)
 *   Space: O(h)
 *
 * Tests:
 *   - const tree = { val: 1, left: { val: 2, left: { val: 3, left: null, right: null }, right: null }, right: { val: 4, left: null, right: null } }; assert.strictEqual(maxDepth(tree), 3);
 *   - assert.strictEqual(maxDepth(null), 0);
 */

function maxDepth(root) {
  if (!root) return 0;
  return 1 + Math.max(maxDepth(root.left), maxDepth(root.right));
}

module.exports = { maxDepth };

if (require.main === module) {
  const assert = require('node:assert/strict');
  const tree = { val: 1, left: { val: 2, left: { val: 3, left: null, right: null }, right: null }, right: { val: 4, left: null, right: null } }; assert.strictEqual(maxDepth(tree), 3);
  assert.strictEqual(maxDepth(null), 0);
  console.log('All tests passed for Maximum Depth of Binary Tree.');
}
