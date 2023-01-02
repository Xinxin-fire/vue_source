let stack = [];
// 最不活跃的就剔除；
let arr = [1,2,3,4];
stack.push(arr.pop())
stack.push(arr.pop())
stack.push(arr.pop())
class LRU {
  constructor(max) {
    this.max = max;
    this.instance = [];
  }
  push(x) {
    if(this.instance.length === max) {
      this.instance.shift();
    }
    this.instance.push(x);
  }
  get(x) {
    if (this.instance.includes(x)) {
      let index = this.instance.indexOf(x);
      this.instance.splice(index, 1);
      this.push(x);
    }
  }
}