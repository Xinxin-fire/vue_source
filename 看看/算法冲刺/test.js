var romanToInt = function(s) {
  let map = {
      'I': 1,
      'V': 5,
      'x': 10,
      'L': 50,
      'c': 100,
      'D': 500,
      'M': 1000,
      'IV': 4,
      'IX': 9,
      'XL': 40,
      'XC': 90,
      'CD': 400,
      'CM': 900,
  }
  let res = 0;
  for(let i = 0; i < s.length; i++) {
      if (s[i] === 'I' && (s[i+1] === 'V' || s[i+1] === 'X') || 
      s[i] === 'X' && (s[i+1] === 'L' || s[i+1] === 'C') ||
      s[i] === 'C' && (s[i+1] === 'D' || s[i+1] === 'M')
      ) {
          res += map[s[i] + s[i + 1]];
          i++
      } else {
          res += map[s[i]];
      }
  }
  return res;
};
console.log(romanToInt("DCXXI"));