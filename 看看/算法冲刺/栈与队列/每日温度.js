// 给定每日温度的列表,返回每日升温需要的天数,若不能升温返回0
function dailyTemperatures(T) {
  let stack = [];
  let length = T.length;
  let result = new Array(length).fill(0);
  for (let i = 0; i < length; i++) {
    while (stack.length && T[i] > T[stack[stack.length - 1]]) {
      let top = stack.pop();
      // 当前遍历索引值 - 栈顶索引元素 === 最近升温所需天
      result[top] = i - top;
    }
    // 栈中存储结果的索引
    stack.push(i)
  }
  return result;
}
console.log(dailyTemperatures([73, 74, 75, 71, 69, 72, 76, 73]))