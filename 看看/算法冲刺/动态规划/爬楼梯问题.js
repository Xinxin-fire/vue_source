// 1.记忆化搜索
let fn = []
function climbStairs(n) {
  if (n === 1 || n === 2) {
    return n
  }
  if (!fn[n]) {
    fn[n] = climbStairs(n-1) + climbStairs(n-2)
  }
  return fn[n]
}

// 2.动态规划,动态规划倾向于从已知推出未知,而记忆化搜索是对递归操作的一种优化
function climbStairs(n) {
  let fn = [];
  fn[1] = 1;
  fn[2] = 2;
  for (let i = 3; i <= n; i++) {
    fn[i] = fn[i-1] + fn[i-2]
  }
  return fn[n]
}
console.log(climbStairs(6))