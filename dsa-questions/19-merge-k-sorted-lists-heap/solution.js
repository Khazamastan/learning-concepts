// Merge k Sorted Lists using a min-heap (priority queue).
class ListNode {
  constructor(val, next = null) {
    this.val = val;
    this.next = next;
  }
}

class MinHeap {
  constructor(compare) {
    this.data = [];
    this.compare = compare;
  }

  push(item) {
    this.data.push(item);
    this.bubbleUp(this.data.length - 1);
  }

  pop() {
    if (this.data.length === 0) {
      return undefined;
    }
    const top = this.data[0];
    const last = this.data.pop();
    if (this.data.length > 0) {
      this.data[0] = last;
      this.bubbleDown(0);
    }
    return top;
  }

  isEmpty() {
    return this.data.length === 0;
  }

  bubbleUp(index) {
    while (index > 0) {
      const parent = Math.floor((index - 1) / 2);
      if (this.compare(this.data[index], this.data[parent]) < 0) {
        [this.data[index], this.data[parent]] = [this.data[parent], this.data[index]];
        index = parent;
      } else {
        break;
      }
    }
  }

  bubbleDown(index) {
    const length = this.data.length;
    while (true) {
      const left = index * 2 + 1;
      const right = index * 2 + 2;
      let smallest = index;

      if (left < length && this.compare(this.data[left], this.data[smallest]) < 0) {
        smallest = left;
      }
      if (right < length && this.compare(this.data[right], this.data[smallest]) < 0) {
        smallest = right;
      }
      if (smallest === index) {
        break;
      }
      [this.data[index], this.data[smallest]] = [this.data[smallest], this.data[index]];
      index = smallest;
    }
  }
}

function mergeKLists(lists) {
  const heap = new MinHeap((a, b) => a.val - b.val);
  for (const node of lists) {
    if (node) {
      heap.push(node);
    }
  }

  const dummy = new ListNode(0);
  let tail = dummy;

  while (!heap.isEmpty()) {
    const node = heap.pop();
    tail.next = node;
    tail = tail.next;
    if (node.next) {
      heap.push(node.next);
    }
  }

  tail.next = null;
  return dummy.next;
}

module.exports = { ListNode, mergeKLists };

if (require.main === module) {
  const list1 = new ListNode(1, new ListNode(4, new ListNode(5)));
  const list2 = new ListNode(1, new ListNode(3, new ListNode(4)));
  const list3 = new ListNode(2, new ListNode(6));
  let merged = mergeKLists([list1, list2, list3]);
  const values = [];
  while (merged) {
    values.push(merged.val);
    merged = merged.next;
  }
  console.log(values);
}
