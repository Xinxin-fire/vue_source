// 冒泡排序
function sort(nums) {
  for (let i = 0; i < nums.length; i++) {
    for (let j = 0; j < nums.length - i; j++) {
      if (nums[j + 1] < nums[j]) {
        [nums[j], nums[j+ 1]] = [nums[j+ 1], nums[j]]
      }
    }
  }
}
// 选择排序
function sort(nums) {
  for (let i = 0; i < nums.length; i++) {
    for (let j = i+1; j < nums.length; j++) {
      if (nums[j] < nums[i]) {
        [nums[j], nums[i]] = [nums[i], nums[j]]
      }
    }
  }
}
// 插入排序
function sort(nums) {
  for (let i = 0; i < nums.length; i++) {
    let j = i;
    while (nums[j] < nums[j-1] && j > 0) {
      j--;
    }
    [nums[j], nums[i]] = [nums[i], nums[j]]
  }
}

// 归并排序
function sort(nums) {
  if (nums.length <= 1) {
    return nums
  }
  let mid = Math.floor(nums.length /2);
  let leftArr = nums.slice(0, mid)
  let rightArr = nums.slice(mid)
  return mergeArr(sort(leftArr), sort(rightArr))
}
function mergeArr(num1, nums2) {
  let nums = [];
  let i = 0;
  while(i < num1.length && i < nums2.length) {
    if (nums1[i] > nums2[i]) {
      nums.push(nums2[i])
    } else {
      nums.push(nums1[i])
    }
    i++;
  }
  if(i < num1.length) {
    nums.concat(nums1.slice(i))
  }
  if(i < num2.length) {
    nums.concat(nums2.slice(i))
  }
  return nums;
}

// 快速排序1
function sort(nums, left ,right) {
  if (nums.length > 1) {
    let index = partition(nums, left, right);
    sort(nums, left , index -1)
    sort(nums, index , right)
  }
}
function partition(nums, left ,right) {
  let target = nums[Math.floor((left + right)/2)];
  while(left <= right) {
    while(nums[left] < target) {
      left++
    }
    while(nums[right] > target) {
      right--
    }
    if (left <=right) {
      [nums[left], nums[right]] = [nums[right], nums[left]]
      left++;
      right--;
    }
  }
  return left
}

// 快速排序2
function partition(nums, left, right) {
  let target = nums[left];
  let index = left+1;
  for (let i = 0; i <= right; i++) {
    if (nums[i] > target) {
      index++
    }
  }
  [nums[left], nums[index-1]] = [nums[index-1], nums[left]]
  return index;
}

// 堆排序
function sort(nums, k) {
  for (let i = 0; i < k; i++) {
    bulidHeap(nums, nums[i])
  }
  for (let i = k; i < nums.length; i++) {
    if (nums[i] > nums[0]) {
      inseartHeap(nums, nums[i])
    }
  }
  return nums[0]
}
function bulidHeap(nums, target) {
  
}
function inseartHeap(nums, target) {

}