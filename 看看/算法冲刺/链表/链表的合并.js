function ListNode(val) {
  this.val = val;
  this.next = null;
}
var l1 = {
  val: 1,
  next: {
    val: 3,
    next: {
      val: 4,
      next: null
    }
  }
}
var l2 = {
  val: 2,
  next: {
    val: 5,
    next: {
      val: 6,
      next: null
    }
  }
}
function mergeNodeList(l1, l2) {
  var head = new ListNode(-1);
  var cur = head;
  while (l1 && l2) {
    if (l1.val < l2.val) {
      cur.next = l1;
      l1 = l1.next;
    } else {
      cur.next = l2;
      l2 = l2.next;
    }
    cur = cur.next;
  }
  cur.next = l1 !== null ? l1 : l2;
  return head.next;
}
console.log(mergeNodeList(l1, l2))