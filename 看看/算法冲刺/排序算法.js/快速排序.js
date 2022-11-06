// 通过选取数组的中间节点,将大于节点的数排在右边小于节点的数排在左边,这样不断重复上述操作直至排序完成
// 归并排序递归取中间索引是直接通过二分来取的，而快排是通过函数的左节点的值的索引位置决定的
function quickSort(arr, left=0, right=arr.length - 1) {
  if (arr.length > 1) {
    let lineIndex = partition(arr, left, right)
    if (left < lineIndex - 1) {
      partition(arr, left, lineIndex - 1)
    }
    if (lineIndex < right) {
      partition(arr, lineIndex, right)
    }
  }
  return arr;
}
function partition(arr, left, right) {
  let i = left;
  let j = right;
  let pivotValue = arr[Math.floor((left + right)/2)]
  while(i <= j) {
    // 左侧小于中间值，则不用动，将i值向前移动
    while(arr[i] < pivotValue) {
      i++;
    }
    // 右侧大于中间值，则不用动，将j值向后移动
    while(arr[j] > pivotValue) {
      j--;
    }
    // 循环到这说明当前i,j的值都不符合其区间，需要交换
    if (i <= j) {
      [arr[i], arr[j]] = [arr[j], arr[i]]
      i++;
      j--;
    }
  }
  return i;
}
console.log(quickSort([5, 3, 2, 4, 1]))