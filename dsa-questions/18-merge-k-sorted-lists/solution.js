// Merge k Sorted Lists using divide and conquer pairwise merging.
class ListNode {
  constructor(val, next = null) {
    this.val = val;
    this.next = next;
  }
}

function mergeTwoLists(l1, l2) {
  const dummy = new ListNode(0);
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

function mergeKLists(lists) {
  if (lists.length === 0) {
    return null;
  }

  let interval = 1;
  while (interval < lists.length) {
    for (let i = 0; i + interval < lists.length; i += interval * 2) {
      lists[i] = mergeTwoLists(lists[i], lists[i + interval]);
    }
    interval *= 2;
  }

  return lists[0];
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
