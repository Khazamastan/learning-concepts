// Linked List category solutions with explanations and ListNode helper.

/**
 * Basic singly-linked list node used across problems.
 */
export class ListNode {
  constructor(val = 0, next = null) {
    this.val = val;
    this.next = next;
  }
}

/**
 * Problem: Design Linked List (LeetCode 707)
 * Implement a singly linked list supporting get, add, and delete by index.
 * Solution: Maintain dummy head and size; each operation walks as needed (O(n) per op, O(1) extra space).
 */
export class MyLinkedList {
  constructor() {
    this.dummy = new ListNode(0);
    this.size = 0;
  }

  get(index) {
    if (index < 0 || index >= this.size) return -1;
    let current = this.dummy.next;
    for (let i = 0; i < index; i += 1) current = current.next;
    return current.val;
  }

  addAtHead(val) {
    this.addAtIndex(0, val);
  }

  addAtTail(val) {
    this.addAtIndex(this.size, val);
  }

  addAtIndex(index, val) {
    if (index < 0 || index > this.size) return;
    let prev = this.dummy;
    for (let i = 0; i < index; i += 1) prev = prev.next;
    const node = new ListNode(val, prev.next);
    prev.next = node;
    this.size += 1;
  }

  deleteAtIndex(index) {
    if (index < 0 || index >= this.size) return;
    let prev = this.dummy;
    for (let i = 0; i < index; i += 1) prev = prev.next;
    prev.next = prev.next.next;
    this.size -= 1;
  }
}

/**
 * Problem: Middle of Linked List
 * Return the middle node (second middle for even length).
 * Solution: Fast/slow pointers; when fast reaches end, slow is middle (O(n) time, O(1) space).
 */
export function middleNode(head) {
  let slow = head;
  let fast = head;
  while (fast && fast.next) {
    slow = slow.next;
    fast = fast.next.next;
  }
  return slow;
}

/**
 * Problem: Reverse Linked List
 * Reverse a singly linked list.
 * Solution: Iteratively flip pointers using three variables (O(n) time, O(1) space).
 */
export function reverseList(head) {
  let prev = null;
  let current = head;
  while (current) {
    const next = current.next;
    current.next = prev;
    prev = current;
    current = next;
  }
  return prev;
}

/**
 * Problem: Linked List Cycle
 * Detect whether a linked list contains a cycle.
 * Solution: Floyd's tortoise-hare algorithm (O(n) time, O(1) space).
 */
export function hasCycle(head) {
  let slow = head;
  let fast = head;
  while (fast && fast.next) {
    slow = slow.next;
    fast = fast.next.next;
    if (slow === fast) return true;
  }
  return false;
}

/**
 * Problem: Palindrome Linked List
 * Check whether the linked list reads the same forward and backward.
 * Solution: Find middle, reverse second half, compare, then optionally restore (O(n) time, O(1) space).
 */
export function isPalindromeList(head) {
  if (!head || !head.next) return true;
  let slow = head;
  let fast = head;
  while (fast && fast.next) {
    slow = slow.next;
    fast = fast.next.next;
  }
  let secondHalf = reverseList(slow);
  let firstHalf = head;
  let copySecond = secondHalf;
  let result = true;
  while (copySecond) {
    if (copySecond.val !== firstHalf.val) {
      result = false;
      break;
    }
    copySecond = copySecond.next;
    firstHalf = firstHalf.next;
  }
  reverseList(secondHalf);
  return result;
}

/**
 * Problem: Intersection of Two Linked Lists
 * Return the intersection node or null.
 * Solution: Two-pointer technique switching heads to sync path lengths (O(m + n) time, O(1) space).
 */
export function getIntersectionNode(headA, headB) {
  if (!headA || !headB) return null;
  let a = headA;
  let b = headB;
  while (a !== b) {
    a = a ? a.next : headB;
    b = b ? b.next : headA;
  }
  return a;
}

/**
 * Problem: Remove Linked List Elements
 * Remove all nodes with value val.
 * Solution: Use sentinel node and relink skipping target values (O(n) time, O(1) space).
 */
export function removeElements(head, val) {
  const dummy = new ListNode(0, head);
  let prev = dummy;
  let current = head;
  while (current) {
    if (current.val === val) {
      prev.next = current.next;
    } else {
      prev = current;
    }
    current = current.next;
  }
  return dummy.next;
}

/**
 * Problem: Remove Nth Node From End of List
 * Delete the n-th node from the end and return the head.
 * Solution: Advance fast pointer n steps, then move both until fast ends to find predecessor (O(n) time, O(1) space).
 */
export function removeNthFromEnd(head, n) {
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

/**
 * Problem: Remove Duplicates from Sorted List
 * Delete duplicates so each value appears once.
 * Solution: Traverse once, skipping nodes with equal next values (O(n) time, O(1) space).
 */
export function deleteDuplicates(head) {
  let current = head;
  while (current && current.next) {
    if (current.val === current.next.val) {
      current.next = current.next.next;
    } else {
      current = current.next;
    }
  }
  return head;
}

/**
 * Problem: Odd Even Linked List
 * Group nodes with odd indices followed by even indices.
 * Solution: Maintain odd/even sub-lists and stitch them together (O(n) time, O(1) space).
 */
export function oddEvenList(head) {
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

/**
 * Problem: Add Two Numbers
 * Add numbers represented by reversed linked lists.
 * Solution: Traverse both lists with carry propagation (O(max(m,n)) time, O(1) extra space besides output).
 */
export function addTwoNumbers(l1, l2) {
  const dummy = new ListNode(0);
  let tail = dummy;
  let carry = 0;
  let a = l1;
  let b = l2;
  while (a || b || carry) {
    const sum = (a?.val ?? 0) + (b?.val ?? 0) + carry;
    carry = Math.floor(sum / 10);
    tail.next = new ListNode(sum % 10);
    tail = tail.next;
    a = a?.next ?? null;
    b = b?.next ?? null;
  }
  return dummy.next;
}

/**
 * Problem: Merge Two Sorted Lists
 * Merge and return a new sorted list composed of input nodes.
 * Solution: Use sentinel node and pick smaller head each step (O(m + n) time, O(1) space).
 */
export function mergeTwoLists(list1, list2) {
  const dummy = new ListNode(0);
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
}

/**
 * Problem: Rotate List
 * Rotate the list right by k positions.
 * Solution: Compute length, connect tail to head, break at new tail (O(n) time, O(1) space).
 */
export function rotateRight(head, k) {
  if (!head || k === 0) return head;
  let length = 1;
  let tail = head;
  while (tail.next) {
    tail = tail.next;
    length += 1;
  }
  k %= length;
  if (k === 0) return head;
  tail.next = head;
  let stepsToNewTail = length - k - 1;
  let newTail = head;
  for (let i = 0; i < stepsToNewTail; i += 1) newTail = newTail.next;
  const newHead = newTail.next;
  newTail.next = null;
  return newHead;
}

/**
 * Problem: Swap Nodes in Pairs
 * Swap each adjacent pair of nodes.
 * Solution: Use iterative pointer manipulation with dummy head (O(n) time, O(1) space).
 */
export function swapPairs(head) {
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
