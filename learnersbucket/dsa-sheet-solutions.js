// DSA Sheet JavaScript Solutions
// Each problem has a separate function/class so you can copy-paste per platform.

/* -------------------------------------
 * Common Helpers
 * -----------------------------------*/

class ListNode {
  constructor(val = 0, next = null) {
    this.val = val;
    this.next = next;
  }
}

class TreeNode {
  constructor(val = 0, left = null, right = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

class GraphNode {
  constructor(val = 0, neighbors = []) {
    this.val = val;
    this.neighbors = neighbors;
  }
}

class BinaryHeap {
  constructor(compare = (a, b) => a - b) {
    this.data = [];
    this.compare = compare;
  }

  size() {
    return this.data.length;
  }

  peek() {
    return this.data[0];
  }

  push(value) {
    this.data.push(value);
    this.bubbleUp(this.data.length - 1);
  }

  pop() {
    if (this.data.length === 0) return null;
    if (this.data.length === 1) return this.data.pop();
    const top = this.data[0];
    this.data[0] = this.data.pop();
    this.bubbleDown(0);
    return top;
  }

  bubbleUp(i) {
    while (i > 0) {
      const p = Math.floor((i - 1) / 2);
      if (this.compare(this.data[i], this.data[p]) < 0) {
        [this.data[i], this.data[p]] = [this.data[p], this.data[i]];
        i = p;
      } else {
        break;
      }
    }
  }

  bubbleDown(i) {
    const n = this.data.length;
    while (true) {
      let best = i;
      const l = 2 * i + 1;
      const r = 2 * i + 2;

      if (l < n && this.compare(this.data[l], this.data[best]) < 0) best = l;
      if (r < n && this.compare(this.data[r], this.data[best]) < 0) best = r;

      if (best === i) break;
      [this.data[i], this.data[best]] = [this.data[best], this.data[i]];
      i = best;
    }
  }
}

class DSU {
  constructor(n) {
    this.parent = Array.from({ length: n }, (_, i) => i);
    this.rank = Array(n).fill(0);
    this.components = n;
  }

  find(x) {
    if (this.parent[x] !== x) this.parent[x] = this.find(this.parent[x]);
    return this.parent[x];
  }

  union(a, b) {
    let pa = this.find(a);
    let pb = this.find(b);
    if (pa === pb) return false;

    if (this.rank[pa] < this.rank[pb]) [pa, pb] = [pb, pa];
    this.parent[pb] = pa;
    if (this.rank[pa] === this.rank[pb]) this.rank[pa] += 1;
    this.components -= 1;
    return true;
  }
}

/* =====================================
 * 1) Foundation
 * ===================================*/

function sum(a, b) {
  return a + b;
}

function secondLargest(nums) {
  let first = -Infinity;
  let second = -Infinity;
  for (const x of nums) {
    if (x > first) {
      second = first;
      first = x;
    } else if (x > second && x !== first) {
      second = x;
    }
  }
  return second === -Infinity ? -1 : second;
}

function isPalindromeNumber(x) {
  if (x < 0) return false;
  let orig = x;
  let rev = 0;
  while (x > 0) {
    rev = rev * 10 + (x % 10);
    x = Math.floor(x / 10);
  }
  return rev === orig;
}

function reverseInteger(x) {
  const sign = x < 0 ? -1 : 1;
  x = Math.abs(x);

  let rev = 0;
  while (x > 0) {
    rev = rev * 10 + (x % 10);
    x = Math.floor(x / 10);
  }

  rev *= sign;
  const INT_MIN = -(2 ** 31);
  const INT_MAX = 2 ** 31 - 1;
  return rev < INT_MIN || rev > INT_MAX ? 0 : rev;
}

function countNegativeNumbers(grid) {
  let count = 0;
  for (const row of grid) {
    let l = 0;
    let r = row.length - 1;
    let firstNeg = row.length;
    while (l <= r) {
      const m = Math.floor((l + r) / 2);
      if (row[m] < 0) {
        firstNeg = m;
        r = m - 1;
      } else {
        l = m + 1;
      }
    }
    count += row.length - firstNeg;
  }
  return count;
}

function findSmallestNumber(nums) {
  let minVal = Infinity;
  for (const x of nums) minVal = Math.min(minVal, x);
  return minVal;
}

function findLargestNumber(nums) {
  let maxVal = -Infinity;
  for (const x of nums) maxVal = Math.max(maxVal, x);
  return maxVal;
}

function binarySearch(nums, target) {
  let l = 0;
  let r = nums.length - 1;
  while (l <= r) {
    const m = Math.floor((l + r) / 2);
    if (nums[m] === target) return m;
    if (nums[m] < target) l = m + 1;
    else r = m - 1;
  }
  return -1;
}

function mergeSort(nums) {
  if (nums.length <= 1) return nums.slice();

  const merge = (left, right) => {
    const out = [];
    let i = 0;
    let j = 0;
    while (i < left.length && j < right.length) {
      if (left[i] <= right[j]) out.push(left[i++]);
      else out.push(right[j++]);
    }
    while (i < left.length) out.push(left[i++]);
    while (j < right.length) out.push(right[j++]);
    return out;
  };

  const solve = (arr) => {
    if (arr.length <= 1) return arr;
    const mid = Math.floor(arr.length / 2);
    const left = solve(arr.slice(0, mid));
    const right = solve(arr.slice(mid));
    return merge(left, right);
  };

  return solve(nums);
}

function isPowerOfTwo(n) {
  return n > 0 && (n & (n - 1)) === 0;
}

/* =====================================
 * 2) Arrays
 * ===================================*/

function removeDuplicates(nums) {
  if (nums.length === 0) return 0;
  let write = 1;
  for (let read = 1; read < nums.length; read += 1) {
    if (nums[read] !== nums[read - 1]) {
      nums[write] = nums[read];
      write += 1;
    }
  }
  return write;
}

function removeElement(nums, val) {
  let write = 0;
  for (let i = 0; i < nums.length; i += 1) {
    if (nums[i] !== val) nums[write++] = nums[i];
  }
  return write;
}

function reverseString(chars) {
  let l = 0;
  let r = chars.length - 1;
  while (l < r) {
    [chars[l], chars[r]] = [chars[r], chars[l]];
    l += 1;
    r -= 1;
  }
  return chars;
}

function maxProfit(prices) {
  let bestBuy = Infinity;
  let ans = 0;
  for (const p of prices) {
    bestBuy = Math.min(bestBuy, p);
    ans = Math.max(ans, p - bestBuy);
  }
  return ans;
}

function mergeSortedArrays(nums1, m, nums2, n) {
  let i = m - 1;
  let j = n - 1;
  let k = m + n - 1;

  while (j >= 0) {
    if (i >= 0 && nums1[i] > nums2[j]) nums1[k--] = nums1[i--];
    else nums1[k--] = nums2[j--];
  }

  return nums1;
}

function moveZeroes(nums) {
  let write = 0;
  for (let i = 0; i < nums.length; i += 1) {
    if (nums[i] !== 0) {
      [nums[write], nums[i]] = [nums[i], nums[write]];
      write += 1;
    }
  }
  return nums;
}

function findMaxConsecutiveOnes(nums) {
  let best = 0;
  let cur = 0;
  for (const x of nums) {
    if (x === 1) cur += 1;
    else cur = 0;
    best = Math.max(best, cur);
  }
  return best;
}

function missingNumber(nums) {
  let xor = nums.length;
  for (let i = 0; i < nums.length; i += 1) {
    xor ^= i ^ nums[i];
  }
  return xor;
}

function singleNumber(nums) {
  let x = 0;
  for (const n of nums) x ^= n;
  return x;
}

/* =====================================
 * 3) Linked List
 * ===================================*/

class MyLinkedList {
  constructor() {
    this.size = 0;
    this.head = new ListNode(0); // sentinel
  }

  get(index) {
    if (index < 0 || index >= this.size) return -1;
    let cur = this.head.next;
    for (let i = 0; i < index; i += 1) cur = cur.next;
    return cur.val;
  }

  addAtHead(val) {
    this.addAtIndex(0, val);
  }

  addAtTail(val) {
    this.addAtIndex(this.size, val);
  }

  addAtIndex(index, val) {
    if (index > this.size) return;
    if (index < 0) index = 0;

    let prev = this.head;
    for (let i = 0; i < index; i += 1) prev = prev.next;

    const node = new ListNode(val, prev.next);
    prev.next = node;
    this.size += 1;
  }

  deleteAtIndex(index) {
    if (index < 0 || index >= this.size) return;

    let prev = this.head;
    for (let i = 0; i < index; i += 1) prev = prev.next;
    prev.next = prev.next.next;
    this.size -= 1;
  }
}

function middleNode(head) {
  let slow = head;
  let fast = head;
  while (fast && fast.next) {
    slow = slow.next;
    fast = fast.next.next;
  }
  return slow;
}

function reverseList(head) {
  let prev = null;
  let cur = head;
  while (cur) {
    const nxt = cur.next;
    cur.next = prev;
    prev = cur;
    cur = nxt;
  }
  return prev;
}

function hasCycle(head) {
  let slow = head;
  let fast = head;
  while (fast && fast.next) {
    slow = slow.next;
    fast = fast.next.next;
    if (slow === fast) return true;
  }
  return false;
}

function isPalindromeLinkedList(head) {
  if (!head || !head.next) return true;

  let slow = head;
  let fast = head;
  while (fast && fast.next) {
    slow = slow.next;
    fast = fast.next.next;
  }

  let second = reverseList(slow);
  let first = head;
  while (second) {
    if (first.val !== second.val) return false;
    first = first.next;
    second = second.next;
  }
  return true;
}

function getIntersectionNode(headA, headB) {
  let a = headA;
  let b = headB;
  while (a !== b) {
    a = a ? a.next : headB;
    b = b ? b.next : headA;
  }
  return a;
}

function removeElements(head, val) {
  const dummy = new ListNode(0, head);
  let cur = dummy;
  while (cur.next) {
    if (cur.next.val === val) cur.next = cur.next.next;
    else cur = cur.next;
  }
  return dummy.next;
}

function removeNthFromEnd(head, n) {
  const dummy = new ListNode(0, head);
  let fast = dummy;
  let slow = dummy;

  for (let i = 0; i < n; i += 1) fast = fast.next;

  while (fast.next) {
    fast = fast.next;
    slow = slow.next;
  }

  slow.next = slow.next.next;
  return dummy.next;
}

function deleteDuplicates(head) {
  let cur = head;
  while (cur && cur.next) {
    if (cur.val === cur.next.val) cur.next = cur.next.next;
    else cur = cur.next;
  }
  return head;
}

function oddEvenList(head) {
  if (!head || !head.next) return head;

  let odd = head;
  let even = head.next;
  const evenHead = even;

  while (even && even.next) {
    odd.next = even.next;
    odd = odd.next;
    even.next = odd.next;
    even = even.next;
  }

  odd.next = evenHead;
  return head;
}

function addTwoNumbers(l1, l2) {
  const dummy = new ListNode(0);
  let cur = dummy;
  let carry = 0;

  while (l1 || l2 || carry) {
    const a = l1 ? l1.val : 0;
    const b = l2 ? l2.val : 0;
    const sumVal = a + b + carry;
    carry = Math.floor(sumVal / 10);

    cur.next = new ListNode(sumVal % 10);
    cur = cur.next;

    if (l1) l1 = l1.next;
    if (l2) l2 = l2.next;
  }

  return dummy.next;
}

function mergeTwoLists(list1, list2) {
  const dummy = new ListNode(0);
  let cur = dummy;

  while (list1 && list2) {
    if (list1.val <= list2.val) {
      cur.next = list1;
      list1 = list1.next;
    } else {
      cur.next = list2;
      list2 = list2.next;
    }
    cur = cur.next;
  }

  cur.next = list1 || list2;
  return dummy.next;
}

function rotateRight(head, k) {
  if (!head || !head.next || k === 0) return head;

  let len = 1;
  let tail = head;
  while (tail.next) {
    tail = tail.next;
    len += 1;
  }

  k %= len;
  if (k === 0) return head;

  tail.next = head;
  let steps = len - k;
  let newTail = tail;
  while (steps > 0) {
    newTail = newTail.next;
    steps -= 1;
  }

  const newHead = newTail.next;
  newTail.next = null;
  return newHead;
}

function swapPairs(head) {
  const dummy = new ListNode(0, head);
  let prev = dummy;

  while (prev.next && prev.next.next) {
    const a = prev.next;
    const b = a.next;

    a.next = b.next;
    b.next = a;
    prev.next = b;

    prev = a;
  }

  return dummy.next;
}

/* =====================================
 * 4) Strings
 * ===================================*/

function lengthOfLastWord(s) {
  let i = s.length - 1;
  while (i >= 0 && s[i] === " ") i -= 1;
  let len = 0;
  while (i >= 0 && s[i] !== " ") {
    len += 1;
    i -= 1;
  }
  return len;
}

function findWordsContaining(words, x) {
  const out = [];
  for (let i = 0; i < words.length; i += 1) {
    if (words[i].includes(x)) out.push(i);
  }
  return out;
}

function numJewelsInStones(jewels, stones) {
  const set = new Set(jewels);
  let count = 0;
  for (const ch of stones) {
    if (set.has(ch)) count += 1;
  }
  return count;
}

function maxFreqSum(s) {
  const vowels = new Set(["a", "e", "i", "o", "u"]);
  const v = new Map();
  const c = new Map();

  for (const ch of s.toLowerCase()) {
    if (ch < "a" || ch > "z") continue;
    if (vowels.has(ch)) v.set(ch, (v.get(ch) || 0) + 1);
    else c.set(ch, (c.get(ch) || 0) + 1);
  }

  let mv = 0;
  let mc = 0;
  for (const n of v.values()) mv = Math.max(mv, n);
  for (const n of c.values()) mc = Math.max(mc, n);
  return mv + mc;
}

function balancedStringSplit(s) {
  let bal = 0;
  let ans = 0;
  for (const ch of s) {
    bal += ch === "L" ? 1 : -1;
    if (bal === 0) ans += 1;
  }
  return ans;
}

function reverseStr(s, k) {
  const arr = s.split("");
  for (let i = 0; i < arr.length; i += 2 * k) {
    let l = i;
    let r = Math.min(i + k - 1, arr.length - 1);
    while (l < r) {
      [arr[l], arr[r]] = [arr[r], arr[l]];
      l += 1;
      r -= 1;
    }
  }
  return arr.join("");
}

function isPalindromeString(s) {
  let l = 0;
  let r = s.length - 1;

  const isAlphaNum = (ch) => /[a-z0-9]/i.test(ch);

  while (l < r) {
    while (l < r && !isAlphaNum(s[l])) l += 1;
    while (l < r && !isAlphaNum(s[r])) r -= 1;

    if (s[l].toLowerCase() !== s[r].toLowerCase()) return false;
    l += 1;
    r -= 1;
  }

  return true;
}

function largestOddNumber(num) {
  for (let i = num.length - 1; i >= 0; i -= 1) {
    if ((num.charCodeAt(i) - 48) % 2 === 1) return num.slice(0, i + 1);
  }
  return "";
}

function longestCommonPrefix(strs) {
  if (strs.length === 0) return "";
  let prefix = strs[0];

  for (let i = 1; i < strs.length; i += 1) {
    while (!strs[i].startsWith(prefix)) {
      prefix = prefix.slice(0, -1);
      if (prefix === "") return "";
    }
  }

  return prefix;
}

function isAnagram(s, t) {
  if (s.length !== t.length) return false;
  const cnt = Array(26).fill(0);

  for (const ch of s) cnt[ch.charCodeAt(0) - 97] += 1;
  for (const ch of t) cnt[ch.charCodeAt(0) - 97] -= 1;

  return cnt.every((x) => x === 0);
}

function isIsomorphic(s, t) {
  if (s.length !== t.length) return false;
  const m1 = new Map();
  const m2 = new Map();

  for (let i = 0; i < s.length; i += 1) {
    const a = s[i];
    const b = t[i];

    if ((m1.has(a) && m1.get(a) !== b) || (m2.has(b) && m2.get(b) !== a)) {
      return false;
    }

    m1.set(a, b);
    m2.set(b, a);
  }

  return true;
}

function groupAnagrams(strs) {
  const map = new Map();

  for (const s of strs) {
    const key = s.split("").sort().join("");
    if (!map.has(key)) map.set(key, []);
    map.get(key).push(s);
  }

  return Array.from(map.values());
}

function minAddToMakeValid(s) {
  let open = 0;
  let add = 0;

  for (const ch of s) {
    if (ch === "(") open += 1;
    else if (open > 0) open -= 1;
    else add += 1;
  }

  return add + open;
}

function reverseWords(s) {
  return s
    .trim()
    .split(/\s+/)
    .reverse()
    .join(" ");
}

function beautySum(s) {
  let ans = 0;
  for (let i = 0; i < s.length; i += 1) {
    const freq = Array(26).fill(0);
    for (let j = i; j < s.length; j += 1) {
      freq[s.charCodeAt(j) - 97] += 1;
      let maxF = 0;
      let minF = Infinity;
      for (const x of freq) {
        if (x > 0) {
          maxF = Math.max(maxF, x);
          minF = Math.min(minF, x);
        }
      }
      ans += maxF - minF;
    }
  }
  return ans;
}

function decodeString(s) {
  const countStack = [];
  const strStack = [];
  let num = 0;
  let cur = "";

  for (const ch of s) {
    if (ch >= "0" && ch <= "9") {
      num = num * 10 + Number(ch);
    } else if (ch === "[") {
      countStack.push(num);
      strStack.push(cur);
      num = 0;
      cur = "";
    } else if (ch === "]") {
      const repeat = countStack.pop();
      cur = strStack.pop() + cur.repeat(repeat);
    } else {
      cur += ch;
    }
  }

  return cur;
}

function countAndSay(n) {
  let s = "1";

  for (let i = 2; i <= n; i += 1) {
    let next = "";
    let j = 0;
    while (j < s.length) {
      let k = j;
      while (k < s.length && s[k] === s[j]) k += 1;
      next += String(k - j) + s[j];
      j = k;
    }
    s = next;
  }

  return s;
}

function reorganizeString(s) {
  const freq = new Map();
  for (const ch of s) freq.set(ch, (freq.get(ch) || 0) + 1);

  const heap = new BinaryHeap((a, b) => b[1] - a[1]);
  for (const [ch, count] of freq) heap.push([ch, count]);

  let prev = null;
  let out = "";

  while (heap.size() > 0 || prev) {
    if (heap.size() === 0 && prev) return "";

    const [ch, count] = heap.pop();
    out += ch;

    if (prev) {
      heap.push(prev);
      prev = null;
    }

    if (count - 1 > 0) prev = [ch, count - 1];
  }

  return out;
}

function repeatedStringMatch(a, b) {
  let repeated = a;
  let count = 1;

  while (repeated.length < b.length) {
    repeated += a;
    count += 1;
  }

  if (repeated.includes(b)) return count;
  if ((repeated + a).includes(b)) return count + 1;
  return -1;
}

/* =====================================
 * 5) Stack and Queues
 * ===================================*/

class Stack {
  constructor() {
    this.items = [];
  }

  push(x) {
    this.items.push(x);
  }

  pop() {
    return this.items.length ? this.items.pop() : -1;
  }

  top() {
    return this.items.length ? this.items[this.items.length - 1] : -1;
  }

  isEmpty() {
    return this.items.length === 0;
  }

  size() {
    return this.items.length;
  }
}

class MyQueue {
  constructor() {
    this.inStack = [];
    this.outStack = [];
  }

  push(x) {
    this.inStack.push(x);
  }

  shiftStacks() {
    if (this.outStack.length === 0) {
      while (this.inStack.length) this.outStack.push(this.inStack.pop());
    }
  }

  pop() {
    this.shiftStacks();
    return this.outStack.pop();
  }

  peek() {
    this.shiftStacks();
    return this.outStack[this.outStack.length - 1];
  }

  empty() {
    return this.inStack.length === 0 && this.outStack.length === 0;
  }
}

function isValidParentheses(s) {
  const map = new Map([
    [")", "("],
    ["]", "["],
    ["}", "{"],
  ]);

  const st = [];
  for (const ch of s) {
    if (!map.has(ch)) st.push(ch);
    else {
      if (st.pop() !== map.get(ch)) return false;
    }
  }

  return st.length === 0;
}

class MinStack {
  constructor() {
    this.stack = [];
    this.minStack = [];
  }

  push(val) {
    this.stack.push(val);
    if (this.minStack.length === 0 || val <= this.getMin()) {
      this.minStack.push(val);
    }
  }

  pop() {
    const x = this.stack.pop();
    if (x === this.getMin()) this.minStack.pop();
  }

  top() {
    return this.stack[this.stack.length - 1];
  }

  getMin() {
    return this.minStack[this.minStack.length - 1];
  }
}

function removeOuterParentheses(s) {
  let depth = 0;
  let out = "";

  for (const ch of s) {
    if (ch === "(") {
      if (depth > 0) out += ch;
      depth += 1;
    } else {
      depth -= 1;
      if (depth > 0) out += ch;
    }
  }

  return out;
}

function evalRPN(tokens) {
  const st = [];
  for (const t of tokens) {
    if (["+", "-", "*", "/"].includes(t)) {
      const b = st.pop();
      const a = st.pop();
      if (t === "+") st.push(a + b);
      if (t === "-") st.push(a - b);
      if (t === "*") st.push(a * b);
      if (t === "/") st.push(Math.trunc(a / b));
    } else {
      st.push(Number(t));
    }
  }
  return st[0];
}

function nextGreaterElement(nums1, nums2) {
  const next = new Map();
  const st = [];

  for (const x of nums2) {
    while (st.length && st[st.length - 1] < x) {
      next.set(st.pop(), x);
    }
    st.push(x);
  }

  return nums1.map((x) => (next.has(x) ? next.get(x) : -1));
}

function dailyTemperatures(temps) {
  const n = temps.length;
  const out = Array(n).fill(0);
  const st = [];

  for (let i = 0; i < n; i += 1) {
    while (st.length && temps[i] > temps[st[st.length - 1]]) {
      const idx = st.pop();
      out[idx] = i - idx;
    }
    st.push(i);
  }

  return out;
}

function nextGreaterElements(nums) {
  const n = nums.length;
  const out = Array(n).fill(-1);
  const st = [];

  for (let i = 0; i < 2 * n; i += 1) {
    const num = nums[i % n];
    while (st.length && nums[st[st.length - 1]] < num) {
      out[st.pop()] = num;
    }
    if (i < n) st.push(i);
  }

  return out;
}

function orangesRotting(grid) {
  const rows = grid.length;
  const cols = grid[0].length;
  const q = [];
  let fresh = 0;

  for (let r = 0; r < rows; r += 1) {
    for (let c = 0; c < cols; c += 1) {
      if (grid[r][c] === 2) q.push([r, c]);
      if (grid[r][c] === 1) fresh += 1;
    }
  }

  let minutes = 0;
  let head = 0;
  const dirs = [
    [1, 0],
    [-1, 0],
    [0, 1],
    [0, -1],
  ];

  while (head < q.length && fresh > 0) {
    const size = q.length - head;
    for (let i = 0; i < size; i += 1) {
      const [r, c] = q[head++];
      for (const [dr, dc] of dirs) {
        const nr = r + dr;
        const nc = c + dc;
        if (
          nr >= 0 &&
          nr < rows &&
          nc >= 0 &&
          nc < cols &&
          grid[nr][nc] === 1
        ) {
          grid[nr][nc] = 2;
          fresh -= 1;
          q.push([nr, nc]);
        }
      }
    }
    minutes += 1;
  }

  return fresh === 0 ? minutes : -1;
}

/* =====================================
 * 6) Binary Search Algorithm
 * ===================================*/

function mySqrt(x) {
  if (x < 2) return x;
  let l = 1;
  let r = Math.floor(x / 2);
  let ans = 1;

  while (l <= r) {
    const m = Math.floor((l + r) / 2);
    if (m * m <= x) {
      ans = m;
      l = m + 1;
    } else {
      r = m - 1;
    }
  }

  return ans;
}

function guessNumber(n, guess) {
  let l = 1;
  let r = n;

  while (l <= r) {
    const m = Math.floor((l + r) / 2);
    const g = guess(m);
    if (g === 0) return m;
    if (g < 0) r = m - 1;
    else l = m + 1;
  }

  return -1;
}

function searchInRotatedArray(nums, target) {
  let l = 0;
  let r = nums.length - 1;

  while (l <= r) {
    const m = Math.floor((l + r) / 2);
    if (nums[m] === target) return m;

    if (nums[l] <= nums[m]) {
      if (nums[l] <= target && target < nums[m]) r = m - 1;
      else l = m + 1;
    } else {
      if (nums[m] < target && target <= nums[r]) l = m + 1;
      else r = m - 1;
    }
  }

  return -1;
}

function firstBadVersion(n, isBadVersion) {
  let l = 1;
  let r = n;

  while (l < r) {
    const m = Math.floor((l + r) / 2);
    if (isBadVersion(m)) r = m;
    else l = m + 1;
  }

  return l;
}

function findPeakElement(nums) {
  let l = 0;
  let r = nums.length - 1;

  while (l < r) {
    const m = Math.floor((l + r) / 2);
    if (nums[m] > nums[m + 1]) r = m;
    else l = m + 1;
  }

  return l;
}

function findMinInRotatedArray(nums) {
  let l = 0;
  let r = nums.length - 1;

  while (l < r) {
    const m = Math.floor((l + r) / 2);
    if (nums[m] > nums[r]) l = m + 1;
    else r = m;
  }

  return nums[l];
}

function searchRange(nums, target) {
  const lowerBound = () => {
    let l = 0;
    let r = nums.length;
    while (l < r) {
      const m = Math.floor((l + r) / 2);
      if (nums[m] < target) l = m + 1;
      else r = m;
    }
    return l;
  };

  const upperBound = () => {
    let l = 0;
    let r = nums.length;
    while (l < r) {
      const m = Math.floor((l + r) / 2);
      if (nums[m] <= target) l = m + 1;
      else r = m;
    }
    return l;
  };

  const left = lowerBound();
  if (left === nums.length || nums[left] !== target) return [-1, -1];
  const right = upperBound() - 1;
  return [left, right];
}

function peakIndexInMountainArray(arr) {
  let l = 0;
  let r = arr.length - 1;
  while (l < r) {
    const m = Math.floor((l + r) / 2);
    if (arr[m] < arr[m + 1]) l = m + 1;
    else r = m;
  }
  return l;
}

function singleNonDuplicate(nums) {
  let l = 0;
  let r = nums.length - 1;

  while (l < r) {
    let m = Math.floor((l + r) / 2);
    if (m % 2 === 1) m -= 1;

    if (nums[m] === nums[m + 1]) l = m + 2;
    else r = m;
  }

  return nums[l];
}

function findClosestElements(arr, k, x) {
  let l = 0;
  let r = arr.length - k;

  while (l < r) {
    const m = Math.floor((l + r) / 2);
    if (x - arr[m] > arr[m + k] - x) l = m + 1;
    else r = m;
  }

  return arr.slice(l, l + k);
}

/* =====================================
 * 7) Two Pointers & Sliding Window
 * ===================================*/

function twoSum(nums, target) {
  const map = new Map();
  for (let i = 0; i < nums.length; i += 1) {
    const need = target - nums[i];
    if (map.has(need)) return [map.get(need), i];
    map.set(nums[i], i);
  }
  return [];
}

function twoSumII(numbers, target) {
  let l = 0;
  let r = numbers.length - 1;

  while (l < r) {
    const sumVal = numbers[l] + numbers[r];
    if (sumVal === target) return [l + 1, r + 1];
    if (sumVal < target) l += 1;
    else r -= 1;
  }

  return [];
}

function isSubsequence(s, t) {
  let i = 0;
  for (const ch of t) {
    if (i < s.length && s[i] === ch) i += 1;
  }
  return i === s.length;
}

function strStr(haystack, needle) {
  if (needle === "") return 0;
  return haystack.indexOf(needle);
}

function getIntersectionNodeTwoPointers(headA, headB) {
  return getIntersectionNode(headA, headB);
}

function maxArea(height) {
  let l = 0;
  let r = height.length - 1;
  let best = 0;

  while (l < r) {
    best = Math.max(best, Math.min(height[l], height[r]) * (r - l));
    if (height[l] < height[r]) l += 1;
    else r -= 1;
  }

  return best;
}

function threeSum(nums) {
  nums.sort((a, b) => a - b);
  const out = [];

  for (let i = 0; i < nums.length - 2; i += 1) {
    if (i > 0 && nums[i] === nums[i - 1]) continue;

    let l = i + 1;
    let r = nums.length - 1;
    while (l < r) {
      const sumVal = nums[i] + nums[l] + nums[r];
      if (sumVal === 0) {
        out.push([nums[i], nums[l], nums[r]]);
        l += 1;
        r -= 1;
        while (l < r && nums[l] === nums[l - 1]) l += 1;
        while (l < r && nums[r] === nums[r + 1]) r -= 1;
      } else if (sumVal < 0) {
        l += 1;
      } else {
        r -= 1;
      }
    }
  }

  return out;
}

function trap(height) {
  let l = 0;
  let r = height.length - 1;
  let lMax = 0;
  let rMax = 0;
  let water = 0;

  while (l < r) {
    if (height[l] < height[r]) {
      lMax = Math.max(lMax, height[l]);
      water += lMax - height[l];
      l += 1;
    } else {
      rMax = Math.max(rMax, height[r]);
      water += rMax - height[r];
      r -= 1;
    }
  }

  return water;
}

function lengthOfLongestSubstring(s) {
  const seen = new Map();
  let left = 0;
  let best = 0;

  for (let right = 0; right < s.length; right += 1) {
    const ch = s[right];
    if (seen.has(ch) && seen.get(ch) >= left) {
      left = seen.get(ch) + 1;
    }
    seen.set(ch, right);
    best = Math.max(best, right - left + 1);
  }

  return best;
}

function characterReplacement(s, k) {
  const cnt = Array(26).fill(0);
  let left = 0;
  let maxFreq = 0;
  let best = 0;

  for (let right = 0; right < s.length; right += 1) {
    const idx = s.charCodeAt(right) - 65;
    cnt[idx] += 1;
    maxFreq = Math.max(maxFreq, cnt[idx]);

    while (right - left + 1 - maxFreq > k) {
      cnt[s.charCodeAt(left) - 65] -= 1;
      left += 1;
    }

    best = Math.max(best, right - left + 1);
  }

  return best;
}

function checkInclusion(s1, s2) {
  if (s1.length > s2.length) return false;

  const need = Array(26).fill(0);
  const have = Array(26).fill(0);

  for (const ch of s1) need[ch.charCodeAt(0) - 97] += 1;

  let matches = 0;
  for (let i = 0; i < 26; i += 1) {
    if (need[i] === have[i]) matches += 1;
  }

  let left = 0;
  for (let right = 0; right < s2.length; right += 1) {
    const add = s2.charCodeAt(right) - 97;
    have[add] += 1;
    if (have[add] === need[add]) matches += 1;
    else if (have[add] === need[add] + 1) matches -= 1;

    if (right - left + 1 > s1.length) {
      const del = s2.charCodeAt(left) - 97;
      have[del] -= 1;
      if (have[del] === need[del]) matches += 1;
      else if (have[del] === need[del] - 1) matches -= 1;
      left += 1;
    }

    if (matches === 26) return true;
  }

  return false;
}

function maxSlidingWindow(nums, k) {
  const deque = []; // store indices
  const out = [];

  for (let i = 0; i < nums.length; i += 1) {
    while (deque.length && deque[0] <= i - k) deque.shift();
    while (deque.length && nums[deque[deque.length - 1]] <= nums[i]) {
      deque.pop();
    }
    deque.push(i);

    if (i >= k - 1) out.push(nums[deque[0]]);
  }

  return out;
}

/* =====================================
 * 8) Binary Tree
 * ===================================*/

function preorderTraversal(root) {
  const out = [];
  const dfs = (node) => {
    if (!node) return;
    out.push(node.val);
    dfs(node.left);
    dfs(node.right);
  };
  dfs(root);
  return out;
}

function inorderTraversal(root) {
  const out = [];
  const dfs = (node) => {
    if (!node) return;
    dfs(node.left);
    out.push(node.val);
    dfs(node.right);
  };
  dfs(root);
  return out;
}

function postorderTraversal(root) {
  const out = [];
  const dfs = (node) => {
    if (!node) return;
    dfs(node.left);
    dfs(node.right);
    out.push(node.val);
  };
  dfs(root);
  return out;
}

function levelOrder(root) {
  if (!root) return [];
  const out = [];
  const q = [root];
  let head = 0;

  while (head < q.length) {
    const size = q.length - head;
    const level = [];
    for (let i = 0; i < size; i += 1) {
      const node = q[head++];
      level.push(node.val);
      if (node.left) q.push(node.left);
      if (node.right) q.push(node.right);
    }
    out.push(level);
  }

  return out;
}

function maxDepth(root) {
  if (!root) return 0;
  return 1 + Math.max(maxDepth(root.left), maxDepth(root.right));
}

function hasPathSum(root, targetSum) {
  if (!root) return false;
  if (!root.left && !root.right) return targetSum === root.val;
  return (
    hasPathSum(root.left, targetSum - root.val) ||
    hasPathSum(root.right, targetSum - root.val)
  );
}

function isSymmetric(root) {
  const mirror = (a, b) => {
    if (!a && !b) return true;
    if (!a || !b) return false;
    return a.val === b.val && mirror(a.left, b.right) && mirror(a.right, b.left);
  };
  return mirror(root, root);
}

function invertTree(root) {
  if (!root) return null;
  [root.left, root.right] = [invertTree(root.right), invertTree(root.left)];
  return root;
}

function isSameTree(p, q) {
  if (!p && !q) return true;
  if (!p || !q) return false;
  return p.val === q.val && isSameTree(p.left, q.left) && isSameTree(p.right, q.right);
}

function isBalanced(root) {
  const height = (node) => {
    if (!node) return 0;
    const lh = height(node.left);
    if (lh === -1) return -1;
    const rh = height(node.right);
    if (rh === -1) return -1;
    if (Math.abs(lh - rh) > 1) return -1;
    return 1 + Math.max(lh, rh);
  };
  return height(root) !== -1;
}

function diameterOfBinaryTree(root) {
  let best = 0;
  const dfs = (node) => {
    if (!node) return 0;
    const l = dfs(node.left);
    const r = dfs(node.right);
    best = Math.max(best, l + r);
    return 1 + Math.max(l, r);
  };
  dfs(root);
  return best;
}

function zigzagLevelOrder(root) {
  if (!root) return [];
  const out = [];
  const q = [root];
  let head = 0;
  let leftToRight = true;

  while (head < q.length) {
    const size = q.length - head;
    const level = Array(size);

    for (let i = 0; i < size; i += 1) {
      const node = q[head++];
      const idx = leftToRight ? i : size - 1 - i;
      level[idx] = node.val;
      if (node.left) q.push(node.left);
      if (node.right) q.push(node.right);
    }

    out.push(level);
    leftToRight = !leftToRight;
  }

  return out;
}

function isSubtree(root, subRoot) {
  const same = (a, b) => {
    if (!a && !b) return true;
    if (!a || !b) return false;
    return a.val === b.val && same(a.left, b.left) && same(a.right, b.right);
  };

  if (!root) return false;
  if (same(root, subRoot)) return true;
  return isSubtree(root.left, subRoot) || isSubtree(root.right, subRoot);
}

function lowestCommonAncestor(root, p, q) {
  if (!root || root === p || root === q) return root;
  const left = lowestCommonAncestor(root.left, p, q);
  const right = lowestCommonAncestor(root.right, p, q);

  if (left && right) return root;
  return left || right;
}

function rightSideView(root) {
  if (!root) return [];
  const out = [];
  const q = [root];
  let head = 0;

  while (head < q.length) {
    const size = q.length - head;
    for (let i = 0; i < size; i += 1) {
      const node = q[head++];
      if (node.left) q.push(node.left);
      if (node.right) q.push(node.right);
      if (i === size - 1) out.push(node.val);
    }
  }

  return out;
}

function goodNodes(root) {
  let ans = 0;

  const dfs = (node, maxSeen) => {
    if (!node) return;
    if (node.val >= maxSeen) {
      ans += 1;
      maxSeen = node.val;
    }
    dfs(node.left, maxSeen);
    dfs(node.right, maxSeen);
  };

  dfs(root, -Infinity);
  return ans;
}

function connect(root) {
  if (!root) return null;
  const q = [root];
  let head = 0;

  while (head < q.length) {
    const size = q.length - head;
    let prev = null;

    for (let i = 0; i < size; i += 1) {
      const node = q[head++];
      if (prev) prev.next = node;
      prev = node;
      if (node.left) q.push(node.left);
      if (node.right) q.push(node.right);
    }

    prev.next = null;
  }

  return root;
}

function maxPathSum(root) {
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

/* =====================================
 * 9) Binary Search Tree
 * ===================================*/

function isValidBST(root) {
  const dfs = (node, lo, hi) => {
    if (!node) return true;
    if (node.val <= lo || node.val >= hi) return false;
    return dfs(node.left, lo, node.val) && dfs(node.right, node.val, hi);
  };
  return dfs(root, -Infinity, Infinity);
}

function searchBST(root, val) {
  let cur = root;
  while (cur) {
    if (cur.val === val) return cur;
    cur = val < cur.val ? cur.left : cur.right;
  }
  return null;
}

function insertIntoBST(root, val) {
  if (!root) return new TreeNode(val);

  let cur = root;
  while (true) {
    if (val < cur.val) {
      if (!cur.left) {
        cur.left = new TreeNode(val);
        break;
      }
      cur = cur.left;
    } else {
      if (!cur.right) {
        cur.right = new TreeNode(val);
        break;
      }
      cur = cur.right;
    }
  }

  return root;
}

function kthSmallest(root, k) {
  const st = [];
  let cur = root;

  while (cur || st.length) {
    while (cur) {
      st.push(cur);
      cur = cur.left;
    }
    cur = st.pop();
    k -= 1;
    if (k === 0) return cur.val;
    cur = cur.right;
  }

  return -1;
}

function lowestCommonAncestorBST(root, p, q) {
  let cur = root;
  while (cur) {
    if (p.val < cur.val && q.val < cur.val) cur = cur.left;
    else if (p.val > cur.val && q.val > cur.val) cur = cur.right;
    else return cur;
  }
  return null;
}

/* =====================================
 * 10) Heap
 * ===================================*/

function findKthLargest(nums, k) {
  const heap = new BinaryHeap((a, b) => a - b); // min-heap
  for (const x of nums) {
    heap.push(x);
    if (heap.size() > k) heap.pop();
  }
  return heap.peek();
}

class KthLargest {
  constructor(k, nums) {
    this.k = k;
    this.heap = new BinaryHeap((a, b) => a - b);
    for (const x of nums) this.add(x);
  }

  add(val) {
    this.heap.push(val);
    if (this.heap.size() > this.k) this.heap.pop();
    return this.heap.peek();
  }
}

function lastStoneWeight(stones) {
  const heap = new BinaryHeap((a, b) => b - a); // max-heap
  for (const s of stones) heap.push(s);

  while (heap.size() > 1) {
    const a = heap.pop();
    const b = heap.pop();
    if (a !== b) heap.push(a - b);
  }

  return heap.size() ? heap.pop() : 0;
}

function topKFrequent(nums, k) {
  const freq = new Map();
  for (const x of nums) freq.set(x, (freq.get(x) || 0) + 1);

  const heap = new BinaryHeap((a, b) => a[1] - b[1]); // min-heap by freq
  for (const entry of freq) {
    heap.push(entry);
    if (heap.size() > k) heap.pop();
  }

  const out = [];
  while (heap.size()) out.push(heap.pop()[0]);
  return out.reverse();
}

function kthSmallestInSortedMatrix(matrix, k) {
  const n = matrix.length;
  const heap = new BinaryHeap((a, b) => a.val - b.val);

  for (let r = 0; r < Math.min(n, k); r += 1) {
    heap.push({ val: matrix[r][0], r, c: 0 });
  }

  let ans = 0;
  for (let i = 0; i < k; i += 1) {
    const cur = heap.pop();
    ans = cur.val;
    if (cur.c + 1 < matrix[cur.r].length) {
      heap.push({
        val: matrix[cur.r][cur.c + 1],
        r: cur.r,
        c: cur.c + 1,
      });
    }
  }

  return ans;
}

/* =====================================
 * 11) Backtracking
 * ===================================*/

function subsets(nums) {
  const out = [];
  const cur = [];

  const dfs = (idx) => {
    if (idx === nums.length) {
      out.push(cur.slice());
      return;
    }

    cur.push(nums[idx]);
    dfs(idx + 1);
    cur.pop();
    dfs(idx + 1);
  };

  dfs(0);
  return out;
}

function combine(n, k) {
  const out = [];
  const cur = [];

  const dfs = (start) => {
    if (cur.length === k) {
      out.push(cur.slice());
      return;
    }

    for (let x = start; x <= n; x += 1) {
      cur.push(x);
      dfs(x + 1);
      cur.pop();
    }
  };

  dfs(1);
  return out;
}

function permute(nums) {
  const out = [];
  const used = Array(nums.length).fill(false);
  const cur = [];

  const dfs = () => {
    if (cur.length === nums.length) {
      out.push(cur.slice());
      return;
    }

    for (let i = 0; i < nums.length; i += 1) {
      if (used[i]) continue;
      used[i] = true;
      cur.push(nums[i]);
      dfs();
      cur.pop();
      used[i] = false;
    }
  };

  dfs();
  return out;
}

function subsetsWithDup(nums) {
  nums.sort((a, b) => a - b);
  const out = [];
  const cur = [];

  const dfs = (idx) => {
    out.push(cur.slice());

    for (let i = idx; i < nums.length; i += 1) {
      if (i > idx && nums[i] === nums[i - 1]) continue;
      cur.push(nums[i]);
      dfs(i + 1);
      cur.pop();
    }
  };

  dfs(0);
  return out;
}

function combinationSum(candidates, target) {
  const out = [];
  const cur = [];

  const dfs = (idx, rem) => {
    if (rem === 0) {
      out.push(cur.slice());
      return;
    }
    if (idx === candidates.length || rem < 0) return;

    cur.push(candidates[idx]);
    dfs(idx, rem - candidates[idx]);
    cur.pop();

    dfs(idx + 1, rem);
  };

  dfs(0, target);
  return out;
}

function combinationSum2(candidates, target) {
  candidates.sort((a, b) => a - b);
  const out = [];
  const cur = [];

  const dfs = (start, rem) => {
    if (rem === 0) {
      out.push(cur.slice());
      return;
    }

    for (let i = start; i < candidates.length; i += 1) {
      if (i > start && candidates[i] === candidates[i - 1]) continue;
      if (candidates[i] > rem) break;
      cur.push(candidates[i]);
      dfs(i + 1, rem - candidates[i]);
      cur.pop();
    }
  };

  dfs(0, target);
  return out;
}

function combinationSum3(k, n) {
  const out = [];
  const cur = [];

  const dfs = (start, rem) => {
    if (cur.length === k && rem === 0) {
      out.push(cur.slice());
      return;
    }
    if (cur.length >= k || rem <= 0) return;

    for (let x = start; x <= 9; x += 1) {
      cur.push(x);
      dfs(x + 1, rem - x);
      cur.pop();
    }
  };

  dfs(1, n);
  return out;
}

function letterCombinations(digits) {
  if (!digits) return [];

  const map = {
    2: "abc",
    3: "def",
    4: "ghi",
    5: "jkl",
    6: "mno",
    7: "pqrs",
    8: "tuv",
    9: "wxyz",
  };

  const out = [];
  const cur = [];

  const dfs = (idx) => {
    if (idx === digits.length) {
      out.push(cur.join(""));
      return;
    }

    for (const ch of map[digits[idx]]) {
      cur.push(ch);
      dfs(idx + 1);
      cur.pop();
    }
  };

  dfs(0);
  return out;
}

function permuteUnique(nums) {
  nums.sort((a, b) => a - b);
  const out = [];
  const cur = [];
  const used = Array(nums.length).fill(false);

  const dfs = () => {
    if (cur.length === nums.length) {
      out.push(cur.slice());
      return;
    }

    for (let i = 0; i < nums.length; i += 1) {
      if (used[i]) continue;
      if (i > 0 && nums[i] === nums[i - 1] && !used[i - 1]) continue;

      used[i] = true;
      cur.push(nums[i]);
      dfs();
      cur.pop();
      used[i] = false;
    }
  };

  dfs();
  return out;
}

function partition(s) {
  const out = [];
  const cur = [];

  const isPal = (l, r) => {
    while (l < r) {
      if (s[l] !== s[r]) return false;
      l += 1;
      r -= 1;
    }
    return true;
  };

  const dfs = (idx) => {
    if (idx === s.length) {
      out.push(cur.slice());
      return;
    }

    for (let end = idx; end < s.length; end += 1) {
      if (!isPal(idx, end)) continue;
      cur.push(s.slice(idx, end + 1));
      dfs(end + 1);
      cur.pop();
    }
  };

  dfs(0);
  return out;
}

function exist(board, word) {
  const rows = board.length;
  const cols = board[0].length;

  const dfs = (r, c, i) => {
    if (i === word.length) return true;
    if (
      r < 0 ||
      r >= rows ||
      c < 0 ||
      c >= cols ||
      board[r][c] !== word[i]
    ) {
      return false;
    }

    const ch = board[r][c];
    board[r][c] = "#";

    const ok =
      dfs(r + 1, c, i + 1) ||
      dfs(r - 1, c, i + 1) ||
      dfs(r, c + 1, i + 1) ||
      dfs(r, c - 1, i + 1);

    board[r][c] = ch;
    return ok;
  };

  for (let r = 0; r < rows; r += 1) {
    for (let c = 0; c < cols; c += 1) {
      if (dfs(r, c, 0)) return true;
    }
  }

  return false;
}

function solveNQueens(n) {
  const out = [];
  const board = Array.from({ length: n }, () => Array(n).fill("."));
  const cols = new Set();
  const diag1 = new Set(); // r - c
  const diag2 = new Set(); // r + c

  const dfs = (r) => {
    if (r === n) {
      out.push(board.map((row) => row.join("")));
      return;
    }

    for (let c = 0; c < n; c += 1) {
      if (cols.has(c) || diag1.has(r - c) || diag2.has(r + c)) continue;

      cols.add(c);
      diag1.add(r - c);
      diag2.add(r + c);
      board[r][c] = "Q";

      dfs(r + 1);

      board[r][c] = ".";
      cols.delete(c);
      diag1.delete(r - c);
      diag2.delete(r + c);
    }
  };

  dfs(0);
  return out;
}

/* =====================================
 * 12) Greedy Algorithm
 * ===================================*/

function twoCitySchedCost(costs) {
  costs.sort((a, b) => a[0] - a[1] - (b[0] - b[1]));
  const n = costs.length / 2;
  let ans = 0;

  for (let i = 0; i < costs.length; i += 1) {
    if (i < n) ans += costs[i][0];
    else ans += costs[i][1];
  }

  return ans;
}

function findContentChildren(g, s) {
  g.sort((a, b) => a - b);
  s.sort((a, b) => a - b);

  let i = 0;
  let j = 0;
  while (i < g.length && j < s.length) {
    if (s[j] >= g[i]) i += 1;
    j += 1;
  }

  return i;
}

function lemonadeChange(bills) {
  let five = 0;
  let ten = 0;

  for (const b of bills) {
    if (b === 5) {
      five += 1;
    } else if (b === 10) {
      if (five === 0) return false;
      five -= 1;
      ten += 1;
    } else {
      if (ten > 0 && five > 0) {
        ten -= 1;
        five -= 1;
      } else if (five >= 3) {
        five -= 3;
      } else {
        return false;
      }
    }
  }

  return true;
}

function maxProfitII(prices) {
  let ans = 0;
  for (let i = 1; i < prices.length; i += 1) {
    if (prices[i] > prices[i - 1]) ans += prices[i] - prices[i - 1];
  }
  return ans;
}

function insert(intervals, newInterval) {
  const out = [];
  let i = 0;

  while (i < intervals.length && intervals[i][1] < newInterval[0]) {
    out.push(intervals[i]);
    i += 1;
  }

  while (i < intervals.length && intervals[i][0] <= newInterval[1]) {
    newInterval[0] = Math.min(newInterval[0], intervals[i][0]);
    newInterval[1] = Math.max(newInterval[1], intervals[i][1]);
    i += 1;
  }
  out.push(newInterval);

  while (i < intervals.length) {
    out.push(intervals[i]);
    i += 1;
  }

  return out;
}

function merge(intervals) {
  if (intervals.length <= 1) return intervals;
  intervals.sort((a, b) => a[0] - b[0]);

  const out = [intervals[0]];
  for (let i = 1; i < intervals.length; i += 1) {
    const last = out[out.length - 1];
    if (intervals[i][0] <= last[1]) {
      last[1] = Math.max(last[1], intervals[i][1]);
    } else {
      out.push(intervals[i]);
    }
  }

  return out;
}

function partitionLabels(s) {
  const last = new Map();
  for (let i = 0; i < s.length; i += 1) last.set(s[i], i);

  const out = [];
  let start = 0;
  let end = 0;

  for (let i = 0; i < s.length; i += 1) {
    end = Math.max(end, last.get(s[i]));
    if (i === end) {
      out.push(end - start + 1);
      start = i + 1;
    }
  }

  return out;
}

function eraseOverlapIntervals(intervals) {
  if (intervals.length === 0) return 0;
  intervals.sort((a, b) => a[1] - b[1]);

  let count = 0;
  let end = intervals[0][1];

  for (let i = 1; i < intervals.length; i += 1) {
    if (intervals[i][0] < end) {
      count += 1;
    } else {
      end = intervals[i][1];
    }
  }

  return count;
}

function leastInterval(tasks, n) {
  const freq = Array(26).fill(0);
  for (const t of tasks) freq[t.charCodeAt(0) - 65] += 1;

  freq.sort((a, b) => b - a);
  const maxFreq = freq[0];
  let maxCount = 0;
  for (const f of freq) {
    if (f === maxFreq) maxCount += 1;
    else break;
  }

  return Math.max(tasks.length, (maxFreq - 1) * (n + 1) + maxCount);
}

function canCompleteCircuit(gas, cost) {
  let total = 0;
  let tank = 0;
  let start = 0;

  for (let i = 0; i < gas.length; i += 1) {
    const diff = gas[i] - cost[i];
    total += diff;
    tank += diff;

    if (tank < 0) {
      start = i + 1;
      tank = 0;
    }
  }

  return total >= 0 ? start : -1;
}

function carPooling(trips, capacity) {
  const stops = new Map();
  for (const [num, from, to] of trips) {
    stops.set(from, (stops.get(from) || 0) + num);
    stops.set(to, (stops.get(to) || 0) - num);
  }

  const sorted = Array.from(stops.keys()).sort((a, b) => a - b);
  let cur = 0;
  for (const x of sorted) {
    cur += stops.get(x);
    if (cur > capacity) return false;
  }

  return true;
}

function candy(ratings) {
  const n = ratings.length;
  const candies = Array(n).fill(1);

  for (let i = 1; i < n; i += 1) {
    if (ratings[i] > ratings[i - 1]) candies[i] = candies[i - 1] + 1;
  }

  for (let i = n - 2; i >= 0; i -= 1) {
    if (ratings[i] > ratings[i + 1]) {
      candies[i] = Math.max(candies[i], candies[i + 1] + 1);
    }
  }

  return candies.reduce((a, b) => a + b, 0);
}

/* =====================================
 * 13) Dynamic Programming
 * ===================================*/

function climbStairs(n) {
  if (n <= 2) return n;
  let a = 1;
  let b = 2;
  for (let i = 3; i <= n; i += 1) {
    [a, b] = [b, a + b];
  }
  return b;
}

function minCostClimbingStairs(cost) {
  let a = 0;
  let b = 0;
  for (let i = 2; i <= cost.length; i += 1) {
    const c = Math.min(b + cost[i - 1], a + cost[i - 2]);
    a = b;
    b = c;
  }
  return b;
}

function rob(nums) {
  let prev2 = 0;
  let prev1 = 0;

  for (const x of nums) {
    const cur = Math.max(prev1, prev2 + x);
    prev2 = prev1;
    prev1 = cur;
  }

  return prev1;
}

function robII(nums) {
  if (nums.length === 1) return nums[0];

  const robRange = (l, r) => {
    let prev2 = 0;
    let prev1 = 0;
    for (let i = l; i <= r; i += 1) {
      const cur = Math.max(prev1, prev2 + nums[i]);
      prev2 = prev1;
      prev1 = cur;
    }
    return prev1;
  };

  return Math.max(robRange(0, nums.length - 2), robRange(1, nums.length - 1));
}

function coinChange(coins, amount) {
  const dp = Array(amount + 1).fill(Infinity);
  dp[0] = 0;

  for (const c of coins) {
    for (let x = c; x <= amount; x += 1) {
      dp[x] = Math.min(dp[x], dp[x - c] + 1);
    }
  }

  return dp[amount] === Infinity ? -1 : dp[amount];
}

function countSubstrings(s) {
  let ans = 0;

  const expand = (l, r) => {
    while (l >= 0 && r < s.length && s[l] === s[r]) {
      ans += 1;
      l -= 1;
      r += 1;
    }
  };

  for (let i = 0; i < s.length; i += 1) {
    expand(i, i);
    expand(i, i + 1);
  }

  return ans;
}

function longestPalindrome(s) {
  if (s.length < 2) return s;

  let start = 0;
  let end = 0;

  const expand = (l, r) => {
    while (l >= 0 && r < s.length && s[l] === s[r]) {
      l -= 1;
      r += 1;
    }
    return [l + 1, r - 1];
  };

  for (let i = 0; i < s.length; i += 1) {
    const [l1, r1] = expand(i, i);
    const [l2, r2] = expand(i, i + 1);

    if (r1 - l1 > end - start) {
      start = l1;
      end = r1;
    }
    if (r2 - l2 > end - start) {
      start = l2;
      end = r2;
    }
  }

  return s.slice(start, end + 1);
}

function numDecodings(s) {
  if (s[0] === "0") return 0;

  let prev2 = 1;
  let prev1 = 1;

  for (let i = 1; i < s.length; i += 1) {
    let cur = 0;

    if (s[i] !== "0") cur += prev1;

    const two = Number(s.slice(i - 1, i + 1));
    if (two >= 10 && two <= 26) cur += prev2;

    prev2 = prev1;
    prev1 = cur;
  }

  return prev1;
}

function maxSubArray(nums) {
  let cur = nums[0];
  let best = nums[0];

  for (let i = 1; i < nums.length; i += 1) {
    cur = Math.max(nums[i], cur + nums[i]);
    best = Math.max(best, cur);
  }

  return best;
}

function maxProduct(nums) {
  let maxHere = nums[0];
  let minHere = nums[0];
  let best = nums[0];

  for (let i = 1; i < nums.length; i += 1) {
    const x = nums[i];
    if (x < 0) [maxHere, minHere] = [minHere, maxHere];

    maxHere = Math.max(x, maxHere * x);
    minHere = Math.min(x, minHere * x);

    best = Math.max(best, maxHere);
  }

  return best;
}

function wordBreak(s, wordDict) {
  const set = new Set(wordDict);
  const dp = Array(s.length + 1).fill(false);
  dp[0] = true;

  for (let i = 1; i <= s.length; i += 1) {
    for (let j = 0; j < i; j += 1) {
      if (dp[j] && set.has(s.slice(j, i))) {
        dp[i] = true;
        break;
      }
    }
  }

  return dp[s.length];
}

function lengthOfLIS(nums) {
  const tails = [];

  for (const x of nums) {
    let l = 0;
    let r = tails.length;

    while (l < r) {
      const m = Math.floor((l + r) / 2);
      if (tails[m] < x) l = m + 1;
      else r = m;
    }

    tails[l] = x;
  }

  return tails.length;
}

function canPartition(nums) {
  const total = nums.reduce((a, b) => a + b, 0);
  if (total % 2 !== 0) return false;

  const target = total / 2;
  const dp = Array(target + 1).fill(false);
  dp[0] = true;

  for (const x of nums) {
    for (let s = target; s >= x; s -= 1) {
      dp[s] = dp[s] || dp[s - x];
    }
  }

  return dp[target];
}

function change(amount, coins) {
  const dp = Array(amount + 1).fill(0);
  dp[0] = 1;

  for (const c of coins) {
    for (let x = c; x <= amount; x += 1) {
      dp[x] += dp[x - c];
    }
  }

  return dp[amount];
}

function uniquePaths(m, n) {
  const dp = Array(n).fill(1);
  for (let r = 1; r < m; r += 1) {
    for (let c = 1; c < n; c += 1) {
      dp[c] += dp[c - 1];
    }
  }
  return dp[n - 1];
}

function canJump(nums) {
  let reach = 0;
  for (let i = 0; i < nums.length; i += 1) {
    if (i > reach) return false;
    reach = Math.max(reach, i + nums[i]);
  }
  return true;
}

function jump(nums) {
  let jumps = 0;
  let curEnd = 0;
  let curFar = 0;

  for (let i = 0; i < nums.length - 1; i += 1) {
    curFar = Math.max(curFar, i + nums[i]);
    if (i === curEnd) {
      jumps += 1;
      curEnd = curFar;
    }
  }

  return jumps;
}

function minCost(n, cuts) {
  cuts.sort((a, b) => a - b);
  cuts = [0, ...cuts, n];

  const m = cuts.length;
  const dp = Array.from({ length: m }, () => Array(m).fill(0));

  for (let len = 2; len < m; len += 1) {
    for (let i = 0; i + len < m; i += 1) {
      const j = i + len;
      dp[i][j] = Infinity;
      for (let k = i + 1; k < j; k += 1) {
        dp[i][j] = Math.min(
          dp[i][j],
          cuts[j] - cuts[i] + dp[i][k] + dp[k][j]
        );
      }
      if (dp[i][j] === Infinity) dp[i][j] = 0;
    }
  }

  return dp[0][m - 1];
}

function superEggDrop(k, n) {
  const dp = Array(k + 1).fill(0);
  let moves = 0;

  while (dp[k] < n) {
    moves += 1;
    for (let e = k; e >= 1; e -= 1) {
      dp[e] = dp[e] + dp[e - 1] + 1;
    }
  }

  return moves;
}

/* =====================================
 * 14) Graphs
 * ===================================*/

function cloneGraph(node) {
  if (!node) return null;

  const map = new Map();

  const dfs = (cur) => {
    if (map.has(cur)) return map.get(cur);

    const copy = new GraphNode(cur.val);
    map.set(cur, copy);

    for (const nei of cur.neighbors) {
      copy.neighbors.push(dfs(nei));
    }

    return copy;
  };

  return dfs(node);
}

function validPath(n, edges, source, destination) {
  const adj = Array.from({ length: n }, () => []);
  for (const [u, v] of edges) {
    adj[u].push(v);
    adj[v].push(u);
  }

  const seen = Array(n).fill(false);
  const q = [source];
  seen[source] = true;
  let head = 0;

  while (head < q.length) {
    const cur = q[head++];
    if (cur === destination) return true;
    for (const nei of adj[cur]) {
      if (!seen[nei]) {
        seen[nei] = true;
        q.push(nei);
      }
    }
  }

  return false;
}

function allPathsSourceTarget(graph) {
  const target = graph.length - 1;
  const out = [];
  const path = [0];

  const dfs = (node) => {
    if (node === target) {
      out.push(path.slice());
      return;
    }

    for (const nei of graph[node]) {
      path.push(nei);
      dfs(nei);
      path.pop();
    }
  };

  dfs(0);
  return out;
}

function findItinerary(tickets) {
  const adj = new Map();
  for (const [from, to] of tickets) {
    if (!adj.has(from)) adj.set(from, []);
    adj.get(from).push(to);
  }

  for (const list of adj.values()) list.sort().reverse();

  const route = [];
  const dfs = (airport) => {
    const list = adj.get(airport) || [];
    while (list.length) {
      dfs(list.pop());
    }
    route.push(airport);
  };

  dfs("JFK");
  return route.reverse();
}

function detectCycleUndirected(n, adj) {
  const seen = Array(n).fill(false);

  const dfs = (u, parent) => {
    seen[u] = true;
    for (const v of adj[u]) {
      if (!seen[v]) {
        if (dfs(v, u)) return true;
      } else if (v !== parent) {
        return true;
      }
    }
    return false;
  };

  for (let i = 0; i < n; i += 1) {
    if (!seen[i] && dfs(i, -1)) return true;
  }

  return false;
}

function topologicalSortDFS(v, adj) {
  const seen = Array(v).fill(0); // 0=unseen,1=visiting,2=done
  const order = [];

  const dfs = (u) => {
    if (seen[u] === 1) return false;
    if (seen[u] === 2) return true;

    seen[u] = 1;
    for (const nei of adj[u]) {
      if (!dfs(nei)) return false;
    }
    seen[u] = 2;
    order.push(u);
    return true;
  };

  for (let i = 0; i < v; i += 1) {
    if (seen[i] === 0 && !dfs(i)) return [];
  }

  return order.reverse();
}

function makeConnected(n, connections) {
  if (connections.length < n - 1) return -1;

  const dsu = new DSU(n);
  for (const [u, v] of connections) dsu.union(u, v);
  return dsu.components - 1;
}

function findCheapestPrice(n, flights, src, dst, k) {
  let dist = Array(n).fill(Infinity);
  dist[src] = 0;

  for (let i = 0; i <= k; i += 1) {
    const next = dist.slice();
    for (const [u, v, w] of flights) {
      if (dist[u] !== Infinity) {
        next[v] = Math.min(next[v], dist[u] + w);
      }
    }
    dist = next;
  }

  return dist[dst] === Infinity ? -1 : dist[dst];
}

function countPaths(n, roads) {
  const MOD = 1_000_000_007;
  const adj = Array.from({ length: n }, () => []);

  for (const [u, v, w] of roads) {
    adj[u].push([v, w]);
    adj[v].push([u, w]);
  }

  const dist = Array(n).fill(Infinity);
  const ways = Array(n).fill(0);
  dist[0] = 0;
  ways[0] = 1;

  const heap = new BinaryHeap((a, b) => a[0] - b[0]);
  heap.push([0, 0]);

  while (heap.size()) {
    const [d, u] = heap.pop();
    if (d > dist[u]) continue;

    for (const [v, w] of adj[u]) {
      const nd = d + w;
      if (nd < dist[v]) {
        dist[v] = nd;
        ways[v] = ways[u];
        heap.push([nd, v]);
      } else if (nd === dist[v]) {
        ways[v] = (ways[v] + ways[u]) % MOD;
      }
    }
  }

  return ways[n - 1];
}

function minCostConnectPoints(points) {
  const n = points.length;
  const minDist = Array(n).fill(Infinity);
  const used = Array(n).fill(false);
  minDist[0] = 0;

  let cost = 0;

  for (let i = 0; i < n; i += 1) {
    let u = -1;
    for (let j = 0; j < n; j += 1) {
      if (!used[j] && (u === -1 || minDist[j] < minDist[u])) u = j;
    }

    used[u] = true;
    cost += minDist[u];

    for (let v = 0; v < n; v += 1) {
      if (!used[v]) {
        const d =
          Math.abs(points[u][0] - points[v][0]) +
          Math.abs(points[u][1] - points[v][1]);
        if (d < minDist[v]) minDist[v] = d;
      }
    }
  }

  return cost;
}

export {
  ListNode,
  TreeNode,
  GraphNode,
  BinaryHeap,
  DSU,
  sum,
  secondLargest,
  isPalindromeNumber,
  reverseInteger,
  countNegativeNumbers,
  findSmallestNumber,
  findLargestNumber,
  binarySearch,
  mergeSort,
  isPowerOfTwo,
  removeDuplicates,
  removeElement,
  reverseString,
  maxProfit,
  mergeSortedArrays,
  moveZeroes,
  findMaxConsecutiveOnes,
  missingNumber,
  singleNumber,
  MyLinkedList,
  middleNode,
  reverseList,
  hasCycle,
  isPalindromeLinkedList,
  getIntersectionNode,
  removeElements,
  removeNthFromEnd,
  deleteDuplicates,
  oddEvenList,
  addTwoNumbers,
  mergeTwoLists,
  rotateRight,
  swapPairs,
  lengthOfLastWord,
  findWordsContaining,
  numJewelsInStones,
  maxFreqSum,
  balancedStringSplit,
  reverseStr,
  isPalindromeString,
  largestOddNumber,
  longestCommonPrefix,
  isAnagram,
  isIsomorphic,
  groupAnagrams,
  minAddToMakeValid,
  reverseWords,
  beautySum,
  decodeString,
  countAndSay,
  reorganizeString,
  repeatedStringMatch,
  Stack,
  MyQueue,
  isValidParentheses,
  MinStack,
  removeOuterParentheses,
  evalRPN,
  nextGreaterElement,
  dailyTemperatures,
  nextGreaterElements,
  orangesRotting,
  mySqrt,
  guessNumber,
  searchInRotatedArray,
  firstBadVersion,
  findPeakElement,
  findMinInRotatedArray,
  searchRange,
  peakIndexInMountainArray,
  singleNonDuplicate,
  findClosestElements,
  twoSum,
  twoSumII,
  isSubsequence,
  strStr,
  getIntersectionNodeTwoPointers,
  maxArea,
  threeSum,
  trap,
  lengthOfLongestSubstring,
  characterReplacement,
  checkInclusion,
  maxSlidingWindow,
  preorderTraversal,
  inorderTraversal,
  postorderTraversal,
  levelOrder,
  maxDepth,
  hasPathSum,
  isSymmetric,
  invertTree,
  isSameTree,
  isBalanced,
  diameterOfBinaryTree,
  zigzagLevelOrder,
  isSubtree,
  lowestCommonAncestor,
  rightSideView,
  goodNodes,
  connect,
  maxPathSum,
  isValidBST,
  searchBST,
  insertIntoBST,
  kthSmallest,
  lowestCommonAncestorBST,
  findKthLargest,
  KthLargest,
  lastStoneWeight,
  topKFrequent,
  kthSmallestInSortedMatrix,
  subsets,
  combine,
  permute,
  subsetsWithDup,
  combinationSum,
  combinationSum2,
  combinationSum3,
  letterCombinations,
  permuteUnique,
  partition,
  exist,
  solveNQueens,
  twoCitySchedCost,
  findContentChildren,
  lemonadeChange,
  maxProfitII,
  insert,
  merge,
  partitionLabels,
  eraseOverlapIntervals,
  leastInterval,
  canCompleteCircuit,
  carPooling,
  candy,
  climbStairs,
  minCostClimbingStairs,
  rob,
  robII,
  coinChange,
  countSubstrings,
  longestPalindrome,
  numDecodings,
  maxSubArray,
  maxProduct,
  wordBreak,
  lengthOfLIS,
  canPartition,
  change,
  uniquePaths,
  canJump,
  jump,
  minCost,
  superEggDrop,
  cloneGraph,
  validPath,
  allPathsSourceTarget,
  findItinerary,
  detectCycleUndirected,
  topologicalSortDFS,
  makeConnected,
  findCheapestPrice,
  countPaths,
  minCostConnectPoints,
};
