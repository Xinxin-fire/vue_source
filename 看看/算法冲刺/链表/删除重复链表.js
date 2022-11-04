// 1.链表去重
function deleteDuplicates(head) {
  let cur = head;
  while(cur && cur.next) {
    if (cur.val === cur.next.val) {
      cur.next = cur.next.next
    } else {
      cur = cur.next
    }
  }
  return head;
}
function ListNode(val) {
  this.val = val;
  this.next = null;
}
// 2.删除重复元素
function deleteDuplicates(head) {
  let tailHead = new ListNode();
  tailHead.next = head;
  let cur = tailHead
  while(cur.next && cur.next.next) {
    if (cur.next.val === cur.next.next.val) {
      let val = cur.next.val;
      while(cur.next && cur.next.val === val) {
        cur.next = cur.next.next
      }
    } else {
      cur = cur.next
    }
  }
  return tailHead.next;
}