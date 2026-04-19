/**
 * Longest Consecutive Sequence.
 * Input: [100,4,200,1,3,2]
 * Output: 4
 */
export function longestConsecutive(nums) {
  const set = new Set(nums);
  let best = 0;

  for (const n of set) {
    if (!set.has(n - 1)) {
      let curr = n;
      let len = 1;
      while (set.has(curr + 1)) {
        curr += 1;
        len += 1;
      }
      best = Math.max(best, len);
    }
  }

  return best;
}

/**
 * Number of subarrays with given sum k.
 * Input: nums=[1,1,1], k=2
 * Output: 2
 */
export function subarraySum(nums, k) {
  const freq = new Map([[0, 1]]);
  let prefix = 0;
  let count = 0;

  for (const n of nums) {
    prefix += n;
    count += freq.get(prefix - k) || 0;
    freq.set(prefix, (freq.get(prefix) || 0) + 1);
  }

  return count;
}

/**
 * Reverse last k elements in a queue.
 * Input: queue=[1,2,3,4,5], k=3
 * Output: [1,2,5,4,3]
 */
export function reverseLastK(queue, k) {
  const n = queue.length;
  if (k <= 0 || k > n) return [...queue];

  const keep = queue.slice(0, n - k);
  const tail = queue.slice(n - k).reverse();
  return [...keep, ...tail];
}

/**
 * Implement browser history.
 */
export class BrowserHistory {
  constructor(homepage) {
    this.history = [homepage];
    this.index = 0;
  }

  visit(url) {
    this.history = this.history.slice(0, this.index + 1);
    this.history.push(url);
    this.index += 1;
  }

  back(steps) {
    this.index = Math.max(0, this.index - steps);
    return this.history[this.index];
  }

  forward(steps) {
    this.index = Math.min(this.history.length - 1, this.index + steps);
    return this.history[this.index];
  }
}

/**
 * Sort string based on frequency of characters.
 * Input: "tree"
 * Output: "eetr" or "eert"
 */
export function frequencySort(s) {
  const freq = new Map();
  for (const ch of s) freq.set(ch, (freq.get(ch) || 0) + 1);

  return [...freq.entries()]
    .sort((a, b) => b[1] - a[1])
    .map(([ch, count]) => ch.repeat(count))
    .join('');
}

/**
 * Caesar Cipher.
 * Input: ("Abc-Z", 2)
 * Output: "Cde-B"
 */
export function caesarCipher(str, k) {
  const shift = ((k % 26) + 26) % 26;
  return [...str]
    .map((ch) => {
      const code = ch.charCodeAt(0);
      const isUpper = code >= 65 && code <= 90;
      const isLower = code >= 97 && code <= 122;
      if (!isUpper && !isLower) return ch;
      const base = isUpper ? 65 : 97;
      return String.fromCharCode(base + ((code - base + shift) % 26));
    })
    .join('');
}

/**
 * Sorting a linked list (merge sort).
 */
export class ListNode {
  constructor(val, next = null) {
    this.val = val;
    this.next = next;
  }
}

export function sortLinkedList(head) {
  if (!head || !head.next) return head;

  let slow = head;
  let fast = head;
  let prev = null;

  while (fast && fast.next) {
    prev = slow;
    slow = slow.next;
    fast = fast.next.next;
  }

  prev.next = null;

  const left = sortLinkedList(head);
  const right = sortLinkedList(slow);
  return mergeSortedList(left, right);
}

function mergeSortedList(a, b) {
  const dummy = new ListNode(0);
  let tail = dummy;

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
}

/**
 * Filter array of objects on value or index.
 */
export function filterObjects(arr, options) {
  const { key, value, indexPredicate } = options;

  return arr.filter((item, index) => {
    const byValue = key !== undefined ? item[key] === value : true;
    const byIndex = indexPredicate ? indexPredicate(index) : true;
    return byValue && byIndex;
  });
}

/**
 * Implement two stacks with an array.
 */
export class TwoStacks {
  constructor(size) {
    this.arr = new Array(size);
    this.top1 = -1;
    this.top2 = size;
  }

  push1(x) {
    if (this.top1 + 1 === this.top2) throw new Error('Overflow');
    this.arr[++this.top1] = x;
  }

  push2(x) {
    if (this.top1 + 1 === this.top2) throw new Error('Overflow');
    this.arr[--this.top2] = x;
  }

  pop1() {
    if (this.top1 < 0) throw new Error('Underflow');
    return this.arr[this.top1--];
  }

  pop2() {
    if (this.top2 >= this.arr.length) throw new Error('Underflow');
    return this.arr[this.top2++];
  }
}

/**
 * Detect overlapping circles.
 * Input: (0,0,5,7,0,3)
 * Output: true
 */
export function isOverlappingCircle(x1, y1, r1, x2, y2, r2) {
  const dx = x2 - x1;
  const dy = y2 - y1;
  const distance = Math.sqrt(dx * dx + dy * dy);
  return distance <= r1 + r2;
}

/**
 * Trapping rain water.
 * Input: [0,1,0,2,1,0,1,3,2,1,2,1]
 * Output: 6
 */
export function trapRainWater(height) {
  let left = 0;
  let right = height.length - 1;
  let leftMax = 0;
  let rightMax = 0;
  let water = 0;

  while (left < right) {
    if (height[left] < height[right]) {
      leftMax = Math.max(leftMax, height[left]);
      water += leftMax - height[left];
      left += 1;
    } else {
      rightMax = Math.max(rightMax, height[right]);
      water += rightMax - height[right];
      right -= 1;
    }
  }

  return water;
}

/**
 * Tic-Tac-Toe engine.
 */
export class TicTacToe {
  constructor() {
    this.board = Array.from({ length: 3 }, () => Array(3).fill(null));
    this.player = 'X';
  }

  move(r, c) {
    if (this.board[r][c]) throw new Error('Invalid move');
    this.board[r][c] = this.player;
    const winner = this.getWinner();
    this.player = this.player === 'X' ? 'O' : 'X';
    return winner;
  }

  getWinner() {
    const b = this.board;
    const lines = [
      [b[0][0], b[0][1], b[0][2]],
      [b[1][0], b[1][1], b[1][2]],
      [b[2][0], b[2][1], b[2][2]],
      [b[0][0], b[1][0], b[2][0]],
      [b[0][1], b[1][1], b[2][1]],
      [b[0][2], b[1][2], b[2][2]],
      [b[0][0], b[1][1], b[2][2]],
      [b[0][2], b[1][1], b[2][0]]
    ];

    for (const [a, b1, c] of lines) {
      if (a && a === b1 && b1 === c) return a;
    }
    return null;
  }
}

/**
 * Implement deque data structure.
 */
export class Deque {
  constructor() {
    this.map = {};
    this.front = 0;
    this.back = -1;
  }

  pushFront(val) {
    this.front -= 1;
    this.map[this.front] = val;
  }

  pushBack(val) {
    this.back += 1;
    this.map[this.back] = val;
  }

  popFront() {
    if (this.isEmpty()) return undefined;
    const val = this.map[this.front];
    delete this.map[this.front];
    this.front += 1;
    return val;
  }

  popBack() {
    if (this.isEmpty()) return undefined;
    const val = this.map[this.back];
    delete this.map[this.back];
    this.back -= 1;
    return val;
  }

  isEmpty() {
    return this.front > this.back;
  }
}

/**
 * Find digital root of a number.
 * Input: 9875
 * Output: 2
 */
export function digitalRoot(n) {
  while (n >= 10) {
    n = String(n)
      .split('')
      .reduce((sum, digit) => sum + Number(digit), 0);
  }
  return n;
}

/**
 * Find highest commodity price under timestamp.
 * Input: updates=[{t:1,p:10},{t:3,p:8},{t:5,p:15}], queryTime=4
 * Output: 10
 */
export function maxPriceUntil(updates, queryTime) {
  let ans = -Infinity;
  for (const { t, p } of updates) {
    if (t <= queryTime) ans = Math.max(ans, p);
  }
  return ans === -Infinity ? null : ans;
}

/**
 * Text Justification.
 */
export function fullJustify(words, maxWidth) {
  const lines = [];
  let i = 0;

  while (i < words.length) {
    let j = i;
    let len = 0;

    while (j < words.length && len + words[j].length + (j - i) <= maxWidth) {
      len += words[j].length;
      j += 1;
    }

    const gaps = j - i - 1;
    let line = '';

    if (j === words.length || gaps === 0) {
      line = words.slice(i, j).join(' ');
      line += ' '.repeat(maxWidth - line.length);
    } else {
      const totalSpaces = maxWidth - len;
      const each = Math.floor(totalSpaces / gaps);
      const extra = totalSpaces % gaps;

      for (let k = i; k < j - 1; k += 1) {
        line += words[k];
        line += ' '.repeat(each + (k - i < extra ? 1 : 0));
      }
      line += words[j - 1];
    }

    lines.push(line);
    i = j;
  }

  return lines;
}

/**
 * Iterate N-array nested list.
 * Input: [1,[2,[3,4],5],[6]]
 * Output: 1,2,3,4,5,6
 */
export function* iterateNested(list) {
  for (const item of list) {
    if (Array.isArray(item)) yield* iterateNested(item);
    else yield item;
  }
}
