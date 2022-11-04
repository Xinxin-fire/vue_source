// 将数组通过二分法,不断拆分,最终拆分成单个元素,再将拆分的进行有序合并,最终合并成一个有序数组
function mergeSort(arr) {
  if (arr.length <= 1) {
    return arr
  }
  let mid = Math.floor(arr.length / 2);
  let arrLeft = mergeSort(arr.slice(0, mid));
  let arrRight = mergeSort(arr.slice(mid, arr.length));
  arr =  mergeArr(arrLeft, arrRight);
  return arr;
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
console.log(mergeSort([5, 3, 2, 4, 1]))