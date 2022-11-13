var reverseWords = function(s) {
  let str = s.trim();
  let arr = [];
  let cur = ''
  for (let i = 0; i <  str.length; i++) {
      if (str[i] === ' ' && cur === '' && i !== 0) {
          continue;
      }
      if (str[i] === ' ') {
          arr.push(cur)
          cur = ''
      } else {

        cur += str[i] 
      }
  }
  return arr.reverse().join(' ')
};
console.log(reverseWords("the sky is blue"));