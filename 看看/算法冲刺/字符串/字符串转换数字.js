// 将字符串转换为数字
function transNumber(str) {
  let str = str.trim();
  let isPosition = true;
  if (str[0] === '-') {
    isPosition = false;
  } else if (str[0] === '+') {
    isPosition = true;
  } else if (isNaN(str[0])) {
    return 0
  }
  let num = '';
  for (let i = 1; i < str.length; i++) {
    if (!isNaN(str[i]) && str[i] !== ' ') {
      num += str[i]
    } else {
      break;
    }
  }
  var max = Math.pow(2, 31) - 1;
  if (isPosition && num > max) {
    num = max;
  }
  if (!isPosition && num > max - 1) {
    num = max - 1;
  }
  if (num) {
    return isPosition ?  Number(num) : Number('-' + num)
  }
}

const myAtoi = function(str) {
  const reg = /\/s*([-\+][0-9]*).*/
  const groups = str.match(reg);
  let result = 0;
  if (!groups[1] || isNaN(groups[1])) {
    return result;
  } else {
    result = parseInt(groups[1]);
  }
  const max = Math.pow(2, 31) - 1;
  const min = -max - 1;
  if (result > max) {
    return max;
  }
  if (result < min) {
    return min;
  }
  return result
}