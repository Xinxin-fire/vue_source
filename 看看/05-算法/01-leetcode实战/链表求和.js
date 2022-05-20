// import ListNode from './common';
// import {l1,l2} from './common';
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
var addTwoNumbers = function(l1, l2) {
    let cur1 = l1, pre1 = null, cur2 = l2 , pre2 = null;
    while (cur1) {
        let next = cur1.next;
        cur1.next = pre1;
        pre1 = cur1;
        cur1 = next;
    }
    while (cur2) {
        let next = cur2.next;
        cur2.next = pre2;
        pre2 = cur2;
        cur2 = next;
    }
    let cum1 = l1, cum2 = l2, count = 0,currentIndex = 1;
    while (cum1 && cum2) {
        count += cum1.val * currentIndex + cum2.val * currentIndex;
        currentIndex++;
    }
    while (cum1) {
        count += cum1.val * currentIndex;
        currentIndex++;
    }
    while (cum2) {
        count += cum2.val * currentIndex;
        currentIndex++;
    }
    return count
};

console.log(addTwoNumbers(l1, l2));
