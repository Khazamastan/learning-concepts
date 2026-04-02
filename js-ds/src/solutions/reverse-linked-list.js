/**
 * Title: Reverse Linked List
 * Difficulty: Easy
 * Companies: Amazon, Google, Meta, Microsoft
 *
 * Problem Summary:
 * Given the head of a singly linked list, reverse the list in-place and return the new head.
 *
 * Solution Explanation:
 * Iteratively reverse pointers using previous, current, and next references to reverse the list in one pass.
 *
 * Approach Outline:
 * Traverse the list updating `curr.next` to point to `prev`, then advance `prev` and `curr` until the end, returning the last non-null `prev`.
 *
 * Complexity:
 *   Time: O(n)
 *   Space: O(1)
 *
 * Tests:
 *   - const list = { val: 1, next: { val: 2, next: { val: 3, next: null } } }; assert.deepStrictEqual(reverseList(list), { val: 3, next: { val: 2, next: { val: 1, next: null } } });
 *   - assert.strictEqual(reverseList(null), null);
 */

function reverseList(head) {
  let prev = null;
  let curr = head;
  while (curr) {
    const next = curr.next;
    curr.next = prev;
    prev = curr;
    curr = next;
  }
  return prev;
}

module.exports = { reverseList };

if (require.main === module) {
  const assert = require('node:assert/strict');
  const list = { val: 1, next: { val: 2, next: { val: 3, next: null } } }; assert.deepStrictEqual(reverseList(list), { val: 3, next: { val: 2, next: { val: 1, next: null } } });
  assert.strictEqual(reverseList(null), null);
  console.log('All tests passed for Reverse Linked List.');
}
