// 题目描述:如何确定一个数在一个有序数组中的位置
function searchPoint(arr, target) {
  let i = 0, j = arr.length -1;
  while(i <= j) {
    let mid = Math.floor(i /2 + j /2);
    if (arr[mid] === target) {
      return mid;
    } else if(arr[mid] > target) {
      j = mid - 1
    } else {
      i = mid + 1
    }
  }
  return -1;
}