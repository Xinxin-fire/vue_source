// 递归
function flatten(arr) {
  if (!Array.isArray(arr)) {
    throw TypeError('type error')
  }
  return arr.reduce(
    (pre, cur) => 
      Array.isArray(cur) ? [...pre, ...flatten(cur)] : [...pre, cur]
    , [])
}
// 迭代
function flatten(arr) {
  if (!Array.isArray(arr)) {
    throw TypeError('type error')
  }
  while(arr.some(ele => Array.isArray(ele))) {
    arr = [].concat(...arr)
  }
  return arr
}
console.log(flatten([1, 2, [1, [2, 3, [4, 5, [6]]]]]));