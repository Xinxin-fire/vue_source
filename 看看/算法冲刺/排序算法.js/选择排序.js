// 循环遍历数组，每次都找出当前范围内的最小值
function bubble(arr) {
  for (let i = 0; i < arr.length; i++) {
    for (let j = i + 1; j < arr.length; j++) {
      if (arr[i] > arr[j]) {
        [arr[i], arr[j]] = [arr[j], arr[i]]
      }
      console.log(arr)
    }
  }
  return arr
}
bubble([5, 3, 2, 4, 1])