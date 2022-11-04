// 插入排序都基于它前面的数据已经有序,将要插入的数据找到其在有序数组的所在位置
function insertSort(arr) {
  let temp
  for (let i = 1; i < arr.length; i++) {
    let j = i;
    // 保存当前的值
    temp = arr[i];
    // 如果有序数组的最后一个值大于当前的值
    while(j > 0 && arr[j - 1] > temp) {
      // 将有序数组往后移动
      arr[j] = arr[j - 1] 
      j--;
    }
    // 最后得到的j即为当前元素应该所在的位置
    arr[j] = temp
    console.log(arr)
  }
}
insertSort([5, 3, 2, 4, 1])