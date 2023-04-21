var findUnsortedSubarray = function(nums) {
  if (nums.length <= 1) {
    return 0
  }
  let startIndex = endIndex =  0;
  // let startVal = endVal =  nums[0];
  for (let i = 1; i < nums.length; i++) {
    if (nums[i] < nums[i-1]) {
      if (!startIndex) {
        startIndex = i-1;
      }
      endIndex = i;
      [nums[i], nums[i-1]] = [nums[i - 1], nums[i]]
    }
  }
  console.log(endIndex, startIndex)
  return endIndex === startIndex ? 0 : endIndex - startIndex + 1
};
console.log(findUnsortedSubarray([5,4,3,2,1]));