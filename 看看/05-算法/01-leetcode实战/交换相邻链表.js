// var swapPairs = function(head) {
//     if (head===null) return head;
//     let fast = head.next, slow = head;
//     while(fast) {
//         let pre = fast.val;
//         fast.val = slow.val;
//         slow.val = pre;
//         if (fast.next) {
//             fast= fast.next.next;
//             slow = slow.next.next;
//         } else {
//             return head
//         }
//     }
//     return head;
// };
function ListNode(val, next) {
    this.val = (val === undefined ? 0 : val)
    this.next = (next === undefined ? null : next)
}
var swapPairs = function(head) {
    let pre = new ListNode(-1);
    pre.next = head;
    let cur = pre
    while(cur.next && cur.next.next) {
        console.log(head);
        let node1 = cur.next;
        let node2 = cur.next.next;
        cur.next = node2;
        node1.next = node2.next
        node2.next = node1;
        cur = node1;
        
    }
}
let l1 = {
    val: 1,
    next: {
        val: 3,
        next: {
            val: 5,
            next: {
                val: 6,
                next: null
            }
        }
    }
}
console.log(swapPairs(l1));
