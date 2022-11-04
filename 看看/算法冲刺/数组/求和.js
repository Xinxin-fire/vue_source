const arr = [1,7,3,9,6,2,4];
// 1.两数之和
function twoSum(arr, target) {
  let map = new Map();
  for (let i = 0; i < arr.length; i++) {
    let k = target - arr[i];
    if (!map.has(k)) {
      map.set(arr[i], i)
    } else {
      return [map.get(k), i]
    }
  }
}
// console.log(twoSum(arr, 16))

const arrThree = [1 ,0 ,-1, 2, -2, -1];
// 2.三数之和
function threeSum(arr, target) {
  const result = []
  arr.sort((a, b) => a - b);
  console.log(arr)
  for (let i = 0; i < arr.length - 1; i++) {
    let left = i + 1, right = arr.length - 1;
    if (i > 0 && arr[i] === arr[i - 1]) {
      continue;
    }
    while(left < right) {
      let sum = arr[i] + arr[left] + arr[right]
      if (sum === target) {
        result.push([arr[i], arr[left],  arr[right]])
        left++;
        right--;
        while (left < right && arr[left] === arr[left - 1]) {
          left++;
        }
        while (left < right && arr[right] === arr[right + 1]) {
          right--;
        }
      } else if (sum > target){
        right--;
      } else {
        left++;
      }
    }
  }
  return result
}
// console.log(threeSum(arrThree, 0))

const arrFour = [1 ,0 ,-1, 2, -2, -1];
// 3.四数之和
function fourSum(arr, target) {
  arr.sort((a, b) => a - b);
  let result = [];
  for (let i = 0; i < arr.length - 3; i++) {
    if (i > 0 && arr[i] === arr[i - 1]) {
      continue;
    }
    for (let j = i + 1; j < arr.length -2; j++) {
      if (j >  i + 1 && arr[j] === arr[j - 1]) {
        continue;
      }
      let left = j + 1, right = arr.length - 1;
      while (left < right) {
        let sum = arr[i] + arr[j] + arr[left] + arr[right];
        if (sum === target) {
          result.push([arr[i], arr[j], arr[left], arr[right]])
          left++;
          right--;
        } else if (sum > target) {
          right--;
        } else {
          left++;
        }
      }
    }
  }
  return result
}
console.log(fourSum(arrFour, 0))