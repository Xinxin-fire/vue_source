function subsets(nums) {
  let result = [];
  let curr = [];
  dfs(0);
  function dfs(index) {
    result.push(curr.slice())
    for (let i = index; i < nums.length; i++) {
      curr.push(nums[i]);
      dfs(i+1);
      curr.pop(nums[i])
    }
  }
  return result;
}
console.log(subsets([1,2,3]))

// 限定组合
function combine(n, k) {
  let result = [];
  let curr = [];
  dfs(1);
  function dfs(index) {
    // 达到边界值,返回结果
    if (curr.length === k) {
      result.push(curr.slice())
      return;
    }
    for (let i = index; i <= n; i++) {
      // 当前元素存在的情况
      curr.push(i);
      // 对包含当前元素进行dfs
      dfs(i + 1);
      // 当前元素不存在的情况
      curr.pop();
    }
  }
  return result
}
console.log(combine(4, 2))


