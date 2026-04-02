// Heap-based solutions with a reusable binary heap implementation.

class BinaryHeap {
  constructor(compare) {
    this.compare = compare;
    this.data = [];
  }

  size() {
    return this.data.length;
  }

  peek() {
    return this.data[0];
  }

  push(value) {
    this.data.push(value);
    this._siftUp(this.data.length - 1);
  }

  pop() {
    if (this.data.length === 0) return undefined;
    const top = this.data[0];
    const last = this.data.pop();
    if (this.data.length > 0) {
      this.data[0] = last;
      this._siftDown(0);
    }
    return top;
  }

  _siftUp(index) {
    while (index > 0) {
      const parent = Math.floor((index - 1) / 2);
      if (this.compare(this.data[index], this.data[parent])) {
        [this.data[index], this.data[parent]] = [this.data[parent], this.data[index]];
        index = parent;
      } else break;
    }
  }

  _siftDown(index) {
    const length = this.data.length;
    while (true) {
      let left = index * 2 + 1;
      let right = index * 2 + 2;
      let best = index;
      if (left < length && this.compare(this.data[left], this.data[best])) best = left;
      if (right < length && this.compare(this.data[right], this.data[best])) best = right;
      if (best !== index) {
        [this.data[index], this.data[best]] = [this.data[best], this.data[index]];
        index = best;
      } else break;
    }
  }
}

/**
 * Problem: Kth Largest Element in an Array
 * Return kth largest element.
 * Solution: Maintain min-heap of size k (O(n log k)).
 */
export function findKthLargest(nums, k) {
  const heap = new BinaryHeap((a, b) => a < b);
  for (const num of nums) {
    heap.push(num);
    if (heap.size() > k) heap.pop();
  }
  return heap.peek();
}

/**
 * Problem: Kth Largest Element in a Stream
 * Maintain structure supporting add and retrieving kth largest.
 * Solution: Same min-heap approach updated per insertion (O(log k) per add).
 */
export class KthLargest {
  constructor(k, nums) {
    this.k = k;
    this.heap = new BinaryHeap((a, b) => a < b);
    for (const num of nums) {
      this.heap.push(num);
      if (this.heap.size() > k) this.heap.pop();
    }
  }

  add(val) {
    this.heap.push(val);
    if (this.heap.size() > this.k) this.heap.pop();
    return this.heap.peek();
  }
}

/**
 * Problem: Last Stone Weight
 * Smash two heaviest stones until at most one remains.
 * Solution: Max-heap to repeatedly take two largest (O(n log n)).
 */
export function lastStoneWeight(stones) {
  const maxHeap = new BinaryHeap((a, b) => a > b);
  for (const stone of stones) maxHeap.push(stone);
  while (maxHeap.size() > 1) {
    const y = maxHeap.pop();
    const x = maxHeap.pop();
    if (y > x) maxHeap.push(y - x);
  }
  return maxHeap.peek() ?? 0;
}

/**
 * Problem: Top K Frequent Elements
 * Return k most frequent elements.
 * Solution: Frequency map then min-heap by frequency (O(n log k)).
 */
export function topKFrequent(nums, k) {
  const counts = new Map();
  for (const num of nums) counts.set(num, (counts.get(num) ?? 0) + 1);
  const heap = new BinaryHeap((a, b) => a[1] < b[1]);
  for (const entry of counts.entries()) {
    heap.push(entry);
    if (heap.size() > k) heap.pop();
  }
  return heap.data.map(([num]) => num);
}

/**
 * Problem: Kth Smallest Element in a Sorted Matrix
 * Matrix rows & cols sorted ascending; return kth smallest.
 * Solution: Min-heap seeded with first column; pop k-1 times (O(k log n)).
 */
export function kthSmallest(matrix, k) {
  const n = matrix.length;
  if (n === 0) throw new Error('Matrix must be non-empty');
  const heap = new BinaryHeap((a, b) => a.value < b.value);
  for (let r = 0; r < Math.min(n, k); r += 1) {
    heap.push({ value: matrix[r][0], row: r, col: 0 });
  }
  let current = null;
  for (let i = 0; i < k; i += 1) {
    current = heap.pop();
    if (current.col + 1 < matrix[current.row].length) {
      heap.push({
        value: matrix[current.row][current.col + 1],
        row: current.row,
        col: current.col + 1,
      });
    }
  }
  return current.value;
}
