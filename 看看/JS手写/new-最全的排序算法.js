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
    let temp = nums[j];
    while (nums[j] < nums[j-1] && j > 0) {
      nums[j] = nums[j-1];
      j--;
    }
    nums[j] = temp 
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
function mergeArr(arr1, arr2) {  
  // 初始化两个指针，分别指向 arr1 和 arr2
  let i = 0, j = 0   
  // 初始化结果数组
  const res = []    
  // 缓存arr1的长度
  const len1 = arr1.length  
  // 缓存arr2的长度
  const len2 = arr2.length  
  // 合并两个子数组
  while(i < len1 && j < len2) {
      if(arr1[i] < arr2[j]) {
          res.push(arr1[i])
          i++
      } else {
          res.push(arr2[j])
          j++
      }
  }
  // 若其中一个子数组首先被合并完全，则直接拼接另一个子数组的剩余部分
  if(i<len1) {
      return res.concat(arr1.slice(i))
  } else {
      return res.concat(arr2.slice(j))
  }
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