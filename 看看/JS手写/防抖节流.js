// 防抖节流为什么都需要返回一个函数
// 防抖节流主要是用来防止某个事件频繁的触发，因此他经常作为一个回调函数被调用，将防抖函数的执行结果作为回调函数传入则可以在事件触发时执行内部的返回函数
// 另外返回一个函数还形成了一个闭包，让一些变量无法被回收，从而判断函数调用栈中的变量来进行一些定时器的清除操作
// 为什么要改变this的执行，this的执行根据执行上下文有关（即函数是如何被调用的），改变this的指向可以保证当前回调函数的this指向正确

// 在一定时间内只执行一次，如果事件重复触发则重新计时
function debounce(fn, timeout) {
  let timeId = null;
  return function(...args) {
    if (timeId) {
      clearTimeout(timeId)
    }
    timeId = setTimeout(() => {
      fn.apply(this, args)
    }, timeout)
  }
}

function debounce(fn, timeout, immediate) {
  let timeId = null;
  return function(...args) {
    if (!timeId && immediate) {
      fn.apply(this, args);
    }
    clearTimeout(timeoutId);
    timeId = setTimeout(() => {
      if(!immediate) {
        fn.apply(this, args)
      }
      timeId = null
    }, timeout)
  }
}

// 在一定时间内只执行一次，如果事件重复触发则只在规定的时间到了之后执行
function throttle(fn, timeout) {
  let curtime = Date.now;
  return function(...args) {
    let now = Date.now;
    if (now - curtime >= timeout) {
      fn.apply(this, args);
      curtime = now;
    }
  }
}

function throttle(fn, timeout, immediate) {
  let curtime = Date.now;
  return function(...args) {
    let now = Date.now;
    if (now - curtime >= timeout) {
      fn.apply(this, args);
      curtime = now;
    }
  }
}