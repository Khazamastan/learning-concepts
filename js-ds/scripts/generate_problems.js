const fs = require('node:fs');
const path = require('node:path');

const outDir = path.join(__dirname, '..', 'src', 'solutions');

const problems = [
  {
    title: 'Two Sum',
    slug: 'two-sum',
    difficulty: 'easy',
    companies: ['Google', 'Amazon', 'Meta', 'Microsoft'],
    description: 'Given an array of integers `nums` and a target integer, return the indices of the two numbers that add up to `target`. Exactly one solution exists. You may not use the same element twice.',
    approach: 'Use a single pass hash map that stores value to index. For each number, compute the complement and check if it already exists in the map. If so, return the stored index and the current index. Otherwise, store the current value and index.',
    complexity: { time: 'O(n)', space: 'O(n)' },
    mustKnow: true,
    code: `function twoSum(nums, target) {
  const map = new Map();
  for (let i = 0; i < nums.length; i += 1) {
    const complement = target - nums[i];
    if (map.has(complement)) return [map.get(complement), i];
    map.set(nums[i], i);
  }
  return [];
}`,
    exports: ['twoSum'],
    tests: [
      "assert.deepStrictEqual(twoSum([2, 7, 11, 15], 9), [0, 1]);",
      "assert.deepStrictEqual(twoSum([3, 2, 4], 6), [1, 2]);",
      "assert.deepStrictEqual(twoSum([3, 3], 6), [0, 1]);"
    ],
    notes: ['Map lookup keeps the search O(1) per element.']
  },
  {
    title: "Maximum Subarray (Kadane's)",
    slug: 'maximum-subarray',
    difficulty: 'medium',
    companies: ['Amazon', 'Google', 'Meta', 'Microsoft'],
    description: 'Given an integer array `nums`, find the contiguous subarray with the largest sum and return that sum.',
    approach: 'Maintain both the best subarray ending at the current index and the global maximum. At each step extend the current subarray or restart at the current value, whichever is larger.',
    complexity: { time: 'O(n)', space: 'O(1)' },
    mustKnow: true,
    code: `function maxSubArray(nums) {
  let curr = nums[0];
  let best = nums[0];
  for (let i = 1; i < nums.length; i += 1) {
    curr = Math.max(nums[i], curr + nums[i]);
    best = Math.max(best, curr);
  }
  return best;
}`,
    exports: ['maxSubArray'],
    tests: [
      'assert.strictEqual(maxSubArray([-2,1,-3,4,-1,2,1,-5,4]), 6);',
      'assert.strictEqual(maxSubArray([1]), 1);',
      'assert.strictEqual(maxSubArray([5,4,-1,7,8]), 23);'
    ]
  },
  {
    title: 'Merge Intervals',
    slug: 'merge-intervals',
    difficulty: 'medium',
    companies: ['Google', 'Meta', 'Amazon', 'Atlassian'],
    description: 'Given an array of intervals where `intervals[i] = [start, end]`, merge all overlapping intervals and return the result.',
    approach: 'Sort intervals by start time, then iterate and extend the previous merged interval whenever the current interval overlaps.',
    complexity: { time: 'O(n log n)', space: 'O(n)' },
    code: `function mergeIntervals(intervals) {
  if (intervals.length <= 1) return intervals.slice();
  intervals.sort((a, b) => a[0] - b[0]);
  const merged = [intervals[0].slice()];
  for (let i = 1; i < intervals.length; i += 1) {
    const last = merged[merged.length - 1];
    const [start, end] = intervals[i];
    if (start <= last[1]) {
      last[1] = Math.max(last[1], end);
    } else {
      merged.push([start, end]);
    }
  }
  return merged;
}`,
    exports: ['mergeIntervals'],
    tests: [
      'assert.deepStrictEqual(mergeIntervals([[1,3],[2,6],[8,10],[15,18]]), [[1,6],[8,10],[15,18]]);',
      'assert.deepStrictEqual(mergeIntervals([[1,4],[4,5]]), [[1,5]]);'
    ]
  },
  {
    title: 'Product of Array Except Self',
    slug: 'product-of-array-except-self',
    difficulty: 'medium',
    companies: ['Amazon', 'Meta', 'Google', 'Microsoft'],
    description: 'Given an integer array `nums`, return an array where each element is the product of all elements except itself, without using division.',
    approach: 'Compute prefix products in one pass and suffix products in a second pass, multiplying them together for each index.',
    complexity: { time: 'O(n)', space: 'O(1) extra' },
    code: `function productExceptSelf(nums) {
  const n = nums.length;
  const result = new Array(n).fill(1);
  let prefix = 1;
  for (let i = 0; i < n; i += 1) {
    result[i] = prefix;
    prefix *= nums[i];
  }
  let suffix = 1;
  for (let i = n - 1; i >= 0; i -= 1) {
    result[i] *= suffix;
    suffix *= nums[i];
  }
  return result;
}`,
    exports: ['productExceptSelf'],
    tests: [
      'assert.deepStrictEqual(productExceptSelf([1,2,3,4]), [24,12,8,6]);',
      'assert.deepStrictEqual(productExceptSelf([-1,1,0,-3,3]), [0,0,9,0,0]);'
    ]
  },
  {
    title: '3Sum',
    slug: 'three-sum',
    difficulty: 'medium',
    companies: ['Google', 'Meta', 'Amazon', 'Microsoft'],
    description: 'Given an array of integers, return all unique triplets that sum to zero.',
    approach: 'Sort the array, then for each index use a two-pointer sweep to find complements while skipping duplicates.',
    complexity: { time: 'O(n^2)', space: 'O(1)' },
    code: `function threeSum(nums) {
  nums.sort((a, b) => a - b);
  const triplets = [];
  for (let i = 0; i < nums.length - 2; i += 1) {
    if (i > 0 && nums[i] === nums[i - 1]) continue;
    let left = i + 1;
    let right = nums.length - 1;
    while (left < right) {
      const sum = nums[i] + nums[left] + nums[right];
      if (sum === 0) {
        triplets.push([nums[i], nums[left], nums[right]]);
        while (left < right && nums[left] === nums[left + 1]) left += 1;
        while (left < right && nums[right] === nums[right - 1]) right -= 1;
        left += 1;
        right -= 1;
      } else if (sum < 0) {
        left += 1;
      } else {
        right -= 1;
      }
    }
  }
  return triplets;
}`,
    exports: ['threeSum'],
    tests: [
      'assert.deepStrictEqual(threeSum([-1,0,1,2,-1,-4]).sort(), [[-1,-1,2],[-1,0,1]].sort());',
      'assert.deepStrictEqual(threeSum([]), []);',
      'assert.deepStrictEqual(threeSum([0,0,0,0]), [[0,0,0]]);'
    ]
  },
  {
    title: 'Binary Tree Level Order Traversal',
    slug: 'binary-tree-level-order-traversal',
    difficulty: 'medium',
    companies: ['Google', 'Amazon', 'Meta', 'Flipkart'],
    description: 'Given the root of a binary tree, return the level-order (breadth-first) traversal with nodes grouped by depth.',
    approach: 'Perform a breadth-first traversal using a queue. Track the number of nodes per level before processing them to build that level\'s array.',
    complexity: { time: 'O(n)', space: 'O(n)' },
    mustKnow: true,
    code: `function levelOrder(root) {
  if (!root) return [];
  const result = [];
  const queue = [root];
  let front = 0;
  while (front < queue.length) {
    const levelSize = queue.length - front;
    const level = [];
    for (let i = 0; i < levelSize; i += 1) {
      const node = queue[front];
      front += 1;
      level.push(node.val);
      if (node.left) queue.push(node.left);
      if (node.right) queue.push(node.right);
    }
    result.push(level);
  }
  return result;
}`,
    exports: ['levelOrder'],
    tests: [
      'const root = { val: 3, left: { val: 9, left: null, right: null }, right: { val: 20, left: { val: 15, left: null, right: null }, right: { val: 7, left: null, right: null } } }; assert.deepStrictEqual(levelOrder(root), [[3],[9,20],[15,7]]);',
      'assert.deepStrictEqual(levelOrder(null), []);'
    ]
  },
  {
    title: 'Maximum Depth of Binary Tree',
    slug: 'maximum-depth-of-binary-tree',
    difficulty: 'easy',
    companies: ['Amazon', 'Meta', 'Google', 'Microsoft'],
    description: 'Given the root of a binary tree, return its maximum depth, defined as the number of nodes along the longest path from the root to a leaf.',
    approach: 'Use recursion: the depth of a node is one plus the maximum depth of its children, and a null node contributes zero.',
    complexity: { time: 'O(n)', space: 'O(h)' },
    code: `function maxDepth(root) {
  if (!root) return 0;
  return 1 + Math.max(maxDepth(root.left), maxDepth(root.right));
}`,
    exports: ['maxDepth'],
    tests: [
      'const tree = { val: 1, left: { val: 2, left: { val: 3, left: null, right: null }, right: null }, right: { val: 4, left: null, right: null } }; assert.strictEqual(maxDepth(tree), 3);',
      'assert.strictEqual(maxDepth(null), 0);'
    ]
  },
  {
    title: 'Number of Islands',
    slug: 'number-of-islands',
    difficulty: 'medium',
    companies: ['Amazon', 'Google', 'Meta', 'Uber'],
    description: "Given an m x n grid of '1's (land) and '0's (water), count the number of islands. Islands are connected horizontally or vertically.",
    approach: 'Iterate through the grid. When a land cell is found, run DFS to mark all reachable land as visited and increment the island count.',
    complexity: { time: 'O(m*n)', space: 'O(m*n)' },
    mustKnow: true,
    code: `function numIslands(grid) {
  const rows = grid.length;
  if (rows === 0) return 0;
  const cols = grid[0].length;
  let count = 0;
  const dfs = (r, c) => {
    if (r < 0 || r >= rows || c < 0 || c >= cols || grid[r][c] !== '1') return;
    grid[r][c] = '0';
    dfs(r + 1, c);
    dfs(r - 1, c);
    dfs(r, c + 1);
    dfs(r, c - 1);
  };
  for (let r = 0; r < rows; r += 1) {
    for (let c = 0; c < cols; c += 1) {
      if (grid[r][c] === '1') {
        count += 1;
        dfs(r, c);
      }
    }
  }
  return count;
}`,
    exports: ['numIslands'],
    tests: [
      "const grid1 = [['1','1','0','0','0'],['1','1','0','0','0'],['0','0','1','0','0'],['0','0','0','1','1']]; assert.strictEqual(numIslands(grid1.map(row => row.slice())), 3);",
      "const grid2 = [['0']]; assert.strictEqual(numIslands(grid2.map(row => row.slice())), 0);"
    ]
  },
  {
    title: 'Lowest Common Ancestor (BST)',
    slug: 'lowest-common-ancestor-bst',
    difficulty: 'medium',
    companies: ['Google', 'Amazon', 'Meta'],
    description: 'Given the root of a binary search tree and two nodes p and q, return their lowest common ancestor (the lowest node that has both in its subtree).',
    approach: 'Walk down the BST: if both nodes are smaller than the current root go left, if both are larger go right, otherwise the current node is the split point and hence the LCA.',
    complexity: { time: 'O(h)', space: 'O(1)' },
    code: `function lowestCommonAncestorBST(root, p, q) {
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
}`,
    exports: ['lowestCommonAncestorBST'],
    tests: [
      'const root = { val: 6, left: null, right: null }; root.left = { val: 2, left: null, right: null }; root.right = { val: 8, left: null, right: null }; root.left.left = { val: 0, left: null, right: null }; root.left.right = { val: 4, left: null, right: null }; root.left.right.left = { val: 3, left: null, right: null }; root.left.right.right = { val: 5, left: null, right: null }; root.right.left = { val: 7, left: null, right: null }; root.right.right = { val: 9, left: null, right: null }; assert.strictEqual(lowestCommonAncestorBST(root, root.left, root.left.right).val, 2);',
      'assert.strictEqual(lowestCommonAncestorBST(root, root.left.right.left, root.left.right.right).val, 4);'
    ]
  },
  {
    title: 'Flatten Nested Array (DFS)',
    slug: 'flatten-nested-array-dfs',
    difficulty: 'easy',
    companies: ['Flipkart', 'Google', 'Meta'],
    description: 'Deeply flatten a nested array of any depth without using Array.flat().',
    approach: 'Use depth-first recursion: iterate through the array, recursing into nested arrays and pushing primitives into an accumulator. Optionally expose a generator for lazy flattening.',
    complexity: { time: 'O(n)', space: 'O(d)' },
    code: `function flattenDFS(arr) {
  const result = [];
  const traverse = (input) => {
    for (const item of input) {
      if (Array.isArray(item)) traverse(item);
      else result.push(item);
    }
  };
  traverse(arr);
  return result;
}

function* flatGenerator(arr) {
  for (const item of arr) {
    if (Array.isArray(item)) yield* flatGenerator(item);
    else yield item;
  }
}`,
    exports: ['flattenDFS', 'flatGenerator'],
    tests: [
      'assert.deepStrictEqual(flattenDFS([1, [2, [3, [4]]]]), [1,2,3,4]);',
      'assert.deepStrictEqual([...flatGenerator([1, [2, [3]]])], [1,2,3]);'
    ]
  }
];

function buildDoc(problem) {
  const lines = [
    '/**',
    ` * Title: ${problem.title}`,
    ` * Difficulty: ${problem.difficulty}`,
    ` * Companies: ${problem.companies.join(', ')}`,
    ' *',
    ' * Problem:',
    ` * ${problem.description}`,
    ' *',
    ' * Approach:',
    ` * ${problem.approach}`,
    ' *',
    ' * Complexity:',
    ` *   Time: ${problem.complexity.time}`,
    ` *   Space: ${problem.complexity.space}`,
  ];
  if (problem.notes && problem.notes.length > 0) {
    lines.push(' *');
    for (const note of problem.notes) {
      lines.push(` * Note: ${note}`);
    }
  }
  lines.push(' */');
  return lines.join('\n');
}

for (const problem of problems) {
  const targetPath = path.join(outDir, `${problem.slug}.js`);
  const doc = buildDoc(problem);
  const body = problem.code;
  const exportNames = problem.exports || [];
  const exportLine = exportNames.length > 0
    ? `\nmodule.exports = { ${exportNames.join(', ')} };`
    : '';
  const testLines = problem.tests?.length
    ? `\n\nif (typeof module !== 'undefined' && !module.parent) {\n  const assert = require('node:assert/strict');\n  ${problem.tests.join('\n  ')}\n  console.log('All tests passed for ${problem.title}.');\n}`
    : '';
  const content = `${doc}\n\n${body}${exportLine}${testLines}\n`;
  fs.writeFileSync(targetPath, content, 'utf8');
  console.log(`Wrote ${targetPath}`);
}
