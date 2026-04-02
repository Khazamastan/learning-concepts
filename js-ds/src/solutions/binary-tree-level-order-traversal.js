/**
 * Title: Binary Tree Level Order Traversal
 * Difficulty: Medium
 * Companies: Google, Amazon, Meta, Flipkart
 *
 * Problem Summary:
 * Given the root of a binary tree, return the level-order traversal of its node values with each level grouped in a separate array.
 *
 * Solution Explanation:
 * Breadth-first search processes nodes level by level using a queue.
 *
 * Approach Outline:
 * Use a queue and iterate while it is non-empty. Snapshot the queue length to know how many nodes belong to the current level, process them, and enqueue their children.
 *
 * Complexity:
 *   Time: O(n)
 *   Space: O(n)
 *
 * Tests:
 *   - const tree = { val: 3, left: { val: 9, left: null, right: null }, right: { val: 20, left: { val: 15, left: null, right: null }, right: { val: 7, left: null, right: null } } }; assert.deepStrictEqual(levelOrder(tree), [[3],[9,20],[15,7]]);
 *   - assert.deepStrictEqual(levelOrder(null), []);
 */

function levelOrder(root) {
  if (!root) return [];
  const result = [];
  const queue = [root];
  while (queue.length) {
    const levelSize = queue.length;
    const level = [];
    for (let i = 0; i < levelSize; i += 1) {
      const node = queue.shift();
      level.push(node.val);
      if (node.left) queue.push(node.left);
      if (node.right) queue.push(node.right);
    }
    result.push(level);
  }
  return result;
}

module.exports = { levelOrder };

if (require.main === module) {
  const assert = require('node:assert/strict');
  const tree = { val: 3, left: { val: 9, left: null, right: null }, right: { val: 20, left: { val: 15, left: null, right: null }, right: { val: 7, left: null, right: null } } }; assert.deepStrictEqual(levelOrder(tree), [[3],[9,20],[15,7]]);
  assert.deepStrictEqual(levelOrder(null), []);
  console.log('All tests passed for Binary Tree Level Order Traversal.');
}
