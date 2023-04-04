// 实现一个 LazyMan，可以按照以下方式调用:
// LazyMan(“Hank”)输出:
// Hi! This is Hank!

// LazyMan(“Hank”).sleep(10).eat(“dinner”)输出
// Hi! This is Hank!
// //等待10秒..
// Wake up after 10
// Eat dinner~

// LazyMan(“Hank”).eat(“dinner”).eat(“supper”)输出
// Hi This is Hank!
// Eat dinner~
// Eat supper~

// LazyMan(“Hank”).eat(“supper”).sleepFirst(5)输出
// //等待5秒
// Wake up after 5
// Hi This is Hank!
// Eat supper
class _LazyMan {
  constructor(name) {
    this.stack = [];
    const stack = () => {
      console.log(`Hi! This is ${name}`);
      this.next()
    }
    this.stack.push(stack);
    setTimeout(() => {
      this.next();
    }, 0)
  }
  next() {
    this.stack.length && this.stack.shift()();
  }
  sleep(time) {
    this.setTimeoutEvent(time, false);
    return this
  }
  sleepFirst(time) {
    this.setTimeoutEvent(time, true);
    return this
  }
  setTimeoutEvent(time, first) {
    const stack = () => {
      setTimeout(() => {
        console.log(`Wake up after ${time}`);
        this.next();
      }, time * 1000);
    }
    if (first) {
      this.stack.unshift(stack);
    } else {
      this.stack.push(stack);
    }
  }
  eat(name) {
    const stack = () => {
      console.log(`Eat ${name}`);
      this.next()
    }
    this.stack.push(stack);
    return this
  }
}
function LazyMan(name) {
  return new _LazyMan(name);
}
LazyMan('Hank').sleep(1).eat('dinner')