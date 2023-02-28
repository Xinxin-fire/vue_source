// 快速排序
// 分治思想，选择一个基准点（开头、中间、或结尾），将比基准点大的值移动到前面，小的值移动到后面，并返回基准点
// 问题点，
// 1.基准点选择不同的区别，
// 2.left和right在循环时要相等吗，为什么， 
// 都需要相等，第一次相等是还需要和基准值进行比较，第二次相等是为了防止死循环，因为如果两个值相等且都在taget的左右，边无法跳出循环
// 3.基准值在左边-1还是在右边+1，为什么 
// 跟返回的是left还是right索引有关，如果返回的是left索引则需要在左边-1，
// 因为根据left的筛选出来，最后会进行一个left+1的操作，导致left的值要么和基准值相等，要么在基准值的右边
// 4.为什么是不稳定排序，当选择重复的值作为基准值时，会存在值交换的情况
let nums = [5,4,2,3,1,6];
function quickSort(nums, left = 0, right = nums.length -1) {
  if (left < right) {
    let index = partition(nums, left, right);
    quickSort(nums, left, index -1);
    quickSort(nums, index, right)
  }
  return nums;
}
// 选择中间为基准
function partition(nums, left, right) {
  let mid = Math.floor((left + right) / 2);
  let target = nums[mid];
  while(left <= right) {
    while (nums[left] < target) {
      left++;
    }
    while (nums[right] > target) {
      right--;
    }
    if (left <= right) {
      [nums[left], nums[right]] = [nums[right], nums[left]]
      left++;
      right--;
    }
  }
  return left;
}
// 选择以开头为基准点
let nums1 = [5,1,1,2,0,0];
function partition(nums, left, right) {
  let privot = left;
  let target = nums[privot];
  let index = left + 1;
  for (let i = index; i <= right; i++) {
    if (nums[i] < target) {
      [nums[i], nums[index]] = [nums[index], nums[i]]
      index++;
    }
  }
  // 为什么和index -1比较，因为index表示比基准值小的元素的个数+1，实际需要和比基准值少的最右边的元素交互，该元素的索引为index -1
  [nums[privot], nums[index -1]] = [nums[index -1], nums[privot]];
  return index;
}

console.log(quickSort(nums1));
