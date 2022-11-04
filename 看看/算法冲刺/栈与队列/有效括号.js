function isValid(str) {
  let stack = [];
  let collect = {
    '(': ')',
    '[': ']',
    '{': '}'
  }
  for (let i = 0; i < str.length; i++) {
    let s = str[i]
    if (s === '(' || s === '[' || s === '[') {
      stack.push(collect[s])
    } else {
      if (stack.length && stack[stack.length - 1] === s) {
        stack.pop()
      } else {
        return false
      }
    }
  }
  return !stack.length;
}