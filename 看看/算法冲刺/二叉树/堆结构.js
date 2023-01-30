// 构建堆结构，向堆中插入数据
// 堆是一个数组类型，大顶堆则数组的第一个元素是最大值，小顶堆则数组的第一个元素是最小值
// 向堆中插入数据时，将数据放到堆的底部，一个个的向上比较直到找到其对应位置
let heap = []; // 初始化堆
// low,high为数组的索引指向数组的两端,arr为原始数组

// 1.构建大顶堆
function upHeap(low, high) {
  let i= high; // 初始化当前节点
  let j = Math.floor((i -1)/2); // 初始化当前节点的父节点
  while(j >= low) {
    // 当前节点大于父节点则交换
    if (heap[i] > heap[j]) {
      [heap[i], heap[j]] = [heap[j], heap[i]];
      // 交换之后需要更新索引值
      i = j;
      j = Math.floor((i -1)/2);
    } else {
      break;
    }
  }
}
// 1.构建小顶堆
function upHeap(low, high) {
  let i= high; // 初始化当前节点
  let j = Math.floor((i -1)/2); // 初始化当前节点的父节点
  while(j >= low) {
    // 当前节点小于父节点则交换
    if (heap[i] < heap[j]) {
      [heap[i], heap[j]] = [heap[j], heap[i]];
      // 交换之后需要更新索引值
      i = j;
      j = Math.floor((i -1)/2);
    } else {
      break;
    }
  }
}

// 替换栈顶元素，小顶堆
// 替换栈顶元素需要将栈顶元素与其底下的子元素进行向下比较
function downHeap(low, high) {
  let i = low //初始化当前节点
  let j = 2 * i + 1 //初始化当前节点的左子节点
  while(j <= high) {
    // 如果右子节点小于左子节点，则用右节点去比较
    if (j+1 <= high && heap[j+1]<heap[j]) {
      j = j + 1;
    }
    // 当前节点大于其子节点则进行交换
    if(head[i] > heap[j]) {
      [heap[i], heap[j]] = [heap[j], heap[i]];
      // 更新索引值，重其子节点开始比较
      i = j 
      j = 2 * i + 1
    } else {
      break;
    }
  }
}

// 数组中的第K个最大元素
var findKthLargest = function(nums, k) {
  let heap = [];
  for (let i = 0; i < k; i++) {
      heap[i] = nums[i];
      upHeap(0, i);
  }
  for (let i = k; i < nums.length; i++) {
      if (nums[i] > heap[0]) {
          heap[0] = nums[i];
          downHeap(0, k)
      }
  }
  // 插入操作
  function upHeap(low, high) {
      let i = high;
      let j = Math.floor((i -1) / 2);
      while(j >= low) {
          if (heap[i] < heap[j]) {
              [heap[i], heap[j]] = [heap[j], heap[i]];
              i = j;
              j = Math.floor((i -1) / 2);
          } else {
              break;
          }
      }
  }
  // 栈顶替换操作操作
  function downHeap(low, high) {
      let i = low;
      let j =2 * i + 1;
      while(j <= high) {
        // 如果右节点比左节点小则用右节点和当前根节点比较
          if (j + 1 <= high && heap[j+1] < heap[j]) {
              j = j + 1
          }
          if (heap[i] > heap[j]) {
              [heap[i], heap[j]] = [heap[j], heap[i]];
              i = j;
              j =2 * i + 1;
          } else {
              break;
          }
      }
  }
  return heap[0];
};
console.log(findKthLargest([2,1], 2));