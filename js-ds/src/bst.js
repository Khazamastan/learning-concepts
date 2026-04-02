// Binary Search Tree solutions leveraging BST properties.

import { TreeNode } from './binaryTree.js';

/**
 * Problem: Validate Binary Search Tree
 * Determine if tree satisfies BST invariant.
 * Solution: DFS with min/max bounds (O(n) time).
 */
export function isValidBST(root) {
  const validate = (node, low, high) => {
    if (!node) return true;
    if ((low !== null && node.val <= low) || (high !== null && node.val >= high)) return false;
    return validate(node.left, low, node.val) && validate(node.right, node.val, high);
  };
  return validate(root, null, null);
}

/**
 * Problem: Search in a BST
 * Find node with given value.
 * Solution: Traverse left/right based on comparison (O(h) time).
 */
export function searchBST(root, val) {
  let current = root;
  while (current) {
    if (current.val === val) return current;
    current = val < current.val ? current.left : current.right;
  }
  return null;
}

/**
 * Problem: Insert into a BST
 * Insert value and return root.
 * Solution: Iterative traversal to find insertion point (O(h) time).
 */
export function insertIntoBST(root, val) {
  if (!root) return new TreeNode(val);
  let current = root;
  while (true) {
    if (val < current.val) {
      if (!current.left) {
        current.left = new TreeNode(val);
        break;
      }
      current = current.left;
    } else {
      if (!current.right) {
        current.right = new TreeNode(val);
        break;
      }
      current = current.right;
    }
  }
  return root;
}

/**
 * Problem: Kth Smallest Element in a BST
 * Return kth smallest (1-indexed).
 * Solution: Inorder traversal counting nodes (O(h + k) time).
 */
export function kthSmallest(root, k) {
  const stack = [];
  let current = root;
  let count = 0;
  while (current || stack.length) {
    while (current) {
      stack.push(current);
      current = current.left;
    }
    current = stack.pop();
    count += 1;
    if (count === k) return current.val;
    current = current.right;
  }
  throw new Error('k is larger than the number of nodes');
}

/**
 * Problem: Lowest Common Ancestor of a BST
 * Exploit BST ordering to find LCA.
 * Solution: Walk down until split between p and q (O(h) time).
 */
export function lowestCommonAncestorBST(root, p, q) {
  let current = root;
  const pVal = p.val;
  const qVal = q.val;
  while (current) {
    if (pVal < current.val && qVal < current.val) current = current.left;
    else if (pVal > current.val && qVal > current.val) current = current.right;
    else return current;
  }
  return null;
}
