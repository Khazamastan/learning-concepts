/**
 * Title: Merge Two Sorted Lists
 * Difficulty: Easy
 * Companies: Amazon, Google, Meta, Microsoft
 *
 * Problem Summary:
 * Given the heads of two sorted linked lists, merge them into a single sorted list by reusing the nodes.
 *
 * Solution Explanation:
 * A dummy head and tail pointer simplify merging by always attaching the smaller node next.
 *
 * Approach Outline:
 * Traverse both lists, attaching the smaller current node to the tail each time, then append the remaining list at the end.
 *
 * Complexity:
 *   Time: O(n + m)
 *   Space: O(1)
 *
 * Tests:
 *   - const listA = { val: 1, next: { val: 2, next: { val: 4, next: null } } }; const listB = { val: 1, next: { val: 3, next: { val: 4, next: null } } }; assert.deepStrictEqual(mergeTwoLists(listA, listB), { val: 1, next: { val: 1, next: { val: 2, next: { val: 3, next: { val: 4, next: { val: 4, next: null } } } } } });
 *   - assert.strictEqual(mergeTwoLists(null, null), null);
 */

function mergeTwoLists(l1, l2) {
  const dummy = { val: 0, next: null };
  let tail = dummy;
  let a = l1;
  let b = l2;
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

module.exports = { mergeTwoLists };

if (require.main === module) {
  const assert = require('node:assert/strict');
  const listA = { val: 1, next: { val: 2, next: { val: 4, next: null } } }; const listB = { val: 1, next: { val: 3, next: { val: 4, next: null } } }; assert.deepStrictEqual(mergeTwoLists(listA, listB), { val: 1, next: { val: 1, next: { val: 2, next: { val: 3, next: { val: 4, next: { val: 4, next: null } } } } } });
  assert.strictEqual(mergeTwoLists(null, null), null);
  console.log('All tests passed for Merge Two Sorted Lists.');
}
