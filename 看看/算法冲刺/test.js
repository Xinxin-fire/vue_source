function quickSort(arr, left=0, right = arr.length -1) {
  if (left >= right) {
    return;
  }
  let index = partition(arr, left,right);
  quickSort(arr, index+ 1, right);
  quickSort(arr, left, index-1);
}

function partition (arr, left, right) {
    let mid = Math.floor((left + right) / 2);
    let target = arr[mid];
    while(left < right) {
      if (nums[left] < target) {
        left++
      }
      if (nums[right] > target) {
        right--
      }
      if (left < right) {
        [nums[left], nums[right]] = [nums[right], nums[left]];
      }
    }
    return left;
}