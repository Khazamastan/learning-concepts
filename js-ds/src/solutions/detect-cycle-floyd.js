/**
 * Title: Detect Cycle — Floyd's Algorithm
 * Difficulty: Easy
 * Companies: Amazon, Google, Meta
 *
 * Problem Summary:
 * Given the head of a linked list, determine if the list contains a cycle.
 *
 * Solution Explanation:
 * Floyd's tortoise and hare pointers move at different speeds; if they ever meet, a cycle exists.
 *
 * Approach Outline:
 * Advance `slow` by one and `fast` by two nodes until `fast` reaches null or the pointers meet.
 *
 * Complexity:
 *   Time: O(n)
 *   Space: O(1)
 *
 * Tests:
 *   - const node1 = { val: 1 }; const node2 = { val: 2 }; node1.next = node2; node2.next = node1; assert.strictEqual(hasCycle(node1), true);
 *   - const listNoCycle = { val: 1, next: { val: 2, next: null } }; assert.strictEqual(hasCycle(listNoCycle), false);
 */

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

module.exports = { hasCycle };

if (require.main === module) {
  const assert = require('node:assert/strict');
  const node1 = { val: 1 }; const node2 = { val: 2 }; node1.next = node2; node2.next = node1; assert.strictEqual(hasCycle(node1), true);
  const listNoCycle = { val: 1, next: { val: 2, next: null } }; assert.strictEqual(hasCycle(listNoCycle), false);
  console.log('All tests passed for Detect Cycle — Floyd's Algorithm.');
}
