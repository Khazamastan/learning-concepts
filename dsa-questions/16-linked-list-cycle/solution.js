// Linked List Cycle detection using Floyd's tortoise and hare algorithm.
class ListNode {
  constructor(val, next = null) {
    this.val = val;
    this.next = next;
  }
}

function hasCycle(head) {
  let slow = head;
  let fast = head;

  while (fast && fast.next) {
    slow = slow.next;
    fast = fast.next.next;
    if (slow === fast) {
      return true;
    }
  }

  return false;
}

module.exports = { ListNode, hasCycle };

if (require.main === module) {
  const node1 = new ListNode(3);
  const node2 = new ListNode(2);
  const node3 = new ListNode(0);
  const node4 = new ListNode(-4);
  node1.next = node2;
  node2.next = node3;
  node3.next = node4;
  node4.next = node2; // create cycle
  console.log(hasCycle(node1));
}
