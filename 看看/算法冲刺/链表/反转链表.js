function ListNode(val) {
  this.val = val;
  this.next = null;
}
// 1.反转链表
function reverseList1(head) {
  let cur = head;
  let pre = null;
  while(cur) {
    const Next = cur.next;
    cur.next = pre;
    // 使用pre保存当前已经反转后的结果
    pre = cur;
    // 每次都是重新处理下一个节点
    cur = Next;
  }
  return pre
}
// 递归反转
function reverseList2(head) {
  if (head === null || head.next === null) {
    return head;
  }
  // 使用递归遍历到链表的尾部，newHead等于head.next
  let newHead = reverseList(head.next);
  // 组成一个两个节点的环形链表
  head.next.next = head;
  // 断开一个实现两个链表的反转
  head.next = null;
  // 返回newHead，此时newHead.next指向head，链表实现反转
  return newHead;
}
// 反转链表核心步骤
head.next.next = head;
head.next = null;
  
// 2.局部列表反转
// 方法1,缓存反转的前节点和尾节点
var reverseBetween = function(head, left, right) {
  let dummy = new ListNode(-1)
  dummy.next = head;
  let pre = dummy
  for (let i = 0; i < left - 1; i++) {
      pre = pre.next;
  }
  // 区间前一个节点
  let leftHead= pre;
  // 区间第一个节点
  let start = leftHead.next;
  let cur = pre.next;
  for (let i = left; i <= right; i++) {
      let NEXT = cur.next;
      cur.next = pre;
      pre = cur;
      cur = NEXT;
  }
  // pre未反转链表中的头节点，start.next为反转链表中的尾结点
  // 两头处理：leftHead指向头节点，start.next指向链表尾段
  leftHead.next = pre;
  start.next = cur;
  return dummy.next
};
// 方法2,头插法
var reverseBetween = function(head, left, right) {
  let dummy = new ListNode(-1)
  dummy.next = head;
  let pre = dummy
  for (let i = 0; i < left - 1; i++) {
      pre = pre.next;
  }
  // 区间第一个节点
  let cur = pre.next;
  for (let i = left; i < right; i++) {
    // 保存next指针
    let next = cur.next;
    // 1.cur先动
    cur.next = next.next;
    // 2.next第二动,next的指针每一次指向反转段中的第一个
    next.next = pre.next;
    // 3.pre第三个动
    pre.next = next;
  }
  return dummy.next
};
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
console.log(reverseBetween2(l1, 1, 3))
