// 通过选取数组的中间节点,将大于节点的数排在右边小于节点的数排在左边,这样不断重复上述操作直至排序完成
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
    while(arr[i] < pivotValue) {
      i++;
    }
    while(arr[j] > pivotValue) {
      j--;
    }
    if (i <= j) {
      [arr[i], arr[j]] = [arr[j], arr[i]]
      i++;
      j--;
    }
  }
  return i;
}
console.log(quickSort([5, 3, 2, 4, 1]))