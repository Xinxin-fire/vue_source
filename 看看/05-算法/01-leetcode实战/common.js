export default function ListNode(val, next) {
    this.val = (val === undefined ? 0 : val)
    this.next = (next === undefined ? null : next)
}

export let l1 = {
    val: 1,
    next: {
        val: 3,
        next: {
            val: 5,
            next: null
        }
    }
}
export let l2 = {
    val: 2,
    next: {
        val: 4,
        next: null
    }
}
