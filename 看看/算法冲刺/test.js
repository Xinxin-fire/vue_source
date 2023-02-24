var topKFrequent = function(nums, k) {
  let map = new Map();
  for (let item of nums) {
      map.set(item, (map.get(item) || 0) + 1)
  }
  let arrs = [...map.entries()];
  let heap = [];
  for (let i = 0; i < k; i++) {
     heap[i] = arrs[i];
     upHeap(0, i);
 }
  for (let i = k; i < arrs.length; i++) {
     if (arrs[i][1] > heap[0][1]) {
         heap[0] = arrs[i];
         downHeap(0, k)
     }
 }
 function upHeap(low, high) {
   let i = high;
   let j = Math.floor((i -1) / 2);
   while(j >= low) {
       if (heap[i][1] < heap[j][1]) {
           [heap[i], heap[j]] = [heap[j], heap[i]];
           i = j;
           j = Math.floor((i -1) / 2);
       } else {
           break;
       }
   }
 }
  function downHeap(low, high) {
     let i = low;
     let j =2 * i + 1;
     while(j <= high) {
       // 如果右节点比左节点小则用右节点和当前根节点比较
         if (j + 1 <= high && heap[j+1][1] < heap[j][1]) {
             j = j + 1
         }
         if (heap[i][1] > heap[j][1]) {
             [heap[i], heap[j]] = [heap[j], heap[i]];
             i = j;
             j =2 * i + 1;
         } else {
             break;
         }
     }
  }
  return heap
};
console.log(topKFrequent([3,0,1,0],1));