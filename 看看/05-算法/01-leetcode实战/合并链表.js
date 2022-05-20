function ListNode(val, next) {
    this.val = (val === undefined ? 0 : val)
    this.next = (next === undefined ? null : next)
}

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
let l2 = {
    val: 2,
    next: {
        val: 4,
        next: null
    }
}

let a = l1;
a.next = a.next.next;
console.log(l1);



var mergeTwoLists = function(l1, l2) {
    let prehead = new ListNode(-1)
    let pre = prehead
    while (l1 && l2) {
        if (l1.val < l2.val) {
            pre.next = l1
            l1 = l1.next
        } else {
            pre.next = l2
            l2 = l2.next
        }
        pre = pre.next 
    }
    pre.next = l1 === null ? l2 : l1
    return prehead.next
};
// mergeTwoLists(l1,l2)

 
 