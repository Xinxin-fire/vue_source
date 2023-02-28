// 冒泡排序
// 双层循环，在内循环中比较相邻节点，每次循环都有一个最大或最小值被安排到正确的位置上
// 时间复杂度：On2，稳定排序， 原地排序算法
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
// 时间复杂度：On2，不稳定排序，原地排序算法
// 双层循环，将外层元素与内层循环的每一个元素比较，每次循环都有一个最小或最大值被安排到正确的位置上
function selectSort(nums) {
  let minIndex
  for (let i = 0; i < nums.length; i++) {
    minIndex = i;
    for (let j = i + 1; j < nums.length; j++) {
      if (nums[j] < nums[minIndex]) {
        minIndex = j
      }
    }
    if (minIndex !== i) {
      [nums[i], nums[minIndex]] = [nums[minIndex], nums[i]]
    }
  }
  return nums;
}
console.log(selectSort(nums));
// 插入排序
// 从开始就构造一个正确的排序，每次排序都将元素插入到正确的位置
// 时间复杂度：On2，稳定排序， 原地排序算法
function insertSort(nums) {
  for (let i = 1; i < nums.length; i++) {
    let j = i;
    let temp = nums[j];
    while(j > 0 && nums[j-1] > nums[j]) {
      nums[j] = nums[j-1];
      j--;
    }
    nums[j] = temp 
  }
  return nums;
}