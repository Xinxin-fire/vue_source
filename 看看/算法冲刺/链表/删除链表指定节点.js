function ListNode(val) {
  this.val = val;
  this.next = null;
}
function deleteNode(head, node) {
  let pre = new ListNode(-1);
  pre.next = head;
  while(pre.next) {
    if (pre.next.val === node) {
      pre.next = pre.next.next
    }
  }
  return head;
}