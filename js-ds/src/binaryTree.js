// Binary Tree solutions with a TreeNode helper and detailed explanations.

/**
 * Basic binary tree node used across problems.
 */
export class TreeNode {
  constructor(val = 0, left = null, right = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

/**
 * Special node structure used by Populating Next Right Pointers (includes next pointer).
 */
export class NextNode {
  constructor(val = 0, left = null, right = null, next = null) {
    this.val = val;
    this.left = left;
    this.right = right;
    this.next = next;
  }
}

/**
 * Problem: Binary Tree Preorder Traversal
 * Return preorder traversal values.
 * Solution: Iterative stack to visit root-left-right (O(n) time, O(h) space).
 */
export function preorderTraversal(root) {
  const result = [];
  if (!root) return result;
  const stack = [root];
  while (stack.length) {
    const node = stack.pop();
    result.push(node.val);
    if (node.right) stack.push(node.right);
    if (node.left) stack.push(node.left);
  }
  return result;
}

/**
 * Problem: Binary Tree Inorder Traversal
 * Return inorder values.
 * Solution: Controlled stack to visit left-root-right (O(n) time).
 */
export function inorderTraversal(root) {
  const result = [];
  const stack = [];
  let current = root;
  while (current || stack.length) {
    while (current) {
      stack.push(current);
      current = current.left;
    }
    current = stack.pop();
    result.push(current.val);
    current = current.right;
  }
  return result;
}

/**
 * Problem: Binary Tree Postorder Traversal
 * Return postorder values.
 * Solution: Reverse preorder (root-right-left) then reverse results (O(n) time).
 */
export function postorderTraversal(root) {
  const result = [];
  if (!root) return result;
  const stack = [root];
  while (stack.length) {
    const node = stack.pop();
    result.push(node.val);
    if (node.left) stack.push(node.left);
    if (node.right) stack.push(node.right);
  }
  return result.reverse();
}

/**
 * Problem: Binary Tree Level Order Traversal
 * Return level-by-level values.
 * Solution: BFS queue storing nodes per level (O(n) time).
 */
export function levelOrder(root) {
  const result = [];
  if (!root) return result;
  const queue = [root];
  let head = 0;
  while (head < queue.length) {
    const levelSize = queue.length - head;
    const level = [];
    for (let i = 0; i < levelSize; i += 1) {
      const node = queue[head];
      head += 1;
      level.push(node.val);
      if (node.left) queue.push(node.left);
      if (node.right) queue.push(node.right);
    }
    result.push(level);
  }
  return result;
}

/**
 * Problem: Maximum Depth of Binary Tree
 * Return maximum depth.
 * Solution: DFS computing 1 + max(depth of children) (O(n) time).
 */
export function maxDepth(root) {
  if (!root) return 0;
  return 1 + Math.max(maxDepth(root.left), maxDepth(root.right));
}

/**
 * Problem: Path Sum
 * Determine if root-to-leaf path equals target sum.
 * Solution: DFS subtracting node value; check when at leaf (O(n) time).
 */
export function hasPathSum(root, targetSum) {
  if (!root) return false;
  if (!root.left && !root.right) return root.val === targetSum;
  return hasPathSum(root.left, targetSum - root.val) || hasPathSum(root.right, targetSum - root.val);
}

/**
 * Problem: Symmetric Tree
 * Check if tree is mirror symmetric around center.
 * Solution: Recursive mirror comparison on pairs (O(n) time).
 */
export function isSymmetric(root) {
  const isMirror = (a, b) => {
    if (!a && !b) return true;
    if (!a || !b) return false;
    return a.val === b.val && isMirror(a.left, b.right) && isMirror(a.right, b.left);
  };
  return isMirror(root?.left ?? null, root?.right ?? null);
}

/**
 * Problem: Invert Binary Tree
 * Swap left and right children recursively.
 * Solution: DFS swap each node's children (O(n) time).
 */
export function invertTree(root) {
  if (!root) return root;
  [root.left, root.right] = [root.right, root.left];
  invertTree(root.left);
  invertTree(root.right);
  return root;
}

/**
 * Problem: Same Tree
 * Determine whether two trees are identical.
 * Solution: Recursive comparison of structure and values (O(n) time).
 */
export function isSameTree(p, q) {
  if (!p && !q) return true;
  if (!p || !q) return false;
  return p.val === q.val && isSameTree(p.left, q.left) && isSameTree(p.right, q.right);
}

/**
 * Problem: Balanced Binary Tree
 * Check if tree height difference <= 1 for every node.
 * Solution: Bottom-up DFS returning height or -1 if unbalanced (O(n) time).
 */
export function isBalanced(root) {
  const dfs = (node) => {
    if (!node) return 0;
    const left = dfs(node.left);
    if (left === -1) return -1;
    const right = dfs(node.right);
    if (right === -1) return -1;
    if (Math.abs(left - right) > 1) return -1;
    return 1 + Math.max(left, right);
  };
  return dfs(root) !== -1;
}

/**
 * Problem: Diameter of Binary Tree
 * Compute longest path between any two nodes.
 * Solution: DFS computing depth while updating global maximum (O(n) time).
 */
export function diameterOfBinaryTree(root) {
  let diameter = 0;
  const depth = (node) => {
    if (!node) return 0;
    const left = depth(node.left);
    const right = depth(node.right);
    diameter = Math.max(diameter, left + right);
    return 1 + Math.max(left, right);
  };
  depth(root);
  return diameter;
}

/**
 * Problem: Binary Tree Zigzag Level Order Traversal
 * Return level order but alternate direction each level.
 * Solution: BFS, reversing every other level or pushing in order (O(n) time).
 */
export function zigzagLevelOrder(root) {
  const result = [];
  if (!root) return result;
  const queue = [root];
  let head = 0;
  let leftToRight = true;
  while (head < queue.length) {
    const levelSize = queue.length - head;
    const level = new Array(levelSize);
    for (let i = 0; i < levelSize; i += 1) {
      const node = queue[head];
      head += 1;
      const index = leftToRight ? i : levelSize - 1 - i;
      level[index] = node.val;
      if (node.left) queue.push(node.left);
      if (node.right) queue.push(node.right);
    }
    leftToRight = !leftToRight;
    result.push(level);
  }
  return result;
}

/**
 * Problem: Subtree of Another Tree
 * Check if root contains subtree identical to subRoot.
 * Solution: Traverse root and compare subtree equality (O(n * m) worst, optimized by early exit).
 */
export function isSubtree(root, subRoot) {
  if (!root) return !subRoot;
  const same = (a, b) => {
    if (!a && !b) return true;
    if (!a || !b) return false;
    return a.val === b.val && same(a.left, b.left) && same(a.right, b.right);
  };
  if (same(root, subRoot)) return true;
  return isSubtree(root.left, subRoot) || isSubtree(root.right, subRoot);
}

/**
 * Problem: Lowest Common Ancestor of a Binary Tree
 * Return node that is lowest ancestor of p and q.
 * Solution: DFS returning node when one found in each subtree (O(n) time).
 */
export function lowestCommonAncestor(root, p, q) {
  if (!root || root === p || root === q) return root;
  const left = lowestCommonAncestor(root.left, p, q);
  const right = lowestCommonAncestor(root.right, p, q);
  if (left && right) return root;
  return left ?? right;
}

/**
 * Problem: Binary Tree Right Side View
 * Return values visible from right side.
 * Solution: BFS capturing last node per level (O(n) time).
 */
export function rightSideView(root) {
  const result = [];
  if (!root) return result;
  const queue = [root];
  let head = 0;
  while (head < queue.length) {
    const levelSize = queue.length - head;
    let last = null;
    for (let i = 0; i < levelSize; i += 1) {
      const node = queue[head];
      head += 1;
      last = node.val;
      if (node.left) queue.push(node.left);
      if (node.right) queue.push(node.right);
    }
    result.push(last);
  }
  return result;
}

/**
 * Problem: Count Good Nodes in Binary Tree
 * Count nodes where value >= max along path from root.
 * Solution: DFS carrying path max; count when node meets condition (O(n) time).
 */
export function goodNodes(root) {
  const dfs = (node, maxSoFar) => {
    if (!node) return 0;
    const newMax = Math.max(maxSoFar, node.val);
    const count = node.val >= maxSoFar ? 1 : 0;
    return count + dfs(node.left, newMax) + dfs(node.right, newMax);
  };
  return dfs(root, -Infinity);
}

/**
 * Problem: Populating Next Right Pointers in Each Node
 * Connect next pointers for perfect binary tree.
 * Solution: Use existing next pointers to connect children level-by-level (O(n) time, O(1) extra space).
 */
export function connect(root) {
  if (!root) return root;
  let leftmost = root;
  while (leftmost.left) {
    let head = leftmost;
    while (head) {
      head.left.next = head.right;
      if (head.next) head.right.next = head.next.left;
      head = head.next;
    }
    leftmost = leftmost.left;
  }
  return root;
}

/**
 * Problem: Binary Tree Maximum Path Sum
 * Return maximum path sum (path can start/end anywhere).
 * Solution: DFS computing best gain from each node and updating global maximum (O(n) time).
 */
export function maxPathSum(root) {
  let best = -Infinity;
  const gain = (node) => {
    if (!node) return 0;
    const left = Math.max(0, gain(node.left));
    const right = Math.max(0, gain(node.right));
    best = Math.max(best, node.val + left + right);
    return node.val + Math.max(left, right);
  };
  gain(root);
  return best;
}
