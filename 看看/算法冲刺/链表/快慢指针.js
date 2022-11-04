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
// 1.删除链表的倒数第n个节点
function deleteNode(head, n) {
  let tailHead = new ListNode(-1)
  tailHead.next = head;
  let slow = tailHead;
  let fast = tailHead;
  let count = 0;
  while(fast.next) {
    fast = fast.next;
    count++;
    if (count > n) {
      slow =  slow.next
    }
  }
  slow.next = slow.next.next;
  return tailHead.next;
}


console.log(deleteNode(l1, 2))