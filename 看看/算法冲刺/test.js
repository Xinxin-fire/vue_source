// 排序算法
// 1.冒泡排序， 每一轮都比较相邻两项，如果第一项比第二项大则交换，
// 每一层循环都会有一个最大的项被排序出来
var sortArray = function(nums) {
  for (let i = 0; i < nums.length; i++) {
    for (let j = 0; j < nums.length - 1 - i; j++) {
      if (nums[j] > nums[j + 1]) {
        [nums[j], nums[j+ 1]] = [nums[j + 1], nums[j]]
      }
    }
  }
  return nums;
};
// 选择排序
// 循环遍历数组，每次都找出当前范围内的最小值,把它放在当前范围的头部
var sortArray = function(nums) {
  for (let i = 0; i < nums.length; i++) {
    for (let j = i+1; j < nums.length; j++) {
      if (nums[i] > nums[j]) {
        [nums[j], nums[i]] = [nums[i], nums[j]]
      }
    }
  }
  return nums;
};


console.log(sortArray([5,2,3,1]));