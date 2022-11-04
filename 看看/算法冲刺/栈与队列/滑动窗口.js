// 双指针法
function maxSlidingWindow(nums, k) {
  let left = 0, right = k - 1, result = [];
  while (right < nums.length) {
    result.push(getMax(nums.slice(left, right + 1)))
    right++;
    left++
  }
  function getMax(arr) {
    arr.reduce((pre, cur) => {
      return Math.max(pre, cur)
    }, arr[0])
  }
  return result;
}
// 双端队列法
function maxSlidingWindow(nums, k) {
  // 初始化双端队列, 双端队列维持的是索引
  let quene = [];
  // 初始化结果数组
  let res = [];
  for (let i = 0; i < nums.length; i++) {
    // 如果当前元素大于双端队列队尾的元素则移除双端队列队尾的元素;
    while(quene.length && nums[i] > nums[quene[quene.length - 1]]) {
      quene.pop();
    }
    // 将当前元素入队
    quene.push(i);
    // 判断队头元素是否在滑动窗口之外
    if (quene.length && quene[0] <= i - k) {
      quene.shift();
    }
    // 判断经过的元素是否大于k
    if(i + 1 >= k) {
      res.push(nums[quene[0]])
    }
  }
  return res;
}