var longestPalindrome = function(s) {
  let res = '';
  function getRes(s, i, j) {
      let left = i,right = j;
      while(left >= 0 && right < s.length && s[left] === s[right]) {
              left--;
              right++;
      }
      return s.slice(left, right + 1)
  }
  for (let i = 0; i < s.length; i++) {
      res = Math.max(getRes(s, i,i+1), getRes(s, i,i), res)
  }
  return res;
};
console.log(longestPalindrome('cbbd'));