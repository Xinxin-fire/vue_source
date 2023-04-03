 function ListNode(val, next) {
  this.val = (val===undefined ? 0 : val)
  this.next = (next===undefined ? null : next)
}
var sortList = function(head) {
  function changeList(pre, list1, list2) {
    let next = list2.next;
    pre.next = list2;
    list2.next = list1;
    list1.next = next;
  }
  let dommy = new ListNode(-1);
  dommy.next = head;
  let cur1 = dommy;
  while(cur1.next && cur1.next.next) {
    let cur2 = dommy;
    while(cur2.next && cur2.next.next) {
      if (cur2.next.val > cur2.next.next.val) {
        changeList(cur2, cur2.next, cur2.next.next)
        cur2 = cur2.next
      } else {
        cur2 = cur2.next
      }
    }
    console.log(dommy)
    cur1 = cur1.next
  }
  return dommy.next
};
let head = {
  val: 4, 
  next: {
    val: 3,
    next: {
      val: 2,
      next: {
        val: 1,
        next: null
      }
    }
  }
}
console.log(sortList(head));