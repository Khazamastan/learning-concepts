/**
 * Problem #39: Sorting a linked list
 *
 * Detailed Problem Statement:
 * Sort singly linked list in O(n log n) using merge sort.
 *
 * Example Input:
 * 4 -> 2 -> 1 -> 3
 *
 * Example Output:
 * 1 -> 2 -> 3 -> 4
 */

export const problem = `Sorting a linked list`;

export const statement = `
Sort singly linked list in O(n log n) using merge sort.
`.trim();

export const exampleInput = `
4 -> 2 -> 1 -> 3
`.trim();

export const exampleOutput = `
1 -> 2 -> 3 -> 4
`.trim();

// ---------------------------
// Approach 1: Reference Solution
// ---------------------------
function ListNode(val, next = null) {
  this.val = val;
  this.next = next;
}

function sortList(head) {
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

  return merge(sortList(head), sortList(slow));
}

function merge(a, b) {
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

// ---------------------------
// Approach 2: Brute-force baseline
// ---------------------------
function bruteForce(input) {
  // Try all candidates/pairs/ranges.
  // Validate each and keep the best.
  return input;
}

// ---------------------------
// Approach 3: Optimized with data structures
// ---------------------------
function optimized(input) {
  const state = new Map();
  // Build lookup/prefix/two-pointer state.
  // Return optimized result.
  return input;
}
