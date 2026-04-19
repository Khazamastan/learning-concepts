# NamasteDev Full JavaScript Solutions

Generated at: 2026-04-19T04:54:37.410Z
Total problems: 37

## 1. pyramid pattern

Problem URL: https://namastedev.com/practice/pyramid-pattern
Difficulty: Medium

**Problem Statement**
Given an integer n, build a centered pyramid pattern using * where row i contains (2*i - 1) stars and leading spaces so that the pyramid is centered.

**Example Cases**
1. Input: `n = 4`
   Output: `"   *\n  ***\n *****\n*******"`
   Explanation: Each row grows by 2 stars and decreases one leading space.
2. Input: `n = 1`
   Output: `"*"`
   Explanation: Single row is the smallest valid pyramid.

**JavaScript Solution**
```javascript
function pyramidPattern(n) {
  if (!Number.isInteger(n) || n <= 0) return '';

  const rows = [];
  for (let i = 1; i <= n; i += 1) {
    const spaces = ' '.repeat(n - i);
    const stars = '*'.repeat(2 * i - 1);
    rows.push(spaces + stars);
  }

  return rows.join('\n');
}
```

**Complexity**
- Time: O(n^2)
- Space: O(n^2) due to output size

## 2. Deep Omit

Problem URL: https://namastedev.com/practice/deep-omit
Difficulty: Medium

**Problem Statement**
Given a nested object/array and a list of keys, remove those keys at every depth while preserving the rest of the structure.

**Example Cases**
1. Input: `obj = { a: 1, b: { c: 2, d: 3 }, e: [{ c: 4, f: 5 }] }, keys = ["c"]`
   Output: `{ a: 1, b: { d: 3 }, e: [{ f: 5 }] }`
   Explanation: Key c is removed everywhere in objects, including objects inside arrays.
2. Input: `obj = { keep: true }, keys = ["x"]`
   Output: `{ keep: true }`
   Explanation: If key does not exist, object remains unchanged.

**JavaScript Solution**
```javascript
function deepOmit(value, keysToOmit) {
  const blocked = new Set(keysToOmit);

  function walk(node) {
    if (Array.isArray(node)) {
      return node.map(walk);
    }

    if (node && typeof node === 'object') {
      const out = {};
      for (const [key, val] of Object.entries(node)) {
        if (blocked.has(key)) continue;
        out[key] = walk(val);
      }
      return out;
    }

    return node;
  }

  return walk(value);
}
```

**Complexity**
- Time: O(N)
- Space: O(H) recursion + output

## 3. Debounce

Problem URL: https://namastedev.com/practice/debounce
Difficulty: Medium

**Problem Statement**
Implement debounce(fn, wait) so fn runs only after there has been no new call for wait milliseconds. Preserve this and latest arguments.

**Example Cases**
1. Input: `Calls at t=0ms, 50ms, 90ms with wait=100ms`
   Output: `Only one execution at ~190ms with last call arguments`
   Explanation: Timer resets on every new call.
2. Input: `debounced.cancel()`
   Output: `Pending invocation is dropped`
   Explanation: Useful when component unmounts or route changes.

**JavaScript Solution**
```javascript
function debounce(fn, wait = 0) {
  let timer = null;
  let lastArgs;
  let lastThis;

  function invoke() {
    const result = fn.apply(lastThis, lastArgs);
    lastArgs = undefined;
    lastThis = undefined;
    return result;
  }

  function debounced(...args) {
    lastArgs = args;
    lastThis = this;

    if (timer) clearTimeout(timer);
    timer = setTimeout(() => {
      timer = null;
      invoke();
    }, wait);
  }

  debounced.cancel = function () {
    if (timer) clearTimeout(timer);
    timer = null;
    lastArgs = undefined;
    lastThis = undefined;
  };

  debounced.flush = function () {
    if (!timer) return;
    clearTimeout(timer);
    timer = null;
    return invoke();
  };

  return debounced;
}
```

**Complexity**
- Time: O(1) per call
- Space: O(1)

## 4. Word Search

Problem URL: https://namastedev.com/practice/word-search
Difficulty: Medium

**Problem Statement**
Given a 2D board and a list of words, return all words that can be formed by sequentially adjacent cells (up/down/left/right) without reusing a cell in the same word path.

**Example Cases**
1. Input: `board = [["o","a","a","n"],["e","t","a","e"],["i","h","k","r"],["i","f","l","v"]], words = ["oath","pea","eat","rain"]`
   Output: `["oath", "eat"]`
   Explanation: Only oath and eat can be traced by valid adjacent paths.
2. Input: `board = [["a","b"],["c","d"]], words = ["abcb"]`
   Output: `[]`
   Explanation: Cell reuse in a single path is not allowed.

**JavaScript Solution**
```javascript
function findWords(board, words) {
  if (!board.length || !board[0].length || !words.length) return [];

  const root = {};
  for (const word of words) {
    let node = root;
    for (const ch of word) {
      if (!node[ch]) node[ch] = {};
      node = node[ch];
    }
    node.word = word;
  }

  const rows = board.length;
  const cols = board[0].length;
  const found = [];
  const dirs = [
    [1, 0],
    [-1, 0],
    [0, 1],
    [0, -1]
  ];

  function dfs(r, c, parent) {
    const ch = board[r][c];
    const node = parent[ch];
    if (!node) return;

    if (node.word) {
      found.push(node.word);
      node.word = null;
    }

    board[r][c] = '#';

    for (const [dr, dc] of dirs) {
      const nr = r + dr;
      const nc = c + dc;
      if (nr < 0 || nr >= rows || nc < 0 || nc >= cols) continue;
      if (board[nr][nc] === '#') continue;
      dfs(nr, nc, node);
    }

    board[r][c] = ch;

    if (Object.keys(node).length === 0) {
      delete parent[ch];
    }
  }

  for (let r = 0; r < rows; r += 1) {
    for (let c = 0; c < cols; c += 1) {
      dfs(r, c, root);
    }
  }

  return found;
}
```

**Complexity**
- Time: O(M*N*4^L) worst case, usually lower with Trie pruning
- Space: O(total chars in words + L recursion)

## 5. Combination Sum

Problem URL: https://namastedev.com/practice/combination-sum
Difficulty: Medium

**Problem Statement**
Given distinct candidate numbers and a target, return all unique combinations where chosen numbers sum to target. You can use a candidate multiple times.

**Example Cases**
1. Input: `candidates = [2,3,6,7], target = 7`
   Output: `[[2,2,3],[7]]`
   Explanation: Both combinations sum to 7.
2. Input: `candidates = [2,4], target = 5`
   Output: `[]`
   Explanation: No valid combination exists.

**JavaScript Solution**
```javascript
function combinationSum(candidates, target) {
  const nums = [...new Set(candidates)].sort((a, b) => a - b);
  const result = [];
  const path = [];

  function backtrack(start, remaining) {
    if (remaining === 0) {
      result.push([...path]);
      return;
    }

    for (let i = start; i < nums.length; i += 1) {
      const value = nums[i];
      if (value > remaining) break;

      path.push(value);
      backtrack(i, remaining - value);
      path.pop();
    }
  }

  backtrack(0, target);
  return result;
}
```

**Complexity**
- Time: Exponential in number of combinations
- Space: O(target) recursion depth (excluding output)

## 6. Map Async Limit

Problem URL: https://namastedev.com/practice/map-async-limit
Difficulty: Medium

**Problem Statement**
Run an async mapper over an array while allowing at most limit operations in parallel, and return results in input order.

**Example Cases**
1. Input: `items = [1,2,3,4], limit = 2, mapper = async x => x * 2`
   Output: `[2,4,6,8]`
   Explanation: Only 2 mapper calls run concurrently at any time.
2. Input: `items = [], limit = 3`
   Output: `[]`
   Explanation: Empty input returns immediately.

**JavaScript Solution**
```javascript
async function mapAsyncLimit(items, limit, mapper) {
  if (!Array.isArray(items)) throw new TypeError('items must be an array');
  if (!Number.isInteger(limit) || limit <= 0) {
    throw new RangeError('limit must be a positive integer');
  }

  const result = new Array(items.length);
  let nextIndex = 0;

  async function worker() {
    while (true) {
      const current = nextIndex;
      nextIndex += 1;
      if (current >= items.length) break;
      result[current] = await mapper(items[current], current, items);
    }
  }

  const workerCount = Math.min(limit, items.length);
  const workers = Array.from({ length: workerCount }, () => worker());
  await Promise.all(workers);

  return result;
}
```

**Complexity**
- Time: O(n) async tasks
- Space: O(n)

## 7. Search Rotated Array

Problem URL: https://namastedev.com/practice/search-rotated-array
Difficulty: Medium

**Problem Statement**
Given a rotated sorted array with distinct elements, return the index of target using O(log n) time, or -1 if not present.

**Example Cases**
1. Input: `nums = [4,5,6,7,0,1,2], target = 0`
   Output: `4`
   Explanation: 0 is located at index 4.
2. Input: `nums = [4,5,6,7,0,1,2], target = 3`
   Output: `-1`
   Explanation: 3 does not exist in the array.

**JavaScript Solution**
```javascript
function searchRotatedArray(nums, target) {
  let left = 0;
  let right = nums.length - 1;

  while (left <= right) {
    const mid = left + ((right - left) >> 1);

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
}
```

**Complexity**
- Time: O(log n)
- Space: O(1)

## 8. Sum of Consecutive Integers

Problem URL: https://namastedev.com/practice/sum-of-consecutive-integers
Difficulty: Medium

**Problem Statement**
Return true if n can be represented as the sum of two or more consecutive positive integers, otherwise false.

**Example Cases**
1. Input: `n = 15`
   Output: `true`
   Explanation: 15 = 1+2+3+4+5 and also 4+5+6.
2. Input: `n = 8`
   Output: `false`
   Explanation: 8 cannot be written as sum of >=2 consecutive positive integers.

**JavaScript Solution**
```javascript
function canBeSumOfConsecutiveIntegers(n) {
  if (!Number.isInteger(n) || n < 3) return false;

  for (let len = 2; (len * (len + 1)) / 2 <= n; len += 1) {
    const numerator = n - (len * (len - 1)) / 2;
    if (numerator > 0 && numerator % len === 0) {
      return true;
    }
  }

  return false;
}
```

**Complexity**
- Time: O(sqrt(n))
- Space: O(1)

## 9. PromiseAll With Concurrency Limit

Problem URL: https://namastedev.com/practice/promiseall-with-concurrency-limit
Difficulty: Medium

**Problem Statement**
Implement Promise.all behavior for an array of async task functions, but run at most limit tasks in parallel and preserve result order.

**Example Cases**
1. Input: `tasks = [() => Promise.resolve(1), () => Promise.resolve(2)], limit = 1`
   Output: `[1,2]`
   Explanation: Runs sequentially due to limit=1 but keeps output ordering.
2. Input: `One task rejects`
   Output: `Promise rejects immediately with that error`
   Explanation: Matches Promise.all fail-fast behavior.

**JavaScript Solution**
```javascript
function promiseAllWithConcurrencyLimit(taskFns, limit) {
  return new Promise((resolve, reject) => {
    if (!Array.isArray(taskFns)) {
      reject(new TypeError('taskFns must be an array'));
      return;
    }

    if (!Number.isInteger(limit) || limit <= 0) {
      reject(new RangeError('limit must be a positive integer'));
      return;
    }

    const total = taskFns.length;
    if (total === 0) {
      resolve([]);
      return;
    }

    const results = new Array(total);
    let nextIndex = 0;
    let inFlight = 0;
    let completed = 0;
    let stopped = false;

    function launch() {
      if (stopped) return;

      while (inFlight < limit && nextIndex < total) {
        const current = nextIndex;
        nextIndex += 1;

        const task = taskFns[current];
        if (typeof task !== 'function') {
          stopped = true;
          reject(new TypeError('Each item in taskFns must be a function'));
          return;
        }

        inFlight += 1;

        Promise.resolve()
          .then(() => task())
          .then((value) => {
            results[current] = value;
            completed += 1;
            inFlight -= 1;

            if (completed === total) {
              resolve(results);
              return;
            }

            launch();
          })
          .catch((error) => {
            stopped = true;
            reject(error);
          });
      }
    }

    launch();
  });
}
```

**Complexity**
- Time: O(n) async tasks
- Space: O(n)

## 10. JSON.stringify

Problem URL: https://namastedev.com/practice/jsonstringify
Difficulty: Medium

**Problem Statement**
Implement a custom JSON stringify function for primitives, arrays, and objects with cycle detection and behavior close to native JSON.stringify.

**Example Cases**
1. Input: `value = { a: 1, b: [true, null, "x"] }`
   Output: `"{\"a\":1,\"b\":[true,null,\"x\"]}"`
   Explanation: Objects and arrays are serialized recursively.
2. Input: `value has circular reference`
   Output: `Throws TypeError`
   Explanation: Circular structures cannot be serialized to standard JSON.

**JavaScript Solution**
```javascript
function customJSONStringify(value) {
  const seen = new Set();
  const escapeMap = {
    '"': '\\"',
    '\\': '\\\\',
    '\b': '\\b',
    '\f': '\\f',
    '\n': '\\n',
    '\r': '\\r',
    '\t': '\\t'
  };

  function quote(str) {
    return (
      '"' +
      str.replace(/["\\\u0000-\u001F]/g, (ch) => {
        if (escapeMap[ch]) return escapeMap[ch];
        const hex = ch.charCodeAt(0).toString(16).padStart(4, '0');
        return '\\u' + hex;
      }) +
      '"'
    );
  }

  function serialize(val) {
    if (val && typeof val.toJSON === 'function') {
      val = val.toJSON();
    }

    if (val === null) return 'null';

    const t = typeof val;

    if (t === 'string') return quote(val);
    if (t === 'number') return Number.isFinite(val) ? String(val) : 'null';
    if (t === 'boolean') return String(val);
    if (t === 'bigint') throw new TypeError('Do not know how to serialize a BigInt');
    if (t === 'undefined' || t === 'function' || t === 'symbol') return undefined;

    if (seen.has(val)) {
      throw new TypeError('Converting circular structure to JSON');
    }

    seen.add(val);

    if (Array.isArray(val)) {
      const parts = val.map((item) => {
        const out = serialize(item);
        return out === undefined ? 'null' : out;
      });
      seen.delete(val);
      return '[' + parts.join(',') + ']';
    }

    const parts = [];
    for (const key of Object.keys(val)) {
      const out = serialize(val[key]);
      if (out !== undefined) {
        parts.push(quote(key) + ':' + out);
      }
    }

    seen.delete(val);
    return '{' + parts.join(',') + '}';
  }

  return serialize(value);
}
```

**Complexity**
- Time: O(N)
- Space: O(H) recursion + cycle set

## 11. List Format

Problem URL: https://namastedev.com/practice/list-format
Difficulty: Medium

**Problem Statement**
Convert an array of strings into a human-readable list, for example: ["A","B","C"] -> "A, B, and C".

**Example Cases**
1. Input: `items = ["Alice", "Bob", "Charlie"]`
   Output: `"Alice, Bob, and Charlie"`
   Explanation: Three or more items are comma-separated with conjunction before the last item.
2. Input: `items = ["Alice", "Bob"]`
   Output: `"Alice and Bob"`
   Explanation: Two items are joined directly with conjunction.

**JavaScript Solution**
```javascript
function listFormat(items, options = {}) {
  const conjunction = options.conjunction || 'and';
  const serialComma = options.serialComma !== false;
  const clean = items.filter((item) => item !== null && item !== undefined).map(String);

  if (clean.length === 0) return '';
  if (clean.length === 1) return clean[0];
  if (clean.length === 2) return clean[0] + ' ' + conjunction + ' ' + clean[1];

  const head = clean.slice(0, -1).join(', ');
  const comma = serialComma ? ',' : '';
  const tail = clean[clean.length - 1];
  return head + comma + ' ' + conjunction + ' ' + tail;
}
```

**Complexity**
- Time: O(n)
- Space: O(n)

## 12. Reverse Words in a String

Problem URL: https://namastedev.com/practice/reverse-words-in-a-string
Difficulty: Medium

**Problem Statement**
Given a string, reverse the order of words and return a string with single spaces between words and no leading/trailing spaces.

**Example Cases**
1. Input: `s = "  hello   world  "`
   Output: `"world hello"`
   Explanation: Extra spaces are normalized.
2. Input: `s = "a good   example"`
   Output: `"example good a"`
   Explanation: Word order is reversed while each word remains unchanged.

**JavaScript Solution**
```javascript
function reverseWords(s) {
  return s.trim().split(/\s+/).reverse().join(' ');
}
```

**Complexity**
- Time: O(n)
- Space: O(n)

## 13. Throttle

Problem URL: https://namastedev.com/practice/throttle
Difficulty: Medium

**Problem Statement**
Implement throttle(fn, wait) so fn executes at most once per wait milliseconds, with configurable leading/trailing behavior.

**Example Cases**
1. Input: `Rapid calls every 20ms with wait=100ms`
   Output: `Function executes about once every 100ms`
   Explanation: Intermediate calls are skipped/coalesced depending on options.
2. Input: `options = { leading: false, trailing: true }`
   Output: `First call is delayed; latest args fire at end of window`
   Explanation: Useful for scroll/resize updates.

**JavaScript Solution**
```javascript
function throttle(fn, wait = 0, options = {}) {
  let timer = null;
  let lastCallTime = 0;
  let lastArgs;
  let lastThis;

  const leading = options.leading !== false;
  const trailing = options.trailing !== false;

  function invoke(now) {
    lastCallTime = now;
    fn.apply(lastThis, lastArgs);
    lastArgs = undefined;
    lastThis = undefined;
  }

  function startTimer(remaining) {
    timer = setTimeout(() => {
      timer = null;
      if (trailing && lastArgs) {
        invoke(Date.now());
      }
    }, remaining);
  }

  return function throttled(...args) {
    const now = Date.now();

    if (!lastCallTime && !leading) {
      lastCallTime = now;
    }

    const remaining = wait - (now - lastCallTime);
    lastArgs = args;
    lastThis = this;

    if (remaining <= 0 || remaining > wait) {
      if (timer) {
        clearTimeout(timer);
        timer = null;
      }
      invoke(now);
    } else if (!timer && trailing) {
      startTimer(remaining);
    }
  };
}
```

**Complexity**
- Time: O(1) per call
- Space: O(1)

## 14. Flatten Nested Objects

Problem URL: https://namastedev.com/practice/flatten-nested-objects
Difficulty: Medium

**Problem Statement**
Flatten a nested object into a single-level object where keys represent paths using dot notation (and array indices when needed).

**Example Cases**
1. Input: `obj = { user: { name: "A", address: { city: "Pune" } } }`
   Output: `{ "user.name": "A", "user.address.city": "Pune" }`
   Explanation: Nested keys are joined by dots.
2. Input: `obj = { tags: ["js", "ts"] }`
   Output: `{ "tags[0]": "js", "tags[1]": "ts" }`
   Explanation: Array indices are preserved in bracket format.

**JavaScript Solution**
```javascript
function flattenNestedObjects(obj) {
  const out = {};

  function walk(value, path) {
    if (Array.isArray(value)) {
      if (value.length === 0) {
        out[path] = [];
        return;
      }
      for (let i = 0; i < value.length; i += 1) {
        const nextPath = path ? path + '[' + i + ']' : '[' + i + ']';
        walk(value[i], nextPath);
      }
      return;
    }

    if (value && typeof value === 'object') {
      const keys = Object.keys(value);
      if (keys.length === 0) {
        out[path] = {};
        return;
      }

      for (const key of keys) {
        const nextPath = path ? path + '.' + key : key;
        walk(value[key], nextPath);
      }
      return;
    }

    out[path] = value;
  }

  for (const key of Object.keys(obj)) {
    walk(obj[key], key);
  }

  return out;
}
```

**Complexity**
- Time: O(N)
- Space: O(H) recursion + output

## 15. Priority Queue

Problem URL: https://namastedev.com/practice/priority-queue
Difficulty: Medium

**Problem Statement**
Implement a priority queue using a binary heap. Support insertion, peek, pop/remove highest-priority item, and size queries.

**Example Cases**
1. Input: `pq.push(5), pq.push(1), pq.push(3), pq.pop()`
   Output: `1 (for min-heap comparator)`
   Explanation: Smallest element is extracted first in a min-heap.
2. Input: `pq.size() after three pushes`
   Output: `3`
   Explanation: Size tracks number of elements in heap.

**JavaScript Solution**
```javascript
class PriorityQueue {
  constructor(compare = (a, b) => a - b) {
    this.heap = [];
    this.compare = compare;
  }

  size() {
    return this.heap.length;
  }

  peek() {
    return this.heap[0];
  }

  push(value) {
    this.heap.push(value);
    this.#bubbleUp(this.heap.length - 1);
  }

  pop() {
    if (this.heap.length === 0) return undefined;

    const top = this.heap[0];
    const last = this.heap.pop();

    if (this.heap.length > 0) {
      this.heap[0] = last;
      this.#bubbleDown(0);
    }

    return top;
  }

  #bubbleUp(index) {
    while (index > 0) {
      const parent = Math.floor((index - 1) / 2);
      if (this.compare(this.heap[index], this.heap[parent]) >= 0) break;
      [this.heap[index], this.heap[parent]] = [this.heap[parent], this.heap[index]];
      index = parent;
    }
  }

  #bubbleDown(index) {
    const n = this.heap.length;

    while (true) {
      let smallest = index;
      const left = 2 * index + 1;
      const right = 2 * index + 2;

      if (left < n && this.compare(this.heap[left], this.heap[smallest]) < 0) {
        smallest = left;
      }

      if (right < n && this.compare(this.heap[right], this.heap[smallest]) < 0) {
        smallest = right;
      }

      if (smallest === index) break;

      [this.heap[index], this.heap[smallest]] = [this.heap[smallest], this.heap[index]];
      index = smallest;
    }
  }
}
```

**Complexity**
- Time: push/pop O(log n), peek O(1)
- Space: O(n)

## 16. Find the Single Element in a Sorted Array

Problem URL: https://namastedev.com/practice/find-the-single-element-in-a-sorted-array
Difficulty: Medium

**Problem Statement**
In a sorted array where every element appears exactly twice except one element that appears once, find that single element in O(log n).

**Example Cases**
1. Input: `nums = [1,1,2,3,3,4,4,8,8]`
   Output: `2`
   Explanation: 2 is the only value without a pair.
2. Input: `nums = [3,3,7,7,10,11,11]`
   Output: `10`
   Explanation: Binary search uses pair-index alignment.

**JavaScript Solution**
```javascript
function singleElementInSortedArray(nums) {
  let left = 0;
  let right = nums.length - 1;

  while (left < right) {
    let mid = left + ((right - left) >> 1);
    if (mid % 2 === 1) mid -= 1;

    if (nums[mid] === nums[mid + 1]) {
      left = mid + 2;
    } else {
      right = mid;
    }
  }

  return nums[left];
}
```

**Complexity**
- Time: O(log n)
- Space: O(1)

## 17. Flatten Deep Object

Problem URL: https://namastedev.com/practice/flatten-deep-object
Difficulty: Medium

**Problem Statement**
Flatten a nested object into dot-separated key paths. For arrays, index positions are included as part of the key path.

**Example Cases**
1. Input: `obj = { a: { b: 1 }, c: [2,3] }`
   Output: `{ "a.b": 1, "c.0": 2, "c.1": 3 }`
   Explanation: All leaf nodes become flat entries.
2. Input: `obj = { x: {} }`
   Output: `{ "x": {} }`
   Explanation: Empty object is preserved as a leaf value.

**JavaScript Solution**
```javascript
function flattenDeepObject(obj) {
  const out = {};

  function walk(node, path) {
    if (Array.isArray(node)) {
      if (node.length === 0) {
        out[path] = [];
        return;
      }
      for (let i = 0; i < node.length; i += 1) {
        const nextPath = path ? path + '.' + i : String(i);
        walk(node[i], nextPath);
      }
      return;
    }

    if (node && typeof node === 'object') {
      const keys = Object.keys(node);
      if (keys.length === 0) {
        out[path] = {};
        return;
      }
      for (const key of keys) {
        const nextPath = path ? path + '.' + key : key;
        walk(node[key], nextPath);
      }
      return;
    }

    out[path] = node;
  }

  for (const key of Object.keys(obj)) {
    walk(obj[key], key);
  }

  return out;
}
```

**Complexity**
- Time: O(N)
- Space: O(H) recursion + output

## 18. Topological Sort (DFS)

Problem URL: https://namastedev.com/practice/topological-sort-dfs
Difficulty: Medium

**Problem Statement**
Given a DAG with vertices labeled 0..V-1 and directed edges [u,v], return a topological ordering using DFS. Return [] when a cycle exists.

**Example Cases**
1. Input: `V = 6, edges = [[5,2],[5,0],[4,0],[4,1],[2,3],[3,1]]`
   Output: `One valid order: [5,4,2,3,1,0]`
   Explanation: Every edge direction is respected in the ordering.
2. Input: `V = 2, edges = [[0,1],[1,0]]`
   Output: `[]`
   Explanation: Cycle means no topological ordering exists.

**JavaScript Solution**
```javascript
function topologicalSortDFS(vertices, edges) {
  const graph = Array.from({ length: vertices }, () => []);
  for (const [u, v] of edges) {
    graph[u].push(v);
  }

  const state = new Array(vertices).fill(0);
  const order = [];

  function dfs(node) {
    if (state[node] === 1) return false;
    if (state[node] === 2) return true;

    state[node] = 1;

    for (const next of graph[node]) {
      if (!dfs(next)) return false;
    }

    state[node] = 2;
    order.push(node);
    return true;
  }

  for (let node = 0; node < vertices; node += 1) {
    if (state[node] === 0 && !dfs(node)) {
      return [];
    }
  }

  return order.reverse();
}
```

**Complexity**
- Time: O(V + E)
- Space: O(V + E)

## 19. Implement Promise Race

Problem URL: https://namastedev.com/practice/implement-promise-race
Difficulty: Medium

**Problem Statement**
Polyfill Promise.race(iterable): return a promise that settles as soon as the first input promise/value settles.

**Example Cases**
1. Input: `race([delayResolve(100, "A"), delayResolve(10, "B")])`
   Output: `"B"`
   Explanation: Fastest settled promise wins.
2. Input: `race([Promise.reject("E"), delayResolve(50, "A")])`
   Output: `Rejects with "E"`
   Explanation: First settled can also be a rejection.

**JavaScript Solution**
```javascript
function promiseRace(iterable) {
  return new Promise((resolve, reject) => {
    let hasItems = false;

    for (const item of iterable) {
      hasItems = true;
      Promise.resolve(item).then(resolve, reject);
    }

    // If iterable is empty, native Promise.race returns a pending promise.
    if (!hasItems) {
      // Intentionally do nothing.
    }
  });
}
```

**Complexity**
- Time: O(n) to register handlers
- Space: O(1) extra

## 20. Lazy Evaluation

Problem URL: https://namastedev.com/practice/lazy-evaluation
Difficulty: Medium

**Problem Statement**
Create a lazy evaluator that supports function chaining and executes only when value() (or evaluate()) is called.

**Example Cases**
1. Input: `lazy(2).add(3).multiply(4).value()`
   Output: `20`
   Explanation: Execution happens at value(), not during chaining.
2. Input: `lazy(10).map(x => x - 1).map(x => x * 2).value()`
   Output: `18`
   Explanation: Custom transformations are queued and applied in order.

**JavaScript Solution**
```javascript
class LazyValue {
  constructor(initial) {
    this.initial = initial;
    this.operations = [];
  }

  map(fn) {
    this.operations.push(fn);
    return this;
  }

  add(n) {
    return this.map((x) => x + n);
  }

  multiply(n) {
    return this.map((x) => x * n);
  }

  value() {
    return this.operations.reduce((acc, fn) => fn(acc), this.initial);
  }
}

function lazy(initial) {
  return new LazyValue(initial);
}
```

**Complexity**
- Time: O(k) for k chained operations at evaluation
- Space: O(k)

## 21. Deep Clone Object

Problem URL: https://namastedev.com/practice/deep-clone-object
Difficulty: Medium

**Problem Statement**
Implement deep clone for nested JavaScript values (objects, arrays, Date, RegExp, Map, Set) while handling circular references.

**Example Cases**
1. Input: `obj = { a: 1, b: { c: 2 } }`
   Output: `cloned object with independent nested references`
   Explanation: Changing clone.b.c should not mutate original.b.c.
2. Input: `obj.self = obj`
   Output: `clone.self points to clone itself`
   Explanation: WeakMap avoids infinite recursion for cycles.

**JavaScript Solution**
```javascript
function deepClone(value, seen = new WeakMap()) {
  if (value === null || typeof value !== 'object') return value;

  if (seen.has(value)) {
    return seen.get(value);
  }

  if (value instanceof Date) {
    return new Date(value.getTime());
  }

  if (value instanceof RegExp) {
    return new RegExp(value.source, value.flags);
  }

  if (value instanceof Map) {
    const out = new Map();
    seen.set(value, out);
    for (const [k, v] of value.entries()) {
      out.set(deepClone(k, seen), deepClone(v, seen));
    }
    return out;
  }

  if (value instanceof Set) {
    const out = new Set();
    seen.set(value, out);
    for (const v of value.values()) {
      out.add(deepClone(v, seen));
    }
    return out;
  }

  const out = Array.isArray(value)
    ? []
    : Object.create(Object.getPrototypeOf(value));

  seen.set(value, out);

  for (const key of Reflect.ownKeys(value)) {
    const descriptor = Object.getOwnPropertyDescriptor(value, key);
    if (!descriptor) continue;

    if ('value' in descriptor) {
      descriptor.value = deepClone(descriptor.value, seen);
    }

    Object.defineProperty(out, key, descriptor);
  }

  return out;
}
```

**Complexity**
- Time: O(N)
- Space: O(N) including cloned structure and seen map

## 22. Detect Cycle in an Undirected Connected Graph (DFS)

Problem URL: https://namastedev.com/practice/detect-cycle-in-an-undirected-connected-graph-dfs
Difficulty: Medium

**Problem Statement**
Given an undirected graph and node count n, detect whether the connected component containing node 0 has a cycle using DFS and parent tracking.

**Example Cases**
1. Input: `n = 5, edges = [[0,1],[1,2],[2,0],[3,4]]`
   Output: `true`
   Explanation: Component containing 0 has cycle 0-1-2-0.
2. Input: `n = 4, edges = [[0,1],[1,2],[2,3]]`
   Output: `false`
   Explanation: Component containing 0 is a simple chain without back-edge.

**JavaScript Solution**
```javascript
function hasCycleFromZero(n, edges) {
  if (n <= 0) return false;

  const graph = Array.from({ length: n }, () => []);
  for (const [u, v] of edges) {
    graph[u].push(v);
    graph[v].push(u);
  }

  const visited = new Array(n).fill(false);

  function dfs(node, parent) {
    visited[node] = true;

    for (const next of graph[node]) {
      if (!visited[next]) {
        if (dfs(next, node)) return true;
      } else if (next !== parent) {
        return true;
      }
    }

    return false;
  }

  return dfs(0, -1);
}
```

**Complexity**
- Time: O(V + E) for reachable component from 0
- Space: O(V)

## 23. Rate Limiter

Problem URL: https://namastedev.com/practice/rate-limiter
Difficulty: Medium

**Problem Statement**
Implement a sliding-window rate limiter that allows at most limit requests in the last windowMs milliseconds per key (for example user/IP).

**Example Cases**
1. Input: `limit=3, windowMs=1000, requests at t=[0,100,200,300] for same key`
   Output: `true, true, true, false`
   Explanation: 4th request in same window is blocked.
2. Input: `After enough time passes beyond window`
   Output: `Requests become allowed again`
   Explanation: Expired timestamps are removed from window.

**JavaScript Solution**
```javascript
class SlidingWindowRateLimiter {
  constructor(limit, windowMs) {
    if (!Number.isInteger(limit) || limit <= 0) {
      throw new RangeError('limit must be a positive integer');
    }
    if (!Number.isInteger(windowMs) || windowMs <= 0) {
      throw new RangeError('windowMs must be a positive integer');
    }

    this.limit = limit;
    this.windowMs = windowMs;
    this.store = new Map();
  }

  isAllowed(key, now = Date.now()) {
    if (!this.store.has(key)) {
      this.store.set(key, []);
    }

    const queue = this.store.get(key);
    const cutoff = now - this.windowMs;

    while (queue.length > 0 && queue[0] <= cutoff) {
      queue.shift();
    }

    if (queue.length >= this.limit) {
      return false;
    }

    queue.push(now);
    return true;
  }
}
```

**Complexity**
- Time: Amortized O(1) per request
- Space: O(k) recent requests per key

## 24. Detect data type in JS

Problem URL: https://namastedev.com/practice/detect-data-type-in-js
Difficulty: Medium

**Problem Statement**
Create detectType(value) that returns a precise type string for common JavaScript values (null, array, date, map, set, etc.).

**Example Cases**
1. Input: `detectType([1,2,3])`
   Output: `"array"`
   Explanation: Array must be identified separately from object.
2. Input: `detectType(NaN)`
   Output: `"nan"`
   Explanation: NaN is a special numeric value.

**JavaScript Solution**
```javascript
function detectType(value) {
  if (value === null) return 'null';
  if (Number.isNaN(value)) return 'nan';

  const basic = typeof value;
  if (basic !== 'object') return basic;

  if (Array.isArray(value)) return 'array';
  if (value instanceof Date) return 'date';
  if (value instanceof RegExp) return 'regexp';
  if (value instanceof Map) return 'map';
  if (value instanceof Set) return 'set';
  if (value instanceof WeakMap) return 'weakmap';
  if (value instanceof WeakSet) return 'weakset';
  if (value instanceof Promise) return 'promise';
  if (value instanceof ArrayBuffer) return 'arraybuffer';
  if (ArrayBuffer.isView(value)) return value.constructor.name.toLowerCase();

  return 'object';
}
```

**Complexity**
- Time: O(1)
- Space: O(1)

## 25. Sum of Subarray Minimum

Problem URL: https://namastedev.com/practice/sum-of-subarray-minimum
Difficulty: Medium

**Problem Statement**
Given an array arr, compute the sum of the minimum value of every contiguous subarray. Return result modulo 1e9+7.

**Example Cases**
1. Input: `arr = [3,1,2,4]`
   Output: `17`
   Explanation: Subarray minimum sum is 17.
2. Input: `arr = [11,81,94,43,3]`
   Output: `444`
   Explanation: Monotonic stack computes each element contribution efficiently.

**JavaScript Solution**
```javascript
function sumSubarrayMinimums(arr) {
  const MOD = 1_000_000_007;
  const n = arr.length;
  const left = new Array(n);
  const right = new Array(n);
  const stack = [];

  // Distance to previous strictly smaller element.
  for (let i = 0; i < n; i += 1) {
    while (stack.length && arr[stack[stack.length - 1]] > arr[i]) {
      stack.pop();
    }
    left[i] = stack.length ? i - stack[stack.length - 1] : i + 1;
    stack.push(i);
  }

  stack.length = 0;

  // Distance to next smaller-or-equal element.
  for (let i = n - 1; i >= 0; i -= 1) {
    while (stack.length && arr[stack[stack.length - 1]] >= arr[i]) {
      stack.pop();
    }
    right[i] = stack.length ? stack[stack.length - 1] - i : n - i;
    stack.push(i);
  }

  let sum = 0;
  for (let i = 0; i < n; i += 1) {
    sum = (sum + arr[i] * left[i] * right[i]) % MOD;
  }

  return sum;
}
```

**Complexity**
- Time: O(n)
- Space: O(n)

## 26. Topological Sort (BFS)

Problem URL: https://namastedev.com/practice/topological-sort-bfs
Difficulty: Medium

**Problem Statement**
Given a directed graph, return a topological ordering using Kahn’s algorithm (BFS with in-degree). Return [] if cycle exists.

**Example Cases**
1. Input: `V = 4, edges = [[0,1],[0,2],[1,3],[2,3]]`
   Output: `One valid order: [0,1,2,3]`
   Explanation: Any order respecting all directed edges is valid.
2. Input: `V = 2, edges = [[0,1],[1,0]]`
   Output: `[]`
   Explanation: Cycle prevents full topological ordering.

**JavaScript Solution**
```javascript
function topologicalSortBFS(vertices, edges) {
  const graph = Array.from({ length: vertices }, () => []);
  const indegree = new Array(vertices).fill(0);

  for (const [u, v] of edges) {
    graph[u].push(v);
    indegree[v] += 1;
  }

  const queue = [];
  for (let i = 0; i < vertices; i += 1) {
    if (indegree[i] === 0) queue.push(i);
  }

  const order = [];
  for (let head = 0; head < queue.length; head += 1) {
    const node = queue[head];
    order.push(node);

    for (const next of graph[node]) {
      indegree[next] -= 1;
      if (indegree[next] === 0) queue.push(next);
    }
  }

  return order.length === vertices ? order : [];
}
```

**Complexity**
- Time: O(V + E)
- Space: O(V + E)

## 27. Concurrency Limited Task Scheduler

Problem URL: https://namastedev.com/practice/concurrency-limited-task-scheduler
Difficulty: Medium

**Problem Statement**
Given an array of async task functions and a concurrency limit, execute all tasks while running at most limit tasks simultaneously and return ordered results.

**Example Cases**
1. Input: `tasks = [t1,t2,t3,t4], limit = 2`
   Output: `[result1, result2, result3, result4]`
   Explanation: Tasks complete in any order internally but output aligns to input index.
2. Input: `Any task throws/rejects`
   Output: `Scheduler rejects`
   Explanation: Error is propagated to caller.

**JavaScript Solution**
```javascript
async function runTasksWithConcurrencyLimit(tasks, limit) {
  if (!Array.isArray(tasks)) throw new TypeError('tasks must be an array');
  if (!Number.isInteger(limit) || limit <= 0) {
    throw new RangeError('limit must be a positive integer');
  }

  const results = new Array(tasks.length);
  let next = 0;

  async function worker() {
    while (true) {
      const index = next;
      next += 1;
      if (index >= tasks.length) break;

      const task = tasks[index];
      if (typeof task !== 'function') {
        throw new TypeError('Each task must be a function returning a promise');
      }

      results[index] = await task();
    }
  }

  const workerCount = Math.min(limit, tasks.length);
  const workers = Array.from({ length: workerCount }, () => worker());
  await Promise.all(workers);

  return results;
}
```

**Complexity**
- Time: O(n) async tasks
- Space: O(n)

## 28. Spiral Matrix Pathfinder

Problem URL: https://namastedev.com/practice/spiral-matrix-pathfinder
Difficulty: Medium

**Problem Statement**
Traverse a matrix in spiral order and collect values while skipping blocked cells marked as -1.

**Example Cases**
1. Input: `matrix = [[1,2,3],[4,-1,5],[6,7,8]]`
   Output: `[1,2,3,5,8,7,6,4]`
   Explanation: Center blocked cell is skipped during traversal.
2. Input: `matrix = [[-1]]`
   Output: `[]`
   Explanation: Only cell is blocked.

**JavaScript Solution**
```javascript
function spiralMatrixPathfinder(matrix) {
  if (!matrix.length || !matrix[0].length) return [];

  const out = [];
  let top = 0;
  let bottom = matrix.length - 1;
  let left = 0;
  let right = matrix[0].length - 1;

  while (top <= bottom && left <= right) {
    for (let c = left; c <= right; c += 1) {
      if (matrix[top][c] !== -1) out.push(matrix[top][c]);
    }
    top += 1;

    for (let r = top; r <= bottom; r += 1) {
      if (matrix[r][right] !== -1) out.push(matrix[r][right]);
    }
    right -= 1;

    if (top <= bottom) {
      for (let c = right; c >= left; c -= 1) {
        if (matrix[bottom][c] !== -1) out.push(matrix[bottom][c]);
      }
      bottom -= 1;
    }

    if (left <= right) {
      for (let r = bottom; r >= top; r -= 1) {
        if (matrix[r][left] !== -1) out.push(matrix[r][left]);
      }
      left += 1;
    }
  }

  return out;
}
```

**Complexity**
- Time: O(m*n)
- Space: O(1) extra (excluding output)

## 29. Event Emitter

Problem URL: https://namastedev.com/practice/event-emitter
Difficulty: Medium

**Problem Statement**
Design an EventEmitter class supporting on, off, once, and emit similar to Node.js event handling.

**Example Cases**
1. Input: `on("data", cb); emit("data", 10)`
   Output: `cb called with 10`
   Explanation: Registered listeners receive emitted arguments.
2. Input: `once("ready", cb); emit("ready"); emit("ready")`
   Output: `cb executes only once`
   Explanation: once auto-unsubscribes after first call.

**JavaScript Solution**
```javascript
class EventEmitter {
  constructor() {
    this.events = new Map();
  }

  on(event, handler) {
    if (!this.events.has(event)) {
      this.events.set(event, new Set());
    }
    this.events.get(event).add(handler);
    return () => this.off(event, handler);
  }

  off(event, handler) {
    const set = this.events.get(event);
    if (!set) return;
    set.delete(handler);
    if (set.size === 0) this.events.delete(event);
  }

  once(event, handler) {
    const off = this.on(event, (...args) => {
      off();
      handler(...args);
    });
    return off;
  }

  emit(event, ...args) {
    const set = this.events.get(event);
    if (!set) return false;

    for (const handler of [...set]) {
      handler(...args);
    }
    return true;
  }

  listenerCount(event) {
    return this.events.get(event)?.size || 0;
  }
}
```

**Complexity**
- Time: emit O(k) where k=listeners for event
- Space: O(total listeners)

## 30. Search in a 2D Sorted Matrix

Problem URL: https://namastedev.com/practice/search-in-a-2d-sorted-matrix
Difficulty: Medium

**Problem Statement**
Given a matrix where each row is sorted and rows follow global sorted order (first element of row i is greater than last element of row i-1), determine if target exists.

**Example Cases**
1. Input: `matrix = [[1,3,5],[7,9,11]], target = 9`
   Output: `true`
   Explanation: Binary search over virtual flattened array finds target.
2. Input: `matrix = [[1,3,5],[7,9,11]], target = 6`
   Output: `false`
   Explanation: 6 is not present in matrix.

**JavaScript Solution**
```javascript
function searchInSortedMatrix(matrix, target) {
  if (!matrix.length || !matrix[0].length) return false;

  const rows = matrix.length;
  const cols = matrix[0].length;
  let left = 0;
  let right = rows * cols - 1;

  while (left <= right) {
    const mid = left + ((right - left) >> 1);
    const r = Math.floor(mid / cols);
    const c = mid % cols;
    const value = matrix[r][c];

    if (value === target) return true;
    if (value < target) left = mid + 1;
    else right = mid - 1;
  }

  return false;
}
```

**Complexity**
- Time: O(log(m*n))
- Space: O(1)

## 31. Merge Array

Problem URL: https://namastedev.com/practice/merge-array
Difficulty: Medium

**Problem Statement**
Merge multiple arrays of objects by id. If same id appears multiple times, merge properties with later arrays overriding earlier ones.

**Example Cases**
1. Input: `arr1=[{id:1,name:"A"}], arr2=[{id:1,age:20},{id:2,name:"B"}]`
   Output: `[{id:1,name:"A",age:20},{id:2,name:"B"}]`
   Explanation: id=1 objects are merged into one.
2. Input: `array item without id`
   Output: `ignored`
   Explanation: Only records with valid id participate in merge.

**JavaScript Solution**
```javascript
function mergeArrayById(...arrays) {
  const map = new Map();

  for (const arr of arrays) {
    for (const item of arr) {
      if (!item || item.id === undefined || item.id === null) continue;

      const prev = map.get(item.id) || {};
      map.set(item.id, { ...prev, ...item });
    }
  }

  return Array.from(map.values());
}
```

**Complexity**
- Time: O(n)
- Space: O(u) where u=unique ids

## 32. Memoization

Problem URL: https://namastedev.com/practice/memoization
Difficulty: Medium

**Problem Statement**
Implement a memoize utility that caches function results based on arguments so repeated calls avoid recomputation.

**Example Cases**
1. Input: `memoFib(40) called twice`
   Output: `Second call returns instantly from cache`
   Explanation: Stored result is reused for same arguments.
2. Input: `memoizedFn(2,3) and memoizedFn(3,2)`
   Output: `Can be cached separately unless custom resolver normalizes key`
   Explanation: Cache key strategy is configurable.

**JavaScript Solution**
```javascript
function memoize(fn, resolver) {
  const cache = new Map();

  return function memoized(...args) {
    const key = resolver ? resolver.apply(this, args) : JSON.stringify(args);

    if (cache.has(key)) {
      return cache.get(key);
    }

    const value = fn.apply(this, args);
    cache.set(key, value);
    return value;
  };
}
```

**Complexity**
- Time: O(1) average cache lookup + function cost on miss
- Space: O(number of unique keys)

## 33. Shortest Distance from Source (BFS)

Problem URL: https://namastedev.com/practice/shortest-distance-from-source-bfs
Difficulty: Medium

**Problem Statement**
Given an unweighted graph with n nodes and edges, compute shortest distance from source to all nodes using BFS. Unreachable nodes get -1.

**Example Cases**
1. Input: `n=5, edges=[[0,1],[0,2],[1,3],[2,4]], source=0`
   Output: `[0,1,1,2,2]`
   Explanation: BFS discovers nodes layer-by-layer.
2. Input: `n=4, edges=[[0,1]], source=0`
   Output: `[0,1,-1,-1]`
   Explanation: Nodes 2 and 3 are disconnected from source.

**JavaScript Solution**
```javascript
function shortestDistanceFromSource(n, edges, source) {
  const graph = Array.from({ length: n }, () => []);

  for (const [u, v] of edges) {
    graph[u].push(v);
    graph[v].push(u);
  }

  const dist = new Array(n).fill(-1);
  const queue = [source];
  dist[source] = 0;

  for (let head = 0; head < queue.length; head += 1) {
    const node = queue[head];

    for (const next of graph[node]) {
      if (dist[next] !== -1) continue;
      dist[next] = dist[node] + 1;
      queue.push(next);
    }
  }

  return dist;
}
```

**Complexity**
- Time: O(V + E)
- Space: O(V + E)

## 34. Longest Substring No Repeats

Problem URL: https://namastedev.com/practice/longest-substring-no-repeats
Difficulty: Medium

**Problem Statement**
Return the length of the longest substring without repeating characters using a sliding-window approach.

**Example Cases**
1. Input: `s = "abcabcbb"`
   Output: `3`
   Explanation: Longest substrings are "abc", length 3.
2. Input: `s = "bbbbb"`
   Output: `1`
   Explanation: Only one unique char at a time.

**JavaScript Solution**
```javascript
function lengthOfLongestSubstring(s) {
  const lastSeen = new Map();
  let left = 0;
  let best = 0;

  for (let right = 0; right < s.length; right += 1) {
    const ch = s[right];

    if (lastSeen.has(ch) && lastSeen.get(ch) >= left) {
      left = lastSeen.get(ch) + 1;
    }

    lastSeen.set(ch, right);
    best = Math.max(best, right - left + 1);
  }

  return best;
}
```

**Complexity**
- Time: O(n)
- Space: O(min(n, charset))

## 35. Object.assign()

Problem URL: https://namastedev.com/practice/objectassign
Difficulty: Medium

**Problem Statement**
Recreate Object.assign(target, ...sources): copy enumerable own properties (including symbols) from sources to target and return target.

**Example Cases**
1. Input: `assign({a:1}, {b:2}, {a:3})`
   Output: `{a:3,b:2}`
   Explanation: Later sources override earlier values for same key.
2. Input: `assign(null, {a:1})`
   Output: `TypeError`
   Explanation: Target cannot be null or undefined.

**JavaScript Solution**
```javascript
function objectAssign(target, ...sources) {
  if (target === null || target === undefined) {
    throw new TypeError('Cannot convert undefined or null to object');
  }

  const to = Object(target);

  for (const source of sources) {
    if (source === null || source === undefined) continue;

    const from = Object(source);
    for (const key of Reflect.ownKeys(from)) {
      if (Object.prototype.propertyIsEnumerable.call(from, key)) {
        to[key] = from[key];
      }
    }
  }

  return to;
}
```

**Complexity**
- Time: O(total enumerable keys)
- Space: O(1) extra

## 36. Oranges Rotting

Problem URL: https://namastedev.com/practice/oranges-rotting
Difficulty: Medium

**Problem Statement**
In a grid, 0=empty, 1=fresh orange, 2=rotten orange. Every minute, fresh oranges adjacent to rotten ones become rotten. Return minutes needed to rot all fresh oranges, or -1 if impossible.

**Example Cases**
1. Input: `grid = [[2,1,1],[1,1,0],[0,1,1]]`
   Output: `4`
   Explanation: BFS from all initially rotten oranges tracks minute levels.
2. Input: `grid = [[2,1,1],[0,1,1],[1,0,1]]`
   Output: `-1`
   Explanation: Some fresh oranges remain isolated forever.

**JavaScript Solution**
```javascript
function orangesRotting(grid) {
  const rows = grid.length;
  const cols = grid[0].length;
  const queue = [];
  let fresh = 0;

  for (let r = 0; r < rows; r += 1) {
    for (let c = 0; c < cols; c += 1) {
      if (grid[r][c] === 2) {
        queue.push([r, c, 0]);
      } else if (grid[r][c] === 1) {
        fresh += 1;
      }
    }
  }

  const dirs = [
    [1, 0],
    [-1, 0],
    [0, 1],
    [0, -1]
  ];

  let minutes = 0;

  for (let head = 0; head < queue.length; head += 1) {
    const [r, c, time] = queue[head];
    minutes = Math.max(minutes, time);

    for (const [dr, dc] of dirs) {
      const nr = r + dr;
      const nc = c + dc;

      if (nr < 0 || nr >= rows || nc < 0 || nc >= cols) continue;
      if (grid[nr][nc] !== 1) continue;

      grid[nr][nc] = 2;
      fresh -= 1;
      queue.push([nr, nc, time + 1]);
    }
  }

  return fresh === 0 ? minutes : -1;
}
```

**Complexity**
- Time: O(m*n)
- Space: O(m*n) queue in worst case

## 37. Compress String with Limited Repetition

Problem URL: https://namastedev.com/practice/compress-string-with-limited-repetition
Difficulty: Medium

**Problem Statement**
Compress a string using run-length encoding by replacing repeated consecutive characters with char + count. Optionally split counts by maxRun.

**Example Cases**
1. Input: `str = "aaabbc"`
   Output: `"a3b2c"`
   Explanation: Single occurrence keeps only character; repeated ones append count.
2. Input: `str = "aaaaaa", maxRun = 4`
   Output: `"a4a2"`
   Explanation: Runs are split so each encoded chunk count <= maxRun.

**JavaScript Solution**
```javascript
function compressStringWithLimitedRepetition(str, maxRun = Infinity) {
  if (typeof str !== 'string' || str.length === 0) return '';
  if (maxRun <= 0) throw new RangeError('maxRun must be > 0');

  let out = '';
  let i = 0;

  while (i < str.length) {
    const ch = str[i];
    let j = i;

    while (j < str.length && str[j] === ch) {
      j += 1;
    }

    let count = j - i;

    while (count > maxRun) {
      out += ch + String(maxRun);
      count -= maxRun;
    }

    out += ch;
    if (count > 1) out += String(count);

    i = j;
  }

  return out;
}
```

**Complexity**
- Time: O(n)
- Space: O(n) output

