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

// 插入排序
// 保存当前正在遍历的值，并在已排序好的数组中找到其对应位置
var sortArray1 = function(nums) {
  for(let i = 0; i < nums.length; i++) {
    let j = i;
    let temp = nums[i];
    while(j > 0 && nums[j-1] > temp) {
      [nums[j-1], nums[j]] = [nums[j], nums[j-1]];
      j--
    }
  }
  return nums;
};
console.log(sortArray1([5,2,3,1,4,7]));
// 归并排序
// 将数组分成一个个小数组,每个小数组再进行有序合并

var sortArray = function(nums) {
  if (nums.length <= 1) {
    return nums;
  }
  function mergeArr(nums, left, right) {
    if (right - left < 1) {
      return nums;
    }
    let mid = Math.floor(nums.length / 2);
    let leftArr =  mergeArr(nums.slice(left, mid));
    let rightArr =  mergeArr(nums.slice(mid+1, right));
    return leftArr.concat(rightArr);
  }
  mergeArr(nums, 0, nums.length)
};