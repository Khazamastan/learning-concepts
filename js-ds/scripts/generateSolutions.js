const { mkdirSync, writeFileSync, existsSync } = require('fs');
const { resolve } = require('path');

const problems = [
  {
    slug: 'two-sum',
    title: 'Two Sum',
    difficulty: 'Easy',
    companies: ['Google', 'Amazon', 'Meta', 'Microsoft'],
    description: `Given an array of integers nums and a target integer, return the indices of the two numbers that add up to target. Exactly one solution exists. You may not use the same element twice.`,
    approach: `Scan the array once while storing each value's index in a hash map; for the current value, check if the complementary value has already been seen.`,
    complexity: { time: 'O(n)', space: 'O(n)' },
    mustKnow: true,
    detailed: `We iterate through nums only once. For each value we compute the complement target − value. If the complement has been seen previously we immediately return the two indices. Otherwise we store the current value and index in the map so later elements can match with it. Every lookup and insertion is constant time on average, so the whole process is linear.`,
    code: `function twoSum(nums, target) {
  const indexByValue = new Map();
  for (let i = 0; i < nums.length; i += 1) {
    const complement = target - nums[i];
    if (indexByValue.has(complement)) {
      return [indexByValue.get(complement), i];
    }
    indexByValue.set(nums[i], i);
  }
  return [];
}`,
    tests: `console.assert(JSON.stringify(twoSum([2, 7, 11, 15], 9)) === JSON.stringify([0, 1]), 'basic example');
console.assert(JSON.stringify(twoSum([3, 2, 4], 6)) === JSON.stringify([1, 2]), 'handles multiple numbers');
console.assert(JSON.stringify(twoSum([3, 3], 6)) === JSON.stringify([0, 1]), 'allows duplicate values');`
  },
  {
    slug: 'maximum-subarray-kadanes',
    title: "Maximum Subarray (Kadane's)",
    difficulty: 'Medium',
    companies: ['Amazon', 'Google', 'Meta', 'Microsoft'],
    description: `Given an integer array nums, find the contiguous subarray with the largest sum and return that sum.`,
    approach: `Use Kadane's algorithm: at each step decide whether to extend the current subarray or start a new one at the current element, while tracking the global maximum.`,
    complexity: { time: 'O(n)', space: 'O(1)' },
    mustKnow: true,
    detailed: `Kadane's algorithm keeps two running sums. currentSum is the best subarray ending at the current index; best stores the best subarray seen overall. At each element we choose between extending the previous subarray (currentSum + value) or starting fresh at the current value. We update best if currentSum improves it. Because we only store two numbers, the solution is linear time and constant space.`,
    code: `function maxSubArray(nums) {
  let currentSum = nums[0];
  let best = nums[0];
  for (let i = 1; i < nums.length; i += 1) {
    currentSum = Math.max(nums[i], currentSum + nums[i]);
    best = Math.max(best, currentSum);
  }
  return best;
}`,
    tests: `console.assert(maxSubArray([-2, 1, -3, 4, -1, 2, 1, -5, 4]) === 6, 'classic example');
console.assert(maxSubArray([1]) === 1, 'single element');
console.assert(maxSubArray([5, -1, 5]) === 9, 'choose to extend');`
  },
  {
    slug: 'merge-intervals',
    title: 'Merge Intervals',
    difficulty: 'Medium',
    companies: ['Google', 'Meta', 'Amazon', 'Atlassian'],
    description: 'Given an array of intervals, merge all overlapping intervals and return the list sorted by start time.',
    approach: 'Sort intervals by start time, then iterate once to merge overlaps by extending the previous interval when necessary.',
    complexity: { time: 'O(n log n)', space: 'O(n)' },
    detailed: `Sorting ensures that any overlapping intervals appear consecutively. We keep a result array seeded with the first interval. For each subsequent interval we compare its start with the end of the last merged interval. If they overlap we extend the end; otherwise we append the new interval. This single pass after sorting merges all overlaps.`,
    code: `function merge(intervals) {
  if (!intervals.length) return [];
  intervals.sort((a, b) => a[0] - b[0]);
  const merged = [intervals[0].slice()];
  for (let i = 1; i < intervals.length; i += 1) {
    const [start, end] = intervals[i];
    const last = merged[merged.length - 1];
    if (start <= last[1]) {
      last[1] = Math.max(last[1], end);
    } else {
      merged.push([start, end]);
    }
  }
  return merged;
}`,
    tests: `console.assert(JSON.stringify(merge([[1,3], [2,6], [8,10], [15,18]])) === JSON.stringify([[1,6],[8,10],[15,18]]), 'merge overlapping intervals');
console.assert(JSON.stringify(merge([[1,4],[4,5]])) === JSON.stringify([[1,5]]), 'touching intervals merge');
console.assert(JSON.stringify(merge([[1,4],[2,3],[5,7]])) === JSON.stringify([[1,4],[5,7]]), 'nested interval');`
  },
  {
    slug: 'product-of-array-except-self',
    title: 'Product of Array Except Self',
    difficulty: 'Medium',
    companies: ['Amazon', 'Meta', 'Google', 'Microsoft'],
    description: 'Given an integer array nums, return an array answer where answer[i] is the product of all elements except nums[i]. Division is not allowed.',
    approach: 'Compute prefix products in a left-to-right pass and multiply them by suffix products gathered in a right-to-left pass so every index sees all other numbers.',
    complexity: { time: 'O(n)', space: 'O(1) extra' },
    detailed: `We first build prefix products so result[i] equals the product of elements before i. Traversing from the right we maintain a suffix product and multiply it into result[i], yielding the product of all elements except nums[i]. Only the result array and a scalar suffix variable are used, so extra space stays constant.`,
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
    tests: `console.assert(JSON.stringify(productExceptSelf([1,2,3,4])) === JSON.stringify([24,12,8,6]), 'simple case');
console.assert(JSON.stringify(productExceptSelf([-1,1,0,-3,3])) === JSON.stringify([0,0,9,0,0]), 'handles zeros');`
  },
  {
    slug: 'three-sum',
    title: '3Sum',
    difficulty: 'Medium',
    companies: ['Google', 'Meta', 'Amazon', 'Microsoft'],
    description: 'Given an integer array nums, return all unique triplets [a, b, c] such that a + b + c == 0.',
    approach: 'Sort the array, then fix one element and use a two-pointer scan for the remaining two while skipping duplicates.',
    complexity: { time: 'O(n^2)', space: 'O(1) extra' },
    detailed: `Sorting lets us use the two-pointer technique efficiently. For each anchor index i, we skip duplicates of nums[i] and then run two pointers. If the sum is too low we move the left pointer right; if too high we move the right pointer left. When we find zero we record the triplet and skip over duplicates on both pointers to avoid repeats.`,
    code: `function threeSum(nums) {
  nums.sort((a, b) => a - b);
  const result = [];
  for (let i = 0; i < nums.length - 2; i += 1) {
    if (i > 0 && nums[i] === nums[i - 1]) continue;
    let left = i + 1;
    let right = nums.length - 1;
    while (left < right) {
      const sum = nums[i] + nums[left] + nums[right];
      if (sum === 0) {
        result.push([nums[i], nums[left], nums[right]]);
        left += 1;
        while (left < right && nums[left] === nums[left - 1]) left += 1;
        right -= 1;
        while (left < right && nums[right] === nums[right + 1]) right -= 1;
      } else if (sum < 0) {
        left += 1;
      } else {
        right -= 1;
      }
    }
  }
  return result;
}`,
    tests: `console.assert(JSON.stringify(threeSum([-1,0,1,2,-1,-4])) === JSON.stringify([[-1,-1,2],[-1,0,1]]), 'example case');
console.assert(JSON.stringify(threeSum([0,0,0])) === JSON.stringify([[0,0,0]]), 'all zeros');`
  },
  {
    slug: 'binary-tree-level-order-traversal',
    title: 'Binary Tree Level Order Traversal',
    difficulty: 'Medium',
    companies: ['Google', 'Amazon', 'Meta', 'Flipkart'],
    description: 'Given the root of a binary tree, return the level-order traversal of node values with each level captured in its own array.',
    approach: 'Use breadth-first search with a queue, processing nodes level by level by tracking the queue length at each iteration.',
    complexity: { time: 'O(n)', space: 'O(n)' },
    mustKnow: true,
    detailed: `A queue lets us visit nodes in the order they appear by depth. We push the root, then repeatedly capture the current queue size to know how many nodes belong to the present level. Removing nodes one by one, we append their values to the level array and enqueue their children. After finishing the level we push it to the result. Because each node is enqueued and dequeued exactly once, the traversal stays linear and the queue holds at most one level at a time, which is O(n) in the worst case for skewed trees.`,
    code: `function levelOrder(root) {
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
}`,
    tests: `const treeA = { val: 3, left: { val: 9, left: null, right: null }, right: { val: 20, left: { val: 15, left: null, right: null }, right: { val: 7, left: null, right: null } } };
console.assert(JSON.stringify(levelOrder(treeA)) === JSON.stringify([[3],[9,20],[15,7]]), 'multi level traversal');
console.assert(JSON.stringify(levelOrder(null)) === JSON.stringify([]), 'empty tree returns empty array');`
  },
  {
    slug: 'maximum-depth-of-binary-tree',
    title: 'Maximum Depth of Binary Tree',
    difficulty: 'Easy',
    companies: ['Amazon', 'Meta', 'Google', 'Microsoft'],
    description: 'Return the maximum depth of a binary tree, defined as the number of nodes along the longest root-to-leaf path.',
    approach: 'Use recursion to compute the max depth of each subtree: depth(node) = 1 + max(depth(left), depth(right)).',
    complexity: { time: 'O(n)', space: 'O(h)' },
    detailed: `Depth-first recursion naturally mirrors the definition of tree depth. The base case for a null node is zero because no nodes are present beneath it. For non-null nodes we recursively compute the left and right depths and add one for the current node. The recursion stack height is bounded by the tree height h, so auxiliary space is O(h) and the time complexity is linear.`,
    code: `function maxDepth(root) {
  if (!root) return 0;
  return 1 + Math.max(maxDepth(root.left), maxDepth(root.right));
}`,
    tests: `console.assert(maxDepth(null) === 0, 'empty tree has depth zero');
const treeB = { val: 1, left: { val: 2, left: { val: 3, left: null, right: null }, right: null }, right: null };
console.assert(maxDepth(treeB) === 3, 'skewed tree depth matches node count');`
  },
  {
    slug: 'number-of-islands',
    title: 'Number of Islands',
    difficulty: 'Medium',
    companies: ['Amazon', 'Google', 'Meta', 'Uber'],
    description: 'Given a 2D grid of 1s (land) and 0s (water), count how many islands exist where islands are connected horizontally or vertically.',
    approach: 'Iterate through the grid; when land is found, run depth-first search to mark the entire island and increment the counter.',
    complexity: { time: 'O(m*n)', space: 'O(m*n)' },
    mustKnow: true,
    detailed: `We scan each cell; encountering a 1 means discovering a new island. We immediately launch a DFS that flips every connected land cell to 0, ensuring we never double-count it. This DFS may recurse up to the size of the island, so the largest stack depth corresponds to the island surface, which in dense grids is O(m*n). Every cell is visited at most once and checked four times for its neighbors, giving linear time relative to the grid size.`,
    code: `function numIslands(grid) {
  if (!grid.length || !grid[0].length) return 0;
  const rows = grid.length;
  const cols = grid[0].length;
  let islands = 0;
  const visit = (r, c) => {
    if (r < 0 || r >= rows || c < 0 || c >= cols) return;
    if (grid[r][c] !== '1') return;
    grid[r][c] = '0';
    visit(r + 1, c);
    visit(r - 1, c);
    visit(r, c + 1);
    visit(r, c - 1);
  };
  for (let r = 0; r < rows; r += 1) {
    for (let c = 0; c < cols; c += 1) {
      if (grid[r][c] === '1') {
        islands += 1;
        visit(r, c);
      }
    }
  }
  return islands;
}`,
    tests: `const mapA = [
  ['1','1','0','0','0'],
  ['1','1','0','0','0'],
  ['0','0','1','0','0'],
  ['0','0','0','1','1']
];
console.assert(numIslands(mapA) === 3, 'counts separated islands correctly');
console.assert(numIslands([
  ['0','0'],
  ['0','0']
]) === 0, 'all water yields zero islands');`
  },
  {
    slug: 'lowest-common-ancestor-bst',
    title: 'Lowest Common Ancestor (BST)',
    difficulty: 'Medium',
    companies: ['Google', 'Amazon', 'Meta'],
    description: 'Given the root of a binary search tree and two nodes p and q, return their lowest common ancestor.',
    approach: 'Walk down the BST: if both nodes are smaller, go left; if both are larger, go right; otherwise the current node is their LCA.',
    complexity: { time: 'O(h)', space: 'O(1)' },
    detailed: `The BST ordering property keeps all lesser values left and greater values right. Starting at the root, we compare p.val and q.val to the current node. When they are on different sides or equal to the current node, the split point is found and that node must be the LCA. Each step moves one level down, so the traversal touches at most the tree height h. No recursion or additional data structures are required.`,
    code: `function lowestCommonAncestor(root, p, q) {
  let node = root;
  while (node) {
    if (p.val < node.val && q.val < node.val) {
      node = node.left;
    } else if (p.val > node.val && q.val > node.val) {
      node = node.right;
    } else {
      return node;
    }
  }
  return null;
}`,
    tests: `const bst = {
  val: 6,
  left: {
    val: 2,
    left: { val: 0, left: null, right: null },
    right: {
      val: 4,
      left: { val: 3, left: null, right: null },
      right: { val: 5, left: null, right: null }
    }
  },
  right: {
    val: 8,
    left: { val: 7, left: null, right: null },
    right: { val: 9, left: null, right: null }
  }
};
console.assert(lowestCommonAncestor(bst, { val: 2 }, { val: 8 }).val === 6, 'root is common ancestor');
console.assert(lowestCommonAncestor(bst, { val: 2 }, { val: 4 }).val === 2, 'ancestor is one of the nodes');`
  },
  {
    slug: 'flatten-nested-array-dfs',
    title: 'Flatten Nested Array (DFS)',
    difficulty: 'Easy',
    companies: ['Flipkart', 'Google', 'Meta'],
    description: 'Deeply flatten a nested array of any depth without using Array.flat.',
    approach: 'Recursively traverse each item: if it is an array, flatten it, otherwise push the value into the accumulator.',
    complexity: { time: 'O(n)', space: 'O(d)' },
    jsOnly: true,
    detailed: `A recursive helper mirrors the natural nested structure. We visit every element exactly once and collect primitives into the result. Because each recursive call resolves one layer of nesting, the call stack depth is bounded by the maximum nesting depth d. The total work is proportional to the number of elements encountered.`,
    code: `function flatten(arr) {
  const result = [];
  const helper = (value) => {
    if (Array.isArray(value)) {
      value.forEach(helper);
    } else {
      result.push(value);
    }
  };
  helper(arr);
  return result;
}

function* flatGenerator(arr) {
  for (const item of arr) {
    if (Array.isArray(item)) {
      yield* flatGenerator(item);
    } else {
      yield item;
    }
  }
}`,
    tests: `console.assert(JSON.stringify(flatten([1, [2, [3, [4]]]])) === JSON.stringify([1,2,3,4]), 'fully flattened');
console.assert(JSON.stringify([...flatGenerator([1, [2, 3], 4])]) === JSON.stringify([1,2,3,4]), 'generator version matches');`
  },
  {
    slug: 'lru-cache',
    title: 'LRU Cache',
    difficulty: 'Medium',
    companies: ['Amazon', 'Google', 'Meta', 'Microsoft'],
    description: 'Design an LRU cache that supports get and put operations in constant time, evicting the least recently used item when capacity is exceeded.',
    approach: 'Back the cache with a Map to store insertion order; on every access, delete and reinsert the key to move it to the most recent position, and evict the oldest when capacity is full.',
    complexity: { time: 'O(1) get/put', space: 'O(capacity)' },
    mustKnow: true,
    detailed: `JavaScript Maps remember insertion order, which allows us to treat them as a doubly linked list for free. Each get checks for presence; if found, we remove and reinsert the key so it becomes the newest entry. put follows the same pattern, deleting the key first if it exists. When adding a new key over capacity, we remove the first key by reading map.keys().next().value. These operations are constant time, meeting the LRU requirement without implementing a custom list.`,
    code: `class LRUCache {
  constructor(capacity) {
    this.capacity = capacity;
    this.cache = new Map();
  }

  get(key) {
    if (!this.cache.has(key)) return -1;
    const value = this.cache.get(key);
    this.cache.delete(key);
    this.cache.set(key, value);
    return value;
  }

  put(key, value) {
    if (this.cache.has(key)) {
      this.cache.delete(key);
    } else if (this.cache.size >= this.capacity) {
      const lruKey = this.cache.keys().next().value;
      this.cache.delete(lruKey);
    }
    this.cache.set(key, value);
  }
}`,
    tests: `const cache = new LRUCache(2);
cache.put(1, 1);
cache.put(2, 2);
console.assert(cache.get(1) === 1, 'recent value returned');
cache.put(3, 3);
console.assert(cache.get(2) === -1, 'evicts least recently used');
cache.put(4, 4);
console.assert(cache.get(1) === -1, 'old key evicted');
console.assert(cache.get(3) === 3 && cache.get(4) === 4, 'new keys present');`
  },
  {
    slug: 'group-anagrams',
    title: 'Group Anagrams',
    difficulty: 'Medium',
    companies: ['Amazon', 'Google', 'Meta', 'Atlassian'],
    description: 'Group a list of strings so that each output bucket contains anagrams of each other.',
    approach: 'Normalize each word by sorting its characters and use the sorted string as a hash key to collect words sharing the same multiset of letters.',
    complexity: { time: 'O(n*k log k)', space: 'O(n*k)' },
    detailed: `Sorting each word produces a canonical representation for its letter composition. We insert each word into a Map keyed by that canonical form. Because objects of Map values are arrays, we push the original word into its bucket. Finally, we return the map values as the grouped anagrams. The dominating cost is sorting every string of average length k, repeated n times.`,
    code: `function groupAnagrams(strs) {
  const groups = new Map();
  for (const word of strs) {
    const key = word.split('').sort().join('');
    if (!groups.has(key)) groups.set(key, []);
    groups.get(key).push(word);
  }
  return Array.from(groups.values());
}`,
    tests: `const grouped = groupAnagrams(['eat','tea','tan','ate','nat','bat']);
const normalize = (arr) => arr.map((bucket) => bucket.slice().sort()).sort();
console.assert(JSON.stringify(normalize(grouped)) === JSON.stringify(normalize([['eat','tea','ate'],['tan','nat'],['bat']])), 'groups anagrams together');
console.assert(JSON.stringify(groupAnagrams([''])) === JSON.stringify([['']]), 'works with empty string');`
  },
  {
    slug: 'top-k-frequent-elements',
    title: 'Top K Frequent Elements',
    difficulty: 'Medium',
    companies: ['Amazon', 'Google', 'Meta', 'Microsoft'],
    description: 'Return the k most frequently occurring elements in an integer array.',
    approach: 'Count frequencies then use bucket sort where the bucket index is the frequency; gather numbers from the highest-frequency buckets until k elements are collected.',
    complexity: { time: 'O(n)', space: 'O(n)' },
    detailed: `After building a frequency map, we allocate an array of buckets whose indices correspond to how often numbers appear. Each number is pushed into the bucket matching its frequency. We then iterate over the buckets in descending order, concatenating elements until we have k of them. Bucket sort avoids the O(n log n) cost of sorting the entries by frequency.`,
    code: `function topKFrequent(nums, k) {
  const frequency = new Map();
  for (const num of nums) {
    frequency.set(num, (frequency.get(num) || 0) + 1);
  }
  const buckets = Array.from({ length: nums.length + 1 }, () => []);
  for (const [num, count] of frequency.entries()) {
    buckets[count].push(num);
  }
  const result = [];
  for (let i = buckets.length - 1; i >= 0 && result.length < k; i -= 1) {
    if (buckets[i].length) {
      result.push(...buckets[i]);
    }
  }
  return result.slice(0, k);
}`,
    tests: `console.assert(JSON.stringify(topKFrequent([1,1,1,2,2,3], 2)) === JSON.stringify([1,2]), 'classic example');
console.assert(JSON.stringify(topKFrequent([1], 1)) === JSON.stringify([1]), 'single element array');`
  },
  {
    slug: 'subarray-sum-equals-k',
    title: 'Subarray Sum Equals K',
    difficulty: 'Medium',
    companies: ['Amazon', 'Google', 'Meta'],
    description: 'Count how many continuous subarrays in nums sum to k.',
    approach: 'Use a running prefix sum and a hash map storing how many times each prefix sum has occurred; for each prefix, add the count of prefix - k to the answer.',
    complexity: { time: 'O(n)', space: 'O(n)' },
    detailed: `Let prefix[i] be the sum of nums up to index i. A subarray sum equals k when prefix[j] - prefix[i] = k. Rearranging, prefix[i] = prefix[j] - k. We maintain a map from prefix sums to their frequency. As we advance j, we accumulate the prefix, add counts[prefix - k] to the result, then increment the frequency for the current prefix. This captures all subarrays ending at j in constant time per element.`,
    code: `function subarraySum(nums, k) {
  const freq = new Map([[0, 1]]);
  let prefix = 0;
  let total = 0;
  for (const num of nums) {
    prefix += num;
    total += freq.get(prefix - k) || 0;
    freq.set(prefix, (freq.get(prefix) || 0) + 1);
  }
  return total;
}`,
    tests: `console.assert(subarraySum([1,1,1], 2) === 2, 'two subarrays sum to k');
console.assert(subarraySum([1,2,3], 3) === 2, 'handles single element subarray');
console.assert(subarraySum([-1,-1,1], 0) === 1, 'works with negative numbers');`
  },
  {
    slug: 'valid-parentheses',
    title: 'Valid Parentheses',
    difficulty: 'Easy',
    companies: ['Google', 'Amazon', 'Meta', 'Microsoft'],
    description: 'Determine if a string containing only parentheses and brackets is valid, meaning every opening bracket is closed in the correct order by the same type.',
    approach: 'Push opening brackets onto a stack; when encountering a closing bracket, pop and verify it matches the expected type.',
    complexity: { time: 'O(n)', space: 'O(n)' },
    mustKnow: true,
    detailed: `Balanced parentheses leverage the last-in, first-out nature of stacks. Each opening bracket is stored until we see a closing bracket. We then pop and compare; if the stack is empty or the characters differ, the string is invalid. At the end, validity also requires the stack be empty so that every opening bracket had a partner.`,
    code: `function isValid(s) {
  const stack = [];
  const matching = { ')': '(', ']': '[', '}': '{' };
  for (const ch of s) {
    if (matching[ch]) {
      if (stack.pop() !== matching[ch]) return false;
    } else {
      stack.push(ch);
    }
  }
  return stack.length === 0;
}`,
    tests: `console.assert(isValid('()'), 'simple pair');
console.assert(isValid('()[]{}'), 'multiple bracket types');
console.assert(!isValid('(]'), 'mismatched brackets fail');
console.assert(!isValid('('), 'unclosed bracket fails');`
  },
  {
    slug: 'min-stack',
    title: 'Min Stack',
    difficulty: 'Medium',
    companies: ['Amazon', 'Google', 'Meta'],
    description: 'Design a stack that supports push, pop, top, and retrieving the minimum element in constant time.',
    approach: 'Maintain a second stack that stores the minimum value at each depth in sync with the main stack.',
    complexity: { time: 'O(1) per op', space: 'O(n)' },
    detailed: `The auxiliary stack mirrors the primary stack. For each push we compute the new minimum by comparing the incoming value with the previous minimum and push it to the min stack. Pops remove both stacks simultaneously. Retrieving the min simply returns the top of the min stack without scanning the data.`,
    code: `class MinStack {
  constructor() {
    this.stack = [];
    this.minStack = [];
  }

  push(val) {
    const min = this.minStack.length ? Math.min(val, this.minStack[this.minStack.length - 1]) : val;
    this.stack.push(val);
    this.minStack.push(min);
  }

  pop() {
    this.stack.pop();
    this.minStack.pop();
  }

  top() {
    return this.stack[this.stack.length - 1];
  }

  getMin() {
    return this.minStack[this.minStack.length - 1];
  }
}`,
    tests: `const minStack = new MinStack();
minStack.push(-2);
minStack.push(0);
minStack.push(-3);
console.assert(minStack.getMin() === -3, 'tracks minimum');
minStack.pop();
console.assert(minStack.top() === 0, 'top after pop');
console.assert(minStack.getMin() === -2, 'minimum updates after pop');`
  },
  {
    slug: 'daily-temperatures',
    title: 'Daily Temperatures',
    difficulty: 'Medium',
    companies: ['Amazon', 'Google', 'Meta', 'Atlassian'],
    description: 'For each day, compute how many days one must wait to encounter a warmer temperature; 0 if none exists.',
    approach: 'Maintain a monotonic stack of indices with decreasing temperatures; when a warmer temperature arrives, resolve all indices it beats.',
    complexity: { time: 'O(n)', space: 'O(n)' },
    detailed: `The stack keeps indices of days whose warmer day we have not yet found. When the current temperature exceeds the temperature at the top index, we pop and compute the distance. Each index enters and leaves the stack at most once, keeping the algorithm linear. The stack remains decreasing, so comparisons are constant time.`,
    code: `function dailyTemperatures(temperatures) {
  const answer = new Array(temperatures.length).fill(0);
  const stack = [];
  for (let i = 0; i < temperatures.length; i += 1) {
    while (stack.length && temperatures[i] > temperatures[stack[stack.length - 1]]) {
      const idx = stack.pop();
      answer[idx] = i - idx;
    }
    stack.push(i);
  }
  return answer;
}`,
    tests: `console.assert(JSON.stringify(dailyTemperatures([73,74,75,71,69,72,76,73])) === JSON.stringify([1,1,4,2,1,1,0,0]), 'example case');
console.assert(JSON.stringify(dailyTemperatures([30,40,50,60])) === JSON.stringify([1,1,1,0]), 'increasing temperatures');
console.assert(JSON.stringify(dailyTemperatures([30,30,30])) === JSON.stringify([0,0,0]), 'no warmer days');`
  },
  {
    slug: 'asteroid-collision',
    title: 'Asteroid Collision',
    difficulty: 'Medium',
    companies: ['Amazon', 'Atlassian'],
    description: 'Simulate collisions between asteroids moving in one dimension, destroying smaller ones when they collide head-on.',
    approach: 'Use a stack to keep right-moving asteroids; on encountering a left-moving asteroid, resolve collisions against the stack top until stability.',
    complexity: { time: 'O(n)', space: 'O(n)' },
    detailed: `Only asteroids traveling in opposite directions can collide, which happens when a positive number precedes a negative number. We maintain a stack of resolved asteroids. When a new asteroid moves left (negative), we compare it to the positive top of the stack. Depending on sizes we pop the top, remove the current asteroid, or keep both if they travel in the same direction. Each asteroid enters and leaves the stack at most once, resulting in linear time.`,
    code: `function asteroidCollision(asteroids) {
  const stack = [];
  for (const asteroid of asteroids) {
    let current = asteroid;
    while (stack.length && current < 0 && stack[stack.length - 1] > 0) {
      const top = stack[stack.length - 1];
      if (top < -current) {
        stack.pop();
        continue;
      }
      if (top === -current) {
        stack.pop();
      }
      current = null;
      break;
    }
    if (current !== null) {
      stack.push(current);
    }
  }
  return stack;
}`,
    tests: `console.assert(JSON.stringify(asteroidCollision([5,10,-5])) === JSON.stringify([5,10]), 'middle asteroid destroyed');
console.assert(JSON.stringify(asteroidCollision([8,-8])) === JSON.stringify([]), 'equal asteroids annihilate');
console.assert(JSON.stringify(asteroidCollision([10,2,-5])) === JSON.stringify([10]), 'larger right-moving survives');`
  },
  {
    slug: 'reverse-linked-list',
    title: 'Reverse Linked List',
    difficulty: 'Easy',
    companies: ['Amazon', 'Google', 'Meta', 'Microsoft'],
    description: 'Reverse a singly linked list in-place and return the new head.',
    approach: 'Iterate through the list, reversing each next pointer as you go using prev, current, and next references.',
    complexity: { time: 'O(n)', space: 'O(1)' },
    mustKnow: true,
    detailed: `We maintain a pointer to the previous node and repeatedly redirect the current node's next pointer to prev. After storing current.next in a temporary variable, we flip the link and advance both prev and current. Once the traversal finishes, prev points to the new head of the reversed list. No extra data structures are required.`,
    code: `function reverseList(head) {
  let prev = null;
  let current = head;
  while (current) {
    const next = current.next;
    current.next = prev;
    prev = current;
    current = next;
  }
  return prev;
}`,
    tests: `const listA = { val: 1, next: { val: 2, next: { val: 3, next: null } } };
const reversed = reverseList(listA);
console.assert(JSON.stringify(reversed) === JSON.stringify({ val: 3, next: { val: 2, next: { val: 1, next: null } } }), 'list reversed');
console.assert(reverseList(null) === null, 'empty list stays null');`
  },
  {
    slug: 'linked-list-cycle-detection',
    title: "Detect Cycle - Floyd's Algorithm",
    difficulty: 'Easy',
    companies: ['Amazon', 'Google', 'Meta'],
    description: 'Determine if a singly linked list has a cycle without using extra space.',
    approach: "Use Floyd's tortoise and hare algorithm: move one pointer by one step and another by two steps; if they ever meet, a cycle exists.",
    complexity: { time: 'O(n)', space: 'O(1)' },
    detailed: `The fast pointer runs twice as quickly as the slow pointer. In acyclic lists the fast pointer hits null first. In cyclic lists, the fast pointer laps the slow pointer and they coincide at some node inside the cycle. The two-pointer approach keeps constant space while detecting cycles efficiently.`,
    code: `function hasCycle(head) {
  let slow = head;
  let fast = head;
  while (fast && fast.next) {
    slow = slow.next;
    fast = fast.next.next;
    if (slow === fast) return true;
  }
  return false;
}`,
    tests: `const nodeA = { val: 1, next: null };
const nodeB = { val: 2, next: null };
const nodeC = { val: 3, next: null };
nodeA.next = nodeB;
nodeB.next = nodeC;
nodeC.next = nodeA;
console.assert(hasCycle(nodeA) === true, 'detects cycle');
const nodeD = { val: 4, next: { val: 5, next: null } };
console.assert(hasCycle(nodeD) === false, 'no cycle detected');`
  },
  {
    slug: 'merge-two-sorted-lists',
    title: 'Merge Two Sorted Lists',
    difficulty: 'Easy',
    companies: ['Amazon', 'Google', 'Meta', 'Microsoft'],
    description: 'Merge two sorted linked lists and return the head of the merged sorted list.',
    approach: 'Use a dummy head and merge in-place by always choosing the smaller head between the two lists.',
    complexity: { time: 'O(n+m)', space: 'O(1)' },
    detailed: `A dummy node simplifies pointer manipulation. We maintain a tail pointer that always points to the last node in the merged list. At each step we pick the smaller node from the two input lists and advance the corresponding pointer. When one list runs out, we append the remainder of the other list.`,
    code: `function mergeTwoLists(list1, list2) {
  const dummy = { val: 0, next: null };
  let tail = dummy;
  let a = list1;
  let b = list2;
  while (a && b) {
    if (a.val <= b.val) {
      tail.next = a;
      a = a.next;
    } else {
      tail.next = b;
      b = b.next;
    }
    tail = tail.next;
  }
  tail.next = a || b;
  return dummy.next;
}`,
    tests: `const list1 = { val: 1, next: { val: 2, next: { val: 4, next: null } } };
const list2 = { val: 1, next: { val: 3, next: { val: 4, next: null } } };
console.assert(JSON.stringify(mergeTwoLists(list1, list2)) === JSON.stringify({ val: 1, next: { val: 1, next: { val: 2, next: { val: 3, next: { val: 4, next: { val: 4, next: null } } } } } }), 'merged lists remain sorted');
console.assert(mergeTwoLists(null, null) === null, 'merging two empty lists yields null');`
  },
  {
    slug: 'remove-nth-node-from-end',
    title: 'Remove Nth Node From End',
    difficulty: 'Medium',
    companies: ['Amazon', 'Google', 'Meta'],
    description: 'Remove the nth node from the end of a linked list in one pass and return the head.',
    approach: 'Advance a fast pointer n steps ahead of a slow pointer; then move both until fast hits the end so slow stops before the target node.',
    complexity: { time: 'O(n)', space: 'O(1)' },
    detailed: `Using a dummy node avoids edge cases when deleting the first element. We first move fast n steps forward. Then we traverse with both pointers until fast.next is null, ensuring slow is just before the node to delete. Adjusting slow.next removes the target in constant time. Only one traversal is required.`,
    code: `function removeNthFromEnd(head, n) {
  const dummy = { val: 0, next: head };
  let fast = dummy;
  let slow = dummy;
  for (let i = 0; i < n + 1; i += 1) {
    fast = fast.next;
  }
  while (fast) {
    fast = fast.next;
    slow = slow.next;
  }
  slow.next = slow.next.next;
  return dummy.next;
}`,
    tests: `const list3 = { val: 1, next: { val: 2, next: { val: 3, next: { val: 4, next: { val: 5, next: null } } } } };
console.assert(JSON.stringify(removeNthFromEnd(list3, 2)) === JSON.stringify({ val: 1, next: { val: 2, next: { val: 3, next: { val: 5, next: null } } } }), 'removes second from end');
const singleNode = { val: 1, next: null };
console.assert(removeNthFromEnd(singleNode, 1) === null, 'removing only node yields null');`
  },
  {
    slug: 'longest-substring-without-repeating',
    title: 'Longest Substring Without Repeating',
    difficulty: 'Medium',
    companies: ['Amazon', 'Google', 'Meta', 'Microsoft'],
    description: 'Find the length of the longest substring without repeating characters.',
    approach: 'Use a sliding window and a set of seen characters; expand the window and shrink it from the left when a duplicate is encountered.',
    complexity: { time: 'O(n)', space: 'O(min(n, alphabet))' },
    mustKnow: true,
    detailed: `We maintain two pointers delimiting the current window and a Set containing its characters. When the right pointer sees a duplicate, we shrink the window from the left until the duplicate is removed. After each expansion we update the best length found so far. Each character is added and removed at most once, ensuring linear time.`,
    code: `function lengthOfLongestSubstring(s) {
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
}`,
    tests: `console.assert(lengthOfLongestSubstring('abcabcbb') === 3, 'example case');
console.assert(lengthOfLongestSubstring('bbbbb') === 1, 'single repeating character');
console.assert(lengthOfLongestSubstring('pwwkew') === 3, 'non-contiguous repeats handled');`
  },
  {
    slug: 'minimum-window-substring',
    title: 'Minimum Window Substring',
    difficulty: 'Hard',
    companies: ['Google', 'Meta', 'Amazon', 'Microsoft'],
    description: 'Given strings s and t, return the minimum window in s which contains all characters of t.',
    approach: 'Expand a sliding window until it covers t, then shrink from the left while maintaining coverage to find the smallest valid window.',
    complexity: { time: 'O(n+m)', space: 'O(m)' },
    detailed: `We count required characters in a Map. As the right pointer moves, we decrement the requirement for the current character and track how many unique requirements have been satisfied. Once all are satisfied, we attempt to shrink from the left, restoring counts when a required character exits. Whenever we have a valid window, we update the best result. The window moves strictly forward, keeping the algorithm linear.`,
    code: `function minWindow(s, t) {
  if (t.length === 0 || s.length < t.length) return '';
  const need = new Map();
  for (const ch of t) {
    need.set(ch, (need.get(ch) || 0) + 1);
  }
  let have = 0;
  const required = need.size;
  const windowCounts = new Map();
  let left = 0;
  let best = '';
  for (let right = 0; right < s.length; right += 1) {
    const char = s[right];
    windowCounts.set(char, (windowCounts.get(char) || 0) + 1);
    if (need.has(char) && windowCounts.get(char) === need.get(char)) {
      have += 1;
    }
    while (have === required) {
      const windowSize = right - left + 1;
      if (!best || windowSize < best.length) {
        best = s.slice(left, right + 1);
      }
      const leftChar = s[left];
      windowCounts.set(leftChar, windowCounts.get(leftChar) - 1);
      if (need.has(leftChar) && windowCounts.get(leftChar) < need.get(leftChar)) {
        have -= 1;
      }
      left += 1;
    }
  }
  return best;
}`,
    tests: `console.assert(minWindow('ADOBECODEBANC', 'ABC') === 'BANC', 'classic example');
console.assert(minWindow('a', 'a') === 'a', 'single character case');
console.assert(minWindow('a', 'aa') === '', 'no valid window returns empty string');`
  },
  {
    slug: 'maximum-sum-subarray-size-k',
    title: 'Maximum Sum Subarray of Size K',
    difficulty: 'Easy',
    companies: ['Amazon', 'Google', 'Atlassian'],
    description: 'Find the maximum sum of any contiguous subarray of exactly size k.',
    approach: 'Compute the sum of the first k elements; slide the window by adding the new element and removing the outgoing one while tracking the maximum sum.',
    complexity: { time: 'O(n)', space: 'O(1)' },
    detailed: `A fixed-size sliding window makes the calculation straightforward. We compute the sum of the initial window. For each subsequent position we subtract the element leaving the window and add the new element entering it. Updating the rolling sum allows us to determine the maximum in constant time per shift.`,
    code: `function maxSumSubarray(nums, k) {
  if (k <= 0 || k > nums.length) return 0;
  let sum = 0;
  for (let i = 0; i < k; i += 1) {
    sum += nums[i];
  }
  let best = sum;
  for (let i = k; i < nums.length; i += 1) {
    sum += nums[i] - nums[i - k];
    best = Math.max(best, sum);
  }
  return best;
}`,
    tests: `console.assert(maxSumSubarray([1,2,3,4,5], 2) === 9, 'best window at end');
console.assert(maxSumSubarray([2,1,5,1,3,2], 3) === 9, 'middle window highest');
console.assert(maxSumSubarray([5], 1) === 5, 'single element window');`
  },
  {
    slug: 'find-all-anagrams-in-string',
    title: 'Find All Anagrams in String',
    difficulty: 'Medium',
    companies: ['Amazon', 'Google', 'Meta'],
    description: 'Return all starting indices of p\'s anagrams in s.',
    approach: 'Maintain a frequency count for the target string and a sliding window counter, comparing counts as the window moves.',
    complexity: { time: 'O(n)', space: 'O(1)' },
    detailed: `Since the alphabet size is limited, we can store counts in fixed-length arrays. We expand the window to size |p|, decrementing the count for outgoing characters and incrementing for incoming ones. When the counters match, the current left index is a valid anagram start. Comparing arrays by stringifying is acceptable for the small alphabet size.`,
    code: `function findAnagrams(s, p) {
  if (p.length > s.length) return [];
  const baseCharCode = 'a'.charCodeAt(0);
  const need = new Array(26).fill(0);
  const window = new Array(26).fill(0);
  for (const ch of p) {
    need[ch.charCodeAt(0) - baseCharCode] += 1;
  }
  const result = [];
  for (let i = 0; i < s.length; i += 1) {
    window[s.charCodeAt(i) - baseCharCode] += 1;
    if (i >= p.length) {
      window[s.charCodeAt(i - p.length) - baseCharCode] -= 1;
    }
    if (i >= p.length - 1 && window.join() === need.join()) {
      result.push(i - p.length + 1);
    }
  }
  return result;
}`,
    tests: `console.assert(JSON.stringify(findAnagrams('cbaebabacd', 'abc')) === JSON.stringify([0,6]), 'finds two anagrams');
console.assert(JSON.stringify(findAnagrams('abab', 'ab')) === JSON.stringify([0,1,2]), 'overlapping anagrams');
console.assert(JSON.stringify(findAnagrams('aaa', 'aaaa')) === JSON.stringify([]), 'no anagram when target longer');`
  },
  {
    slug: 'binary-search',
    title: 'Binary Search',
    difficulty: 'Easy',
    companies: ['Google', 'Amazon', 'Meta', 'Microsoft'],
    description: 'Search for a target value within a sorted array and return its index or -1 if absent.',
    approach: 'Repeatedly halve the search interval by comparing the target with the middle element until the interval is empty.',
    complexity: { time: 'O(log n)', space: 'O(1)' },
    mustKnow: true,
    detailed: `Binary search exploits sorted order to discard half the remaining candidates each iteration. We maintain inclusive left and right bounds, compute the midpoint, and adjust bounds based on comparison. The loop terminates when left surpasses right, guaranteeing logarithmic time.`,
    code: `function binarySearch(nums, target) {
  let left = 0;
  let right = nums.length - 1;
  while (left <= right) {
    const mid = left + Math.floor((right - left) / 2);
    if (nums[mid] === target) return mid;
    if (nums[mid] < target) left = mid + 1;
    else right = mid - 1;
  }
  return -1;
}`,
    tests: `console.assert(binarySearch([-1,0,3,5,9,12], 9) === 4, 'finds existing value');
console.assert(binarySearch([-1,0,3,5,9,12], 2) === -1, 'returns -1 when absent');
console.assert(binarySearch([5], 5) === 0, 'single element array');`
  },
  {
    slug: 'search-in-rotated-sorted-array',
    title: 'Search in Rotated Sorted Array',
    difficulty: 'Medium',
    companies: ['Amazon', 'Google', 'Meta', 'Microsoft'],
    description: 'Search for a target in a rotated sorted array without duplicates using logarithmic time.',
    approach: 'Identify which half of the current window is sorted and decide whether the target lies within it to choose the next half to search.',
    complexity: { time: 'O(log n)', space: 'O(1)' },
    detailed: `A rotated sorted array retains partial order: at least one half is sorted. During each iteration, we check whether the left half is sorted by comparing nums[left] and nums[mid]. If sorted, we test whether the target lies within. Otherwise the right half must be sorted. This logic allows us to discard half the array every iteration, preserving logarithmic complexity.`,
    code: `function searchRotated(nums, target) {
  let left = 0;
  let right = nums.length - 1;
  while (left <= right) {
    const mid = left + Math.floor((right - left) / 2);
    if (nums[mid] === target) return mid;
    if (nums[left] <= nums[mid]) {
      if (nums[left] <= target && target < nums[mid]) {
        right = mid - 1;
      } else {
        left = mid + 1;
      }
    } else {
      if (nums[mid] < target && target <= nums[right]) {
        left = mid + 1;
      } else {
        right = mid - 1;
      }
    }
  }
  return -1;
}`,
    tests: `console.assert(searchRotated([4,5,6,7,0,1,2], 0) === 4, 'finds value post-rotation');
console.assert(searchRotated([4,5,6,7,0,1,2], 3) === -1, 'returns -1 when missing');
console.assert(searchRotated([1], 0) === -1, 'single element not found');`
  },
  {
    slug: 'find-minimum-in-rotated-array',
    title: 'Find Minimum in Rotated Array',
    difficulty: 'Medium',
    companies: ['Amazon', 'Google', 'Meta'],
    description: 'Find the minimum value in a rotated sorted array without duplicates.',
    approach: 'Use binary search; compare mid with the rightmost value to decide whether the minimum lies to the right or left.',
    complexity: { time: 'O(log n)', space: 'O(1)' },
    detailed: `If nums[mid] is greater than nums[right], the minimum must reside in the right half because rotation moved smaller elements there. Otherwise the right half is sorted and the minimum is at mid or to its left. Halving the search interval every iteration keeps the runtime logarithmic.`,
    code: `function findMin(nums) {
  let left = 0;
  let right = nums.length - 1;
  while (left < right) {
    const mid = left + Math.floor((right - left) / 2);
    if (nums[mid] > nums[right]) {
      left = mid + 1;
    } else {
      right = mid;
    }
  }
  return nums[left];
}`,
    tests: `console.assert(findMin([3,4,5,1,2]) === 1, 'minimum after rotation');
console.assert(findMin([4,5,6,7,0,1,2]) === 0, 'handles pivot in middle');
console.assert(findMin([11,13,15,17]) === 11, 'no rotation returns first element');`
  },
  {
    slug: 'kth-largest-element',
    title: 'Kth Largest Element (Quickselect)',
    difficulty: 'Medium',
    companies: ['Amazon', 'Google', 'Meta', 'Microsoft'],
    description: 'Return the kth largest element in an unsorted array.',
    approach: 'Use quickselect: partition the array around a pivot and recurse into the side containing the kth index.',
    complexity: { time: 'O(n) average', space: 'O(1)' },
    detailed: `Quickselect chooses a pivot, partitions elements into less-than and greater-than sections, and then only recurses into the side that contains the desired index. The expected complexity is linear because on average the pivot splits the array reasonably well. We target the index n - k to map kth largest to zero-based indexing.`,
    code: `function findKthLargest(nums, k) {
  const target = nums.length - k;
  const partition = (left, right) => {
    const pivot = nums[right];
    let store = left;
    for (let i = left; i < right; i += 1) {
      if (nums[i] <= pivot) {
        [nums[store], nums[i]] = [nums[i], nums[store]];
        store += 1;
      }
    }
    [nums[store], nums[right]] = [nums[right], nums[store]];
    return store;
  };
  const select = (left, right) => {
    if (left === right) return nums[left];
    const pivotIndex = partition(left, right);
    if (pivotIndex === target) return nums[pivotIndex];
    if (pivotIndex < target) return select(pivotIndex + 1, right);
    return select(left, pivotIndex - 1);
  };
  return select(0, nums.length - 1);
}`,
    tests: `console.assert(findKthLargest([3,2,1,5,6,4], 2) === 5, 'kth largest example');
console.assert(findKthLargest([3,2,3,1,2,4,5,5,6], 4) === 4, 'handles duplicates');
console.assert(findKthLargest([1], 1) === 1, 'single element array');`
  },
  {
    slug: 'climbing-stairs',
    title: 'Climbing Stairs',
    difficulty: 'Easy',
    companies: ['Amazon', 'Google', 'Meta', 'Microsoft'],
    description: 'Count the number of distinct ways to climb n stairs when each move covers either 1 or 2 steps.',
    approach: 'Use a simple Fibonacci recurrence: ways(n) = ways(n-1) + ways(n-2) with iterative space optimization.',
    complexity: { time: 'O(n)', space: 'O(1)' },
    mustKnow: true,
    detailed: `Each step can be reached from the previous step via a single step or from two steps below via a double step. This leads directly to the Fibonacci recurrence. Iterating while keeping only the last two counts avoids storing the entire DP table.`,
    code: `function climbStairs(n) {
  if (n <= 2) return n;
  let prev2 = 1;
  let prev1 = 2;
  for (let i = 3; i <= n; i += 1) {
    const current = prev1 + prev2;
    prev2 = prev1;
    prev1 = current;
  }
  return prev1;
}`,
    tests: `console.assert(climbStairs(2) === 2, 'two ways for n=2');
console.assert(climbStairs(3) === 3, 'three ways for n=3');
console.assert(climbStairs(5) === 8, 'fibonacci growth');`
  },
  {
    slug: 'house-robber',
    title: 'House Robber',
    difficulty: 'Medium',
    companies: ['Amazon', 'Google', 'Meta', 'Microsoft'],
    description: 'Maximize money stolen from non-adjacent houses arranged linearly.',
    approach: 'Dynamic programming with two states: rob current house plus best up to i-2, or skip it and take best up to i-1.',
    complexity: { time: 'O(n)', space: 'O(1)' },
    detailed: `For each house we decide between robbing it (value + best two houses back) or skipping it (best up to previous house). An iterative DP with two rolling variables stores these choices compactly.`,
    code: `function rob(nums) {
  let prev2 = 0;
  let prev1 = 0;
  for (const money of nums) {
    const current = Math.max(prev1, prev2 + money);
    prev2 = prev1;
    prev1 = current;
  }
  return prev1;
}`,
    tests: `console.assert(rob([1,2,3,1]) === 4, 'rob houses 1 and 3');
console.assert(rob([2,7,9,3,1]) === 12, 'classic example');
console.assert(rob([2]) === 2, 'single house');`
  },
  {
    slug: 'coin-change',
    title: 'Coin Change',
    difficulty: 'Medium',
    companies: ['Amazon', 'Google', 'Meta', 'Microsoft'],
    description: 'Find the minimum number of coins needed to make up a given amount using unlimited coins of given denominations.',
    approach: 'Bottom-up dynamic programming where dp[i] stores the minimum coins for amount i; consider every coin for each amount.',
    complexity: { time: 'O(amount * coins)', space: 'O(amount)' },
    mustKnow: true,
    detailed: `We initialize dp[0] = 0 and set other values to Infinity. For each amount up to the target we try all coin denominations. If the coin fits (coin <= i), we update dp[i] = min(dp[i], dp[i - coin] + 1). After filling the table the answer is dp[amount] or -1 if unreachable.`,
    code: `function coinChange(coins, amount) {
  const dp = new Array(amount + 1).fill(Infinity);
  dp[0] = 0;
  for (let i = 1; i <= amount; i += 1) {
    for (const coin of coins) {
      if (coin <= i) {
        dp[i] = Math.min(dp[i], dp[i - coin] + 1);
      }
    }
  }
  return dp[amount] === Infinity ? -1 : dp[amount];
}`,
    tests: `console.assert(coinChange([1,2,5], 11) === 3, '11 = 5 + 5 + 1');
console.assert(coinChange([2], 3) === -1, 'cannot make odd with even coin');
console.assert(coinChange([1], 0) === 0, 'zero amount needs zero coins');`
  },
  {
    slug: 'longest-increasing-subsequence',
    title: 'Longest Increasing Subsequence',
    difficulty: 'Medium',
    companies: ['Amazon', 'Google', 'Meta'],
    description: 'Return the length of the longest strictly increasing subsequence in an array.',
    approach: 'Patience sorting strategy: maintain a tails array where tails[i] stores the smallest possible tail of an increasing subsequence of length i+1, updating with binary search.',
    complexity: { time: 'O(n log n)', space: 'O(n)' },
    detailed: `For each number we find the first tail greater than or equal to it using binary search. Replacing that tail with the current number keeps tails sorted and as small as possible, leaving room for longer sequences later. Extending tails by appending happens when the number is larger than any existing tail, meaning we found a longer subsequence.`,
    code: `function lengthOfLIS(nums) {
  const tails = [];
  for (const num of nums) {
    let left = 0;
    let right = tails.length;
    while (left < right) {
      const mid = left + Math.floor((right - left) / 2);
      if (tails[mid] < num) left = mid + 1;
      else right = mid;
    }
    tails[left] = num;
  }
  return tails.length;
}`,
    tests: `console.assert(lengthOfLIS([10,9,2,5,3,7,101,18]) === 4, 'classic example');
console.assert(lengthOfLIS([0,1,0,3,2,3]) === 4, 'handles duplicates');
console.assert(lengthOfLIS([7,7,7,7,7]) === 1, 'all equal');`
  },
  {
    slug: 'debounce',
    title: 'Debounce',
    difficulty: 'Medium',
    companies: ['Google', 'Meta', 'Amazon', 'Atlassian', 'Flipkart'],
    description: 'Implement debounce(fn, delay) so the function executes only after delay milliseconds have elapsed since the most recent call.',
    approach: 'Return a closure that clears the previous timeout and schedules a new one on each invocation, executing the original function after the quiet period.',
    complexity: { time: 'O(1)', space: 'O(1)' },
    mustKnow: true,
    jsOnly: true,
    detailed: `Debouncing is a rate-limiting pattern for bursty events such as keystrokes. We store the timeout id in the closure. Each call cancels the pending timer and starts another, ensuring fn runs only after activity stops for delay milliseconds. Using apply preserves the original this binding.`,
    code: `function debounce(fn, delay) {
  let timerId = null;
  return function debounced(...args) {
    const context = this;
    clearTimeout(timerId);
    timerId = setTimeout(() => {
      fn.apply(context, args);
    }, delay);
  };
}`,
    tests: `let debouncedCount = 0;
const debouncedFn = debounce(() => { debouncedCount += 1; }, 10);
debouncedFn();
debouncedFn();
debouncedFn();
setTimeout(() => {
  console.assert(debouncedCount === 1, 'debounce fires once after rapid calls');
}, 20);`
  },
  {
    slug: 'throttle',
    title: 'Throttle',
    difficulty: 'Medium',
    companies: ['Google', 'Meta', 'Amazon', 'Flipkart'],
    description: 'Implement throttle(fn, interval) so calls to fn execute at most once per interval milliseconds.',
    approach: 'Track the timestamp of the last execution; ignore calls until interval time has passed.',
    complexity: { time: 'O(1)', space: 'O(1)' },
    mustKnow: true,
    jsOnly: true,
    detailed: `Throttling guarantees a maximum call rate. We store the last execution time, defaulting to 0. When invoked we compare Date.now() with lastTime. Only if enough time has elapsed do we run the original function and update lastTime.`,
    code: `function throttle(fn, interval) {
  let lastTime = 0;
  return function throttled(...args) {
    const now = Date.now();
    if (now - lastTime >= interval) {
      lastTime = now;
      fn.apply(this, args);
    }
  };
}`,
    tests: `let throttleCount = 0;
const throttledFn = throttle(() => { throttleCount += 1; }, 10);
throttledFn();
throttledFn();
setTimeout(() => throttledFn(), 5);
setTimeout(() => throttledFn(), 15);
setTimeout(() => {
  console.assert(throttleCount === 2, 'throttle enforces interval spacing');
}, 30);`
  },
  {
    slug: 'deep-clone',
    title: 'Deep Clone',
    difficulty: 'Medium',
    companies: ['Google', 'Meta', 'Atlassian', 'Flipkart'],
    description: 'Implement deepClone(value) that creates a deep copy of objects, arrays, Maps, Sets, Dates, and handles circular references.',
    approach: 'Use recursion with a WeakMap of seen objects; clone each structure type accordingly to preserve nested data without sharing references.',
    complexity: { time: 'O(n)', space: 'O(n)' },
    mustKnow: true,
    jsOnly: true,
    detailed: `We treat primitives and functions as base cases returning the original value. For reference types we check the WeakMap to avoid infinite recursion on cycles. Each built-in structure (Date, Map, Set, Array, plain Object) requires tailored logic to copy contents while cloning nested values recursively.`,
    code: `function deepClone(value, seen = new WeakMap()) {
  if (value === null || typeof value !== 'object') return value;
  if (seen.has(value)) return seen.get(value);
  if (value instanceof Date) return new Date(value.getTime());
  if (value instanceof Map) {
    const mapClone = new Map();
    seen.set(value, mapClone);
    for (const [key, val] of value.entries()) {
      mapClone.set(deepClone(key, seen), deepClone(val, seen));
    }
    return mapClone;
  }
  if (value instanceof Set) {
    const setClone = new Set();
    seen.set(value, setClone);
    for (const item of value.values()) {
      setClone.add(deepClone(item, seen));
    }
    return setClone;
  }
  const clone = Array.isArray(value) ? [] : Object.create(Object.getPrototypeOf(value));
  seen.set(value, clone);
  Reflect.ownKeys(value).forEach((key) => {
    clone[key] = deepClone(value[key], seen);
  });
  return clone;
}`,
    tests: `const original = { a: 1, b: { c: 2 }, d: new Date(0), e: new Map([[{ k: 1 }, { v: 2 }]]) };
original.self = original;
const copy = deepClone(original);
console.assert(copy !== original && copy.b !== original.b, 'deep clone creates new nested objects');
console.assert(copy.d.getTime() === original.d.getTime(), 'dates copied correctly');
console.assert(copy.e !== original.e && copy.e.size === original.e.size, 'maps cloned');
console.assert(copy.self === copy, 'circular reference preserved');`
  },
  {
    slug: 'memoize',
    title: 'Memoize',
    difficulty: 'Medium',
    companies: ['Google', 'Meta', 'Amazon', 'Microsoft'],
    description: 'Implement memoize(fn) to cache results of function calls keyed by their arguments.',
    approach: 'Serialize arguments to a cache key and store results in a Map so repeated calls with the same arguments return instantly.',
    complexity: { time: 'O(1) for cached calls', space: 'O(n)' },
    mustKnow: true,
    jsOnly: true,
    detailed: `We wrap the original function in a closure that computes a JSON key from the arguments. If the key exists in the cache Map we return the stored result, otherwise we call fn, store the result, and return it. JSON.stringify suffices for typical interview data but could be replaced with a stronger serializer when necessary.`,
    code: `function memoize(fn) {
  const cache = new Map();
  return function memoized(...args) {
    const key = JSON.stringify(args);
    if (cache.has(key)) return cache.get(key);
    const result = fn.apply(this, args);
    cache.set(key, result);
    return result;
  };
}`,
    tests: `let fibCalls = 0;
const memoFib = memoize(function fib(n) {
  fibCalls += 1;
  if (n <= 1) return n;
  return memoFib(n - 1) + memoFib(n - 2);
});
const fibResult = memoFib(10);
console.assert(fibResult === 55, 'correct fibonacci result');
console.assert(fibCalls < 30, 'memoization reduces calls');`
  },
  {
    slug: 'curry',
    title: 'Curry',
    difficulty: 'Medium',
    companies: ['Google', 'Meta', 'Atlassian', 'Flipkart'],
    description: 'Implement curry(fn) so functions can be invoked with partial arguments across multiple calls until the original arity is satisfied.',
    approach: 'Return a function that accumulates arguments and either executes the original fn when enough arguments are collected or returns another function expecting more.',
    complexity: { time: 'O(n)', space: 'O(n)' },
    jsOnly: true,
    detailed: `We check the length of the collected arguments against fn.length. When the requirement is met we invoke fn with all gathered arguments. Otherwise we return another function that continues collecting. Using apply allows us to preserve the calling context.`,
    code: `function curry(fn) {
  function curried(...args) {
    if (args.length >= fn.length) {
      return fn.apply(this, args);
    }
    return (...next) => curried.apply(this, args.concat(next));
  }
  return curried;
}`,
    tests: `const curriedAdd = curry((a, b, c) => a + b + c);
console.assert(curriedAdd(1)(2)(3) === 6, 'fully curried');
console.assert(curriedAdd(1, 2)(3) === 6, 'supports partial application');
console.assert(curriedAdd(1)(2, 3) === 6, 'accepts mixed argument counts');`
  },
  {
    slug: 'promise-all-polyfill',
    title: 'Promise.all Polyfill',
    difficulty: 'Medium',
    companies: ['Google', 'Meta', 'Amazon', 'Atlassian'],
    description: 'Implement promiseAll(promises) that returns a promise resolving to an array of results when all input promises resolve, or rejects if any promise rejects.',
    approach: 'Wrap inputs with Promise.resolve, collect results by index, decrement a counter, resolve when it hits zero, and reject immediately on the first failure.',
    complexity: { time: 'O(n)', space: 'O(n)' },
    jsOnly: true,
    detailed: `We create a new Promise and iterate over the input array. Each element is converted with Promise.resolve so both promises and raw values are handled uniformly. We store each resolved value in the correct slot and track the number of pending results. When any promise rejects we propagate the rejection immediately. If the input is empty we resolve synchronously with an empty array.`,
    code: `function promiseAll(iterable) {
  return new Promise((resolve, reject) => {
    const promises = Array.from(iterable);
    if (promises.length === 0) {
      resolve([]);
      return;
    }
    const results = new Array(promises.length);
    let remaining = promises.length;
    promises.forEach((item, index) => {
      Promise.resolve(item)
        .then((value) => {
          results[index] = value;
          remaining -= 1;
          if (remaining === 0) resolve(results);
        })
        .catch(reject);
    });
  });
}`,
    tests: `promiseAll([Promise.resolve(1), 2, Promise.resolve(3)]).then((values) => {
  console.assert(JSON.stringify(values) === JSON.stringify([1,2,3]), 'resolves all values in order');
});
promiseAll([Promise.resolve(1), Promise.reject(new Error('fail'))])
  .then(() => console.assert(false, 'should not resolve on rejection'))
  .catch(() => console.assert(true, 'rejects on first failure'));`
  },
  {
    slug: 'event-emitter',
    title: 'Event Emitter (Pub/Sub)',
    difficulty: 'Medium',
    companies: ['Meta', 'Google', 'Amazon'],
    description: 'Implement an EventEmitter with on, off, emit, and once methods.',
    approach: 'Store listeners per event name in a map; emit iterates listeners, once wraps the listener to auto-unsubscribe after first invocation.',
    complexity: { time: 'O(n) emit', space: 'O(n)' },
    jsOnly: true,
    detailed: `The emitter maintains an object mapping event names to arrays of listeners. on appends to the list, off filters out the specified listener, emit iterates and calls each listener, and once registers a wrapper that removes itself before invoking the underlying listener.`,
    code: `class EventEmitter {
  constructor() {
    this.events = Object.create(null);
  }

  on(event, listener) {
    (this.events[event] ||= []).push(listener);
    return this;
  }

  off(event, listener) {
    if (!this.events[event]) return this;
    this.events[event] = this.events[event].filter((l) => l !== listener);
    return this;
  }

  emit(event, ...args) {
    if (!this.events[event]) return false;
    this.events[event].forEach((listener) => listener(...args));
    return true;
  }

  once(event, listener) {
    const wrapper = (...args) => {
      this.off(event, wrapper);
      listener(...args);
    };
    this.on(event, wrapper);
    return this;
  }
}`,
    tests: `const emitter = new EventEmitter();
let count = 0;
const increment = () => { count += 1; };
emitter.on('tick', increment);
emitter.emit('tick');
emitter.emit('tick');
console.assert(count === 2, 'on listeners fire each emit');
let onceCount = 0;
emitter.once('once', () => { onceCount += 1; });
emitter.emit('once');
emitter.emit('once');
console.assert(onceCount === 1, 'once fires only once');
emitter.off('tick', increment);
emitter.emit('tick');
console.assert(count === 2, 'off removes listener');`
  },
  {
    slug: 'trie-autocomplete',
    title: 'Trie (Autocomplete)',
    difficulty: 'Medium',
    companies: ['Google', 'Amazon', 'Meta', 'Atlassian'],
    description: 'Implement a Trie supporting insert, search, and startsWith operations.',
    approach: 'Use nested plain objects to represent nodes, storing a terminal marker to distinguish complete words.',
    complexity: { time: 'O(m) per operation', space: 'O(n*m)' },
    jsOnly: true,
    detailed: `Each node is an object whose keys are characters. insert walks through the word, creating child nodes as needed, and marks the end node with a special flag. search and startsWith traverse similarly but search additionally requires the terminal marker to be present.`,
    code: `class Trie {
  constructor() {
    this.root = {};
    this.end = '#';
  }

  insert(word) {
    let node = this.root;
    for (const char of word) {
      node[char] ||= {};
      node = node[char];
    }
    node[this.end] = true;
  }

  search(word) {
    let node = this.root;
    for (const char of word) {
      if (!node[char]) return false;
      node = node[char];
    }
    return !!node[this.end];
  }

  startsWith(prefix) {
    let node = this.root;
    for (const char of prefix) {
      if (!node[char]) return false;
      node = node[char];
    }
    return true;
  }
}`,
    tests: `const trie = new Trie();
trie.insert('apple');
console.assert(trie.search('apple') === true, 'search finds inserted word');
console.assert(trie.search('app') === false, 'search requires full word');
console.assert(trie.startsWith('app') === true, 'prefix detected');
trie.insert('app');
console.assert(trie.search('app') === true, 'insert subsequent word works');`
  },
  {
    slug: 'flatten-nested-array-depth',
    title: 'Flatten Nested Array with Depth',
    difficulty: 'Easy',
    companies: ['Flipkart', 'Google', 'Meta'],
    description: 'Implement flatten(arr, depth) that flattens nested arrays up to the specified depth.',
    approach: 'Use recursion decrementing depth on nested arrays; when depth reaches zero, return the array as-is.',
    complexity: { time: 'O(n)', space: 'O(d)' },
    jsOnly: true,
    detailed: `At each element we test if it is an array and whether depth is still positive. If so we flatten recursively with depth - 1; otherwise we append the element directly. Depth Infinity yields a fully flattened structure. The call stack depth matches the recursion depth, bounded by the requested depth.`,
    code: `function flattenWithDepth(arr, depth = Infinity) {
  return arr.reduce((acc, item) => {
    if (Array.isArray(item) && depth > 0) {
      acc.push(...flattenWithDepth(item, depth - 1));
    } else {
      acc.push(item);
    }
    return acc;
  }, []);
}`,
    tests: `console.assert(JSON.stringify(flattenWithDepth([1,[2,[3,[4]]]], 1)) === JSON.stringify([1,2,[3,[4]]]), 'flattens one level');
console.assert(JSON.stringify(flattenWithDepth([1,[2,[3,[4]]]], Infinity)) === JSON.stringify([1,2,3,4]), 'fully flattens with Infinity');`
  },
  {
    slug: 'pipe-compose',
    title: 'Implement Pipe and Compose',
    difficulty: 'Easy',
    companies: ['Meta', 'Google', 'Atlassian'],
    description: 'Implement pipe and compose utilities for function composition.',
    approach: 'pipe applies functions left-to-right via reduce; compose applies right-to-left via reduceRight.',
    complexity: { time: 'O(n)', space: 'O(1)' },
    jsOnly: true,
    detailed: `Function composition chains single-argument functions. pipe takes an initial value and successively applies functions in order. compose reverses the direction using reduceRight. Both return higher-order functions that accept an initial value.`,
    code: `const pipe = (...fns) => (input) => fns.reduce((value, fn) => fn(value), input);
const compose = (...fns) => (input) => fns.reduceRight((value, fn) => fn(value), input);`,
    tests: `const double = (x) => x * 2;
const increment = (x) => x + 1;
const square = (x) => x * x;
const piped = pipe(double, increment, square);
console.assert(piped(3) === 49, 'pipe runs left to right');
const composed = compose(square, increment, double);
console.assert(composed(3) === 64, 'compose runs right to left');`
  },
  {
    slug: 'virtual-dom-diff-basic',
    title: 'Virtual DOM Diff (Basic)',
    difficulty: 'Hard',
    companies: ['Meta', 'Google', 'Atlassian'],
    description: 'Implement createElement and render functions to build a minimal virtual DOM representation and render it to the real DOM, along with a diff function that patches text updates.',
    approach: 'createElement returns a virtual node object; render recursively materializes DOM nodes; diff compares old and new trees and applies text and prop updates.',
    complexity: { time: 'O(n)', space: 'O(n)' },
    jsOnly: true,
    detailed: `Virtual DOM structures describe UI trees declaratively. createElement constructs simple objects, render turns nodes into DOM elements, and diff traverses both trees, updating text content and attributes. Although simplified, this demonstrates the core ideas behind libraries like React.`,
    code: `function createElement(type, props = {}, ...children) {
  return { type, props, children: children.flat() };
}

function render(vnode, container) {
  if (vnode == null) return;
  if (typeof vnode === 'string' || typeof vnode === 'number') {
    container.appendChild(document.createTextNode(String(vnode)));
    return;
  }
  const element = document.createElement(vnode.type);
  Object.entries(vnode.props || {}).forEach(([key, value]) => {
    if (key.startsWith('on') && typeof value === 'function') {
      element.addEventListener(key.slice(2).toLowerCase(), value);
    } else {
      element.setAttribute(key, value);
    }
  });
  vnode.children.forEach((child) => render(child, element));
  container.appendChild(element);
}

function diff(parent, oldNode, newNode, index = 0) {
  if (!oldNode) {
    render(newNode, parent);
    return;
  }
  const child = parent.childNodes[index];
  if (!newNode) {
    parent.removeChild(child);
    return;
  }
  if (typeof oldNode !== typeof newNode || (typeof newNode === 'string' && oldNode !== newNode) || oldNode.type !== newNode.type) {
    parent.replaceChild(rendered(newNode), child);
    return;
  }
  if (typeof newNode === 'string') {
    if (child.nodeValue !== newNode) child.nodeValue = newNode;
    return;
  }
  updateProps(child, oldNode.props || {}, newNode.props || {});
  const max = Math.max(oldNode.children.length, newNode.children.length);
  for (let i = 0; i < max; i += 1) {
    diff(child, oldNode.children[i], newNode.children[i], i);
  }
}

function updateProps(element, oldProps, newProps) {
  Object.keys(oldProps).forEach((key) => {
    if (!(key in newProps)) {
      element.removeAttribute(key);
    }
  });
  Object.entries(newProps).forEach(([key, value]) => {
    element.setAttribute(key, value);
  });
}

function rendered(vnode) {
  const fragment = document.createDocumentFragment();
  render(vnode, fragment);
  return fragment.firstChild;
}`,
    tests: `const vOld = createElement('div', { id: 'root' }, 'Hello');
const vNew = createElement('div', { id: 'root' }, 'World');
const container = document.createElement('div');
render(vOld, container);
diff(container, vOld, vNew, 0);
console.assert(container.textContent === 'World', 'diff updates text content');`
  }
];

const outputDir = resolve('solutions');
mkdirSync(outputDir, { recursive: true });

const slugify = (slug) => slug.toLowerCase().replace(/[^a-z0-9-]+/g, '-').replace(/-{2,}/g, '-').replace(/(^-|-$)/g, '');

const formatArray = (arr) => arr.map((entry, idx) => ` *   ${idx + 1}. ${entry}`).join('\n');

const buildContent = (problem) => {
  const lines = [];
  lines.push('/**');
  lines.push(` * Title: ${problem.title}`);
  lines.push(` * Difficulty: ${problem.difficulty}`);
  if (problem.companies?.length) {
    lines.push(` * Companies: ${problem.companies.join(', ')}`);
  }
  if (problem.mustKnow) {
    lines.push(' * Must Know: Yes');
  }
  if (problem.jsOnly) {
    lines.push(' * JS-Only: Yes');
  }
  lines.push(' *');
  lines.push(` * Problem: ${problem.description.trim()}`);
  lines.push(` * Approach: ${problem.approach.trim()}`);
  lines.push(` * Complexity: Time ${problem.complexity?.time ?? 'N/A'}, Space ${problem.complexity?.space ?? 'N/A'}`);
  lines.push(' *');
  lines.push(' * Detailed Explanation:');
  problem.detailed.trim().split('\n').forEach((line) => {
    lines.push(` *   ${line.trim()}`);
  });
  lines.push(' */');
  lines.push('');
  lines.push(problem.code.trim());
  lines.push('');
  lines.push('// ---------------------------');
  lines.push('// Tests');
  lines.push('// ---------------------------');
  lines.push(problem.tests.trim());
  lines.push('');
  return lines.join('\n');
};

const usedFilenames = new Set();

for (const problem of problems) {
  const base = slugify(problem.slug || problem.title);
  let filename = `${base}.js`;
  let counter = 2;
  while (usedFilenames.has(filename) || existsSync(resolve(outputDir, filename))) {
    filename = `${base}-${counter}.js`;
    counter += 1;
  }
  usedFilenames.add(filename);
  const filePath = resolve(outputDir, filename);
  writeFileSync(filePath, buildContent(problem), 'utf8');
}

if (!problems.length) {
  console.log('No problems defined. Add entries to the problems array.');
} else {
  console.log(`Generated ${problems.length} files in ${outputDir}`);
}
