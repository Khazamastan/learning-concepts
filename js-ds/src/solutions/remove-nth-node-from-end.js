/**
 * Title: Remove Nth Node From End
 * Difficulty: Medium
 * Companies: Amazon, Google, Meta
 *
 * Problem Summary:
 * Given the head of a linked list, remove the nth node from the end and return the head.
 *
 * Solution Explanation:
 * Two pointers separated by `n+1` nodes place the slow pointer right before the node to remove.
 *
 * Approach Outline:
 * Use a dummy head. Advance `fast` `n+1` steps, then move both pointers until `fast` hits null; unlink `slow.next`.
 *
 * Complexity:
 *   Time: O(n)
 *   Space: O(1)
 *
 * Tests:
 *   - const list = { val: 1, next: { val: 2, next: { val: 3, next: { val: 4, next: { val: 5, next: null } } } } }; assert.deepStrictEqual(removeNthFromEnd(list, 2), { val: 1, next: { val: 2, next: { val: 3, next: { val: 5, next: null } } } });
 *   - const single = { val: 1, next: null }; assert.strictEqual(removeNthFromEnd(single, 1), null);
 */

function removeNthFromEnd(head, n) {
  const dummy = { val: 0, next: head };
  let fast = dummy;
  let slow = dummy;
  for (let i = 0; i <= n; i += 1) {
    fast = fast.next;
  }
  while (fast) {
    fast = fast.next;
    slow = slow.next;
  }
  slow.next = slow.next ? slow.next.next : null;
  return dummy.next;
}

module.exports = { removeNthFromEnd };

if (require.main === module) {
  const assert = require('node:assert/strict');
  const list = { val: 1, next: { val: 2, next: { val: 3, next: { val: 4, next: { val: 5, next: null } } } } }; assert.deepStrictEqual(removeNthFromEnd(list, 2), { val: 1, next: { val: 2, next: { val: 3, next: { val: 5, next: null } } } });
  const single = { val: 1, next: null }; assert.strictEqual(removeNthFromEnd(single, 1), null);
  console.log('All tests passed for Remove Nth Node From End.');
}
