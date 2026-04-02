// Add Two Numbers represented as linked lists.
class ListNode {
  constructor(val, next = null) {
    this.val = val;
    this.next = next;
  }
}

function addTwoNumbers(l1, l2) {
  const dummyHead = new ListNode(0);
  let current = dummyHead;
  let carry = 0;

  let p = l1;
  let q = l2;

  while (p !== null || q !== null || carry !== 0) {
    const x = p ? p.val : 0;
    const y = q ? q.val : 0;
    const sum = x + y + carry;
    carry = Math.floor(sum / 10);
    current.next = new ListNode(sum % 10);
    current = current.next;
    if (p) {
      p = p.next;
    }
    if (q) {
      q = q.next;
    }
  }

  return dummyHead.next;
}

module.exports = { ListNode, addTwoNumbers };

if (require.main === module) {
  const l1 = new ListNode(2, new ListNode(4, new ListNode(3)));
  const l2 = new ListNode(5, new ListNode(6, new ListNode(4)));
  let result = addTwoNumbers(l1, l2);
  const values = [];
  while (result) {
    values.push(result.val);
    result = result.next;
  }
  console.log(values);
}
