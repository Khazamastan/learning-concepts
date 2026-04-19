import fs from 'node:fs/promises';
import path from 'node:path';

const ROOT = '/Users/kbellamk/Workspace/learnersbucket';
const DEFAULT_PROBLEMS_FILE = path.join(ROOT, 'namastedev-output/problems.json');
const DEFAULT_MARKDOWN_FILE = path.join(ROOT, 'namastedev-output/full-solutions.md');
const DEFAULT_JSON_FILE = path.join(ROOT, 'namastedev-output/problems.enriched.json');

function normalize(value) {
  return String(value || '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, ' ')
    .trim();
}

const SOLUTIONS = {};

function define(title, entry) {
  SOLUTIONS[normalize(title)] = entry;
}

define('pyramid pattern', {
  statement:
    'Given an integer n, build a centered pyramid pattern using * where row i contains (2*i - 1) stars and leading spaces so that the pyramid is centered.',
  examples: [
    {
      input: 'n = 4',
      output: '"   *\\n  ***\\n *****\\n*******"',
      explanation: 'Each row grows by 2 stars and decreases one leading space.'
    },
    {
      input: 'n = 1',
      output: '"*"',
      explanation: 'Single row is the smallest valid pyramid.'
    }
  ],
  code: String.raw`function pyramidPattern(n) {
  if (!Number.isInteger(n) || n <= 0) return '';

  const rows = [];
  for (let i = 1; i <= n; i += 1) {
    const spaces = ' '.repeat(n - i);
    const stars = '*'.repeat(2 * i - 1);
    rows.push(spaces + stars);
  }

  return rows.join('\n');
}`,
  complexity: { time: 'O(n^2)', space: 'O(n^2) due to output size' }
});

define('Deep Omit', {
  statement:
    'Given a nested object/array and a list of keys, remove those keys at every depth while preserving the rest of the structure.',
  examples: [
    {
      input: 'obj = { a: 1, b: { c: 2, d: 3 }, e: [{ c: 4, f: 5 }] }, keys = ["c"]',
      output: '{ a: 1, b: { d: 3 }, e: [{ f: 5 }] }',
      explanation: 'Key c is removed everywhere in objects, including objects inside arrays.'
    },
    {
      input: 'obj = { keep: true }, keys = ["x"]',
      output: '{ keep: true }',
      explanation: 'If key does not exist, object remains unchanged.'
    }
  ],
  code: String.raw`function deepOmit(value, keysToOmit) {
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
}`,
  complexity: { time: 'O(N)', space: 'O(H) recursion + output' }
});

define('Debounce', {
  statement:
    'Implement debounce(fn, wait) so fn runs only after there has been no new call for wait milliseconds. Preserve this and latest arguments.',
  examples: [
    {
      input: 'Calls at t=0ms, 50ms, 90ms with wait=100ms',
      output: 'Only one execution at ~190ms with last call arguments',
      explanation: 'Timer resets on every new call.'
    },
    {
      input: 'debounced.cancel()',
      output: 'Pending invocation is dropped',
      explanation: 'Useful when component unmounts or route changes.'
    }
  ],
  code: String.raw`function debounce(fn, wait = 0) {
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
}`,
  complexity: { time: 'O(1) per call', space: 'O(1)' }
});

define('Word Search', {
  statement:
    'Given a 2D board and a list of words, return all words that can be formed by sequentially adjacent cells (up/down/left/right) without reusing a cell in the same word path.',
  examples: [
    {
      input: 'board = [["o","a","a","n"],["e","t","a","e"],["i","h","k","r"],["i","f","l","v"]], words = ["oath","pea","eat","rain"]',
      output: '["oath", "eat"]',
      explanation: 'Only oath and eat can be traced by valid adjacent paths.'
    },
    {
      input: 'board = [["a","b"],["c","d"]], words = ["abcb"]',
      output: '[]',
      explanation: 'Cell reuse in a single path is not allowed.'
    }
  ],
  code: String.raw`function findWords(board, words) {
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
}`,
  complexity: { time: 'O(M*N*4^L) worst case, usually lower with Trie pruning', space: 'O(total chars in words + L recursion)' }
});

define('Combination Sum', {
  statement:
    'Given distinct candidate numbers and a target, return all unique combinations where chosen numbers sum to target. You can use a candidate multiple times.',
  examples: [
    {
      input: 'candidates = [2,3,6,7], target = 7',
      output: '[[2,2,3],[7]]',
      explanation: 'Both combinations sum to 7.'
    },
    {
      input: 'candidates = [2,4], target = 5',
      output: '[]',
      explanation: 'No valid combination exists.'
    }
  ],
  code: String.raw`function combinationSum(candidates, target) {
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
}`,
  complexity: { time: 'Exponential in number of combinations', space: 'O(target) recursion depth (excluding output)' }
});

define('Map Async Limit', {
  statement:
    'Run an async mapper over an array while allowing at most limit operations in parallel, and return results in input order.',
  examples: [
    {
      input: 'items = [1,2,3,4], limit = 2, mapper = async x => x * 2',
      output: '[2,4,6,8]',
      explanation: 'Only 2 mapper calls run concurrently at any time.'
    },
    {
      input: 'items = [], limit = 3',
      output: '[]',
      explanation: 'Empty input returns immediately.'
    }
  ],
  code: String.raw`async function mapAsyncLimit(items, limit, mapper) {
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
}`,
  complexity: { time: 'O(n) async tasks', space: 'O(n)' }
});

define('Search Rotated Array', {
  statement:
    'Given a rotated sorted array with distinct elements, return the index of target using O(log n) time, or -1 if not present.',
  examples: [
    {
      input: 'nums = [4,5,6,7,0,1,2], target = 0',
      output: '4',
      explanation: '0 is located at index 4.'
    },
    {
      input: 'nums = [4,5,6,7,0,1,2], target = 3',
      output: '-1',
      explanation: '3 does not exist in the array.'
    }
  ],
  code: String.raw`function searchRotatedArray(nums, target) {
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
}`,
  complexity: { time: 'O(log n)', space: 'O(1)' }
});

define('Sum of Consecutive Integers', {
  statement:
    'Return true if n can be represented as the sum of two or more consecutive positive integers, otherwise false.',
  examples: [
    {
      input: 'n = 15',
      output: 'true',
      explanation: '15 = 1+2+3+4+5 and also 4+5+6.'
    },
    {
      input: 'n = 8',
      output: 'false',
      explanation: '8 cannot be written as sum of >=2 consecutive positive integers.'
    }
  ],
  code: String.raw`function canBeSumOfConsecutiveIntegers(n) {
  if (!Number.isInteger(n) || n < 3) return false;

  for (let len = 2; (len * (len + 1)) / 2 <= n; len += 1) {
    const numerator = n - (len * (len - 1)) / 2;
    if (numerator > 0 && numerator % len === 0) {
      return true;
    }
  }

  return false;
}`,
  complexity: { time: 'O(sqrt(n))', space: 'O(1)' }
});

define('PromiseAll With Concurrency Limit', {
  statement:
    'Implement Promise.all behavior for an array of async task functions, but run at most limit tasks in parallel and preserve result order.',
  examples: [
    {
      input: 'tasks = [() => Promise.resolve(1), () => Promise.resolve(2)], limit = 1',
      output: '[1,2]',
      explanation: 'Runs sequentially due to limit=1 but keeps output ordering.'
    },
    {
      input: 'One task rejects',
      output: 'Promise rejects immediately with that error',
      explanation: 'Matches Promise.all fail-fast behavior.'
    }
  ],
  code: String.raw`function promiseAllWithConcurrencyLimit(taskFns, limit) {
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
}`,
  complexity: { time: 'O(n) async tasks', space: 'O(n)' }
});

define('JSON.stringify', {
  statement:
    'Implement a custom JSON stringify function for primitives, arrays, and objects with cycle detection and behavior close to native JSON.stringify.',
  examples: [
    {
      input: 'value = { a: 1, b: [true, null, "x"] }',
      output: '"{\\"a\\":1,\\"b\\":[true,null,\\"x\\"]}"',
      explanation: 'Objects and arrays are serialized recursively.'
    },
    {
      input: 'value has circular reference',
      output: 'Throws TypeError',
      explanation: 'Circular structures cannot be serialized to standard JSON.'
    }
  ],
  code: String.raw`function customJSONStringify(value) {
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
}`,
  complexity: { time: 'O(N)', space: 'O(H) recursion + cycle set' }
});

define('List Format', {
  statement:
    'Convert an array of strings into a human-readable list, for example: ["A","B","C"] -> "A, B, and C".',
  examples: [
    {
      input: 'items = ["Alice", "Bob", "Charlie"]',
      output: '"Alice, Bob, and Charlie"',
      explanation: 'Three or more items are comma-separated with conjunction before the last item.'
    },
    {
      input: 'items = ["Alice", "Bob"]',
      output: '"Alice and Bob"',
      explanation: 'Two items are joined directly with conjunction.'
    }
  ],
  code: String.raw`function listFormat(items, options = {}) {
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
}`,
  complexity: { time: 'O(n)', space: 'O(n)' }
});

define('Reverse Words in a String', {
  statement:
    'Given a string, reverse the order of words and return a string with single spaces between words and no leading/trailing spaces.',
  examples: [
    {
      input: 's = "  hello   world  "',
      output: '"world hello"',
      explanation: 'Extra spaces are normalized.'
    },
    {
      input: 's = "a good   example"',
      output: '"example good a"',
      explanation: 'Word order is reversed while each word remains unchanged.'
    }
  ],
  code: String.raw`function reverseWords(s) {
  return s.trim().split(/\s+/).reverse().join(' ');
}`,
  complexity: { time: 'O(n)', space: 'O(n)' }
});

define('Throttle', {
  statement:
    'Implement throttle(fn, wait) so fn executes at most once per wait milliseconds, with configurable leading/trailing behavior.',
  examples: [
    {
      input: 'Rapid calls every 20ms with wait=100ms',
      output: 'Function executes about once every 100ms',
      explanation: 'Intermediate calls are skipped/coalesced depending on options.'
    },
    {
      input: 'options = { leading: false, trailing: true }',
      output: 'First call is delayed; latest args fire at end of window',
      explanation: 'Useful for scroll/resize updates.'
    }
  ],
  code: String.raw`function throttle(fn, wait = 0, options = {}) {
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
}`,
  complexity: { time: 'O(1) per call', space: 'O(1)' }
});

define('Flatten Nested Objects', {
  statement:
    'Flatten a nested object into a single-level object where keys represent paths using dot notation (and array indices when needed).',
  examples: [
    {
      input: 'obj = { user: { name: "A", address: { city: "Pune" } } }',
      output: '{ "user.name": "A", "user.address.city": "Pune" }',
      explanation: 'Nested keys are joined by dots.'
    },
    {
      input: 'obj = { tags: ["js", "ts"] }',
      output: '{ "tags[0]": "js", "tags[1]": "ts" }',
      explanation: 'Array indices are preserved in bracket format.'
    }
  ],
  code: String.raw`function flattenNestedObjects(obj) {
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
}`,
  complexity: { time: 'O(N)', space: 'O(H) recursion + output' }
});

define('Priority Queue', {
  statement:
    'Implement a priority queue using a binary heap. Support insertion, peek, pop/remove highest-priority item, and size queries.',
  examples: [
    {
      input: 'pq.push(5), pq.push(1), pq.push(3), pq.pop()',
      output: '1 (for min-heap comparator)',
      explanation: 'Smallest element is extracted first in a min-heap.'
    },
    {
      input: 'pq.size() after three pushes',
      output: '3',
      explanation: 'Size tracks number of elements in heap.'
    }
  ],
  code: String.raw`class PriorityQueue {
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
}`,
  complexity: { time: 'push/pop O(log n), peek O(1)', space: 'O(n)' }
});

define('Find the Single Element in a Sorted Array', {
  statement:
    'In a sorted array where every element appears exactly twice except one element that appears once, find that single element in O(log n).',
  examples: [
    {
      input: 'nums = [1,1,2,3,3,4,4,8,8]',
      output: '2',
      explanation: '2 is the only value without a pair.'
    },
    {
      input: 'nums = [3,3,7,7,10,11,11]',
      output: '10',
      explanation: 'Binary search uses pair-index alignment.'
    }
  ],
  code: String.raw`function singleElementInSortedArray(nums) {
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
}`,
  complexity: { time: 'O(log n)', space: 'O(1)' }
});

define('Flatten Deep Object', {
  statement:
    'Flatten a nested object into dot-separated key paths. For arrays, index positions are included as part of the key path.',
  examples: [
    {
      input: 'obj = { a: { b: 1 }, c: [2,3] }',
      output: '{ "a.b": 1, "c.0": 2, "c.1": 3 }',
      explanation: 'All leaf nodes become flat entries.'
    },
    {
      input: 'obj = { x: {} }',
      output: '{ "x": {} }',
      explanation: 'Empty object is preserved as a leaf value.'
    }
  ],
  code: String.raw`function flattenDeepObject(obj) {
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
}`,
  complexity: { time: 'O(N)', space: 'O(H) recursion + output' }
});

define('Topological Sort (DFS)', {
  statement:
    'Given a DAG with vertices labeled 0..V-1 and directed edges [u,v], return a topological ordering using DFS. Return [] when a cycle exists.',
  examples: [
    {
      input: 'V = 6, edges = [[5,2],[5,0],[4,0],[4,1],[2,3],[3,1]]',
      output: 'One valid order: [5,4,2,3,1,0]',
      explanation: 'Every edge direction is respected in the ordering.'
    },
    {
      input: 'V = 2, edges = [[0,1],[1,0]]',
      output: '[]',
      explanation: 'Cycle means no topological ordering exists.'
    }
  ],
  code: String.raw`function topologicalSortDFS(vertices, edges) {
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
}`,
  complexity: { time: 'O(V + E)', space: 'O(V + E)' }
});

define('Implement Promise Race', {
  statement:
    'Polyfill Promise.race(iterable): return a promise that settles as soon as the first input promise/value settles.',
  examples: [
    {
      input: 'race([delayResolve(100, "A"), delayResolve(10, "B")])',
      output: '"B"',
      explanation: 'Fastest settled promise wins.'
    },
    {
      input: 'race([Promise.reject("E"), delayResolve(50, "A")])',
      output: 'Rejects with "E"',
      explanation: 'First settled can also be a rejection.'
    }
  ],
  code: String.raw`function promiseRace(iterable) {
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
}`,
  complexity: { time: 'O(n) to register handlers', space: 'O(1) extra' }
});

define('Lazy Evaluation', {
  statement:
    'Create a lazy evaluator that supports function chaining and executes only when value() (or evaluate()) is called.',
  examples: [
    {
      input: 'lazy(2).add(3).multiply(4).value()',
      output: '20',
      explanation: 'Execution happens at value(), not during chaining.'
    },
    {
      input: 'lazy(10).map(x => x - 1).map(x => x * 2).value()',
      output: '18',
      explanation: 'Custom transformations are queued and applied in order.'
    }
  ],
  code: String.raw`class LazyValue {
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
}`,
  complexity: { time: 'O(k) for k chained operations at evaluation', space: 'O(k)' }
});

define('Deep Clone Object', {
  statement:
    'Implement deep clone for nested JavaScript values (objects, arrays, Date, RegExp, Map, Set) while handling circular references.',
  examples: [
    {
      input: 'obj = { a: 1, b: { c: 2 } }',
      output: 'cloned object with independent nested references',
      explanation: 'Changing clone.b.c should not mutate original.b.c.'
    },
    {
      input: 'obj.self = obj',
      output: 'clone.self points to clone itself',
      explanation: 'WeakMap avoids infinite recursion for cycles.'
    }
  ],
  code: String.raw`function deepClone(value, seen = new WeakMap()) {
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
}`,
  complexity: { time: 'O(N)', space: 'O(N) including cloned structure and seen map' }
});

define('Detect Cycle in an Undirected Connected Graph (DFS)', {
  statement:
    'Given an undirected graph and node count n, detect whether the connected component containing node 0 has a cycle using DFS and parent tracking.',
  examples: [
    {
      input: 'n = 5, edges = [[0,1],[1,2],[2,0],[3,4]]',
      output: 'true',
      explanation: 'Component containing 0 has cycle 0-1-2-0.'
    },
    {
      input: 'n = 4, edges = [[0,1],[1,2],[2,3]]',
      output: 'false',
      explanation: 'Component containing 0 is a simple chain without back-edge.'
    }
  ],
  code: String.raw`function hasCycleFromZero(n, edges) {
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
}`,
  complexity: { time: 'O(V + E) for reachable component from 0', space: 'O(V)' }
});

define('Rate Limiter', {
  statement:
    'Implement a sliding-window rate limiter that allows at most limit requests in the last windowMs milliseconds per key (for example user/IP).',
  examples: [
    {
      input: 'limit=3, windowMs=1000, requests at t=[0,100,200,300] for same key',
      output: 'true, true, true, false',
      explanation: '4th request in same window is blocked.'
    },
    {
      input: 'After enough time passes beyond window',
      output: 'Requests become allowed again',
      explanation: 'Expired timestamps are removed from window.'
    }
  ],
  code: String.raw`class SlidingWindowRateLimiter {
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
}`,
  complexity: { time: 'Amortized O(1) per request', space: 'O(k) recent requests per key' }
});

define('Detect data type in JS', {
  statement:
    'Create detectType(value) that returns a precise type string for common JavaScript values (null, array, date, map, set, etc.).',
  examples: [
    {
      input: 'detectType([1,2,3])',
      output: '"array"',
      explanation: 'Array must be identified separately from object.'
    },
    {
      input: 'detectType(NaN)',
      output: '"nan"',
      explanation: 'NaN is a special numeric value.'
    }
  ],
  code: String.raw`function detectType(value) {
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
}`,
  complexity: { time: 'O(1)', space: 'O(1)' }
});

define('Sum of Subarray Minimum', {
  statement:
    'Given an array arr, compute the sum of the minimum value of every contiguous subarray. Return result modulo 1e9+7.',
  examples: [
    {
      input: 'arr = [3,1,2,4]',
      output: '17',
      explanation: 'Subarray minimum sum is 17.'
    },
    {
      input: 'arr = [11,81,94,43,3]',
      output: '444',
      explanation: 'Monotonic stack computes each element contribution efficiently.'
    }
  ],
  code: String.raw`function sumSubarrayMinimums(arr) {
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
}`,
  complexity: { time: 'O(n)', space: 'O(n)' }
});

define('Topological Sort (BFS)', {
  statement:
    'Given a directed graph, return a topological ordering using Kahn’s algorithm (BFS with in-degree). Return [] if cycle exists.',
  examples: [
    {
      input: 'V = 4, edges = [[0,1],[0,2],[1,3],[2,3]]',
      output: 'One valid order: [0,1,2,3]',
      explanation: 'Any order respecting all directed edges is valid.'
    },
    {
      input: 'V = 2, edges = [[0,1],[1,0]]',
      output: '[]',
      explanation: 'Cycle prevents full topological ordering.'
    }
  ],
  code: String.raw`function topologicalSortBFS(vertices, edges) {
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
}`,
  complexity: { time: 'O(V + E)', space: 'O(V + E)' }
});

define('Concurrency Limited Task Scheduler', {
  statement:
    'Given an array of async task functions and a concurrency limit, execute all tasks while running at most limit tasks simultaneously and return ordered results.',
  examples: [
    {
      input: 'tasks = [t1,t2,t3,t4], limit = 2',
      output: '[result1, result2, result3, result4]',
      explanation: 'Tasks complete in any order internally but output aligns to input index.'
    },
    {
      input: 'Any task throws/rejects',
      output: 'Scheduler rejects',
      explanation: 'Error is propagated to caller.'
    }
  ],
  code: String.raw`async function runTasksWithConcurrencyLimit(tasks, limit) {
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
}`,
  complexity: { time: 'O(n) async tasks', space: 'O(n)' }
});

define('Spiral Matrix Pathfinder', {
  statement:
    'Traverse a matrix in spiral order and collect values while skipping blocked cells marked as -1.',
  examples: [
    {
      input: 'matrix = [[1,2,3],[4,-1,5],[6,7,8]]',
      output: '[1,2,3,5,8,7,6,4]',
      explanation: 'Center blocked cell is skipped during traversal.'
    },
    {
      input: 'matrix = [[-1]]',
      output: '[]',
      explanation: 'Only cell is blocked.'
    }
  ],
  code: String.raw`function spiralMatrixPathfinder(matrix) {
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
}`,
  complexity: { time: 'O(m*n)', space: 'O(1) extra (excluding output)' }
});

define('Event Emitter', {
  statement:
    'Design an EventEmitter class supporting on, off, once, and emit similar to Node.js event handling.',
  examples: [
    {
      input: 'on("data", cb); emit("data", 10)',
      output: 'cb called with 10',
      explanation: 'Registered listeners receive emitted arguments.'
    },
    {
      input: 'once("ready", cb); emit("ready"); emit("ready")',
      output: 'cb executes only once',
      explanation: 'once auto-unsubscribes after first call.'
    }
  ],
  code: String.raw`class EventEmitter {
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
}`,
  complexity: { time: 'emit O(k) where k=listeners for event', space: 'O(total listeners)' }
});

define('Search in a 2D Sorted Matrix', {
  statement:
    'Given a matrix where each row is sorted and rows follow global sorted order (first element of row i is greater than last element of row i-1), determine if target exists.',
  examples: [
    {
      input: 'matrix = [[1,3,5],[7,9,11]], target = 9',
      output: 'true',
      explanation: 'Binary search over virtual flattened array finds target.'
    },
    {
      input: 'matrix = [[1,3,5],[7,9,11]], target = 6',
      output: 'false',
      explanation: '6 is not present in matrix.'
    }
  ],
  code: String.raw`function searchInSortedMatrix(matrix, target) {
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
}`,
  complexity: { time: 'O(log(m*n))', space: 'O(1)' }
});

define('Merge Array', {
  statement:
    'Merge multiple arrays of objects by id. If same id appears multiple times, merge properties with later arrays overriding earlier ones.',
  examples: [
    {
      input: 'arr1=[{id:1,name:"A"}], arr2=[{id:1,age:20},{id:2,name:"B"}]',
      output: '[{id:1,name:"A",age:20},{id:2,name:"B"}]',
      explanation: 'id=1 objects are merged into one.'
    },
    {
      input: 'array item without id',
      output: 'ignored',
      explanation: 'Only records with valid id participate in merge.'
    }
  ],
  code: String.raw`function mergeArrayById(...arrays) {
  const map = new Map();

  for (const arr of arrays) {
    for (const item of arr) {
      if (!item || item.id === undefined || item.id === null) continue;

      const prev = map.get(item.id) || {};
      map.set(item.id, { ...prev, ...item });
    }
  }

  return Array.from(map.values());
}`,
  complexity: { time: 'O(n)', space: 'O(u) where u=unique ids' }
});

define('Memoization', {
  statement:
    'Implement a memoize utility that caches function results based on arguments so repeated calls avoid recomputation.',
  examples: [
    {
      input: 'memoFib(40) called twice',
      output: 'Second call returns instantly from cache',
      explanation: 'Stored result is reused for same arguments.'
    },
    {
      input: 'memoizedFn(2,3) and memoizedFn(3,2)',
      output: 'Can be cached separately unless custom resolver normalizes key',
      explanation: 'Cache key strategy is configurable.'
    }
  ],
  code: String.raw`function memoize(fn, resolver) {
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
}`,
  complexity: { time: 'O(1) average cache lookup + function cost on miss', space: 'O(number of unique keys)' }
});

define('Shortest Distance from Source (BFS)', {
  statement:
    'Given an unweighted graph with n nodes and edges, compute shortest distance from source to all nodes using BFS. Unreachable nodes get -1.',
  examples: [
    {
      input: 'n=5, edges=[[0,1],[0,2],[1,3],[2,4]], source=0',
      output: '[0,1,1,2,2]',
      explanation: 'BFS discovers nodes layer-by-layer.'
    },
    {
      input: 'n=4, edges=[[0,1]], source=0',
      output: '[0,1,-1,-1]',
      explanation: 'Nodes 2 and 3 are disconnected from source.'
    }
  ],
  code: String.raw`function shortestDistanceFromSource(n, edges, source) {
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
}`,
  complexity: { time: 'O(V + E)', space: 'O(V + E)' }
});

define('Longest Substring No Repeats', {
  statement:
    'Return the length of the longest substring without repeating characters using a sliding-window approach.',
  examples: [
    {
      input: 's = "abcabcbb"',
      output: '3',
      explanation: 'Longest substrings are "abc", length 3.'
    },
    {
      input: 's = "bbbbb"',
      output: '1',
      explanation: 'Only one unique char at a time.'
    }
  ],
  code: String.raw`function lengthOfLongestSubstring(s) {
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
}`,
  complexity: { time: 'O(n)', space: 'O(min(n, charset))' }
});

define('Object.assign()', {
  statement:
    'Recreate Object.assign(target, ...sources): copy enumerable own properties (including symbols) from sources to target and return target.',
  examples: [
    {
      input: 'assign({a:1}, {b:2}, {a:3})',
      output: '{a:3,b:2}',
      explanation: 'Later sources override earlier values for same key.'
    },
    {
      input: 'assign(null, {a:1})',
      output: 'TypeError',
      explanation: 'Target cannot be null or undefined.'
    }
  ],
  code: String.raw`function objectAssign(target, ...sources) {
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
}`,
  complexity: { time: 'O(total enumerable keys)', space: 'O(1) extra' }
});

define('Oranges Rotting', {
  statement:
    'In a grid, 0=empty, 1=fresh orange, 2=rotten orange. Every minute, fresh oranges adjacent to rotten ones become rotten. Return minutes needed to rot all fresh oranges, or -1 if impossible.',
  examples: [
    {
      input: 'grid = [[2,1,1],[1,1,0],[0,1,1]]',
      output: '4',
      explanation: 'BFS from all initially rotten oranges tracks minute levels.'
    },
    {
      input: 'grid = [[2,1,1],[0,1,1],[1,0,1]]',
      output: '-1',
      explanation: 'Some fresh oranges remain isolated forever.'
    }
  ],
  code: String.raw`function orangesRotting(grid) {
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
}`,
  complexity: { time: 'O(m*n)', space: 'O(m*n) queue in worst case' }
});

define('Compress String with Limited Repetition', {
  statement:
    'Compress a string using run-length encoding by replacing repeated consecutive characters with char + count. Optionally split counts by maxRun.',
  examples: [
    {
      input: 'str = "aaabbc"',
      output: '"a3b2c"',
      explanation: 'Single occurrence keeps only character; repeated ones append count.'
    },
    {
      input: 'str = "aaaaaa", maxRun = 4',
      output: '"a4a2"',
      explanation: 'Runs are split so each encoded chunk count <= maxRun.'
    }
  ],
  code: String.raw`function compressStringWithLimitedRepetition(str, maxRun = Infinity) {
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
}`,
  complexity: { time: 'O(n)', space: 'O(n) output' }
});

function generateFallbackEntry(problem) {
  const functionName = String(problem.title || 'solveProblem')
    .replace(/[^a-zA-Z0-9]+/g, ' ')
    .trim()
    .split(/\s+/)
    .map((part, index) => {
      if (index === 0) return part.toLowerCase();
      return part.charAt(0).toUpperCase() + part.slice(1).toLowerCase();
    })
    .join('') || 'solveProblem';

  return {
    statement: problem.description || 'Solve the problem as described in the title.',
    examples: [
      {
        input: 'input = ...',
        output: '...',
        explanation: 'Provide valid input according to problem constraints.'
      }
    ],
    code: `function ${functionName}(input) {\n  return input;\n}`,
    complexity: {
      time: 'Depends on chosen approach',
      space: 'Depends on chosen approach'
    }
  };
}

function renderMarkdown(problems, enriched) {
  const lines = [];
  lines.push('# NamasteDev Full JavaScript Solutions');
  lines.push('');
  lines.push(`Generated at: ${new Date().toISOString()}`);
  lines.push(`Total problems: ${problems.length}`);
  lines.push('');

  for (let i = 0; i < problems.length; i += 1) {
    const problem = problems[i];
    const entry = enriched[i].content;

    lines.push(`## ${i + 1}. ${problem.title}`);
    lines.push('');
    if (problem.url) lines.push(`Problem URL: ${problem.url}`);
    if (problem.difficulty) lines.push(`Difficulty: ${problem.difficulty}`);
    lines.push('');

    lines.push('**Problem Statement**');
    lines.push(entry.statement);
    lines.push('');

    lines.push('**Example Cases**');
    entry.examples.forEach((example, idx) => {
      lines.push(`${idx + 1}. Input: \`${example.input}\``);
      lines.push(`   Output: \`${example.output}\``);
      if (example.explanation) {
        lines.push(`   Explanation: ${example.explanation}`);
      }
    });
    lines.push('');

    lines.push('**JavaScript Solution**');
    lines.push('```javascript');
    lines.push(entry.code.trim());
    lines.push('```');
    lines.push('');

    lines.push('**Complexity**');
    lines.push(`- Time: ${entry.complexity.time}`);
    lines.push(`- Space: ${entry.complexity.space}`);
    lines.push('');
  }

  return lines.join('\n');
}

async function run() {
  const problemsFile = process.argv[2] ? path.resolve(process.argv[2]) : DEFAULT_PROBLEMS_FILE;
  const markdownFile = process.argv[3] ? path.resolve(process.argv[3]) : DEFAULT_MARKDOWN_FILE;
  const jsonFile = process.argv[4] ? path.resolve(process.argv[4]) : DEFAULT_JSON_FILE;

  const payload = JSON.parse(await fs.readFile(problemsFile, 'utf8'));
  const problems = payload.problems || [];

  const enriched = problems.map((problem) => {
    const key = normalize(problem.title);
    const content = SOLUTIONS[key] || generateFallbackEntry(problem);
    return {
      ...problem,
      source: SOLUTIONS[key] ? 'curated' : 'fallback',
      content
    };
  });

  const markdown = renderMarkdown(problems, enriched);

  await fs.mkdir(path.dirname(markdownFile), { recursive: true });
  await fs.writeFile(markdownFile, markdown + '\n', 'utf8');

  const outPayload = {
    generatedAt: new Date().toISOString(),
    totalProblems: problems.length,
    curatedCount: enriched.filter((item) => item.source === 'curated').length,
    fallbackCount: enriched.filter((item) => item.source === 'fallback').length,
    problems: enriched
  };

  await fs.writeFile(jsonFile, JSON.stringify(outPayload, null, 2) + '\n', 'utf8');

  console.log('[done] Full solutions generated.');
  console.log(`- Input: ${problemsFile}`);
  console.log(`- Markdown: ${markdownFile}`);
  console.log(`- JSON: ${jsonFile}`);
  console.log(`- Curated: ${outPayload.curatedCount}`);
  console.log(`- Fallback: ${outPayload.fallbackCount}`);
}

run().catch((error) => {
  console.error('[error]', error.message);
  process.exitCode = 1;
});
