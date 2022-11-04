// 1.回文字符串
function isPalindrome(str) {
  let length = str.length;
  for (let i = 0; i < length / 2; i++) {
    if (str[i] !== str[length - 1]) {
      return false
    }
  }
  return true;
}

// 1.最多删除一个字符,判断是否为回文字符串
function validPalindrome(str) {
  let length = str.length;
  let left = 0, right = length - 1;
  while(left < right && str[left] === str[right]) {
    left++;
    right--;
  }
  if (isPalindrome(left + 1, right)) {
    return true;
  }
  if (isPalindrome(left, right - 1)) {
    return true;
  }
  function isPalindrome(i, j) {
    while(i < j) {
      if (str[i] !== str[j]) {
        return false
      }
      i++;
      j--;
    }
    return true;
  }
  return false;
}
console.log(validPalindrome('abccba'))