// Stack and Queue category solutions with explanations.

/**
 * Problem: Implement Stack
 * Provide push, pop, top, empty operations.
 * Solution: Wrap native array to expose stack semantics (O(1) amortized per op).
 */
export class Stack {
  constructor() {
    this.data = [];
  }

  push(x) {
    this.data.push(x);
  }

  pop() {
    if (this.data.length === 0) throw new Error('Stack is empty');
    return this.data.pop();
  }

  top() {
    if (this.data.length === 0) throw new Error('Stack is empty');
    return this.data[this.data.length - 1];
  }

  empty() {
    return this.data.length === 0;
  }
}

/**
 * Problem: Implement Queue using Stacks (LeetCode 232)
 * Support push, pop, peek, empty using two stacks.
 * Solution: Lazy transfer stack ensures amortized O(1) per operation.
 */
export class MyQueue {
  constructor() {
    this.inStack = [];
    this.outStack = [];
  }

  push(x) {
    this.inStack.push(x);
  }

  _move() {
    if (this.outStack.length === 0) {
      while (this.inStack.length) this.outStack.push(this.inStack.pop());
    }
  }

  pop() {
    this._move();
    if (this.outStack.length === 0) throw new Error('Queue is empty');
    return this.outStack.pop();
  }

  peek() {
    this._move();
    if (this.outStack.length === 0) throw new Error('Queue is empty');
    return this.outStack[this.outStack.length - 1];
  }

  empty() {
    return this.inStack.length === 0 && this.outStack.length === 0;
  }
}

/**
 * Problem: Valid Parentheses
 * Determine if parentheses string is valid.
 * Solution: Stack push expected closing bracket; pop and compare (O(n) time, O(n) space).
 */
export function isValidParentheses(s) {
  const stack = [];
  const map = { '(': ')', '[': ']', '{': '}' };
  for (const ch of s) {
    if (map[ch]) stack.push(map[ch]);
    else if (stack.pop() !== ch) return false;
  }
  return stack.length === 0;
}

/**
 * Problem: Min Stack (LeetCode 155)
 * Support push, pop, top, getMin in O(1).
 * Solution: Maintain auxiliary stack of current minimums.
 */
export class MinStack {
  constructor() {
    this.stack = [];
    this.minStack = [];
  }

  push(val) {
    this.stack.push(val);
    const min = this.minStack.length === 0 ? val : Math.min(val, this.minStack[this.minStack.length - 1]);
    this.minStack.push(min);
  }

  pop() {
    if (this.stack.length === 0) throw new Error('Stack is empty');
    this.minStack.pop();
    return this.stack.pop();
  }

  top() {
    if (this.stack.length === 0) throw new Error('Stack is empty');
    return this.stack[this.stack.length - 1];
  }

  getMin() {
    if (this.minStack.length === 0) throw new Error('Stack is empty');
    return this.minStack[this.minStack.length - 1];
  }
}

/**
 * Problem: Remove Outermost Parentheses
 * Remove the outermost parentheses of every primitive component.
 * Solution: Track nesting depth and append when depth > 1 (O(n) time).
 */
export function removeOuterParentheses(s) {
  let depth = 0;
  let result = '';
  for (const ch of s) {
    if (ch === '(') {
      if (depth > 0) result += ch;
      depth += 1;
    } else {
      depth -= 1;
      if (depth > 0) result += ch;
    }
  }
  return result;
}

/**
 * Problem: Evaluate Reverse Polish Notation
 * Evaluate arithmetic expression in Reverse Polish Notation.
 * Solution: Use stack to accumulate operands; apply operators as they appear (O(n) time).
 */
export function evalRPN(tokens) {
  const stack = [];
  const ops = {
    '+': (a, b) => a + b,
    '-': (a, b) => a - b,
    '*': (a, b) => a * b,
    '/': (a, b) => (a / b > 0 ? Math.floor(a / b) : Math.ceil(a / b)),
  };
  for (const token of tokens) {
    if (token in ops) {
      const b = stack.pop();
      const a = stack.pop();
      stack.push(ops[token](a, b));
    } else {
      stack.push(Number(token));
    }
  }
  return stack.pop();
}

/**
 * Problem: Next Greater Element I
 * For each element in nums1, find next greater in nums2.
 * Solution: Monotonic stack builds map of next greater for nums2, then lookup (O(n + m)).
 */
export function nextGreaterElement(nums1, nums2) {
  const next = new Map();
  const stack = [];
  for (const num of nums2) {
    while (stack.length && stack[stack.length - 1] < num) {
      next.set(stack.pop(), num);
    }
    stack.push(num);
  }
  while (stack.length) next.set(stack.pop(), -1);
  return nums1.map((num) => next.get(num) ?? -1);
}

/**
 * Problem: Daily Temperatures
 * Return days to wait for warmer temperature.
 * Solution: Monotonic decreasing stack of indices (O(n) time).
 */
export function dailyTemperatures(temperatures) {
  const result = new Array(temperatures.length).fill(0);
  const stack = [];
  for (let i = 0; i < temperatures.length; i += 1) {
    while (stack.length && temperatures[i] > temperatures[stack[stack.length - 1]]) {
      const idx = stack.pop();
      result[idx] = i - idx;
    }
    stack.push(i);
  }
  return result;
}

/**
 * Problem: Next Greater Element II
 * For circular array, find next greater element for each position.
 * Solution: Traverse twice using stack of indices for decreasing sequence (O(n) time).
 */
export function nextGreaterElements(nums) {
  const n = nums.length;
  const result = new Array(n).fill(-1);
  const stack = [];
  for (let i = 0; i < 2 * n; i += 1) {
    const num = nums[i % n];
    while (stack.length && nums[stack[stack.length - 1]] < num) {
      const idx = stack.pop();
      result[idx] = num;
    }
    if (i < n) stack.push(i);
  }
  return result;
}

/**
 * Problem: Rotting Oranges
 * Compute minutes until all oranges rot, or -1 if impossible.
 * Solution: Multi-source BFS from initially rotten oranges (O(mn) time).
 */
export function orangesRotting(grid) {
  const rows = grid.length;
  const cols = grid[0]?.length ?? 0;
  const queue = [];
  let fresh = 0;
  for (let r = 0; r < rows; r += 1) {
    for (let c = 0; c < cols; c += 1) {
      if (grid[r][c] === 2) queue.push([r, c, 0]);
      else if (grid[r][c] === 1) fresh += 1;
    }
  }
  const directions = [
    [1, 0],
    [-1, 0],
    [0, 1],
    [0, -1],
  ];
  let minutes = 0;
  let head = 0;
  while (head < queue.length) {
    const [r, c, time] = queue[head];
    head += 1;
    minutes = Math.max(minutes, time);
    for (const [dr, dc] of directions) {
      const nr = r + dr;
      const nc = c + dc;
      if (nr >= 0 && nr < rows && nc >= 0 && nc < cols && grid[nr][nc] === 1) {
        grid[nr][nc] = 2;
        fresh -= 1;
        queue.push([nr, nc, time + 1]);
      }
    }
  }
  return fresh === 0 ? minutes : -1;
}
