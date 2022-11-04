// 将相邻的两个元素进行比较,内层循环每循环一轮都会将一个最大值排到后面
function bubble(arr) {
  let flag = false;
  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr.length - 1 - i; j++) {
      if (arr[j] > arr[j + 1]) {
        [arr[j + 1], arr[j]] = [arr[j], arr[j + 1]]
        flag = true;
      }
      console.log(arr)
    }
    if (!flag) return arr;
  }
  return arr
}
bubble([5, 3, 2, 4, 1])