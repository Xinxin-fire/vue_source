// 冒泡排序
// 双层循环，在内循环中比较相邻节点，每次循环都有一个最大或最小值被安排到正确的位置上
function bubbleSort(nums) {
  let length = nums.length;
  for (let i = 0; i < length; i++) {
    let flag = false;
    for (let j = 0; j < length - i; j++) {
      if (nums[j] < nums[j + 1]) {
        [nums[j], nums[i]] = [nums[i], nums[j]];
        flag = true;
      }
    }
    if (!flag) return nums;
  }
  return nums;
}
let nums = [5,4,2,3,1,6];
// 选择排序
// ，每次循环都将一个元素排序到正确的位置
function bubbleSort(nums) {
  for (let i = 0; i < nums.length; i++) {
    for (let j = i + 1; j < nums.length; j++) {
      if (nums[j] < nums[i]) {
        [nums[j], nums[i]] = [nums[i], nums[j]];
      }
    }
  }
  return nums;
}
console.log(bubbleSort(nums));
// 插入排序
// 从开始就构造一个正确的排序，每次排序都将元素插入到正确的位置