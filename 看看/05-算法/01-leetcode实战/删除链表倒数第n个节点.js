let l1 = {
    val: 1,
    next: {
        val: 3,
        next: {
            val: 5,
            next: null
        }
    }
}
function ListNode(val, next) {
    this.val = (val === undefined ? 0 : val)
    this.next = (next === undefined ? null : next)
}
var removeNthFromEnd = function(head, n) {
    // 获取链表长度
    let h = head, length = 0;
    while (h) {
        h = h.next;
        length ++;
    }
    // 要删除的节点索引
    let index = length -n,currentIndex = 0;
    let  cur = new ListNode(-1, head); 
    head = cur;
    while (cur.next) {
        if (index === currentIndex) {
            cur.next = cur.next.next
            return head.next
        } else {
            cur = cur.next;
            currentIndex++;
        } 
    }
    return head.next
};
console.log(removeNthFromEnd(l1, 3));
