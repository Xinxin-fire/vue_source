const arr1 = [1, 2, 6];
const arr2 = [3 ,4, 7];
function mergeArr(arr1, m, arr2, n) {
  let i = m - 1;
  let j = n - 1;
  let k = m + n - 1;
  while(i >= 0 && j >= 0) {
    if (arr1[i] >= arr2[j]) {
      arr1[k] = arr1[i];
      k--;
      i--;
    } else {
      arr1[k] = arr2[j];
      k--;
      j--;
    }
  }
  while(j >= 0) {
    arr1[k] = arr2[j];
    k--;
    j--;
  }
  return arr1
}
console.log(mergeArr(arr1, 3, arr2, 3))