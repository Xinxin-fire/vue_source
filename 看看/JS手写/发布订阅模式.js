// 实现一个发布订阅模式拥有 on emit once off 方法
class EventEmitter {
  constructor() {
    this.events = {};
  }
  // 监听事件
  on(type, callback) {
    if (this.events[type]) {
      this.events[type].push(callback)
    } else {
      this.events[type] = [callback];
    }
  }
  // 发布事件
  emit(type, ...args) {
    if (this.events[type]) {
      this.events[type].forEach(callback => {
        callback.apply(this, args);
      });
    }
  }
  // 只执行一次订阅事件
  once(type, callback) {
    function fn(...args) {
      callback(...args);
      this.off(type, fn)
    }
    this.on(type, fn)
  }
  // 注销事件
  off(type, callback) {
    if (this.events[type]) {
      this.events[type] = this.events[type].filter(ele => {
        ele !== callback;
      })
    }
  }
}
