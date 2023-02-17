// 题目描述:JS 实现一个带并发限制的异步调度器 Scheduler，保证同时运行的任务最多有两个
// 步骤，一个栈存放要执行的异步任务，maxCount存放最大执行的任务数量，runCounts存放当前正在执行的任务数量
// 循环执行栈中的异步任务，并进行判断若当前执行的最大数量超过最大执行的任务数量则return，
// 在异步任务执行完毕后，若栈中任务未执行完，则继续执行
class Scheduler {
  constructor(limit) {
    this.quene = [];
    this.maxCount = limit;
    this.runCounts = 0;
  }
  add(time, order) {
    const promiseCreator = () => {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          console.log(order);
          resolve();
        }, time);
      });
    };
    this.queue.push(promiseCreator);
  }
  taskStart() {
    for (let i = 0; i < this.maxCount; i++) {
      this.request();
    }
  }
  request() {
    if (!this.queue || !this.queue.length || this.runCounts >= this.maxCount) {
      return;
    }
    this.runCounts++;
    this.queue
      .shift()()
      .then(() => {
        this.runCounts--;
        this.request();
      });
  }
}