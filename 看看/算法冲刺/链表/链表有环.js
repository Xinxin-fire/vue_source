// 判断是否有环
function isCircle(head) {
  let slow = head;
  let fast = head;
  while(fast && fast.next) {
    slow = slow.next;
    fast = fast.next.next;
    if (slow === fast) {
      return true
    }
  }
  return false
}
// 判断环的起点
// 1.hash法
function detectCycle(head) {
  let set = new Set();
  while(head) {
    if (set.has(head)) {
      return head
    } else {
      set.add(head);
      head = head.next
    }
  }
  return null;
}

// 2.双指针法
// 将链表分为三段,一段为起点到环的起点,设为a,一段为环的起点到双指针相遇点,设为b,一段为双指针相遇点到环的起点,设为c,
// 则有 a + n(b + c) + b = 2(a + b) => a = c + (n - 1)(b + c)
// 由此可知,从a点和c点同时出发一定会在环的起点相遇
function detectCycle1(head) {
  let fast = head;
  let slow = head;
  let pre = head;
  while(fast && fast.next) {
    fast = fast.next.next;
    slow = slow.next;
    if (fast == slow) {
      while(pre !== slow) {
        pre = pre.next;
        slow = slow.next;
      }
      return pre
    }
  }
  return null
}