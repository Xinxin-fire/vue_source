// 2. settimeout 模拟实现 setinterval
function mySetInterval(callback, timeout) {
  let timer = null;
  function interval() {
    callback();
    timer = setTimeout(interval, timeout);
  }
  interval();
  return  {
    cancel: () => {
      clearTimeout(timer)
    }
  }
}
// setinterval 模拟实现 settimeout 
function mySetTimeout(callback, timeout) {
  let timer = null;
  timer = setInterval(() => {
    if (!timer) {
      callback();
    }
  },timeout);
  return {
    cancel: () => {
      clearInterval(timer)
    }
  }
}

// setInterval将任务推入到任务队列中时会判断当前任务队列是否存在该任务，如果存在则不推入，这导致如果线程中有长任务执行，会跳过某一次任务的推入
// setTimeout则不会判断直接推入