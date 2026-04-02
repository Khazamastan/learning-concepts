// Reverse Linked List iteratively.
class ListNode {
  constructor(val, next = null) {
    this.val = val;
    this.next = next;
  }
}

function reverseList(head) {
  let prev = null;
  let current = head;

  while (current !== null) {
    const nextNode = current.next;
    current.next = prev;
    prev = current;
    current = nextNode;
  }

  return prev;
}

module.exports = { ListNode, reverseList };

if (require.main === module) {
  const head = new ListNode(1, new ListNode(2, new ListNode(3, new ListNode(4, new ListNode(5)))));
  let reversed = reverseList(head);
  const values = [];
  while (reversed) {
    values.push(reversed.val);
    reversed = reversed.next;
  }
  console.log(values);
}
