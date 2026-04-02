/**
 * Title: Lowest Common Ancestor (BST)
 * Difficulty: Medium
 * Companies: Google, Amazon, Meta
 *
 * Problem Summary:
 * Given the root of a binary search tree (BST) and two nodes `p` and `q`, return their lowest common ancestor (LCA).
 *
 * Solution Explanation:
 * In a BST the LCA is the node where the values of `p` and `q` diverge—one is on the left and the other on the right (or equal).
 *
 * Approach Outline:
 * Traverse from the root. If both targets are smaller go left; if both are larger go right; otherwise the current node is the LCA.
 *
 * Complexity:
 *   Time: O(h)
 *   Space: O(1)
 *
 * Tests:
 *   - const root = { val: 6 }; root.left = { val: 2 }; root.right = { val: 8 }; root.left.left = { val: 0 }; root.left.right = { val: 4 }; root.left.right.left = { val: 3 }; root.left.right.right = { val: 5 }; root.right.left = { val: 7 }; root.right.right = { val: 9 }; assert.strictEqual(lowestCommonAncestorBST(root, root.left, root.left.right).val, 2);
 *   - assert.strictEqual(lowestCommonAncestorBST(root, root.left.right.left, root.left.right.right).val, 4);
 */

function lowestCommonAncestorBST(root, p, q) {
  let current = root;
  while (current) {
    if (p.val < current.val && q.val < current.val) {
      current = current.left;
    } else if (p.val > current.val && q.val > current.val) {
      current = current.right;
    } else {
      return current;
    }
  }
  return null;
}

module.exports = { lowestCommonAncestorBST };

if (require.main === module) {
  const assert = require('node:assert/strict');
  const root = { val: 6 }; root.left = { val: 2 }; root.right = { val: 8 }; root.left.left = { val: 0 }; root.left.right = { val: 4 }; root.left.right.left = { val: 3 }; root.left.right.right = { val: 5 }; root.right.left = { val: 7 }; root.right.right = { val: 9 }; assert.strictEqual(lowestCommonAncestorBST(root, root.left, root.left.right).val, 2);
  assert.strictEqual(lowestCommonAncestorBST(root, root.left.right.left, root.left.right.right).val, 4);
  console.log('All tests passed for Lowest Common Ancestor (BST).');
}
