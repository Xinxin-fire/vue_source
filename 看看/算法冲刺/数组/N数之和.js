// 从给定的无需、不重复的数组A中，取出N个数，使其相加和为M,并给出算法的时间、空间复杂度
function NSum(arr, N, M) {
  let result = [];
  function backTrack(ret, count, currentIndex) {
    if (ret.length === N) {
      if (count === 0) {
        result.push(ret);
      }
      return;
    };
    for (let i = currentIndex + 1; i < arr.length; i++) {
      backTrack(ret.concat(arr[i]), count - arr[i], i)
    }
  }
  backTrack([], M, -1);
  return result;
}
var arr = [1, 4, 7, 11, 9, 8, 10, 6];
var N = 3;
var M = 27;
console.log(NSum([1, 4, 7, 11, 9, 8, 10, 6]), 3, 27);