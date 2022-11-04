function permute(nums) {
  // 用于存储全排列的每一种结果
  let curr = [];
  // 标记数字是否被使用
  let visited = {}
  // 保存结果
  let res = [];
  function dfs(nth) {
    if (nth === nums.length) {
      res.push(curr.slice());
      return;
    }
    for (let i = 0; i < nums.length; i++) {
      if (!visited[nums[i]]) {
        curr.push(nums[i]);
        // 标记数字被使用
        visited[nums[i]] = true;
        dfs(nth + 1)
        // 去掉标记
        visited[nums[i]] = false;
        curr.pop();
      }
    }
  }
  dfs(0)
  return res
}
console.log(permute([1,2,3]))